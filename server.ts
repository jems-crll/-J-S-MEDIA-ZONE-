import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import { GoogleGenAI, Type } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

// API Route for AI Generation
app.post("/api/gemini/generate-email", async (req, res) => {
  const { title, description, imageUrl, affiliateLink } = req.body;
  
  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: "GEMINI_API_KEY is not configured" });
  }

  try {
    const prompt = `You are an expert Email Marketing Designer and Frontend Developer. 
Your task is to create a highly attractive, responsive HTML email template for an affiliate product promotion.

Product Information:
1. Product Name: ${title}
2. Product Details/Features: ${description}
3. Product Image: ${imageUrl}
4. Affiliate Link: ${affiliateLink}

Follow these STRICT rules:
- Write clean, responsive HTML suitable for email marketing clients (Gmail, Outlook, Yahoo).
- Use ONLY inline CSS (e.g., <div style="color: red;">). Do not use external stylesheets or <style> blocks in the header, as many email clients block them.
- Create a modern, professional layout. Use a clean white or light gray background.
- Prominently display the product image.
- Create a large, highly visible, click-friendly Call to Action (CTA) button (like "Buy Now", "Claim Offer", or "Get 50% Off") that uses the provided Affiliate Link.
- Output ONLY the raw HTML code. Do NOT wrap the code in markdown formatting (like \`\`\`html). Do NOT add any conversational text, greetings, or explanations before or after the code.`;

    const interaction = await ai.interactions.create({
      model: "gemini-1.5-flash",
      input: [{ type: "text", text: prompt }]
    });

    // Extract text from the last model output step
    let html = "";
    for (let i = interaction.steps.length - 1; i >= 0; i--) {
      const step = interaction.steps[i];
      if (step.type === 'model_output') {
        const textContent = step.content?.find(c => c.type === 'text');
        if (textContent && textContent.text) {
          html = textContent.text;
          break;
        }
      }
    }

    html = html.trim();

    // Remove any accidental markdown backticks if the model ignored the instruction
    if (html.startsWith('```html')) {
      html = html.replace('```html', '').replace('```', '').trim();
    } else if (html.startsWith('```')) {
      html = html.replace(/```/g, '').trim();
    }

    res.json({ html });
  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ error: "Failed to generate email content" });
  }
});

// Email Transporter (Update with real SMTP details in .env)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// API Route for Enquiries
app.post("/api/enquiry", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    console.log(`New Enquiry from ${name} (${email}): ${message}`);
    
    // 1. Save to Firestore
    try {
      const { initializeApp } = await import("firebase/app");
      const { getFirestore, collection, addDoc } = await import("firebase/firestore");
      const { default: firebaseConfig } = await import("./firebase-applet-config.json", { assert: { type: "json" } });
      
      const firebaseApp = initializeApp(firebaseConfig);
      const db = getFirestore(firebaseApp, firebaseConfig.firestoreDatabaseId);
      
      await addDoc(collection(db, "enquiries"), {
        name,
        email,
        message,
        createdAt: new Date(),
        status: "new"
      });
    } catch (dbErr) {
      console.error("Firestore save error:", dbErr);
    }
    
    // 2. Send Email to Admin
    await transporter.sendMail({
      from: '"j s Media" <no-reply@jsmedia.com>',
      to: "javedsayyad93@gmail.com", // Your email
      subject: `New Enquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    }).catch(err => console.log("SMTP not configured, skipping actual email send. Error:", err.message));

    // 3. Send Thank You Email to User
    await transporter.sendMail({
      from: '"j s Media" <no-reply@jsmedia.com>',
      to: email,
      subject: `Thank you for contacting j s Media`,
      text: `Hi ${name},\n\nThank you for reaching out! We have received your enquiry and will get back to you shortly.\n\nBest regards,\nj s Media Team`,
    }).catch(err => console.log("SMTP not configured, skipping thank you email. Error:", err.message));
    
    res.json({ 
      success: true, 
      message: "Enquiry processed."
    });
  } catch (error) {
    console.error("Error handling enquiry:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();

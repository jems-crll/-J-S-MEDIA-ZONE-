import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";

const app = express();
const PORT = 3000;

app.use(express.json());

// Mock Email Transporter (Update with real SMTP details)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.example.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER || "user@example.com",
    pass: process.env.SMTP_PASS || "password",
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

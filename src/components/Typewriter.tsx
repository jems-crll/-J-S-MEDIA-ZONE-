import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

const words = ['Frontend & Back', 'Email Marketing', 'Digital Solutions', 'IT Services'];

export default function Typewriter() {
  const [index, setIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[index];
    const speed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting && displayedText === currentWord) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayedText === '') {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % words.length);
      } else {
        setDisplayedText((prev) =>
          isDeleting ? prev.slice(0, -1) : currentWord.slice(0, prev.length + 1)
        );
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, index]);

  return (
    <span className="font-bold text-gray-900 min-w-[200px] inline-block">
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        className="inline-block w-[2px] h-[1em] bg-pink-600 ml-1 align-middle"
      />
    </span>
  );
}

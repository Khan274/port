import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

export function Background() {
  const [elements, setElements] = useState<Array<{ id: number; left: number; top: number; delay: number; size: number }>>([]);

  useEffect(() => {
    // Generate random background elements only on client side to avoid hydration mismatch
    const newElements = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      size: Math.random() * 20 + 10,
    }));
    setElements(newElements);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-gradient-to-br from-background via-[#fff5f6] to-[#f8eadd]">
      {/* Soft gradient orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[100px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#ffe4e1]/40 blur-[120px] rounded-full" />
      
      {/* Floating Hearts */}
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute text-primary/10"
          style={{
            left: `${el.left}%`,
            top: `${el.top}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            rotate: [0, 10, -10, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            delay: el.delay,
            ease: "easeInOut",
          }}
        >
          <Heart fill="currentColor" size={el.size} />
        </motion.div>
      ))}
    </div>
  );
}

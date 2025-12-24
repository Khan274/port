import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface SceneProps {
  children: ReactNode;
  isVisible: boolean;
  className?: string;
}

export function Scene({ children, isVisible, className = "" }: SceneProps) {
  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 1.05, filter: "blur(5px)" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={`absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 ${className}`}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

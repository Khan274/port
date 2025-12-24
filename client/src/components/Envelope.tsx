import { motion } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";

export function Envelope({
  isOpen,
  onOpen,
}: {
  isOpen: boolean;
  onOpen: () => void;
}) {
  const [showLetter, setShowLetter] = useState(false);

  const handleOpen = () => {
    if (!isOpen) {
      onOpen();
      // Delay showing the modal/letter content to allow animation to play
      setTimeout(() => setShowLetter(true), 800);
    }
  };

  return (
    <>
      <div
        className="relative w-72 h-48 cursor-pointer group"
        onClick={handleOpen}
      >
        {/* Envelope Body */}
        <motion.div
          layoutId="envelope"
          className="relative w-full h-full bg-[#f8f5f2] shadow-2xl rounded-lg overflow-hidden border border-[#eaddcf]"
          initial={{ y: 0 }}
          animate={isOpen ? { y: 100, opacity: 0 } : { y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Flap */}
          <motion.div
            className="absolute top-0 left-0 w-full h-1/2 bg-[#f0e6da] origin-top z-20 border-b border-[#e6dccf]"
            style={{ clipPath: "polygon(0 0, 50% 100%, 100% 0)" }}
            animate={isOpen ? { rotateX: 180 } : { rotateX: 0 }}
            transition={{ duration: 0.6 }}
          />

          {/* Letter inside (peeking) */}
          <div className="absolute top-2 left-4 right-4 h-32 bg-white shadow-sm z-10" />

          {/* Bottom pocket */}
          <div
            className="absolute bottom-0 left-0 w-full h-full bg-[#fdfbf9] z-30"
            style={{
              clipPath: "polygon(0 0, 50% 50%, 100% 0, 100% 100%, 0 100%)",
            }}
          />

          {/* Wax Seal */}
          <motion.div
            className="absolute top-[35%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-red-800 rounded-full z-40 flex items-center justify-center shadow-md border-2 border-red-900/20"
            animate={
              isOpen ? { opacity: 0, scale: 0.5 } : { opacity: 1, scale: 1 }
            }
          >
            <div className="text-red-950 font-serif text-lg">❤</div>
          </motion.div>
        </motion.div>

        {!isOpen && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute -bottom-12 left-0 right-0 text-center text-muted-foreground text-sm tracking-widest uppercase"
          >
            Tap to open
          </motion.p>
        )}
      </div>

      {/* Full Screen Letter Modal */}
      {showLetter && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.8, y: 50, rotateX: 10 }}
            animate={{ scale: 1, y: 0, rotateX: 0 }}
            className="bg-white max-w-lg w-full max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl p-8 md:p-12 relative"
          >
            <button
              onClick={() => setShowLetter(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={24} />
            </button>

            <div className="prose prose-p:font-handwriting prose-p:text-2xl prose-headings:font-serif">
              <h3 className="text-2xl md:text-3xl text-foreground mb-6 font-bold">
                My Dearest Filza,
              </h3>

              <div className="space-y-6 text-foreground/80 leading-relaxed font-handwriting text-2xl">
                <p>I just wanted you to know that you’re genuinely special.</p>
                <p>I hope today brings you calm smiles and quiet happiness.</p>
                <p>You deserve all the good things coming your way.</p>
                <p>Happy Birthday, beautiful.</p>
              </div>

              <div className="mt-12 text-right">
                <p className="font-handwriting text-2xl text-foreground">
                  With all my love,
                </p>
                <p className="font-serif italic text-lg mt-2 text-accent">
                  Moizz 💫
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}

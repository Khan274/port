import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Background } from "@/components/Background";
import { Scene } from "@/components/Scene";
import { Envelope } from "@/components/Envelope";
import { AudioPlayer } from "@/components/AudioPlayer";
import { useRecordVisit } from "@/hooks/use-visits";
import confetti from "canvas-confetti";
import { ArrowRight, Sparkles, Star, Smile } from "lucide-react";

export default function Home() {
  const [currentScene, setCurrentScene] = useState(1);
  const { mutate: recordVisit } = useRecordVisit();

  // Record visit on initial load
  useEffect(() => {
    recordVisit();
  }, []);

  const nextScene = () => {
    setCurrentScene((prev) => prev + 1);
  };

  // Effect for Scene 2 (Confetti)
  useEffect(() => {
    if (currentScene === 2) {
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#FFD1DC', '#D4AF37', '#ffffff']
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#FFD1DC', '#D4AF37', '#ffffff']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [currentScene]);

  // Variables
  const HER_NAME = "My Love"; // Change this to her actual name

  return (
    <div className="relative h-screen w-full overflow-hidden bg-background text-foreground font-sans selection:bg-primary/30">
      <Background />
      <AudioPlayer />

      <main className="relative z-10 h-full w-full max-w-5xl mx-auto">
        
        {/* === SCENE 1: WELCOME === */}
        <Scene isVisible={currentScene === 1}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <span className="text-sm md:text-base font-medium tracking-[0.3em] uppercase text-accent mb-4">
              A Surprise
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-foreground mb-6">
              Hey {HER_NAME} <span className="inline-block animate-pulse">✨</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto mb-12 leading-relaxed">
              I made something special, just for you. Take a moment, breathe, and let's begin.
            </p>
            
            <motion.button
              onClick={nextScene}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-8 py-4 bg-foreground text-background rounded-full font-medium tracking-wide shadow-xl hover:shadow-2xl transition-all overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <span className="flex items-center gap-2">
                Start Experience <ArrowRight size={16} />
              </span>
            </motion.button>
          </motion.div>
        </Scene>

        {/* === SCENE 2: BIRTHDAY WISH === */}
        <Scene isVisible={currentScene === 2}>
          <motion.div className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-8 text-4xl"
            >
              🎂
            </motion.div>
            
            <h2 className="text-6xl md:text-8xl font-serif text-foreground mb-8 text-center leading-tight">
              Happy <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Birthday!</span>
            </h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="text-xl md:text-2xl text-muted-foreground font-light mb-12"
            >
              I hope today feels as beautiful as your soul.
            </motion.p>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3 }}
              onClick={nextScene}
              className="text-sm tracking-widest uppercase border-b border-foreground/30 hover:border-foreground pb-1 transition-colors"
            >
              Continue
            </motion.button>
          </motion.div>
        </Scene>

        {/* === SCENE 3: WHY YOU ARE SPECIAL === */}
        <Scene isVisible={currentScene === 3}>
          <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-4">
            {[
              { 
                icon: Smile, 
                title: "Your Smile", 
                text: "It has this way of making everything feel lighter.",
                delay: 0.5 
              },
              { 
                icon: Sparkles, 
                title: "Your Presence", 
                text: "Being around you feels like coming home.",
                delay: 1.5 
              },
              { 
                icon: Star, 
                title: "Your Spirit", 
                text: "You are effortlessly unforgettable.",
                delay: 2.5 
              }
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: card.delay, duration: 0.8 }}
                className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl border border-white/50 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full flex items-center justify-center mb-4 text-foreground/80">
                  <card.icon size={24} />
                </div>
                <h3 className="text-xl font-serif font-bold mb-3">{card.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{card.text}</p>
              </motion.div>
            ))}
          </div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4.5 }}
            onClick={nextScene}
            className="mt-16 px-8 py-3 rounded-full bg-white border border-border shadow-sm hover:bg-gray-50 transition-all text-sm uppercase tracking-widest"
          >
            One more thing...
          </motion.button>
        </Scene>

        {/* === SCENE 4: QUIET MOMENT === */}
        <Scene isVisible={currentScene === 4}>
          <div className="max-w-2xl px-6">
            <motion.p 
              className="text-2xl md:text-4xl font-serif leading-relaxed text-foreground/90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              "Some people don’t realize how truly special they are... 
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="block mt-4 text-accent"
              >
                but you are the rarest kind of special.
              </motion.span>"
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4.5 }}
              className="mt-12 flex justify-center"
            >
              <button 
                onClick={nextScene}
                className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <span>Ready?</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>
        </Scene>

        {/* === SCENE 5: ENVELOPE === */}
        <Scene isVisible={currentScene === 5}>
          <div className="flex flex-col items-center justify-center h-full">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Envelope 
                isOpen={false} 
                onOpen={() => {
                  // Optional: Trigger end celebration
                  setTimeout(() => {
                    confetti({
                      particleCount: 100,
                      spread: 70,
                      origin: { y: 0.6 },
                      colors: ['#FFC1CC', '#F5F5DC', '#D4AF37']
                    });
                  }, 500);
                }} 
              />
            </motion.div>
          </div>
        </Scene>

      </main>
      
      {/* Progress Indicator */}
      <div className="fixed bottom-8 left-0 right-0 flex justify-center gap-3 z-20">
        {[1, 2, 3, 4, 5].map((step) => (
          <div
            key={step}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              step === currentScene 
                ? "w-8 bg-foreground" 
                : step < currentScene 
                  ? "w-1.5 bg-foreground/30" 
                  : "w-1.5 bg-foreground/10"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

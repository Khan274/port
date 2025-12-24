import { useState, useRef, useEffect } from "react";
import { Music, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  // Using a royalty-free track URL or a placeholder
  const audioUrl = "https://cdn.pixabay.com/download/audio/2022/10/25/audio_924259b486.mp3?filename=piano-moment-11623.mp3"; 
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(audioUrl);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Audio play failed interaction needed", e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      onClick={togglePlay}
      className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 transition-all text-foreground/80 hover:text-foreground hover:scale-105 active:scale-95 shadow-lg"
    >
      {isPlaying ? <Music size={20} className="animate-pulse" /> : <VolumeX size={20} />}
    </motion.button>
  );
}

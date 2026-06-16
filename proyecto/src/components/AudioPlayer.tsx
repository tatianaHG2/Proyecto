import { useEffect, useRef, useState } from "react";

type AudioPlayerProps = {
  src?: string;
  label?: string;
};

const AudioPlayer = ({ src = "/Rebelde.mp3", label = "Música de fondo" }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [src]);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        console.warn("Error al reproducir audio:", error);
        setIsPlaying(false);
      });
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 rounded-full bg-black/70 p-2 shadow-[0_0_30px_rgba(255,0,0,0.25)] backdrop-blur-sm border border-rose-500/40">
      <button
        onClick={toggleMusic}
        className="text-white text-sm px-4 py-2 rounded-full bg-rose-500/70 hover:bg-rose-500 transition shadow-lg"
        aria-label={label}
        title={label}
      >
        {isPlaying ? "🔊 Música" : "🔇 Música"}
      </button>
    </div>
  );
};

export default AudioPlayer;

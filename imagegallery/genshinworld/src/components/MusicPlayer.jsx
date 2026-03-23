import React, { useEffect, useRef, useState } from 'react';
import { MAIN_THEME } from '../Data/songs';

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [error, setError] = useState(null);
  const [volume, setVolume] = useState(0.01); // Default volume

  // Initialize audio object once
  useEffect(() => {
    audioRef.current = new Audio(MAIN_THEME);
    audioRef.current.loop = true;
    audioRef.current.volume = volume;
    audioRef.current.playbackRate = 0.80; // Slow down a bit

    // Add error handling
    const handleError = (e) => {
        console.error("Audio error:", e);
        setError("Music file missing or format unsupported");
        setIsPlaying(false);
    };
    audioRef.current.addEventListener('error', handleError);

    // Attempt to handle autoplay policy
    const handleInteraction = () => {
        setHasInteracted(true);
        // Try to play if we haven't started yet
        if (audioRef.current && audioRef.current.paused) {
             audioRef.current.play().then(() => {
                 setIsPlaying(true);
                 setError(null);
             }).catch(e => {
                 console.log("Autoplay blocked or file issue:", e);
                 // Don't set error state for autoplay block, just don't play
             });
        }
        
        window.removeEventListener('click', handleInteraction);
        window.removeEventListener('keydown', handleInteraction);
    };

    window.addEventListener('click', handleInteraction);
    window.addEventListener('keydown', handleInteraction);

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('error', handleError);
        audioRef.current.pause();
        audioRef.current = null;
      }
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
  }, []); // Empty dependency array -> runs once on mount

  // Update volume when state changes
  useEffect(() => {
    if(audioRef.current) {
        audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
    } else {
        audioRef.current.play().catch(e => console.error(e));
        setIsPlaying(true);
        setHasInteracted(true);
    }
  };

  return (
    <div className="absolute bottom-6 left-6 z-50 flex items-center gap-3 animate-fade-in">
        {/* Simple playback control */}
        <button 
            onClick={togglePlay}
            className={`
                group flex items-center justify-center w-10 h-10 rounded-full 
                backdrop-blur-md border transition-all duration-300
                ${isPlaying 
                    ? 'bg-amber-500/20 border-amber-500/50 text-amber-100 shadow-[0_0_15px_rgba(245,158,11,0.3)]' 
                    : 'bg-black/40 border-white/10 text-white/50 hover:bg-black/60 hover:text-white hover:border-white/30'}
            `}
            title={isPlaying ? "Pause Theme" : "Play Theme"}
        >
            {error ? (
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            ) : isPlaying ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            )}
        </button>
        
        {/* Minimal visualizer / text */}
        <div className="flex flex-col">
            <span className={`text-[10px] uppercase tracking-widest font-bold ${error ? 'text-red-400' : isPlaying ? 'text-amber-200' : 'text-white/30'}`}>
                {error ? 'Missing File' : isPlaying ? 'Now Playing' : 'Music Paused'}
            </span>
            <div className={`h-0.5 w-16 mt-1 rounded-full overflow-hidden bg-white/10`}>
                <div className={`h-full ${error ? 'bg-red-500 w-full' : 'bg-amber-400'} transition-all duration-2000 ${isPlaying ? 'w-full animate-pulse' : error ? '' : 'w-0'}`} />
            </div>
        </div>
    </div>
  );
}

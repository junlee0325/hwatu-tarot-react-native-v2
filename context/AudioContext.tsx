import { useAudioPlayer } from "expo-audio";
import React, { createContext, useContext, useEffect, useRef } from "react";
import { useMute } from "./MuteContext";

interface AudioContextType {
  playSmack: () => void;
  playPlastic: () => void;
  playClick: () => void;
}

const AudioContext = createContext<AudioContextType>({
  playSmack: () => {},
  playPlastic: () => {},
  playClick: () => {},
});

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const { mute } = useMute();

  // --- Smack pool (card matched into box) ---
  const smack1 = useAudioPlayer(require("../assets/smack.mp3"));
  const smack2 = useAudioPlayer(require("../assets/smack.mp3"));

  // --- Plastic pool (card selected) ---
  const plastic1 = useAudioPlayer(require("../assets/plastic.mp3"));
  const plastic2 = useAudioPlayer(require("../assets/plastic.mp3"));

  // --- Click pool (draw button) ---
  const click1 = useAudioPlayer(require("../assets/click.mp3"));
  const click2 = useAudioPlayer(require("../assets/click.mp3"));

  // Ref so playFromPool always sees latest mute value without re-renders
  const muteRef = useRef(mute);
  useEffect(() => {
    muteRef.current = mute;
  }, [mute]);

  // Set volumes and pre-seek everything to 0 on mount.
  // Pre-seeking means play() fires instantly with no latency.
  useEffect(() => {
    smack1.volume = 0.6;
    smack2.volume = 0.6;
    plastic1.volume = 0.3;
    plastic2.volume = 0.3;
    click1.volume = 0.7;
    click2.volume = 0.7;

    [smack1, smack2, plastic1, plastic2, click1, click2].forEach((p) =>
      p.seekTo(0),
    );
  }, []);

  type Player = ReturnType<typeof useAudioPlayer>;

  const playFromPool = (pool: Player[]) => {
    if (muteRef.current) return;
    for (let i = 0; i < pool.length; i++) {
      const p = pool[i];
      if (!p.playing) {
        p.play();
        // Re-seek after a brief delay so it's ready for the next trigger
        setTimeout(() => p.seekTo(0), 50);
        return;
      }
    }
    // All players busy — drop the sound rather than queue/delay it
  };

  const playSmack = () => playFromPool([smack1, smack2]);
  const playPlastic = () => playFromPool([plastic1, plastic2]);
  const playClick = () => playFromPool([click1, click2]);

  return (
    <AudioContext.Provider value={{ playSmack, playPlastic, playClick }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);

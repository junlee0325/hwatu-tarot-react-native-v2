import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

const MuteContext = createContext<{
  mute: boolean;
  setMute: (value: boolean) => void;
}>({
  mute: false,
  setMute: () => {},
});

export const MuteProvider = ({ children }: { children: React.ReactNode }) => {
  const [mute, setMuteState] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("appMute").then((val) => {
      if (val === "true") setMuteState(true);
    });
  }, []);

  const setMute = (value: boolean) => {
    setMuteState(value);
    AsyncStorage.setItem("appMute", String(value));
  };

  return (
    <MuteContext.Provider value={{ mute, setMute }}>
      {children}
    </MuteContext.Provider>
  );
};

export const useMute = () => useContext(MuteContext);

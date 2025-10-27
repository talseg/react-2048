import { createContext, useContext, useState } from "react";

interface SettingsContextType {
  allow4: boolean;
  setAllow4: React.Dispatch<React.SetStateAction<boolean>>;
  allowTileChange: boolean;
  setAllowTileChange: React.Dispatch<React.SetStateAction<boolean>>;
}

const SettingsContext = createContext<SettingsContextType | null>(null);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [allow4, setAllow4] = useState(true);
  const [allowTileChange, setAllowTileChange] = useState(false);

  return (
    <SettingsContext.Provider value={{ allow4, setAllow4, allowTileChange, setAllowTileChange }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used inside SettingsProvider");
  return ctx;
};
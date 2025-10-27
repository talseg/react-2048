import React from "react";
import { SettingsProvider } from "../settings/SettingsContext";
import { Game } from "./Game";

export const GameWithSettings: React.FC = () => {
  return (
    <SettingsProvider>
      <Game />
    </SettingsProvider>
  );
};
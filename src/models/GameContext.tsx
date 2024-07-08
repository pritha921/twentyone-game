import React, { createContext, useState, ReactNode, useContext } from "react";

interface User {
  name: string;
  status?: string;
}

interface GameData {
  users: User[];
  winningNumber: number;
  maxInputPerTurn: number;
  setGameData: (data: GameData) => void;
}

const GameContext = createContext<GameData | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [gameData, setGameData] = useState<GameData>({
    users: [],
    winningNumber: 0,
    maxInputPerTurn: 0,
    setGameData: () => {},
  });

  return (
    <GameContext.Provider value={{ ...gameData, setGameData }}>
      {children}
    </GameContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};

import React, { createContext, useState, ReactNode, useContext } from "react";

interface User {
  name: string;
  status?: string;
}

interface HistoryEntry {
  player: string;
  inputs: number[];
}

interface GameContextType {
  users: User[];
  winningNumber: number;
  maxInputPerTurn: number;
  setGameData: (data: Partial<GameContextType>) => void;
  history: HistoryEntry[];
  addHistory: (player: string, inputs: number[]) => void;
  clearHistory: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [gameData, setGameData] = useState<GameContextType>({
    users: [],
    winningNumber: 0,
    maxInputPerTurn: 0,
    setGameData: (data: Partial<GameContextType>) =>
      setGameData((prev) => ({ ...prev, ...data })),
    history: [],
    addHistory: (player: string, inputs: number[]) =>
      setGameData((prev) => ({
        ...prev,
        history: [...prev.history, { player, inputs }],
      })),
      clearHistory: () => setGameData((prev) => ({ ...prev, history: [] })),
  });

  return (
    <GameContext.Provider value={gameData}>
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



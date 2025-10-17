
import { EventEmitter } from "expo-modules-core";

type StreakEvents = {
  streakAtualizada: () => void;
};
// instância global de EventEmitter
export const streakEventEmitter = new EventEmitter<StreakEvents>();

import AsyncStorage from "@react-native-async-storage/async-storage";

import { initialLocalPassState, normalizeLocalPassState, storageKeys, type LocalPassState } from "./localpass-reducer";

export type LoadLocalPassStateResult = {
  state: LocalPassState;
  error?: string;
};

export type SaveLocalPassStateResult = {
  ok: boolean;
  error?: string;
};

export async function loadLocalPassState(): Promise<LoadLocalPassStateResult> {
  try {
    const values = await AsyncStorage.multiGet(Object.values(storageKeys));
    const stored = Object.fromEntries(values);

    return {
      state: normalizeLocalPassState({
        savedDestinations: parseStoredValue(stored[storageKeys.savedDestinations], []),
        checkIns: parseStoredValue(stored[storageKeys.checkIns], []),
        points: parseStoredValue(stored[storageKeys.points], 0),
        unlockedStoryIds: parseStoredValue(stored[storageKeys.unlockedStories], []),
        badges: parseStoredValue(stored[storageKeys.badges], initialLocalPassState.badges),
        coupons: parseStoredValue(stored[storageKeys.coupons], initialLocalPassState.coupons),
        requests: parseStoredValue(stored[storageKeys.requests], []),
        activity: parseStoredValue(stored[storageKeys.activity], [])
      })
    };
  } catch (error) {
    return { state: initialLocalPassState, error: getErrorMessage(error) };
  }
}

export async function saveLocalPassState(state: LocalPassState): Promise<SaveLocalPassStateResult> {
  try {
    await AsyncStorage.multiSet([
      [storageKeys.savedDestinations, JSON.stringify(state.savedDestinations)],
      [storageKeys.checkIns, JSON.stringify(state.checkIns)],
      [storageKeys.points, JSON.stringify(state.points)],
      [storageKeys.unlockedStories, JSON.stringify(state.unlockedStoryIds)],
      [storageKeys.badges, JSON.stringify(state.badges)],
      [storageKeys.coupons, JSON.stringify(state.coupons)],
      [storageKeys.requests, JSON.stringify(state.requests)],
      [storageKeys.activity, JSON.stringify(state.activity)]
    ]);

    return { ok: true };
  } catch (error) {
    return { ok: false, error: getErrorMessage(error) };
  }
}

function parseStoredValue<T>(value: string | null | undefined, fallback: T): T {
  if (!value) {
    return fallback;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "LocalPass storage is unavailable.";
}

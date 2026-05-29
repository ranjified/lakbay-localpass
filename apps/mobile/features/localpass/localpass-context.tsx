import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState } from "react";
import type { PropsWithChildren } from "react";
import type { LocalPassCheckIn, ServiceRequest } from "@lakbay/shared";

import { loadLocalPassState, saveLocalPassState } from "./storage";
import { initialLocalPassState, localPassReducer, type LocalPassState } from "./localpass-reducer";

type LocalPassContextValue = {
  state: LocalPassState;
  storageError?: string;
  saveDestination: (destinationId: string) => void;
  removeDestination: (destinationId: string) => void;
  addCheckIn: (checkIn: LocalPassCheckIn) => void;
  createRequest: (request: ServiceRequest) => void;
  claimCoupon: (couponId: string) => void;
};

const LocalPassContext = createContext<LocalPassContextValue | undefined>(undefined);

export function LocalPassProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(localPassReducer, initialLocalPassState);
  const [storageError, setStorageError] = useState<string | undefined>();
  const hydrated = useRef(false);

  useEffect(() => {
    let active = true;

    async function hydrate() {
      const result = await loadLocalPassState();
      if (!active) {
        return;
      }

      dispatch({ type: "hydrate", state: result.state });
      setStorageError(result.error);
      hydrated.current = true;
    }

    void hydrate();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!hydrated.current) {
      return;
    }

    let active = true;

    async function persist() {
      const result = await saveLocalPassState(state);
      if (active) {
        setStorageError(result.error);
      }
    }

    void persist();

    return () => {
      active = false;
    };
  }, [state]);

  const saveDestination = useCallback((destinationId: string) => {
    dispatch({ type: "saveDestination", destinationId, at: new Date().toISOString() });
  }, []);

  const removeDestination = useCallback((destinationId: string) => {
    dispatch({ type: "removeDestination", destinationId });
  }, []);

  const addCheckIn = useCallback((checkIn: LocalPassCheckIn) => {
    dispatch({ type: "addCheckIn", checkIn });
  }, []);

  const createRequest = useCallback((request: ServiceRequest) => {
    dispatch({ type: "createRequest", request });
  }, []);

  const claimCoupon = useCallback((couponId: string) => {
    dispatch({ type: "claimCoupon", couponId, at: new Date().toISOString() });
  }, []);

  const value = useMemo(
    () => ({
      state,
      storageError,
      saveDestination,
      removeDestination,
      addCheckIn,
      createRequest,
      claimCoupon
    }),
    [addCheckIn, claimCoupon, createRequest, removeDestination, saveDestination, state, storageError]
  );

  return <LocalPassContext.Provider value={value}>{children}</LocalPassContext.Provider>;
}

export function useLocalPass() {
  const context = useContext(LocalPassContext);
  if (!context) {
    throw new Error("useLocalPass must be used within LocalPassProvider.");
  }

  return context;
}

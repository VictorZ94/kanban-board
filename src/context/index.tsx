"use client"
import React, { createContext, useContext, useEffect, useState } from "react";
import { getColumnsByUserId, getTasks } from "@/utils/queries";
import { useSession } from "next-auth/react";

const AppContext = createContext<any>({})

export function AppWrapper({ children } : { children: React.ReactNode }) {
  const [state, setState] = useState<any>({});
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      const fetchInitialData = async () => {
        const columns = await getColumnsByUserId(session?.user?.userId);
        const columnsOrder = Object.keys(columns);
        const tasks = await getTasks();
        setState({ ...state, columns, tasks, columnsOrder });
      }
      fetchInitialData();
    }
  }, [session?.user])

  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext);
}

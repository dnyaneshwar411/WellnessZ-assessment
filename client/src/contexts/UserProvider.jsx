"use client";

import { fetchData } from "@/utils/server";
import { createContext, useContext, useEffect, useReducer, useState } from "react";

const UserContext = createContext()

export function UserProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  const onChangeUser = (val) => setUser(val)

  useEffect(function () {
    ; (async function () {
      try {
        const response = await fetchData("user/profile");
        if (response.success) {
          setUser(response.payload)
          setIsLoggedIn(true)
        };
        console.log(response)
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, [])

  return <UserContext.Provider value={{ isLoggedIn, user,onChangeUser }}>
    {children}
  </UserContext.Provider>
}

export default function useUserContext() {
  const context = useContext(UserContext);
  return context;
}
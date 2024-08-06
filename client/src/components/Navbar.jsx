"use client"

import useUserContext from "@/contexts/UserProvider"
import { postData } from "@/utils/server";
import Link from "next/link";

export default function Navbar() {
  const { isLoggedIn, onChangeUser } = useUserContext();

  async function logout() {
    try {
      const response = await postData("user/logout")
      if (response.success) onChangeUser(null)
    } catch (error) {
      console.log(error)
    }
  }

  return <nav className="px-4 py-4 lg:px-8 flex items-center justify-between">
    <h2>WellnessZ</h2>
    {isLoggedIn
      ? <div>
        <Link href="/profile">Profile</Link>
        <button onClick={logout} className="ml-4">Logout</button>
      </div>
      : <div>
        <Link href="/login">Login</Link>
        <Link href="/register" className="ml-4">Register</Link>
      </div>
    }
  </nav>
};

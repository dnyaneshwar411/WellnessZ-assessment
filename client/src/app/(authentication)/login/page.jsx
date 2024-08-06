"use client";

import useUserContext from "@/contexts/UserProvider";
import { postData } from "@/utils/server";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const { isLoggedIn, onChangeUser } = useUserContext();
  const router = useRouter()

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const data = {
        email: e.currentTarget.email.value,
        password: e.currentTarget.password.value,
      }
      console.log(data)
      const response = await postData("user/login", data);
      if (response.success) onChangeUser(response.payload)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(function () {
    if (isLoggedIn) router.push("/")
  }, [isLoggedIn, router])

  return <div className="flex items-center justify-center h-screen">
    <form onSubmit={handleSubmit}>
      <h2 className="mb-4">Login </h2>
      <div>
        <p>Username - dnyaenshwar@gmail.com</p>
        <br />
        <p>password - Admin#123</p>
      </div>
      <input className="mb-4" type="text" name="email" placeholder="Username" />
      <input className="mb-4" type="password" name="password" placeholder="Password" />
      <button>submit</button>
    </form>
  </div>
};
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
        name: e.currentTarget.name.value,
        username: e.currentTarget.username.value,
        email: e.currentTarget.email.value,
        password: e.currentTarget.password.value,
      }
      const response = await postData("user/register", data);
      console.log(response)
      if (response.success) onChangeUser(response.payload)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(function () {
    if (isLoggedIn) router.push("/");
  }, [isLoggedIn, router]);


  return <div className="flex items-center justify-center h-screen">
    <form onSubmit={handleSubmit}>
      <h2 className="mb-4">Register</h2>
      <input className="mb-4" placeholder="name" type="text" name="name" />
      <input className="mb-4" placeholder="username" type="text" name="username" />
      <input className="mb-4" placeholder="email" type="email" name="email" />
      <input className="mb-4" placeholder="password" type="password" name="password" />
      <button>submit</button>
    </form>
  </div>
};
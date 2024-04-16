"use client"
import { Button, Label, TextInput } from "flowbite-react";
import { signIn } from "next-auth/react";
import React, { use, useState } from "react";
import { IoEnter } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const { email, password } = formData;

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false
    })

    if (res?.error) {
      alert(res.error)
    } else {
      router.push("/")
    }
  };

  return (
    <div className="mt-14 mx-auto max-w-md mb-5 text-white">
      <h1 className="font-bold text-5xl flex justify-center">
        <IoEnter className="mr-3" />
        Sing in
      </h1>
      <p className="my-10 text-center text-lg">Sign into your account</p>
      <form className="flex max-w-md flex-col gap-4" onSubmit={handleOnSubmit}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Your email" />
          </div>
          <TextInput
            id="email1"
            type="email"
            placeholder="email@kanbanapp.com"
            name="email"
            value={email}
            autoComplete="off"
            onChange={handleOnChange}
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Your password" />
          </div>
          <TextInput
            id="password1"
            type="password"
            name="password"
            placeholder="*************"
            value={password}
            onChange={handleOnChange}
            required
          />
        </div>
        <Button type="submit" className="my-5">
          Login
        </Button>
      </form>
      <p className="mt-3 text-sm">
        Don't have an account{" "}
        <Link href={"/auth/register"} className="text-cyan-500">
          Register
        </Link>
      </p>
    </div>
  )
}

export default LoginPage;

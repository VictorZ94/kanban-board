"use client"
import { Button, Label, TextInput } from "flowbite-react";
import { signIn } from "next-auth/react";
import React, { use, useState } from "react";
import { IoEnter } from "react-icons/io5";
import { useRouter } from "next/navigation";

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

    console.log(res);
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
      {/* <p className="mt-3 text-sm">
        Don't have an account{" "}
        <Link to={"/signup"} className="text-cyan-500">
          Sign up
        </Link>
      </p>
      <p className="mt-3 text-sm">
        Forgot your password{" "}
        <Link to={"/reset-password"} className="text-cyan-500">
          Reset password
        </Link>
      </p> */}
      {/* {isError && (
        <div
          className="flex items-center p-4 my-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
          role="alert"
        >
          <svg
            className="flex-shrink-0 inline w-4 h-4 me-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <div>
            <span className="font-medium">Danger alert!</span> <br></br>
            {message}
          </div>
        </div>
      )} */}
    </div>
  )
}

export default LoginPage;

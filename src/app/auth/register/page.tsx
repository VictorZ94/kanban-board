"use client"
// @packages
import { useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { FaUser } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";

const RegisterPage = () => {
  const [isErrorPassword, setIsErrorPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    re_password: "",
  });
  const router = useRouter();

  const { name, email, password, re_password } = formData;

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsErrorPassword(false);

    if (password !== re_password) {
      setIsErrorPassword(true);
      return;
    }
    try {
      const res = await fetch("/api/auth/register/", {
        method: "POST",
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        }),
        headers: {
          "content-type": "application/json"
        }
      })
  
      // const resJSON = await res.json();
      // console.log(resJSON);
      if (res.ok) {
        router.push("/auth/login")
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="px-4 mt-14 mx-auto max-w-md mb-5 text-white">
      <h1 className="font-bold text-5xl flex-row md:flex md:justify-center">
        <FaUser className="mr-3" />
        Sing Up
      </h1>
      <p className="my-2 text-center text-lg text-white">Please create your account</p>
      <form className="flex max-w-md flex-col gap-4" onSubmit={handleOnSubmit}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name" value="Name" />
          </div>
          <TextInput
            id="name"
            type="text"
            placeholder="John Doe"
            name="name"
            value={name}
            onChange={handleOnChange}
            required
            autoComplete="off"
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Email" />
          </div>
          <TextInput
            id="email1"
            type="email"
            placeholder="email@appsystem.com"
            name="email"
            value={email}
            onChange={handleOnChange}
            autoComplete="off"
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Password" />
          </div>
          <TextInput
            id="password"
            type="password"
            name="password"
            placeholder="*************"
            value={password}
            onChange={handleOnChange}
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Confirm password" />
          </div>
          <TextInput
            id="password1"
            type="password"
            name="re_password"
            placeholder="*************"
            value={re_password}
            onChange={handleOnChange}
            required
          />
        </div>
        {isErrorPassword && (
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
              Password don't match
            </div>
          </div>
        )}
        <Button type="submit" className="my-5">
          Register
        </Button>
      </form>
      <p className="mt-3 text-sm">
        Already have an account?{" "}
        <Link href={"/auth/login"} className="text-cyan-500">
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;

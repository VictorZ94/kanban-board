import { Button } from "flowbite-react";
import { signOut } from "next-auth/react";

interface Props {
  name: string | null | undefined
}

const Navbar: React.FC<Props> = ({ name }) => {

  return (
    <nav className="bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <h1 className="bg-clip-text hero-title bg-gradient-to-b from-white to-white/40 text-transparent border-none">
          Kanban board app
        </h1>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <Button onClick={() => signOut()}>Logout</Button>
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
          <div>
            <span className="block py-2 px-3 rounded text-white bg-slate-900 font-bold">Welcome: {name}</span>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;

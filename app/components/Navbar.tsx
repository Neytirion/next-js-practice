import React from 'react'
import Link from "next/link";
import {auth, signOut, signIn} from "@/auth";

const Navbar = async () => {
  const sessions = await auth()
  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex items-center justify-between">
        <Link href="/">
          <img
            src="/logo.png"
            alt="logo"
            width={144}
            height={30}
          />
        </Link>
        <div className="flex items-center gap-5 text-black">
          {sessions && sessions?.user ? (
            <>
              <Link href="/startup/create">
                <span>Create</span>
              </Link>
              <form action={async () => {
                "use server";
                await signOut({redirectTo:"/"})
              }}>
                <button type="submit">Logout</button>
              </form>
              <Link href={`/user/${sessions?.id}`}>

              <span>{sessions?.user?.name}</span>
              </Link>
            </>
          ) : (
            <form action={async () => {
                "use server";
                await signIn(`github`)
              }}>
              <button type="submit">
                Login
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  )
}
export default Navbar

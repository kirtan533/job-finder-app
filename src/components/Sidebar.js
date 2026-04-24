"use client";

import { auth } from "@/firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

export default function Sidebar({ isOpen, setIsOpen }) {
  const [user, setUser] = useState(null);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;

      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
    } else {
      const scrollY = document.body.style.top;

      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";

      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }
  }, [isOpen]);

  const logout = async () => {
    await signOut(auth);
    setIsOpen(false);
    router.push("/login");
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-black text-white p-6 flex flex-col
  overflow-y-auto
  transform transition-transform duration-300 z-50
  ${isOpen ? "translate-x-0" : "-translate-x-full"}
  md:translate-x-0`}
      >
        <h1 className="text-2xl font-bold mb-8">🚀 JobFinder</h1>

        <nav className="flex flex-col gap-3 transition">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="hover:bg-blue-400 transition ease-in rounded p-3"
          >
            <span
              className={`${pathname === "/" ? "text-yellow-400" : "text-white"} flex gap-3`}
            >
              <FaHome size={25} />
              Home
            </span>
          </Link>
          <Link
            href="/jobs"
            onClick={() => setIsOpen(false)}
            className="hover:bg-blue-400 transition ease-in rounded p-3"
          >
            <span
              className={`${pathname === "/jobs" ? "text-yellow-400" : "text-white"} flex gap-3`}
            >
              <FaShoppingBag size={25} />
              Jobs
            </span>
          </Link>
          <Link
            href="/saved"
            onClick={() => setIsOpen(false)}
            className="hover:bg-blue-400 transition ease-in rounded p-3"
          >
            <span
              className={`${pathname === "/saved" ? "text-yellow-400" : "text-white"} flex gap-3`}
            >
              <FaRegStar size={25} />
              Saved
            </span>
          </Link>
        </nav>

        <div className="mt-auto">
          {user ? (
            <>
              <p className="text-sm text-gray-400 mb-2">{user?.email}</p>
              <button
                onClick={logout}
                className="w-full bg-gray-800 py-2 rounded cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" onClick={() => setIsOpen(false)}>
              <button className="w-full bg-white text-black py-2 rounded cursor-pointer">
                Login
              </button>
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}

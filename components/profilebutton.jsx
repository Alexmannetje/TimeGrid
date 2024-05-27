"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const icons = {
  edit: (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 13V16H7L16 7L13 4L4 13Z" />
    </svg>
  ),
  duplicate: (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 4H12V12H4V4ZM8 8H16V16H8V8Z" />
    </svg>
  ),
  archive: (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="8" width="10" height="8" />
      <rect x="4" y="4" width="12" height="4" />
      <path d="M8 12H12" />
    </svg>
  ),
  move: (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 4H16V10M16 4L8 12M8 6H4V16H14V12" />
    </svg>
  ),
  delete: (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="6" width="10" height="10" />
      <path d="M3 6H17M8 6V4H12V6" />
    </svg>
  ),
};

export default function ProfileButton({ width = "40px", height = "40px" }) {
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const currentMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(currentMode);
    document.documentElement.classList.toggle("dark", currentMode);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
    document.documentElement.classList.toggle("dark", newMode);
  };

  if (!user) return null;

  const menuItems = [
    { name: "Toggle Dark Mode", onClick: toggleDarkMode },
    { name: "Sign out", onClick: () => signOut(() => router.push("/")) },
  ];

  return (
    <div className="text-right">
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button>
          <img
            className="rounded-full"
            src={user.imageUrl || null}
            alt="user photo"
            style={{ width, height }}
          />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            {menuItems.map((item, index) => (
              <div key={index} className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-violet-500 text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      onClick={item.onClick}
                    >
                      {item.name}
                    </button>
                  )}
                </Menu.Item>
              </div>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

export function Icon({ type, active }) {
  const icon = icons[type];
  const color = active ? "#8B5CF6" : "#EDE9FE";
  const strokeColor = active ? "#C4B5FD" : "#A78BFA";

  return (
    <svg
      viewBox="0 0 20 20"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      stroke={strokeColor}
      strokeWidth="2"
    >
      {icon.props.children}
    </svg>
  );
}

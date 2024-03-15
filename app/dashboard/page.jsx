"use client";

import { Card, Icon } from "@/components/card";
import { PfCard } from "@/components/PfCard";
import NavBar from "@/components/navbar";
import Modal from "@/components/modal";
import { useClerk, useUser } from "@clerk/nextjs";
import { Fragment, useState } from "react";

export default function Home() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  return (
    user && (
      <div>
        <NavBar />
        <div className="container mx-auto flex justify-between">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 mt-16 flex-1">
            <a className="h-40" href="/grid">
              <Card text="The Grid" />
            </a>
            <button className="h-40" onClick={toggleModal}>
              <Card text="New Activity" />
              <Modal isVisible={showModal} onClose={() => setShowModal(false)} />
            </button>

            <div className="text-center">
              <div className="text-5xl font-extrabold text-blue-800 pr-32">
                Welcome
              </div>
              <div className="text-5xl font-extrabold text-gray-700">
                {user.firstName}
              </div>
              <div className="text-5xl font-extrabold text-gray-700 pl-32">
                {user.lastName}
              </div>
            </div>
            {/* <div>
               <article className="flex items-center gap-4 h-32 rounded-lg p-6 sm:justify-between">
                <div></div>

                <div>
                  <p className="text-2xl font-medium text-center text-gray-900">
                    17
                  </p>

                  <p className="text-sm text-gray-500">Gewerkte uren</p>
                </div>
            </div> */}

            <a className="h-40" href="/profile">
              <PfCard text="Profile" />
            </a>
            <div className="h-40">
              <Card text="settings" />
            </div>
          </div>
        </div>

        <footer className="bg-gray-100 rounded-lg shadow-md m-12 dark:bg-gray-800 max-w-screen-2xl mx-auto">
          <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              <a href="/logo" className="hover:underline hover:text-blue-800">
                TimeGrid™
              </a>
            </span>
            <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
              <li>
                <button
                  onClick={() => signOut(() => router.push("/"))}
                  className="hover:text-red-600 hover:underline"
                >
                  Sign out
                </button>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    )
  );
}

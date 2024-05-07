"use client"

import { Card, Icon } from "@/components/card";
import { PfCard } from "@/components/pfcard";
import NavBar from "@/components/navbar";
import { useClerk, useUser } from "@clerk/nextjs";
import { Fragment, useState } from "react";


export default function Home() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [color, setColor] = useState("");
  const [description, setDescription] = useState("");
  const [nameError, setNameError] = useState(false);
  const [timeError, setTimeError] = useState(false);
  const [colorError, setColorError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
    setNameError(false);
    setTimeError(false);
    setColorError(false);
    setDescriptionError(false);
  };

  const handleAddActivity = () => {
    let isValid = true;
    if (name.trim() === "") {
      setNameError(true);
      isValid = false;
    }
    if (time.trim() === "") {
      setTimeError(true);
      isValid = false;
    }
    if (color.trim() === "") {
      setColorError(true);
      isValid = false;
    }
    if (description.trim() === "") {
      setDescriptionError(true);
      isValid = false;
    }
    if (isValid) {
      console.log("Name:", name);
      console.log("Time:", time);
      console.log("Color:", color);
      console.log("Description:", description);
      toggleModal();
    }
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

        {
          showModal && (
            <div className='fixed inset-0 z-50 overflow-y-auto' id="wrapper">
              <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
                <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' aria-hidden="true"></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"></span>
                <div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full modal' style={{ zIndex: 9999 }}>
                  <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Create New Activity
                      </h3>
                      <button onClick={toggleModal} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white close-button" data-modal-toggle="crud-modal" >
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span className="sr-only">Close modal</span>
                      </button>
                    </div>
                    <form className="p-4 md:p-5">
                      <div className="grid gap-4 mb-4 grid-cols-2">
                        <div className="col-span-2">
                          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                          <input
                            type="text"
                            id="name"
                            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 ${nameError ? 'border-red-500' : ''}`}
                            placeholder="Enter activity name"
                            value={name}
                            onChange={(e) => {
                              setName(e.target.value);
                              setNameError(false);
                            }}
                          />
                          {nameError && <p className="text-red-500 text-sm">Name is required</p>}
                        </div>
                        <div className="col-span-2 sm:col-span-2">
                          <label htmlFor="time" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Time</label>
                          <input
                            type="time"
                            id="time"
                            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 ${timeError ? 'border-red-500' : ''}`}
                            placeholder="Select time"
                            value={time}
                            onChange={(e) => {
                              setTime(e.target.value);
                              setTimeError(false);
                            }}
                          />
                          {timeError && <p className="text-red-500 text-sm">Time is required</p>}
                        </div>
                        <div className="col-span-1 sm:col-span-1">
                          <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Color</label>
                          <div className="flex items-center space-x-2">
                            <button
                              type="button"
                              id="red"
                              className={`w-6 h-6 border border-gray-300 rounded-full focus:outline-none ${color === 'red' ? 'ring ring-red-500' : ''}`}
                              style={{ backgroundColor: "red" }}
                              onClick={() => {
                                setColor('red');
                                setColorError(false); // Clear error when clicking
                              }}
                            ></button>
                            <button
                              type="button"
                              id="green"
                              className={`w-6 h-6 border border-gray-300 rounded-full focus:outline-none ${color === 'green' ? 'ring ring-green-500' : ''}`}
                              style={{ backgroundColor: "green" }}
                              onClick={() => {
                                setColor('green');
                                setColorError(false); // Clear error when clicking
                              }}
                            ></button>
                            <button
                              type="button"
                              id="blue"
                              className={`w-6 h-6 border border-gray-300 rounded-full focus:outline-none ${color === 'blue' ? 'ring ring-blue-500' : ''}`}
                              style={{ backgroundColor: "blue" }}
                              onClick={() => {
                                setColor('blue');
                                setColorError(false); // Clear error when clicking
                              }}
                            ></button>
                          </div>
                          {colorError && <p className="text-red-500 text-sm">Color is required</p>}
                        </div>
                        <div className="col-span-2">
                          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                          <textarea
                            id="description"
                            rows="4"
                            className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${descriptionError ? 'border-red-500' : ''}`}
                            placeholder="Write activity description here"
                            value={description}
                            onChange={(e) => {
                              setDescription(e.target.value);
                              setDescriptionError(false); // Clear error when typing
                            }}
                          ></textarea>
                          {descriptionError && <p className="text-red-500 text-sm">Description is required</p>}
                        </div>
                      </div>
                      <button
                        type="button"
                        className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={handleAddActivity}
                      >
                        <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                        Add new activity
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      </div>
    )
  );
}

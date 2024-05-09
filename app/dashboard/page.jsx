"use client"

import { Card, Icon } from "@/components/card";
import { PfCard } from "@/components/pfcard";
import NavBar from "@/components/navbar";
import { useClerk, useUser } from "@clerk/nextjs";
import { Fragment, useState, useEffect } from "react";
import { insert_task, getTasksByUserEmail } from "./actions";
import { toast } from "react-hot-toast";
import prisma from "@/utils/db";


export default function Home() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [taskname, setTaskname] = useState("");
  const [taskdatetime, setTaskdatetime] = useState("");
  const [taskcolor, setTaskcolor] = useState("");
  const [taskdescription, setTaskdescription] = useState("");
  const [tasknameError, setTasknameError] = useState(false);
  const [taskdatetimeError, setTaskdatetimeError] = useState(false);
  const [taskcolorError, setTaskcolorError] = useState(false);

  useEffect(() => {
    if (isLoaded && user) {
      fetchTasks();
    }
  }, [isLoaded, user]);

  const fetchTasks = async () => {
    try {
      const userTasks = await getTasksByUserEmail(user.primaryEmailAddress.emailAddress);
      setTasks(userTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };


  const toggleModal = () => {
    setShowModal(!showModal);
    setTasknameError(false);
    setTaskdatetimeError(false);
    setTaskcolorError(false);
  };

  const handleAddTask = async () => {
    let isValid = true;
    if (taskname.trim() === "") {
      setTasknameError(true);
      isValid = false;
    }
    if (taskdatetime.trim() === "") {
      setTaskdatetimeError(true);
      isValid = false;
    }
    if (taskcolor.trim() === "") {
      setTaskcolorError(true);
      isValid = false;
    }
    if (isValid) {
      console.log("Taskemail:", user.primaryEmailAddress.emailAddress);
      console.log("Taskname:", taskname);
      console.log("Taskdatetime:", taskdatetime);
      console.log("Taskcolor:", taskcolor);
      console.log("Taskdescription:", taskdescription);

      const res = await insert_task(user.primaryEmailAddress.emailAddress, taskname, new Date(taskdatetime), taskcolor, taskdescription)

      if (res) {
        toast.success("Task created successfully!")
      }

      toggleModal();
    }
  };

  return (
    isLoaded && user && (
      <div>
        <NavBar />
        <div className="container mx-auto flex justify-between">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 mt-16 flex-1">
            <a className="h-40" href="/grid">
              <Card text="The Grid" />
            </a>
            <button className="h-40" onClick={toggleModal}>
              <Card text="New Task" />
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
              <Card text="Profile" />
            </a>
            <div className="h-40">
              <Card text="settings" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 mx-20">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`p-4 border-4 rounded-md shadow-sm border-${task.taskcolor}-200`}
            >
              <h2 className="text-lg font-bold">{task.taskname}</h2>
              <p>{task.task_datetime}</p>
              <p>{task.taskdescription}</p>
              {console.log("Task color:", task.taskcolor)}
            </div>
          ))}
        </div>

        <footer className="bg-gray-100 rounded-lg shadow-md m-20 dark:bg-gray-800  my-20">
          <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              <a href="/logo" className="hover:underline hover:text-blue-800">
                TimeGrid™
              </a>
            </span>
            <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
              <li>
                <button
                  onClick={() => signOut()}
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
                        Create New Task
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
                          <label htmlFor="taskname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Task name</label>
                          <input
                            type="text"
                            id="taskname"
                            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 ${tasknameError ? 'border-red-500' : ''}`}
                            placeholder="Enter task name"
                            value={taskname}
                            onChange={(e) => {
                              setTaskname(e.target.value);
                              setTasknameError(false);
                            }}
                          />
                          {tasknameError && <p className="text-red-500 text-sm">Task name is required</p>}
                        </div>
                        <div className="col-span-2 sm:col-span-2">
                          <label htmlFor="taskdatetime" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Task date and time</label>
                          <input
                            type="datetime-local"
                            id="taskdatetime"
                            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 ${taskdatetimeError ? 'border-red-500' : ''}`}
                            placeholder="Select task date and time"
                            value={taskdatetime}
                            onChange={(e) => {
                              setTaskdatetime(e.target.value);
                              setTaskdatetimeError(false);
                            }}
                          />
                          {taskdatetimeError && <p className="text-red-500 text-sm">Task date and time are required</p>}
                        </div>

                        <div className="col-span-1 sm:col-span-1">
                          <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Task color</label>
                          <div className="flex items-center space-x-2">
                            <button
                              type="button"
                              id="red"
                              className={`w-6 h-6 border border-gray-300 rounded-full focus:outline-none ${taskcolor === 'red' ? 'ring ring-red-500' : ''}`}
                              style={{ backgroundColor: "red" }}
                              onClick={() => {
                                setTaskcolor('red');
                                setTaskcolorError(false);
                              }}
                            ></button>
                            <button
                              type="button"
                              id="green"
                              className={`w-6 h-6 border border-gray-300 rounded-full focus:outline-none ${taskcolor === 'green' ? 'ring ring-green-500' : ''}`}
                              style={{ backgroundColor: "green" }}
                              onClick={() => {
                                setTaskcolor('green');
                                setTaskcolorError(false);
                              }}
                            ></button>
                            <button
                              type="button"
                              id="blue"
                              className={`w-6 h-6 border border-gray-300 rounded-full focus:outline-none ${taskcolor === 'blue' ? 'ring ring-blue-500' : ''}`}
                              style={{ backgroundColor: "blue" }}
                              onClick={() => {
                                setTaskcolor('blue');
                                setTaskcolorError(false);
                              }}
                            ></button>
                          </div>
                          {taskcolorError && <p className="text-red-500 text-sm">Task color is required</p>}
                        </div>
                        <div className="col-span-2">
                          <label htmlFor="taskdescription" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Task description</label>
                          <textarea
                            id="taskdescription"
                            rows="4"
                            className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                            placeholder="Write task description here"
                            value={taskdescription}
                            onChange={(e) => {
                              setTaskdescription(e.target.value);
                            }}
                          ></textarea>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={handleAddTask}
                      >
                        <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                        Add new task
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      </div>
    ))
}
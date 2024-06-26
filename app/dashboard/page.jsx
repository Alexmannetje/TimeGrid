"use client";

import { Card, Icon } from "@/components/card";
import { useClerk, useUser } from "@clerk/nextjs";
import { Fragment, useState, useEffect } from "react";
import {
  insert_task,
  getTasksByUserEmail,
  updateTask,
  deleteTask,
} from "./actions";
import { toast } from "react-hot-toast";
import prisma from "@/utils/db";
import ProfileButton from "@/components/profilebutton";

export default function Home() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [taskname, setTaskname] = useState("");
  const [taskdatetime, setTaskdatetime] = useState("");
  const [taskcolor, setTaskcolor] = useState("");
  const [taskdescription, setTaskdescription] = useState("");
  const [tasknameError, setTasknameError] = useState(false);
  const [taskdatetimeError, setTaskdatetimeError] = useState(false);
  const [taskcolorError, setTaskcolorError] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [editTaskId, setEditTaskId] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskDetailsModal, setShowTaskDetailsModal] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (isLoaded && user) {
      fetchTasks();
    }
  }, [isLoaded, user]);

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

  const fetchTasks = async () => {
    try {
      const userTasks = await getTasksByUserEmail(
        user.primaryEmailAddress.emailAddress
      );
      setTasks(userTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const TaskModal = ({ task, onClose }) => (
    <div className="fixed inset-0 z-50 overflow-y-auto flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-lg max-w-3xl">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          {task.taskname}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {task.taskdescription}
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          {new Date(task.taskdatetime).toLocaleString()}
        </p>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );

  const toggleModal = () => {
    setShowModal(!showModal);
    setTasknameError(false);
    setTaskdatetimeError(false);
    setTaskcolorError(false);
  };

  const toggleEditModal = () => {
    setShowEditModal(!showEditModal);
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
      const res = await insert_task(
        user.primaryEmailAddress.emailAddress,
        taskname,
        new Date(taskdatetime),
        taskcolor,
        taskdescription
      );

      if (res) {
        toast.success("Task created successfully!");
        fetchTasks();
      }

      toggleModal();
    }
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setShowTaskDetailsModal(true);
  };

  const handleCloseTaskDetailsModal = () => {
    setShowTaskDetailsModal(false);
    setSelectedTask(null);
  };

  const handleEditTask = (task) => {
    setEditTaskId(task.id);
    setTaskname(task.taskname);
    setTaskdatetime(new Date(task.taskdatetime).toISOString().slice(0, 16)); // Format for datetime-local input
    setTaskcolor(task.taskcolor);
    setTaskdescription(task.taskdescription);
    setShowEditModal(true);
    setDropdownOpen(null);
  };

  const handleSaveTask = async () => {
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
      try {
        await updateTask(editTaskId, {
          taskname,
          taskdatetime: new Date(taskdatetime),
          taskcolor,
          taskdescription,
        });
        setTasks(
          tasks.map((task) =>
            task.id === editTaskId
              ? {
                  ...task,
                  taskname,
                  taskdatetime: new Date(taskdatetime),
                  taskcolor,
                  taskdescription,
                }
              : task
          )
        );
        setShowEditModal(false);
        toast.success("Task updated successfully!");
      } catch (error) {
        console.error("Failed to update task:", error);
        toast.error("Failed to update task.");
      }
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter((task) => task.id !== taskId));
      toast.success("Task deleted successfully!");
    } catch (error) {
      console.error("Failed to delete task:", error);
      toast.error("Failed to delete task.");
    }
  };

  const toggleDropdown = (taskId) => {
    setDropdownOpen(dropdownOpen === taskId ? null : taskId);
  };

  tasks.sort((a, b) => new Date(a.taskdatetime) - new Date(b.taskdatetime));

  return (
    isLoaded &&
    user && (
      <div className="dark:bg-gray-800 min-h-screen">
        <div className="container mx-auto flex">
          <div className="w-1/3 p-4 mx-auto">
            <div className="text-center mt-8">
              <div className="text-5xl font-extrabold text-blue-800 dark:text-blue-600">
                Welcome
              </div>
              <div className="text-5xl font-extrabold text-gray-700 dark:text-gray-400 mt-2">
                {user.firstName} {user.lastName}
              </div>
            </div>
            <div className="flex flex-col gap-6 mt-8">
              <a className="h-16" href="/grid">
                <Card text="The Grid" />
              </a>
              <button className="h-16" onClick={toggleModal}>
                <Card text="New Task" />
              </button>
            </div>
            <div className="flex justify-center mt-8">
              <ProfileButton width="64px" height="64px" />
            </div>
          </div>
          <div className="flex-1 p-4">
            <div className="p-6 mt-8 ml-12 rounded-xl border-blue-200 dark:border-gray-600 border-2 bg-gray-50 dark:bg-gray-900 ">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-400 mb-6">
                  Upcoming Tasks
                </h1>
                <div className="grid grid-cols-1 gap-4">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => handleTaskClick(task)}
                      className={`cursor-pointer relative flex items-center justify-between p-2 border-l-4 border-2 rounded-lg shadow-lg dark:border-gray-600`}
                      style={{ borderColor: task.taskcolor }}
                    >
                      <div className="w-2/3">
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 truncate">
                          {task.taskname}
                        </h2>
                      </div>
                      <div className="relative">
                        <div className="flex items-center">
                          <p className="text-gray-600 dark:text-gray-400 truncate pr-2">
                            {new Date(task.taskdatetime).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md m-20 mb-10">
          <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400 sm:text-center">
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
        </div>
        <div className="h-4 dark:bg-gray-800"></div>

        {showModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto" id="wrapper">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                aria-hidden="true"
              ></div>
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              ></span>
              <div
                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full modal"
                style={{ zIndex: 9999 }}
              >
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t bg-gray-200 dark:bg-gray-900 dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Create New Task
                    </h3>
                    <button
                      onClick={toggleModal}
                      type="button"
                      className="text-gray-400 bg-transparent hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white close-button"
                      data-modal-toggle="crud-modal"
                    >
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>
                  <form className="p-4 md:p-5">
                    <div className="grid gap-4 mb-4 grid-cols-2">
                      <div className="col-span-2">
                        <label
                          htmlFor="taskname"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Task name
                        </label>
                        <input
                          type="text"
                          id="taskname"
                          className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 ${
                            tasknameError ? "border-red-500" : ""
                          }`}
                          placeholder="Enter task name"
                          value={taskname}
                          onChange={(e) => {
                            setTaskname(e.target.value);
                            setTasknameError(false);
                          }}
                        />
                        {tasknameError && (
                          <p className="text-red-500 text-sm">
                            Task name is required
                          </p>
                        )}
                      </div>
                      <div className="col-span-2 sm:col-span-2">
                        <label
                          htmlFor="taskdatetime"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Task date and time
                        </label>
                        <input
                          type="datetime-local"
                          id="taskdatetime"
                          className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 ${
                            taskdatetimeError ? "border-red-500" : ""
                          }`}
                          placeholder="Select task date and time"
                          value={taskdatetime}
                          onChange={(e) => {
                            setTaskdatetime(e.target.value);
                            setTaskdatetimeError(false);
                          }}
                        />
                        {taskdatetimeError && (
                          <p className="text-red-500 text-sm">
                            Task date and time are required
                          </p>
                        )}
                      </div>

                      <div className="col-span-1 sm:col-span-1">
                        <label
                          htmlFor="category"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Task color
                        </label>

                        <div className="flex items-center space-x-2">
                          <button
                            type="button"
                            id="yellow"
                            className={`w-6 h-6 border dark:border-gray-800 border-gray-300 rounded-full focus:outline-none ${
                              taskcolor === "yellow"
                                ? "ring ring-yellow-500"
                                : ""
                            }`}
                            style={{ backgroundColor: "yellow" }}
                            onClick={() => {
                              setTaskcolor("yellow");
                              setTaskcolorError(false);
                            }}
                          ></button>
                          <button
                            type="button"
                            id="red"
                            className={`w-6 h-6 border dark:border-gray-800 border-gray-300 rounded-full focus:outline-none ${
                              taskcolor === "red" ? "ring ring-red-500" : ""
                            }`}
                            style={{ backgroundColor: "red" }}
                            onClick={() => {
                              setTaskcolor("red");
                              setTaskcolorError(false);
                            }}
                          ></button>
                          <button
                            type="button"
                            id="blue"
                            className={`w-6 h-6 border dark:border-gray-800 border-gray-300 rounded-full focus:outline-none ${
                              taskcolor === "blue" ? "ring ring-blue-500" : ""
                            }`}
                            style={{ backgroundColor: "blue" }}
                            onClick={() => {
                              setTaskcolor("blue");
                              setTaskcolorError(false);
                            }}
                          ></button>
                          <button
                            type="button"
                            id="green"
                            className={`w-6 h-6 border dark:border-gray-800 border-gray-300 rounded-full focus:outline-none ${
                              taskcolor === "green" ? "ring ring-green-500" : ""
                            }`}
                            style={{ backgroundColor: "green" }}
                            onClick={() => {
                              setTaskcolor("green");
                              setTaskcolorError(false);
                            }}
                          ></button>
                          <button
                            type="button"
                            id="black"
                            className={`w-6 h-6 border dark:border-gray-800 border-gray-300 rounded-full focus:outline-none ${
                              taskcolor === "black" ? "ring ring-black" : ""
                            }`}
                            style={{ backgroundColor: "black" }}
                            onClick={() => {
                              setTaskcolor("black");
                              setTaskcolorError(false);
                            }}
                          ></button>
                        </div>
                        {taskcolorError && (
                          <p className="text-red-500 text-sm">
                            Task color is required
                          </p>
                        )}
                      </div>
                      <div className="col-span-2">
                        <label
                          htmlFor="taskdescription"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Task description
                        </label>
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
                      <svg
                        className="me-1 -ms-1 w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      Add new task
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
        {showTaskDetailsModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full mx-4">
              <div className="bg-gray-200 dark:bg-gray-900 rounded-t-lg p-4 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold dark:text-gray-300 text-gray-800">
                    {selectedTask.taskname}
                  </h2>
                  <p className="text-sm dark:text-gray-500 text-gray-600">
                    {new Date(selectedTask.taskdatetime).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={handleCloseTaskDetailsModal}
                  className="text-gray-400 bg-transparent hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white close-button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="p-4">
                <p className="text-gray-700 dark:text-gray-300 mb-4 break-words">
                  {selectedTask.taskdescription}
                </p>
                <div className="flex justify-end">
                  <button
                    onClick={() => handleEditTask(selectedTask)}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 dark:bg-gray-600 dark:hover:bg-gray-700 rounded-md mr-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(selectedTask.id)}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {showEditModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto" id="wrapper">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                aria-hidden="true"
              ></div>
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              ></span>
              <div
                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full modal"
                style={{ zIndex: 9999 }}
              >
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t bg-gray-200 dark:bg-gray-900 dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Edit Task
                    </h3>
                    <button
                      onClick={toggleEditModal}
                      type="button"
                      className="text-gray-400 bg-transparent hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white close-button"
                      data-modal-toggle="crud-modal"
                    >
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>
                  <form className="p-4 md:p-5">
                    <div className="grid gap-4 mb-4 grid-cols-2">
                      <div className="col-span-2">
                        <label
                          htmlFor="taskname"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Task name
                        </label>
                        <input
                          type="text"
                          id="taskname"
                          className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 ${
                            tasknameError ? "border-red-500" : ""
                          }`}
                          placeholder="Enter task name"
                          value={taskname}
                          onChange={(e) => {
                            setTaskname(e.target.value);
                            setTasknameError(false);
                          }}
                        />
                        {tasknameError && (
                          <p className="text-red-500 text-sm">
                            Task name is required
                          </p>
                        )}
                      </div>
                      <div className="col-span-2 sm:col-span-2">
                        <label
                          htmlFor="taskdatetime"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Task date and time
                        </label>
                        <input
                          type="datetime-local"
                          id="taskdatetime"
                          className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 ${
                            taskdatetimeError ? "border-red-500" : ""
                          }`}
                          placeholder="Select task date and time"
                          value={taskdatetime}
                          onChange={(e) => {
                            setTaskdatetime(e.target.value);
                            setTaskdatetimeError(false);
                          }}
                        />
                        {taskdatetimeError && (
                          <p className="text-red-500 text-sm">
                            Task date and time are required
                          </p>
                        )}
                      </div>
                      <div className="col-span-1 sm:col-span-1">
                        <label
                          htmlFor="category"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Task color
                        </label>
                        <div className="flex items-center space-x-2">
                          <button
                            type="button"
                            id="yellow"
                            className={`w-6 h-6 border dark:border-gray-800 border-gray-300 rounded-full focus:outline-none ${
                              taskcolor === "yellow"
                                ? "ring ring-yellow-500"
                                : ""
                            }`}
                            style={{ backgroundColor: "yellow" }}
                            onClick={() => {
                              setTaskcolor("yellow");
                              setTaskcolorError(false);
                            }}
                          ></button>
                          <button
                            type="button"
                            id="red"
                            className={`w-6 h-6 border dark:border-gray-800 border-gray-300 rounded-full focus:outline-none ${
                              taskcolor === "red" ? "ring ring-red-500" : ""
                            }`}
                            style={{ backgroundColor: "red" }}
                            onClick={() => {
                              setTaskcolor("red");
                              setTaskcolorError(false);
                            }}
                          ></button>
                          <button
                            type="button"
                            id="blue"
                            className={`w-6 h-6 border dark:border-gray-800 border-gray-300 rounded-full focus:outline-none ${
                              taskcolor === "blue" ? "ring ring-blue-500" : ""
                            }`}
                            style={{ backgroundColor: "blue" }}
                            onClick={() => {
                              setTaskcolor("blue");
                              setTaskcolorError(false);
                            }}
                          ></button>
                          <button
                            type="button"
                            id="green"
                            className={`w-6 h-6 border dark:border-gray-800 border-gray-300 rounded-full focus:outline-none ${
                              taskcolor === "green" ? "ring ring-green-500" : ""
                            }`}
                            style={{ backgroundColor: "green" }}
                            onClick={() => {
                              setTaskcolor("green");
                              setTaskcolorError(false);
                            }}
                          ></button>
                          <button
                            type="button"
                            id="black"
                            className={`w-6 h-6 border dark:border-gray-800 border-gray-300 rounded-full focus:outline-none ${
                              taskcolor === "black" ? "ring ring-black" : ""
                            }`}
                            style={{ backgroundColor: "black" }}
                            onClick={() => {
                              setTaskcolor("black");
                              setTaskcolorError(false);
                            }}
                          ></button>
                        </div>
                        {taskcolorError && (
                          <p className="text-red-500 text-sm">
                            Task color is required
                          </p>
                        )}
                      </div>
                      <div className="col-span-2">
                        <label
                          htmlFor="taskdescription"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Task description
                        </label>
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
                      onClick={handleSaveTask}
                    >
                      Save Task
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  );
}

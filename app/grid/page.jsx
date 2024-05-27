"use client";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useUser } from "@clerk/nextjs";
import { toast } from "react-hot-toast";
import ProfileButton from "@/components/profilebutton";
import Image from "next/image";
import { useClerk } from "@clerk/nextjs";
import {
  insert_task,
  getTasksByUserEmail,
  updateTask,
  deleteTask,
} from "@/app/dashboard/actions";

export default function Calendar() {
  const [date, setDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const handlePreviousMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };

  const handleDayClick = (day) => {
    setSelectedDay(day);
    setIsModalOpen(true);
  };
  const renderCalendar = () => {
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const totalDays = daysInMonth(currentMonth, currentYear);
    const weeks = [];
    let days = [];

    const tasksByDate = {};
    tasks.forEach((task) => {
      const taskDate = new Date(task.taskdatetime);
      const taskKey = `${taskDate.getFullYear()}-${taskDate.getMonth()}-${taskDate.getDate()}`;
      if (!tasksByDate[taskKey]) {
        tasksByDate[taskKey] = [];
      }
      tasksByDate[taskKey].push(task);
    });

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <td
          key={`empty-start-${i}`}
          className="border dark:border-gray-700 p-1 h-40"
        ></td>
      );
    }

    for (let day = 1; day <= totalDays; day++) {
      if (days.length === 7) {
        weeks.push(
          <tr key={`week-${weeks.length}`} className="text-center h-20">
            {days}
          </tr>
        );
        days = [];
      }
      const dayKey = `${currentYear}-${currentMonth}-${day}`;
      days.push(
        <td
          key={day}
          className="border dark:border-gray-700 p-1 h-40 transition cursor-pointer duration-500 ease hover:bg-gray-300 dark:hover:bg-gray-800"
          onClick={() => handleDayClick(day)}
        >
          <div className="flex dark:border-gray-700 flex-col h-40 overflow-hidden">
            <div className="top h-5 w-full">
              <span className="text-gray-500">{day}</span>
            </div>
            <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer">
              {tasksByDate[dayKey] &&
                tasksByDate[dayKey].map((task) => (
                  <div
                    key={task.id}
                    className="h-2 align-middle rounded-full mx-2 mt-1"
                    style={{ backgroundColor: task.taskcolor }}
                  ></div>
                ))}
            </div>
          </div>
        </td>
      );
    }

    while (days.length < 7) {
      days.push(
        <td
          key={`empty-end-${days.length}`}
          className="border dark:broder-gray-700 p-1 h-40"
        ></td>
      );
    }
    weeks.push(
      <tr key={`week-${weeks.length}`} className="text-center h-20">
        {days}
      </tr>
    );

    return weeks;
  };
  useEffect(() => {
    if (isLoaded && user) {
      fetchTasks();
    }
  }, [isLoaded, user]);

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
      <div className="bg-white p-8 rounded-lg max-w-3xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {task.taskname}
        </h2>
        <p className="text-gray-600">{task.taskdescription}</p>
        <p className="text-gray-600">
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
    <div className="dark:bg-gray-800">
      <nav className="bg-gray-200 dark:bg-gray-900 shadow-md">
        <div className="max-w-screen-xl mx-auto p-4 flex items-center justify-between">
          <a href="/dashboard" className="flex items-center">
            <Image src="/TimeGrid_Logo.png" alt="Logo" width={36} height={36} />
            <span className="text-3xl ml-2 font-bold text-gray-800 dark:text-gray-400">
              TimeGrid
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-9 w-8 text-gray-800 dark:text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 12l1.41-1.41L12 4.83l6.59 6.59L19 12v7a1 1 0 0 1-1 1h-4v-4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v4H5a1 1 0 0 1-1-1v-7z"
              />
            </svg>
          </a>

          <button
            type="button"
            className="text-white inline-flex items-center bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-44 text-center dark:bg-gray-600 dark:hover:bg-gray-700"
            onClick={toggleModal}
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
          <div>
            <ProfileButton />
          </div>
        </div>
      </nav>
      <div className="container mx-auto my-10 rounded-lg">
        <div className="wrapper bg-white dark:bg-gray-900 dark:border-gray-700 dark:text-white rounded-lg shadow w-full">
          <div className="header flex justify-between border-b dark:border-gray-700 p-2">
            <span className="text-lg font-bold">
              {date.getFullYear()} {monthNames[date.getMonth()]}
            </span>
            <div className="buttons">
              <button className="p-1" onClick={handlePreviousMonth}>
                <svg
                  width="1em"
                  fill="gray"
                  height="1em"
                  viewBox="0 0 16 16"
                  className="bi bi-arrow-left-circle"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M8.354 11.354a.5.5 0 0 0 0-.708L5.707 8l2.647-2.646a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708 0z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M11.5 8a.5.5 0 0 0-.5-.5H6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5z"
                  />
                </svg>
              </button>
              <button className="p-1" onClick={handleNextMonth}>
                <svg
                  width="1em"
                  fill="gray"
                  height="1em"
                  viewBox="0 0 16 16"
                  className="bi bi-arrow-right-circle"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M7.646 11.354a.5.5 0 0 1 0-.708L10.293 8 7.646 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M4.5 8a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <table className="w-full">
            <thead>
              <tr>
                {daysOfWeek.map((day) => (
                  <th
                    key={day}
                    className="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 dark:border-gray-700 xl:text-sm text-xs"
                  >
                    <span className="xl:block dark:border-gray-700 lg:block md:block sm:block hidden">
                      {day}
                    </span>
                    <span className="xl:hidden dark:border-gray-700 lg:hidden md:hidden sm:hidden block">
                      {day.slice(0, 3)}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>{renderCalendar()}</tbody>
          </table>
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
      </div>
      {isModalOpen && selectedDay !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 dark:text-gray-400 p-6 rounded-lg shadow-md max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">
                {selectedDay} {monthNames[date.getMonth()]} {date.getFullYear()}
              </h2>
              <button
                className="text-gray-400 bg-transparent hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white close-button"
                onClick={() => setIsModalOpen(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 dark:"
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
            <div className="grid grid-cols-1 gap-4">
              {tasks
                .filter(
                  (task) =>
                    new Date(task.taskdatetime).getFullYear() ===
                      date.getFullYear() &&
                    new Date(task.taskdatetime).getMonth() ===
                      date.getMonth() &&
                    new Date(task.taskdatetime).getDate() === selectedDay
                )
                .map((task) => (
                  <div
                    key={task.id}
                    onClick={() => handleTaskClick(task)}
                    className={`cursor-pointer relative flex items-center justify-between  p-2 border-l-4 border-2 rounded-lg shadow-lg`}
                    style={{ borderColor: task.taskcolor }}
                  >
                    <div className="w-2/3">
                      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-300 truncate mr-8">
                        {task.taskname}
                      </h2>
                    </div>
                    <div className="relative">
                      <div className="flex items-center">
                        <p className="text-gray-400 truncate pr-2">
                          {new Date(task.taskdatetime).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
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
                            taskcolor === "yellow" ? "ring ring-yellow-500" : ""
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
                            taskcolor === "yellow" ? "ring ring-yellow-500" : ""
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
  );
}

Calendar.propTypes = {
  tasks: PropTypes.array,
};

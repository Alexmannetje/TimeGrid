"use client"

import { useState } from "react";
import PropTypes from "prop-types";
import NavBar from "@/components/navbar";

export default function Calendar({ tasks = [] }) {
  const [date, setDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysOfWeek = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
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

    // Create a map of tasks by date
    const tasksByDate = {};
    tasks.forEach(task => {
      const taskDate = new Date(task.taskdatetime).getDate();
      if (!tasksByDate[taskDate]) {
        tasksByDate[taskDate] = [];
      }
      tasksByDate[taskDate].push(task);
    });

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<td key={`empty-start-${i}`} className="border p-1 h-40"></td>);
    }

    for (let day = 1; day <= totalDays; day++) {
      if (days.length === 7) {
        weeks.push(<tr key={`week-${weeks.length}`} className="text-center h-20">{days}</tr>);
        days = [];
      }
      days.push(
        <td
          key={day}
          className="border p-1 h-40 transition cursor-pointer duration-500 ease hover:bg-gray-300"
          onClick={() => handleDayClick(day)}
        >
          <div className="flex flex-col h-40 overflow-hidden">
            <div className="top h-5 w-full">
              <span className="text-gray-500">{day}</span>
            </div>
            <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer">
              {tasksByDate[day] && <div className="w-2 h-2 bg-red-500 rounded-full mx-auto mt-1"></div>}
            </div>
          </div>
        </td>
      );
    }

    while (days.length < 7) {
      days.push(<td key={`empty-end-${days.length}`} className="border p-1 h-40"></td>);
    }
    weeks.push(<tr key={`week-${weeks.length}`} className="text-center h-20">{days}</tr>);

    return weeks;
  };

  console.log('Selected Day:', selectedDay);
  console.log('Tasks:', tasks);

  return (
    <div>
      <NavBar />
      <div className="container mx-auto mt-10">
        <div className="wrapper bg-white rounded shadow w-full">
          <div className="header flex justify-between border-b p-2">
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
                    d="M8 15A7 70 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
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
                      className="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs"
                    >
                      <span className="xl:block lg:block md:block sm:block hidden">
                        {day}
                      </span>
                      <span className="xl:hidden lg:hidden md:hidden sm:hidden block">
                        {day.slice(0, 3)}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>{renderCalendar()}</tbody>
            </table>
          </div>
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-md max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Day {selectedDay} - {monthNames[date.getMonth()]} {date.getFullYear()}</h2>
                <button className="text-gray-600 hover:text-gray-800 focus:outline-none" onClick={() => setIsModalOpen(false)}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {console.log('Filtered Tasks:', tasks.filter(task => new Date(task.taskdatetime).getDate() === selectedDay))}
                {tasks
                  .filter(task => new Date(task.taskdatetime).getDate() === selectedDay)
                  .map((task) => (
                    <div
                      key={task.id}
                      className="cursor-pointer relative flex items-center justify-between p-2 border-l-4 border-2 rounded-lg shadow-lg"
                      style={{ borderColor: task.taskcolor }}
                    >
                      <div className="w-3/4 pr-4">
                        <h2 className="text-lg font-semibold text-gray-800 truncate">
                          {task.taskname}
                        </h2>
                      </div>
                      <div className="relative">
                        <div className="flex items-center">
                          <p className="text-gray-600 truncate pr-2">
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
      </div>
    
  );
}

Calendar.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      taskname: PropTypes.string.isRequired,
      taskdatetime: PropTypes.string.isRequired,
      taskcolor: PropTypes.string
    })
  )
};

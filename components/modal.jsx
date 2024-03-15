"use client";

import { useUser } from '@clerk/nextjs';
import React from 'react'

const Modal = ({ isVisible, onClose, children }) => {
    if (!isVisible) return null;

    const handleClose = (e) => {
        if (e.target.id === "wrapper" && e.target.closest(".modal") === null || e.target.closest(".close-button") !== null) {
            onClose();
        }
    }

    return (
        <div className='fixed inset-0 z-50 overflow-y-auto' id="wrapper" onClick={handleClose}>
            <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
                <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' aria-hidden="true"></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"></span>
                <div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full modal' style={{ zIndex: 9999 }}>

                    <div className='relative p-4 w-full max-w-md max-h-full'>
                        {children}
                    </div>
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Create New Activity
                                </h3>
                                <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white close-button" data-modal-toggle="crud-modal" >
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>

                            <form className="p-4 md:p-5">
                                <div className="grid gap-4 mb-4 grid-cols-2">
                                    <div className="col-span-2">
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Time</label>
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                                        <select id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                            <option selected="">Select category</option>
                                            <option value="Work">Work</option>
                                            <option value="Going-out">Going-out</option>
                                        </select>
                                    </div>
                                    <div className="col-span-2">
                                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                        <textarea id="description" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write activity description here"></textarea>
                                    </div>
                                </div>
                                <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                                    Add new activity
                                </button>
                            </form>
                        </div>
                    </div>
                </div >
            </div >
        </div >
    )
}

export default Modal;
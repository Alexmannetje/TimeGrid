"use client";

import { useUser } from '@clerk/nextjs';
import React from 'react'

const Modal = ({ isVisible, onClose, children }) => {
    if (!isVisible) return null;

    const handleClose = (e) => {
        if (e.target.id === "wrapper") onClose();
    }

    return (
        <div className='fixed inset-0 z-50 overflow-y-auto' id="wrapper" onClick={handleClose}>
            <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
                <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' aria-hidden="true"></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full' style={{ zIndex: 9999 }}>
                    <div className='relative p-4 w-full max-w-md max-h-full'>
                        <button className='text-white text-xl place-self-end' onClick={() => onClose()}>
                            X
                        </button>
                        <div className='bg-white p-2 rounded'>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;
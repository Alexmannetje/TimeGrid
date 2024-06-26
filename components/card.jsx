"use client";

import { useMotionValue } from "framer-motion";
import React, { useState, useEffect } from "react";
import { useMotionTemplate, motion } from "framer-motion";
import { cn } from "@/utils/cn";

export const Card = ({ text, className }) => {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function onMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={cn(
        "p-0.5  bg-transparent aspect-square  flex items-center justify-center w-full h-full relative",
        className
      )}
    >
      <div
        onMouseMove={onMouseMove}
        className="group/card rounded-3xl border-4 dark:border-gray-600 dark:hover:border-gray-700 border-blue-200 hover:border-blue-300 w-full relative overflow-hidden bg-transparent flex items-center justify-center h-full"
      >
        <CardPattern mouseX={mouseX} mouseY={mouseY} />
        <div className="relative h-44 w-44 rounded-full flex items-center justify-center text-white font-bold text-2xl">
          <span className="dark:text-white text-black z-20">{text}</span>
        </div>
      </div>
    </div>
  );
};

export function CardPattern({ mouseX, mouseY }) {
  let maskImage = useMotionTemplate`radial-gradient(300px at ${mouseX}px ${mouseY}px, white, transparent)`;
  let style = { maskImage, WebkitMaskImage: maskImage };

  return (
    <div className="pointer-events-none">
      <div className="absolute inset-0 rounded-2xl  [mask-image:linear-gradient(white,transparent)] group-hover/card:opacity-50"></div>
      <motion.div
        className="absolute inset-0  bg-gradient-to-r from-gray-200 to-gray-200 dark:from-gray-900 dark:to-gray-900 opacity-0  group-hover/card:opacity-100 backdrop-blur-lg transition duration-500"
        style={style}
      />
    </div>
  );
}

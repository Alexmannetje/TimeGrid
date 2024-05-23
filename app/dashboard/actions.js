"use server";

import prisma from "@/utils/db";

export async function insert_task(user_email, task_name, task_datetime, task_color, task_description) {
    const result = await prisma.task.create({
        data: {
            useremail: user_email,
            taskname: task_name,
            taskdatetime: task_datetime,
            taskcolor: task_color,
            taskdescription: task_description
        }
    });
    return result;
}

export async function getTasksByUserEmail(userEmail) {
    try {
        const tasks = await prisma.task.findMany({
            where: {
                useremail: userEmail,
            },
        });
        return tasks;
    } catch (error) {
        throw new Error(`Error fetching tasks: ${error}`);
    }
}


export const updateTask = async (taskId, taskData) => {
  try {
    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: taskData,
    });
    return updatedTask;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

export async function deleteTask(taskId) {
    try {
        await prisma.task.delete({
            where: {
                id: taskId,
            },
        });
    } catch (error) {
        throw new Error(`Error deleting task: ${error}`);
    }
}
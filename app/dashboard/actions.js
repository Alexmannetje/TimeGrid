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
"use server";
import { prisma } from "@/utils/prisma";

export const NewTask = async (tarefa: string) => {
  try {
    if (!tarefa) return;

    const NewTask = await prisma.tasks.create({
      data: {
        task: tarefa,
        done: false,
      },
    });

    if (!NewTask) return;

    return NewTask;
  } catch (error) {
    throw error;
  }
};

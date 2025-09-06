"User server"

import { Tasks } from "@/generated/prisma"
import {prisma} from "@/utils/prisma"

type EditTaskProps = {
    idTask: string
    newTask: string
}

export const editTask = async ({idTask, newTask}: EditTaskProps) => {

    try {
        if(!idTask || !newTask) return

        const editedTask = await prisma.tasks.update({
            where: {id: idTask},
            data: {task: newTask}
        })
        if(!editTask) return
        

    }catch(error){
        throw error
    }



}
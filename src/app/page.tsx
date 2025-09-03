"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Check,
  CircleX,
  List,
  Plus,
  Trash,
  ListCheck,
  Sigma,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,

} from "@/components/ui/dialog";
import EditTask from "@/components/edit-task";
import { getTasks } from "@/actions/get-tasks-from-bd";
import { useEffect, useState } from "react";
import { Tasks } from "@/generated/prisma";
import { NewTask } from "@/actions/add-task";
import { deleteTask } from "@/actions/delete-tasks";
import {toast} from "sonner"

const Home = () => {
  const [taskList, setTaskList] = useState<Tasks[]>([]);
  const [task, setTask] = useState<string>("");

  const handleGetTasks = async () => {
    try {
      const tasks = await getTasks();

      if (!tasks) return;

      setTaskList(tasks);
    } catch (error) {
      throw error;
    }
  };

  const handleAddTasks = async () => {
    try {
      if (task.length === 0 || !task) {
        return;
      }

      const myNewTask = await NewTask(task);

      if (!myNewTask) return;

      setTask('')
      toast.success("Atividade adicionada com sucesso")
      await handleGetTasks();
    } catch (error) {
      throw error;
    }
  };

  const handleDeleteTask = async (id: string) => {
    try{
      if(!id) return

      const deletedTask = await deleteTask(id)

      if(!deleteTask) return

      console.log(deleteTask)
      await handleGetTasks()
      toast.warning("Atividade deletada com sucesso")
    }catch (error){
      throw error
    }
  }

  const handleToggleTask = async () => {
    console.log(taskList)
    const previousTasks = [...taskList]
    console.log(previousTasks)
  }

  useEffect(() => {
    handleGetTasks();
  }, []);

  return (
    <main className="w-full h-screen bg-gray-100 flex justify-center items-center">
      <Card className="w-lg ">
        <CardHeader className="flex gap-2">
          <Input
            placeholder="Adicionar Tarefa"
            onChange={(e) => setTask(e.target.value)} value={task}
          />
          <Button className="cursor-pointer" onClick={handleAddTasks}>
            <Plus />
            Cadastrar
          </Button>
        </CardHeader>

        <CardContent>
          <Separator className="mb-2" />

          <div className="flex gap-2">
            <Badge className=" cursor-pointer " variant="default">
              <List />
              Todas
            </Badge>
            <Badge className="cursor-pointer" variant="outline">
              <CircleX />
              Nao finalizadas
            </Badge>
            <Badge className="cursor-pointer" variant="outline">
              <Check />
              Concluidas
            </Badge>
          </div>

          <div className=" mt-4 border-b-1">
            {taskList.map((task) => (
              <div
                className=" h-12 flex justify-between items-center border-t-1"
                key={task.id}
              >
                <div className={`${task.done ? 'w-1 h-full bg-green-400' : 'w-1 h-full bg-red-400' }`}></div>
                <p className="flex-1 px-2 text-sm cursor-pointer hover:text-gray-700" onClick={handleToggleTask}>{task.task}</p>

                <div className="flex items-center gap-2">
                  <EditTask />

                  <Trash size={16} className="cursor-pointer"  onClick={() => handleDeleteTask(task.id)}/>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-4">
            <div className="flex gap-2 items-center">
              <ListCheck size={18} />
              <p className="text-xs">Tarefas Concluídas (3/3)</p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  className="text-xs h-7 cursor-pointer"
                  variant="outline"
                >
                  <Trash />
                  Limpar tarefas concluídas
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Tem certeza que deseja excluir x itens
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction>Sim</AlertDialogAction>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <div className="h-2 w-full bg-gray-100 mt-4 rounded-md">
            <div
              className="h-full  bg-blue-500 rounded-md"
              style={{ width: "50%" }}
            ></div>
          </div>

          <div className="flex justify-end items-center mt-2 gap-2">
            <Sigma size={18} />
            <p className="text-xs">3 tarefas no total</p>
          </div>
        </CardContent>
        <div></div>
      </Card>
    </main>
  );
};

export default Home;

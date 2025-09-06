import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SquarePen } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Tasks } from "@/generated/prisma";
import { useState } from "react";
import { toast } from "sonner";
import { editTask } from "@/actions/edit-task";
import { DialogClose } from "@radix-ui/react-dialog";

type TaskProps = {
  task: Tasks;
  handleGetTasks: () => void;
};

const EditTask = ({ task, handleGetTasks }: TaskProps) => {
  const [editedTask, setEditedTask] = useState(task.task);

  const handleEditTask = async () => {
    try {
      if (editedTask !== task.task) {
        toast.success("Voce pode mandar as informacoes ao BD");
      } else {
        toast.error("As informacoes nao foram alteradas");
        return;
      }

      await editTask({
        idTask: task.id,
        newTask: editedTask,
      });

      handleGetTasks();
    } catch (error) {
      throw error;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <SquarePen size={16} className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Tarefa</DialogTitle>
        </DialogHeader>

        <div className="flex gap-2">
          <Input
            placeholder="Editar tarefa"
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
          />

          <DialogClose asChild>
            <Button className="cursor-pointer" onClick={handleEditTask}>
              Editar
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditTask;

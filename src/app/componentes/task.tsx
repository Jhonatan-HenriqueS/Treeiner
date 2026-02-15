"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Check, Trash2Icon } from "lucide-react";
import { toast } from "sonner";

export type TaskProps = {
  id: string;
  title: string;
  description?: string;
  dateInitial: string;
  date: string;
  checkActive: boolean;
  dangerZone: boolean;
  dateUser: string;
  onCheck: () => void;
  deleteTask?: () => void;
};

const Task = ({
  title,
  description,
  dateInitial,
  date,
  checkActive,
  dangerZone,
  dateUser,
  onCheck,
  deleteTask,
}: TaskProps) => {
  const initialDate = new Date(dateInitial);
  const NewDates = new Date(date);
  const userDate = new Date(dateUser);

  return (
    <section
      className="bg-gray-200 p-4 rounded-4xl my-4 w-full flex flex-col gap-4 hover:cursor-pointer "
      onClick={() =>
        toast(
          <div>
            <h3 className="font-bold">Informações da Tarefa: </h3>
            <p className="font-medium">{title}</p>
            <p>{description}</p>
          </div>,
        )
      }
    >
      <div className="flex justify-between">
        <h2
          className={`text-center font-medium  max-w-[40%] overflow-hidden text-ellipsis whitespace-nowrap  ${checkActive ? "text-green-600" : ""}`}
        >
          {title}
        </h2>
        <div className=" flex gap-2 ">
          <p className="text-gray-500">
            {initialDate?.toLocaleDateString("pt-BR")}
          </p>
          <p className="text-gray-500">
            {initialDate?.toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <p className="ml-4 text-gray-700 max-w-[50vw] overflow-hidden text-ellipsis line-clamp-2  ">
          {description}
        </p>

        {checkActive ? (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                className=" bg-red-600 hover:bg-red-700 p-3 mr-4 rounded-full cursor-pointer transition-all "
              >
                <Trash2Icon className="text-gray-200" />
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent size="sm">
              <AlertDialogHeader>
                <AlertDialogTitle>Deletar Tarefa?</AlertDialogTitle>
                <AlertDialogDescription>
                  Deseja excluir permanentemente esta tarefa? Esta ação não pode
                  ser desfeita.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel variant="outline">
                  Cancelar
                </AlertDialogCancel>
                <AlertDialogAction variant="destructive" onClick={deleteTask}>
                  Deletar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          <Button
            className={`p-3 mr-4 bg-green-600 hover:bg-green-700 rounded-full cursor-pointer transition-all `}
            onClick={onCheck}
          >
            <Check className="text-gray-200" />
          </Button>
        )}
      </div>
      <div
        className={`flex gap-2 justify-center ${checkActive ? "text-green-600" : ""}`}
      >
        <p>Prazo: {NewDates?.toLocaleDateString()}</p>
        <p>
          {userDate?.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </section>
  );
};

export default Task;

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

export type TaskProps = {
  id: string;
  title: string;
  description?: string;
  dateInitial: string;
  date: string;
  checkActive: boolean;
  dangerZone: boolean;
  dateUser: string;
  setCheckActive: (active: boolean) => void;
};

const Task = ({
  id,
  title,
  description,
  dateInitial,
  date,
  checkActive,
  dangerZone,
  dateUser,
  setCheckActive,
}: TaskProps) => {
  const initialDate = new Date(dateInitial);
  const NewDates = new Date(date);
  const userDate = new Date(dateUser);

  return (
    <section className="bg-gray-200 p-4 rounded-4xl my-4 w-full flex flex-col gap-3">
      <div className="flex justify-between">
        <h2 className="text-center font-medium">{title}</h2>
        <div className=" flex gap-2">
          <p> {initialDate?.toLocaleDateString("pt-BR")}</p>
          <p>
            {initialDate?.toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <p className="ml-4 text-gray-700 max-w-[70%] overflow-hidden text-ellipsis line-clamp-2  ">
          {description}
        </p>

        {checkActive ? (
          <AlertDialog>
            {dangerZone ? (
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  className=" bg-red-600 hover:bg-red-700 p-3 mr-4 rounded-full cursor-pointer transition-all "
                >
                  <Trash2Icon className="text-gray-200" />
                </Button>
              </AlertDialogTrigger>
            ) : (
              <Button
                variant="destructive"
                className=" bg-red-600 hover:bg-red-700 p-3 mr-4 rounded-full cursor-pointer transition-all "
              >
                <Trash2Icon className="text-gray-200" />
              </Button>
            )}

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
                <AlertDialogAction variant="destructive">
                  Deletar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          <Button
            className={`p-3 mr-4 bg-green-600 hover:bg-green-700 rounded-full cursor-pointer transition-all `}
            onClick={() => setCheckActive(true)}
          >
            <Check className="text-gray-200" />
          </Button>
        )}
      </div>
      <div className="flex gap-2 justify-center">
        <p>Prazo de entrega: {NewDates?.toLocaleDateString()}</p>
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

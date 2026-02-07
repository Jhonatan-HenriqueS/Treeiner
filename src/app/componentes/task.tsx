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

type TaskProps = {
  title: string;
  description?: string;
  dateInitial: Date;
  date: Date;
  checkActive: boolean;
  dangerZone: boolean;
  dateUser: Date;
  setDateInitial: (date: Date) => void;
  setCheckActive: (active: boolean) => void;
};

const Task = ({
  title,
  description,
  dateInitial,
  date,
  checkActive,
  dangerZone,
  dateUser,
  setDateInitial,
  setCheckActive,
}: TaskProps) => {
  return (
    <section className="bg-gray-200 p-4 rounded-4xl my-4 w-full flex flex-col gap-3">
      <div className="flex justify-between">
        <h2 className="text-center font-medium">{title}</h2>
        <p className=" flex gap-2">
          <p> {dateInitial?.toLocaleDateString("pt-BR")}</p>
          <p>{dateInitial?.toLocaleTimeString("pt-BR")}</p>
        </p>
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
                <AlertDialogAction
                  variant="destructive"
                  onClick={() => {
                    setDateInitial(new Date());
                  }}
                >
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
        <p>Prazo de entrega: {date?.toLocaleDateString()}</p>
        <p>{dateUser?.toLocaleTimeString("pt-BR")}</p>
      </div>
    </section>
  );
};

export default Task;

"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
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
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import Task from "./componentes/task";
import Inputs from "./componentes/inputs";

type TaskData = {
  id: string;
  title: string;
  description?: string;
  dateInitial: string;
  date: string;
  checkActive: boolean;
  dangerZone: boolean;
  dateUser: string;
};

const Header = () => {
  const [date, setDate] = React.useState<Date>(new Date()); //Seleciona a data atual
  const [dateInitial, setDateInitial] = React.useState<string>(
    new Date().toISOString(),
  ); //Seleciona a data atual para a data inicial da tarefa

  const [title, setTitle] = useState<string>(""); //Guarda o título inserido pelo usuário
  const [description, setDescription] = useState<string>(""); //Guarda a descrição inserida pelo usuário
  const [checkActive] = useState<boolean>(false); //Guarda a informação se a tarefa foi finalizada
  const [dangerZone, setDangerZone] = useState<boolean>(true); //Guarda a informação se a zona de perigo está ativa
  const [dateUser, setDateUser] = useState<Date>(new Date()); //Guarda a data selecionada pelo usuário

  const [taskList, setTaskList] = useState<TaskData[]>([]); //Guarda a lista de tarefas

  const checkEnable = title.trim().length > 0; //Verifica se o título não está vazio para habilitar o botão

  const addTask = () => {
    //Função para adicionar uma nova tarefa

    const id = crypto.randomUUID(); //Gera um ID único para a tarefa

    const newTask: TaskData = {
      id,
      title,
      description,
      dateInitial: new Date().toISOString(),
      date: date.toISOString(),
      checkActive,
      dangerZone,
      dateUser: dateUser.toISOString(),
    };
    setTaskList((prev) => [...prev, newTask]);
  };

  const checkTask = (id: string) => {
    //Função para marcar a tarefa como finalizada
    setTaskList((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, checkActive: true } : task,
      ),
    );
  };

  const deleteTask = (id: string) => {
    //Função para deletar a tarefa
    setTaskList((prev) => prev.filter((task) => task.id !== id));
  };

  React.useEffect(() => {
    const storageTasks = localStorage.getItem("tasks");

    if (storageTasks) {
      //Mesmo que usar storageTasks === true
      setTaskList(JSON.parse(storageTasks));
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskList));
  }, [taskList]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-600 ">
      <div className="rounded-4xl bg-gray-400 py-6 px-5  h-[95vh] w-[90vw] lg:h-[80vh] lg:w-[40vw] lg:px-20 overflow-y-auto no-scrollbar">
        <h1 className="text-lg font-medium text-center">Adicione sua tarefa</h1>
        <section className="flex items-center mt-6 gap-3 justify-center">
          <div>
            <Inputs
              type="text"
              placeholder="Insira o título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                className="p-6 rounded-3xl transition-all"
                disabled={!checkEnable}
                onClick={() => {
                  setDangerZone(true);
                  setDateInitial(new Date().toISOString());
                  setDateUser(new Date());
                }}
              >
                <Plus className="mx-2" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="w-[80vw] max-h-[90vh] overflow-y-auto no-scrollbar p-6 py-10 flex flex-col items-center">
              <AlertDialogHeader>
                <AlertDialogTitle className="w-full text-center">
                  Crie sua tarefa
                </AlertDialogTitle>
                <section className="flex flex-col gap-5 justify-center mt-5 w-full">
                  <div>
                    <Inputs
                      type="text"
                      placeholder="Insira o título"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <Inputs
                      type="text"
                      placeholder="Descrição da tarefa"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div>
                    <Inputs
                      type="time"
                      placeholder={
                        dateUser?.toLocaleTimeString("pt-BR") ||
                        "Selecione o horário"
                      }
                      value={
                        dateUser?.toLocaleTimeString("pt-BR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        }) || ""
                      }
                      onChange={(e) =>
                        setDateUser(new Date(`1970-01-01T${e.target.value}`))
                      }
                    />
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <Calendar
                      mode="single"
                      required={true}
                      selected={date}
                      onSelect={(d) => d && setDate(d)}
                      className="rounded-lg border "
                      captionLayout="dropdown"
                    />
                  </div>
                </section>
              </AlertDialogHeader>
              <Task
                id="1"
                title={title}
                description={description}
                dateInitial={dateInitial}
                date={date.toISOString()}
                checkActive={checkActive}
                dangerZone={dangerZone}
                dateUser={dateUser.toISOString()}
                onCheck={() => checkTask("1")}
                deleteTask={() => deleteTask("1")}
              />
              <AlertDialogFooter className="flex">
                <AlertDialogCancel onClick={() => setDangerZone(false)}>
                  Cancelar
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    addTask();
                    setDangerZone(false);
                    setTitle("");
                    setDescription("");
                    setDateUser(new Date());
                  }}
                >
                  Criar tarefa
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </section>
        <section className="mt-10">
          {taskList.map((task) => (
            <Task
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
              dateInitial={task.dateInitial}
              date={task.date}
              checkActive={task.checkActive}
              dangerZone={task.dangerZone}
              dateUser={task.dateUser}
              onCheck={() => checkTask(task.id)}
              deleteTask={() => deleteTask(task.id)}
            />
          ))}
        </section>
      </div>
    </main>
  );
};

export default Header;

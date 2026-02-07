"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
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
import { Input } from "@/components/ui/input";
import { Check, Plus, Trash2Icon } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date()); //Seleciona a data atual
  const [dateInitial, setDateInitial] = React.useState<Date | undefined>(
    new Date(),
  );
  const [title, setTitle] = useState<string>(""); //Guarda o título inserido pelo usuário
  const [description, setDescription] = useState<string>(""); //Guarda a descrição inserida pelo usuário
  const [checkActive, setCheckActive] = useState<boolean>(false); //Guarda a informação se a tarefa foi finalizada
  const [dangerZone, setDangerZone] = useState<boolean>(false); //Guarda a informação se a zona de perigo está ativa

  const checkEnable = title.trim().length > 0; //Verifica se o título não está vazio para habilitar o botão

  return (
    <main>
      <h1 className="text-lg font-medium text-center">Adicione sua tarefa</h1>
      <section className="flex items-center mt-6 gap-3">
        <div>
          <Input
            className="bg-primary disabled:bg-primary text-white text-center border-none p-6 rounded-3xl
            placeholder:text-gray-500 focus:placeholder:opacity-40 transition-all
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary"
            type="text"
            placeholder="Insira o título"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              className="p-6 rounded-3xl transition-all"
              disabled={!checkEnable}
              onClick={() => {
                setDangerZone(true);
                setDateInitial(new Date());
              }}
            >
              <Plus className="mx-2" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="flex flex-col justify-center items-center p-6 ">
            <AlertDialogHeader>
              <AlertDialogTitle className="w-full text-center">
                Descreva como deverá ser seu check-list
              </AlertDialogTitle>
              <section className="flex flex-col gap-5">
                <div>
                  <Input
                    className="bg-primary disabled:bg-primary text-white text-center border-none p-6 rounded-3xl
            placeholder:text-gray-500 focus:placeholder:opacity-40 transition-all
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary"
                    type="text"
                    placeholder={title}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div>
                  <h2 className="w-full text-center font-medium ">
                    Descreva como deverá ser esta tarefa:
                  </h2>
                  <Input
                    className="mt-2 bg-primary disabled:bg-primary text-white text-center border-none p-6 rounded-3xl
            placeholder:text-gray-500 focus:placeholder:opacity-40 transition-all
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary"
                    type="text"
                    placeholder="Descrição da tarefa"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="flex flex-col justify-center items-center">
                  <h2 className="w-full text-center font-medium mb-2">
                    Para quando deverá ser finalizado esta tarefa?
                  </h2>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-lg border "
                    captionLayout="dropdown"
                  />
                </div>
              </section>
            </AlertDialogHeader>
            <section className="bg-gray-200 p-4 rounded-4xl my-4 w-full flex flex-col gap-3">
              <div className="flex justify-between">
                <h2 className="text-center font-medium">{title}</h2>
                <p className="text-center">
                  xx/xx/xxxx {dateInitial?.toLocaleTimeString()}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="ml-4 text-gray-700">{description}</p>

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
                        <AlertDialogTitle>Delete chat?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete this chat conversation.
                          View <a href="#">Settings</a> delete any memories
                          saved during this chat.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel variant="outline">
                          Cancel
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
              <div className="text-center">
                <p>Prazo para data de entrega: {date?.toLocaleDateString()}</p>
              </div>
            </section>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </section>
    </main>
  );
};

export default Header;

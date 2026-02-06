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
import { Input } from "@/components/ui/input";
import { Plus, Trash2Icon } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const [title, setTitle] = useState<string>(""); //Guarda o título inserido pelo usuário

  const [description, setDescription] = useState<string>(""); //Guarda a descrição inserida pelo usuário

  const checkEnable = title.length > 0; //Verifica se o título não está vazio para habilitar o botão

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
            <section className="bg-gray-200 p-4 rounded-4xl my-4 w-full">
              <div className="flex justify-between">
                <h2 className="text-center font-medium">{title}</h2>
                <p className="text-center">xx/xx/xxxx xx:xx</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="ml-4 mt-3 text-gray-700">{description}</p>
                <Trash2Icon
                  size={16}
                  className="mr-4 rounded-full p-5 z-50 text-white"
                />
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

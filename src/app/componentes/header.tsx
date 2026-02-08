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
import { Plus } from "lucide-react";
import { useState } from "react";
import Task from "./task";
import Inputs from "./inputs";

const Header = () => {
  const [date, setDate] = React.useState<Date>(new Date()); //Seleciona a data atual
  const [dateInitial, setDateInitial] = React.useState<string>(
    new Date().toISOString(),
  ); //Seleciona a data atual para a data inicial da tarefa

  const [title, setTitle] = useState<string>(""); //Guarda o título inserido pelo usuário
  const [description, setDescription] = useState<string>(""); //Guarda a descrição inserida pelo usuário
  const [checkActive, setCheckActive] = useState<boolean>(false); //Guarda a informação se a tarefa foi finalizada
  const [dangerZone, setDangerZone] = useState<boolean>(true); //Guarda a informação se a zona de perigo está ativa
  const [dateUser, setDateUser] = useState<Date>(new Date()); //Guarda a data selecionada pelo usuário

  const checkEnable = title.trim().length > 0; //Verifica se o título não está vazio para habilitar o botão

  const dateObj = new Date(dateInitial);

  return (
    <main>
      <h1 className="text-lg font-medium text-center">Adicione sua tarefa</h1>
      <section className="flex items-center mt-6 gap-3">
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
                setDangerZone(false);
                setDateInitial(new Date().toISOString());
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
                  <Inputs
                    type="text"
                    placeholder="Insira o título"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div>
                  <h2 className="w-full text-center font-medium ">
                    Descreva como deverá ser esta tarefa:
                  </h2>
                  <Inputs
                    type="text"
                    placeholder="Descrição da tarefa"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div>
                  <h2 className="w-full text-center font-medium ">
                    Qual o horario de entrega desta tarefa?:
                  </h2>
                  <Inputs
                    type="time"
                    placeholder={
                      dateUser?.toLocaleTimeString("pt-BR") ||
                      "Selecione o horário"
                    }
                    value={dateUser?.toLocaleTimeString("pt-BR") || ""}
                    onChange={(e) =>
                      setDateUser(new Date(`1970-01-01T${e.target.value}`))
                    }
                  />
                </div>
                <div className="flex flex-col justify-center items-center">
                  <h2 className="w-full text-center font-medium mb-2">
                    Para quando deverá ser finalizado esta tarefa?
                  </h2>
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
              id="123"
              title={title}
              description={description}
              dateInitial={dateInitial}
              date={date.toISOString()}
              checkActive={checkActive}
              dangerZone={dangerZone}
              dateUser={dateUser.toISOString()}
              setDateInitial={setDateInitial}
              setCheckActive={setCheckActive}
            />
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction>Criar tarefa</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </section>
    </main>
  );
};

export default Header;

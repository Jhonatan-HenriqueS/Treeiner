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
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [title, setTitle] = useState<string>("");
  const [showError, setShowError] = useState<boolean>(false);

  const checkEnable = title.length > 0;

  const handleClick = () => {
    if (title.trim().length === 0) {
      setShowError(true);
    }
  };
  return (
    <main>
      <h1 className="text-lg font-medium text-center">Adicione sua tarefa</h1>
      <section className="flex items-center mt-6 gap-3">
        <div>
          <Input
            className="bg-primary text-white text-center border-none p-6 rounded-3xl
            placeholder:text-white focus:placeholder:opacity-40 transition-all
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary"
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
            >
              <Plus className="mx-2" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="flex flex-col justify-center items-center ">
            <AlertDialogHeader>
              <AlertDialogTitle className="w-full text-center">
                Descreva como deverá ser seu check-list
              </AlertDialogTitle>
              <Input
                className="mt-5 bg-primary text-white text-center border-none p-6 rounded-3xl
            placeholder:text-white focus:placeholder:opacity-40 transition-all
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary"
                type="text"
                placeholder={title}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <AlertDialogDescription className="mt-4">
                This action cannot be undone. This will permanently delete your
                account from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div>
              <h2>{title}</h2>
            </div>
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

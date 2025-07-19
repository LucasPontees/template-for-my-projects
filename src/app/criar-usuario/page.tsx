"use client"

import { useState, useRef } from "react";
import { api } from "@/http/api";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


interface User {
  name: string;
  surname: string;
  login: string;
  password: string;
}

const userSchema = z.object({
  name: z.string().min(3, "Nome obrigatório"),
  surname: z.string().min(3, "Sobrenome obrigatório"),
  login: z.string().min(3, "Login obrigatório"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export default function CriarUsuarioPage() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const formRef = useRef<HTMLFormElement>(null);
  const [mensagem, setMensagem] = useState("");

  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});
    const userData: User = { name, surname, password, login };
    const result = userSchema.safeParse(userData);
    if (!result.success) {
      const fieldErrors: { [key: string]: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      await api.post("auth/register", {
        json: { name, surname, login, password },
      });
      setMensagem("Usuário criado com sucesso!");
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (error) {
      setMensagem("Falha na criação do usuário!");
      setTimeout(() => (setMensagem("")), 1000);

    }
  }

  return (
    <div className="min-h-screen bg-background text-text flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-background rounded-2xl shadow-ld p-8 border border-border">
        <h1 className="text-2xl text-text text-center mb-6">Criar conta no Cash Alto</h1>
        <form ref={formRef} onSubmit={handleSubmit} className="block mb-1 text-sm">
          <div>
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              placeholder="Nome"
              name="name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-background border border-border text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
            {errors.name && <div>{errors.name}</div>}
          </div>
          <div>
            <label htmlFor="surname" className="block mb-1 text-sm">Sobrenome</label>
            <input
              type="text"
              id="surname"
              placeholder="Sobrenome"
              name="surname"
              value={surname}
              onChange={e => setSurname(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-background border border-border text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"

            />
            {errors.surname && <div>{errors.surname}</div>}
          </div>
          <div>
            <label htmlFor="login" className="block mb-1 text-sm">login</label>
            <input
              type="text"
              id="login"
              placeholder="login"
              name="login"
              value={login}
              onChange={e => setLogin(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-background border border-border text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
            {errors.login && <div>{errors.login}</div>}
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 text-sm">Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="**********"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-background border border-border text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
            {errors.password && <div>{errors.password}</div>}
          </div>
          <div>
            {mensagem && (
              <div className="mt-2 text-center text-sm text-red-600 space-x-2">
                {mensagem}
              </div>
            )}
          </div>

          <Button
            type="submit"
            className="w-full mt-2 bg-primary hover:bg-primary-dark text-white py-2 rounded-lg font-medium"
          >
            Criar
          </Button>
          <p className="mt-6 text-center text-sm text-muted">
            Já possui conta?{' '}
            <a href="/login" className="text-primary hover:underline">ir para login</a>
          </p>
        </form>
      </div>
    </div>
  );
}




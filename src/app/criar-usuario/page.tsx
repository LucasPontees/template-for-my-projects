"use client"

import { useState, useRef } from "react";
import { api } from "@/http/api";
import { z } from "zod";

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


  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});
    const result = userSchema.safeParse({ name, surname, password, login });
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
      setName("");
      setSurname("");
      setLogin("");
      setPassword("");
      setTimeout(() => setMensagem(""), 3000);
    } catch (error) {
      setMensagem("Falha na criação do usuário!");
      setTimeout(() => setMensagem(""), 3000);

    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="border border-border rounded-md p-2"
          />
          {errors.name && <div>{errors.name}</div>}
        </div>
        <div>
          <label htmlFor="surname">Surname:</label>
          <input
            type="text"
            id="surname"
            name="surname"
            value={surname}
            onChange={e => setSurname(e.target.value)}
            className="border border-border rounded-md p-2"

          />
          {errors.surname && <div>{errors.surname}</div>}
        </div>
        <div>
          <label htmlFor="login">login:</label>
          <input
            type="text"
            id="login"
            name="login"
            value={login}
            onChange={e => setLogin(e.target.value)}
            className="border border-border rounded-md p-2"
          />
          {errors.login && <div>{errors.login}</div>}
        </div>
        <div>
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="border border-border rounded-md p-2"
          />
          {errors.password && <div>{errors.password}</div>}
        </div>
        <div>
          {mensagem && (
            <div className="mt-2 text-center text-sm text-red-600">
              {mensagem}
            </div>
          )}
        </div>

        <button type="submit" className="bg-primary text-text px-4 py-2 rounded-md cursor-pointer">Criar</button>
      </form>
    </div>
  );
}




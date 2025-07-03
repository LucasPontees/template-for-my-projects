"use client"

import { useState, useRef } from "react";
import { apiForm } from "@/http/api";
import { z } from "zod";

const userSchema = z.object({
  name: z.string().min(2, "Nome obrigatório"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  avatarUrl: z.any().optional(),
});

export default function CriarUsuarioPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});
    const result = userSchema.safeParse({ name, email, password, avatarUrl });
    if (!result.success) {
      const fieldErrors: { [key: string]: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    if (avatarUrl) formData.append("avatarUrl", avatarUrl);
    try {
      await apiForm.post("users", { body: formData });
      alert("Usuário criado com sucesso!");
      setName("");
      setEmail("");
      setPassword("");
      setAvatarUrl(null);
      formRef.current?.reset();
    } catch (error) {
      alert("Erro ao criar usuário.");
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
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="border border-border rounded-md p-2"

          />
          {errors.email && <div>{errors.email}</div>}
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
          <label htmlFor="avatarUrl">Avatar:</label>
          <input
            type="file"
            id="avatarUrl"
            name="avatarUrl"
            accept="image/*"
            onChange={e => setAvatarUrl(e.target.files ? e.target.files[0] : null)}
          />
          {errors.avatarUrl && <div>{errors.avatarUrl}</div>}
        </div>
        <button type="submit" className="bg-primary text-text px-4 py-2 rounded-md cursor-pointer">Criar</button>
      </form>
    </div>
  );
}




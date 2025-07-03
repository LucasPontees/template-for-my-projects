"use client";

import { useEffect, useState } from "react";
import { apiForm } from "@/http/api"; // ajuste o caminho se necessário

type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
};

export default function EditarUsuarioPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await apiForm.get("users").json<User[]>();
        setUsers(data);
      } catch (err) {
        setError("Erro ao buscar usuários.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Email</th>
          <th>Avatar</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
              {user.avatarUrl ? (
                <img
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${user.avatarUrl}`}
                  alt={`Avatar de ${user.name}`}
                  width={40}
                  height={40}
                />
              ) : (
                "Sem avatar"
              )}
            </td>
            <td>
              <button onClick={() => console.log("Editar", user.id)}>
                Editar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

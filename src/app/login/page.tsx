"use client"
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/http/api";
import Link from 'next/link';

export default function LoginPage() {

    const [form, setForm] = useState({
        login: '',
        password: ''
    });
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState('');
    const router = useRouter();
    const [mensagem, setMensagem] = useState("");


    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!form.login || !form.password) return;
        setCarregando(true);
        setErro('');
        try {

            await api.post("auth/login", {
                json: { login: form.login, password: form.password },
            });

            setMensagem("Login realizado com sucesso!");
            setTimeout(() => {
                setTimeout(() => {
                    router.push("/dashboard");
                }, 1000);
            }, 1000);
        } catch (error) {
            setMensagem("Credenciais inválidas!");
            setTimeout(() => (setMensagem("")), 1000);
        } finally {
            setCarregando(false);
        }
    }

    return (
        <div className="min-h-screen bg-background text-text flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-background rounded-2xl shadow-ld p-8 border border-border">
                <h1 className="text-2xl text-text text-center mb-6">Entrar no Cash Alto</h1>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="login" className="block mb-1 text-sm">login</label>
                        <input
                            id="login"
                            type="login"
                            required
                            className="w-full px-4 py-2 rounded-lg bg-background border border-border text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                            placeholder="login"
                            autoComplete="off"
                            name="login"
                            value={form.login}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block mb-1 text-sm">Senha</label>
                        <input
                            id="password"
                            type="password"
                            required
                            className="w-full px-4 py-2 rounded-lg bg-background border border-border text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                            placeholder="••••••••"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" className="accent-primary" />
                            <span>Lembrar senha</span>
                        </label>
                        <Link href="/redefinir-senha" className="text-primary hover:underline">Esqueceu a senha?</Link>
                    </div>

                    {mensagem && <p className="text-red-500">{mensagem}</p>}

                    <Button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary-dark text-white py-2 rounded-lg font-medium"
                    >
                        Entrar
                    </Button>
                </form>

                <p className="mt-6 text-center text-sm text-muted">
                    Não tem uma conta?{' '}
                    <Link href="/criar-usuario" className="text-primary hover:underline">Cadastre-se</Link>
                </p>
            </div>
        </div>
    );
}




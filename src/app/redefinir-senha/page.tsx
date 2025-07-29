import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function EditarUsuarioPage() {

  return (
    <div className="min-h-screen bg-background text-text flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-background rounded-2xl shadow-ld p-8 border border-border">
        <h1 className="text-2xl text-text text-center mb-6">Solicitar Redefinição de senha</h1>
        <form className="space-y-4" >
          <div>
            <label htmlFor="email" className="block mb-1 text-sm">Email</label>
            <input
              id="email"
              type="email"
              required
              className="w-full px-4 py-2 rounded-lg bg-background border border-border text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="informe seu email"
              autoComplete="off"
              name="email"
            // value={form.login}
            // onChange={handleChange}
            />
          </div>
          <div className="flex ">
            <Link href="/login" className="text-primary hover:underline">Voltar</Link>
          </div>
        </form>
        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary-dark text-white py-2 rounded-lg font-medium"
        >
          Solicitar
        </Button>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";

export default function Games() {
  return (
    <main className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Selecciona los juegos</h1>
      <br />
      <section className="h-[400px] space-y-6 flex flex-col">
        <Link
          to="/games/frontend"
          className="p-3 bg-green-700 border-4 border-transparent rounded-md hover:border-green-800"
        >
          <span className="text-xl font-bold">FrontEnd</span>
          <p className="text-lg">
            Responde a preguntas sobre el desarrollo FrontEnd
          </p>
        </Link>
        <Link
          to="/games/backend"
          className="p-3 bg-blue-500 border-4 border-transparent rounded-md hover:border-blue-600"
        >
          <span>BackEnd</span>
          <p>Responde a preguntas sobre el desarrollo BackEnd</p>
        </Link>
      </section>
    </main>
  );
}

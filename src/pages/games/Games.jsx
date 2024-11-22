import { Link } from "react-router-dom";

const games = [
  {
    to: "/games/frontend",
    bgColor: "bg-green-700 hover:border-green-800",
    borderColor: "hover:border-green-800",
    title: "FrontEnd",
    description: "Responde a preguntas sobre el desarrollo FrontEnd",
  },
  {
    to: "/games/backend",
    bgColor: "bg-blue-500 hover:border-blue-600",
    borderColor: "hover:border-blue-600",
    title: "BackEnd",
    description: "Responde a preguntas sobre el desarrollo BackEnd",
  },
];

export default function Games() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4">
      <header>
        <h1 className="text-4xl font-bold text-center">Selecciona los juegos</h1>
        <p className="mt-2 text-lg text-gray-600 text-center">
          Explora tus conocimientos en desarrollo FrontEnd y BackEnd.
        </p>
      </header>

      <section
        className="flex flex-col items-center justify-center mt-8 space-y-6"
        role="navigation"
        aria-label="Opciones de juegos"
      >
        {games.map((game, index) => (
          <Link
            key={index}
            to={game.to}
            className={`p-4 text-center border-4 border-transparent rounded-md text-white ${game.bgColor}`}
          >
            <span className="block text-xl font-bold">{game.title}</span>
            <p className="text-lg">{game.description}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
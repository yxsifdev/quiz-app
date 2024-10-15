import JavaScriptIcon from "@icons/JavaScript";
import ReactIcon from "@icons/React";
import { Link } from "react-router-dom";

function App() {
  return (
    <main className="flex justify-center items-center min-h-[50vh]">
      <div className="flex flex-col items-center">
        <h1 className="mb-5 text-5xl font-bold">Cuestionario hecho con...</h1>
        <div className="flex items-center gap-4 mb-5">
          <ReactIcon />
          <JavaScriptIcon />
        </div>
        <Link
          to="/games"
          className="px-4 py-2 text-lg font-medium bg-blue-400 rounded-md"
        >
          Comenzar
        </Link>
      </div>
    </main>
  );
}

export default App;

// eslint-disable-next-line react/prop-types
function Puntaje({ score, totalQuestions, attempts }) {
  return (
    <div className="p-4 mt-5 text-white bg-gray-800 border rounded-lg">
      <h2 className="text-2xl font-bold">Resultados</h2>
      <p>Total de preguntas: {totalQuestions}</p>
      <p>
        Acertadas: {score}/{totalQuestions}
      </p>
      <p>Puntaje actual: {((score / totalQuestions) * 100).toFixed(2)}%</p>
      <p>Intentos: {attempts}</p>
    </div>
  );
}

export default Puntaje;

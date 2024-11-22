import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import programmingData from "@data/programming.json";
import Puntaje from "@components/Puntaje.jsx";

function BackEndQuiz() {
  const navigate = useNavigate();
  const questions = programmingData[0]?.backend || [];
  const [selectedOptions, setSelectedOptions] = useState(
    questions.length ? Array(questions.length).fill(null) : []
  );
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const savedScore = localStorage.getItem("backendQuizScore");
      const savedAttempts = localStorage.getItem("backendQuizAttempts");
      if (savedScore) setScore(JSON.parse(savedScore));
      if (savedAttempts) setAttempts(JSON.parse(savedAttempts));
    } catch (e) {
      console.error("Error loading from localStorage:", e);
    }
  }, []);

  const handleOptionChange = useCallback((index, event) => {
    setSelectedOptions((prev) => {
      const updatedOptions = [...prev];
      updatedOptions[index] = event.target.value;
      return updatedOptions;
    });
    setError("");
  }, []);

  const checkAnswers = () => {
    if (selectedOptions.includes(null)) {
      setError("Por favor, responde todas las preguntas antes de enviar.");
      return;
    }

    const totalScore = questions.reduce(
      (acc, question, index) =>
        selectedOptions[index] === question.answer ? acc + 1 : acc,
      0
    );

    setScore(totalScore);
    setAttempts((prev) => {
      const updatedAttempts = prev + 1;
      localStorage.setItem("backendQuizAttempts", JSON.stringify(updatedAttempts));
      return updatedAttempts;
    });

    localStorage.setItem("backendQuizScore", JSON.stringify(totalScore));
    setSubmitted(true);
  };

  const restartQuiz = () => {
    setSelectedOptions(Array(questions.length).fill(null));
    setSubmitted(false);
    setError("");
  };

  if (!questions.length) {
    return <div className="text-center text-red-500 text-lg">No se encontraron preguntas para el cuestionario.</div>;
  }

  return (
    <main className="min-h-screen bg-gray-800 text-white p-6 flex flex-col items-center">
      <header className="w-full max-w-4xl mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-green-400">BackEnd Quiz</h1>
          <button
            onClick={() => navigate("/games")}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md"
          >
            Volver hacia atras
          </button>
        </div>
        <Puntaje
          score={score}
          totalQuestions={questions.length}
          attempts={attempts}
        />
      </header>

      <section className="w-full max-w-4xl bg-gray-900 rounded-lg shadow-lg p-6 space-y-6">
        {questions.map((question, index) => (
          <div key={question.id} className="p-4 bg-gray-700 rounded-md">
            <h2 className="text-lg font-semibold">{question.question}</h2>
            <ul className="space-y-2 mt-3">
              {question.options.map((option, optionIndex) => (
                <li key={optionIndex} className="flex items-center">
                  <input
                    type="radio"
                    name={`quiz-option-${index}`}
                    value={option}
                    checked={selectedOptions[index] === option}
                    onChange={(e) => handleOptionChange(index, e)}
                    className="mr-2 accent-green-400"
                  />
                  <label>{option}</label>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <div className="mt-8 flex space-x-4">
        <button
          onClick={checkAnswers}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white"
        >
          Enviar Respuestas
        </button>

        {submitted && (
          <button
            onClick={restartQuiz}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-white"
          >
            Intentar de nuevo
          </button>
        )}
      </div>

      {error && <p className="mt-4 text-red-500">{error}</p>}
    </main>
  );
}

export default BackEndQuiz;
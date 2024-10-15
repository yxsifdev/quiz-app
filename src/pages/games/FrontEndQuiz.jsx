import { useEffect, useState } from "react";
import programmingData from "@data/programming.json";
import Puntaje from "@components/Puntaje.jsx";

function FrontEndQuiz() {
  const questions = programmingData[0].frontend;
  const [selectedOptions, setSelectedOptions] = useState(
    Array(questions.length).fill(null)
  );
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedScore = localStorage.getItem("frontendQuizScore");
    const savedAttempts = localStorage.getItem("frontendQuizAttempts");
    if (savedScore) {
      setScore(JSON.parse(savedScore));
    }
    if (savedAttempts) {
      setAttempts(JSON.parse(savedAttempts));
    }
  }, []);

  const handleOptionChange = (index, event) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[index] = event.target.value;
    setSelectedOptions(updatedOptions);
    setError("");
  };

  const checkAnswers = () => {
    if (selectedOptions.includes(null)) {
      setError("Por favor, responde todas las preguntas antes de enviar.");
      return;
    }

    const totalScore = questions.reduce((score, question, index) => {
      return selectedOptions[index] === question.answer ? score + 1 : score;
    }, 0);

    setScore(totalScore);
    localStorage.setItem("frontendQuizScore", JSON.stringify(totalScore));
    const updatedAttempts = attempts + 1;
    setAttempts(updatedAttempts);
    localStorage.setItem(
      "frontendQuizAttempts",
      JSON.stringify(updatedAttempts)
    );
    setSubmitted(true);
  };

  const restartQuiz = () => {
    setSelectedOptions(Array(questions.length).fill(null));
    setSubmitted(false);
    setScore(0);
    setError("");
    localStorage.removeItem("frontendQuizScore");
    // No borramos los intentos, ya que queremos mantener el conteo
  };

  return (
    <>
      <div className="mb-5 text-4xl font-bold text-green-500">FrontEndQuiz</div>

      <div className="absolute top-5 right-5">
        <Puntaje
          score={score}
          totalQuestions={questions.length}
          attempts={attempts}
        />
      </div>

      <section className="p-5 text-white bg-gray-900 rounded-lg shadow-md questions-frontend">
        {questions.map((question, index) => (
          <div key={question.id} className="mb-4">
            <h2 className="text-xl font-semibold">{question.question}</h2>
            <ul className="pl-5 list-disc">
              {question.options.map((option, optionIndex) => (
                <li key={optionIndex}>
                  <input
                    type="radio"
                    name={`quiz-option-${index}`}
                    value={option}
                    checked={selectedOptions[index] === option}
                    onChange={(e) => handleOptionChange(index, e)}
                    className="mr-2"
                  />
                  {option}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <button
        onClick={checkAnswers}
        className="px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        Enviar Respuestas
      </button>

      {error && <p className="mt-2 text-red-500">{error}</p>}

      {submitted && (
        <div className="mt-5">
          <button
            onClick={restartQuiz}
            className="px-4 py-2 mt-4 text-white bg-red-600 rounded hover:bg-red-700"
          >
            Intentar de nuevo
          </button>
        </div>
      )}
    </>
  );
}

export default FrontEndQuiz;

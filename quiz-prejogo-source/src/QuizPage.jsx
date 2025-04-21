import { useState } from "react";

const questions = [
  {
    question: "Qual país venceu a Copa do Mundo de 2002?",
    options: ["Alemanha", "Brasil", "Argentina", "França"],
    answer: "Brasil",
  },
  {
    question: "Quem é o maior artilheiro da história da Champions League?",
    options: ["Messi", "Cristiano Ronaldo", "Lewandowski", "Benzema"],
    answer: "Cristiano Ronaldo",
  },
  {
    question: "Qual dessas posições é mais defensiva?",
    options: ["Atacante", "Zagueiro", "Meia ofensivo", "Ponta"],
    answer: "Zagueiro",
  },
  {
    question: "Quantos jogadores um time tem em campo?",
    options: ["10", "11", "12", "9"],
    answer: "11",
  },
  {
    question: "Onde foi a final da Copa do Mundo de 2014?",
    options: ["Maracanã", "Wembley", "Camp Nou", "Allianz Arena"],
    answer: "Maracanã",
  },
];

export default function QuizPage() {
  const [step, setStep] = useState("intro");
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);

  const startQuiz = () => setStep("quiz");

  const handleAnswer = (selected) => {
    const correct = questions[current].answer;
    if (selected === correct) setScore((prev) => prev + 1);
    setTimeout(() => {
      const next = current + 1;
      if (next < questions.length) {
        setCurrent(next);
      } else {
        setStep("result");
      }
    }, 500);
  };

  const resetQuiz = () => {
    setStep("intro");
    setCurrent(0);
    setScore(0);
  };

  const getResultMessage = () => {
    if (score === questions.length)
      return "Você é o camisa 10 das apostas! Craque demais!";
    if (score >= questions.length - 1)
      return "Quase perfeito! Você conhece muito de futebol.";
    if (score >= questions.length / 2)
      return "Mandou bem, mas dá pra melhorar!";
    return "Hoje ficou no banco, mas continue tentando!";
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        {step === "intro" && (
          <>
            <h1 className="text-2xl font-bold mb-4">Quizz Pré-Jogo</h1>
            <p className="text-gray-600 mb-6">
              Teste seu conhecimento antes do apito inicial!
            </p>
            <button
              onClick={startQuiz}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-semibold transition"
            >
              Começar
            </button>
          </>
        )}

        {step === "quiz" && (
          <>
            <div className="text-sm text-gray-400 mb-2">
              Pergunta {current + 1} de {questions.length}
            </div>
            <h2 className="text-lg font-semibold mb-6">
              {questions[current].question}
            </h2>
            <div className="space-y-3 text-left">
              {questions[current].options.map((option) => (
                <button
                  key={option}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-gray-50 hover:bg-blue-50 transition"
                  onClick={() => handleAnswer(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        )}

        {step === "result" && (
          <>
            <h2 className="text-xl font-bold mb-4">Resultado</h2>
            <p className="text-4xl font-extrabold text-blue-700 mb-2">
              {score} / {questions.length}
            </p>
            <p className="mb-6">{getResultMessage()}</p>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-semibold transition"
              onClick={resetQuiz}
            >
              Tentar de novo
            </button>
          </>
        )}
      </div>
    </div>
  );
}

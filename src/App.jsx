import React, { useState, useEffect } from "react";
import { Brain, CheckCircle2, XCircle, BookOpen } from "lucide-react";
import { questions } from "./data/questions";
import { QuizHistory } from "./components/QuizHistory";
import { saveQuizAttempt, getQuizAttempts, clearQuizAttempts } from "./lib/db";

const SECONDS_PER_QUESTION = 30;

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [integerAnswer, setIntegerAnswer] = useState("");
  const [attempts, setAttempts] = useState([]);
  const [timePerQuestion, setTimePerQuestion] = useState([]);
  const [startTime, setStartTime] = useState(Date.now());
  const [showQuiz, setShowQuiz] = useState(false);
  const [timeLeft, setTimeLeft] = useState(SECONDS_PER_QUESTION);

  useEffect(() => {
    loadAttempts();
  }, []);

  useEffect(() => {
    if (showQuiz && !showResult) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleTimeUp();
            return SECONDS_PER_QUESTION;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [showQuiz, showResult, currentQuestion]);

  const loadAttempts = async () => {
    const loadedAttempts = await getQuizAttempts();
    setAttempts(loadedAttempts.sort((a, b) => b.timestamp - a.timestamp));
  };

  const handleAnswer = async (answer) => {
    const currentQ = questions[currentQuestion];
    const isCorrect =
      currentQ.type === "integer"
        ? Number(answer) === currentQ.correctAnswer
        : answer === currentQ.correctAnswer;

    if (currentQ.type === "multiple-choice") {
      setSelectedAnswer(answer);
    }

    const timeSpent = SECONDS_PER_QUESTION - timeLeft;
    setTimePerQuestion([...timePerQuestion, timeSpent]);

    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setIntegerAnswer("");
        setTimeLeft(SECONDS_PER_QUESTION);
      }, 1000);
    } else {
      const attempt = {
        timestamp: Date.now(),
        score: score + (isCorrect ? 1 : 0),
        totalQuestions: questions.length,
        timePerQuestion: [...timePerQuestion, timeSpent],
      };
      await saveQuizAttempt(attempt);
      await loadAttempts();
      setShowResult(true);
    }
  };

  const handleTimeUp = async () => {
    const timeSpent = SECONDS_PER_QUESTION;
    setTimePerQuestion([...timePerQuestion, timeSpent]);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setIntegerAnswer("");
      setTimeLeft(SECONDS_PER_QUESTION);
    } else {
      const attempt = {
        timestamp: Date.now(),
        score: score,
        totalQuestions: questions.length,
        timePerQuestion: [...timePerQuestion, timeSpent],
      };
      await saveQuizAttempt(attempt);
      await loadAttempts();
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setIntegerAnswer("");
    setTimePerQuestion([]);
    setStartTime(Date.now());
    setShowQuiz(false);
    setTimeLeft(SECONDS_PER_QUESTION);
  };

  const handleClearHistory = async () => {
    await clearQuizAttempts();
    setAttempts([]);
  };

  if (!showQuiz) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-white flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-indigo-100">
            <div className="flex justify-center mb-6">
              <BookOpen className="w-16 h-16 text-indigo-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Dacoid Digital ReactJS Assignment
            </h1>
            <p className="text-gray-600 mb-8 text-lg">
              Test your knowledge with our interactive quiz platform
            </p>
            <div className="space-y-4 mb-8 text-left bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-800">
                Instructions:
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>
                  For multiple-choice questions, select the one best answer (A,
                  B, C, or D)
                </li>
                <li>
                  For integer-type questions, write your numerical answer
                  clearly
                </li>
                <li>No calculators unless specified</li>
                <li>You have 30 seconds for each question</li>
              </ul>
            </div>
            <div className="space-y-4">
              <button
                onClick={() => setShowQuiz(true)}
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors duration-200 shadow-md hover:shadow-lg w-full"
              >
                Start Quiz
              </button>
              {attempts.length > 0 && (
                <button
                  onClick={handleClearHistory}
                  className="bg-red-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-red-700 transition-colors duration-200 shadow-md hover:shadow-lg w-full"
                >
                  Clear History
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <Brain className="w-16 h-16 mx-auto mb-4 text-indigo-600" />
            <h1 className="text-3xl font-bold mb-4">Quiz Complete!</h1>
            <p className="text-xl mb-6">
              Your score: {score} out of {questions.length}
            </p>
            <div className="space-y-4">
              <button
                onClick={restartQuiz}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors w-full"
              >
                Try Again
              </button>
              <button
                onClick={handleClearHistory}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors w-full"
              >
                Clear History
              </button>
            </div>
          </div>
          <QuizHistory attempts={attempts} />
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex justify-between items-center mb-6">
            <div className="text-lg font-semibold">
              Question {currentQuestion + 1}/{questions.length}
            </div>
            <div className="text-lg font-semibold text-indigo-600">
              Time Remaining: {timeLeft}s
            </div>
          </div>

          <h2 className="text-xl font-bold mb-6">{currentQ.text}</h2>

          {currentQ.type === "multiple-choice" ? (
            <div className="space-y-4">
              {currentQ.options.map((option, index) => {
                const isCorrect = index === currentQ.correctAnswer;
                const isSelected = selectedAnswer === index;
                const showResult = selectedAnswer !== null;

                return (
                  <button
                    key={index}
                    onClick={() =>
                      selectedAnswer === null && handleAnswer(index)
                    }
                    disabled={selectedAnswer !== null}
                    className={`w-full p-4 text-left rounded-lg border transition-all ${
                      showResult
                        ? isCorrect
                          ? "bg-green-100 border-green-500"
                          : isSelected
                          ? "bg-red-100 border-red-500"
                          : "border-gray-200"
                        : "hover:border-indigo-500 border-gray-200"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {showResult && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      )}
                      {showResult && !isCorrect && isSelected && (
                        <XCircle className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="space-y-4">
              <input
                type="number"
                value={integerAnswer}
                onChange={(e) => setIntegerAnswer(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && integerAnswer) {
                    handleAnswer(integerAnswer);
                  }
                }}
                className="w-full p-4 text-left rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                placeholder="Enter your answer..."
              />
              <button
                onClick={() => integerAnswer && handleAnswer(integerAnswer)}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Submit Answer
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

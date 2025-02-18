import React from 'react';
import { History } from 'lucide-react';

export function QuizHistory({ attempts }) {
  return (
    <div className="w-full max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <History className="w-6 h-6" />
        <h2 className="text-xl font-bold">Quiz History</h2>
      </div>
      
      {attempts.length === 0 ? (
        <p className="text-gray-500">No attempts yet. Take the quiz to see your history!</p>
      ) : (
        <div className="space-y-4">
          {attempts.map((attempt, index) => (
            <div
              key={attempt.id}
              className="p-4 border rounded-lg bg-gray-50"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">Attempt #{attempts.length - index}</span>
                <span className="text-sm text-gray-500">
                  {new Date(attempt.timestamp).toLocaleString()}
                </span>
              </div>
              <div className="mt-2 flex gap-4">
                <span className="text-sm">
                  Score: {attempt.score}/{attempt.totalQuestions}
                </span>
                <span className="text-sm">
                  Avg. Time: {(attempt.timePerQuestion.reduce((a, b) => a + b, 0) / attempt.timePerQuestion.length).toFixed(1)}s per question
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

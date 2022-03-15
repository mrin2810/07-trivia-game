/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useCallback, useEffect, useState } from 'react';
import Question from './components/Question';
import CategorySelector from './components/CategorySelector';
import ResultModal from './components/ResultModal';
import Scoreboard from './components/Scoreboard';
import './App.css';

export default function App() {

  const [question, setQuestion] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('any');
  const [isCorrect, setIsCorrect] = useState(null);


  const getQuestion = useCallback(() => {
    let url = 'https://opentdb.com/api.php?amount=1';
    if(selectedCategory !== 'any') url += `&category=${selectedCategory}`;

    fetch(url)
    .then(res => res.json())
    .then(data => {
      setQuestion(data.results[0]);
    });
  }, [selectedCategory])

  useEffect(() => {
    getQuestion();
  }, [getQuestion]);

  function handleQuestionAnswered(answer) {
    setIsCorrect(answer === question.correct_answer);
  }

  return (
    <div className="app">
      {/* show the result modal ----------------------- */}
      {isCorrect !== null && <ResultModal isCorrect={isCorrect} />}

      {/* question header ----------------------- */}
      <div className="question-header">
        <CategorySelector 
          category={selectedCategory} 
          chooseCategory={setSelectedCategory}
        />
        <Scoreboard />
      </div>

      {/* the question itself ----------------------- */}
      <div className="question-main">
        {question && <Question 
          question={question}
          answerQuestion={handleQuestionAnswered}
        />}
      </div>

      {/* question footer ----------------------- */}
      <div className="question-footer">
        <button onClick={getQuestion}>Go to next question 👉</button>
      </div>
    </div>
  );
}

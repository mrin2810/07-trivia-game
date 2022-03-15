/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useCallback, useEffect, useState } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import Question from './components/Question';
import CategorySelector from './components/CategorySelector';
import ResultModal from './components/ResultModal';
import Scoreboard from './components/Scoreboard';
import './App.css';

export default function App() {

  const [question, setQuestion] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('any');
  const [isCorrect, setIsCorrect] = useState(null);

  const override = {
    display: 'block',
    margin: '0 auto',
    borderColor: '#409182',
    border: '4px solid'
  }

  const getQuestion = useCallback(() => {
    let url = 'https://opentdb.com/api.php?amount=1';
    if(selectedCategory !== 'any') url += `&category=${selectedCategory}`;
    setIsCorrect(null);
    setQuestion(null);
    fetch(url)
    .then(res => res.json())
    .then(data => {
      setQuestion(data.results[0]);
    });
  }, [selectedCategory]);

  useEffect(() => {
    getQuestion();
  }, [getQuestion]);

  function handleQuestionAnswered(answer) {
    const isAnswerCorrect = answer === question.correct_answer;
    setIsCorrect(isAnswerCorrect);
  }

  return (
    <div className="app">
      {/* show the result modal ----------------------- */}
      {isCorrect !== null && <ResultModal isCorrect={isCorrect} question={question} getQuestion={getQuestion}/>}

      {/* question header ----------------------- */}
      <div className="question-header">
        <CategorySelector 
          category={selectedCategory} 
          chooseCategory={setSelectedCategory}
        />
        <Scoreboard 
          isCorrect={isCorrect}
        />
      </div>

      {/* the question itself ----------------------- */}
      <div className="question-main">
        {question && <Question 
          question={question}
          answerQuestion={handleQuestionAnswered}
        />}
        {question === null && <ClipLoader loading={true} css={override} size={150} />}
      </div>

      {/* question footer ----------------------- */}
      <div className="question-footer">
        <button onClick={getQuestion}>Go to next question 👉</button>
      </div>
    </div>
  );
}

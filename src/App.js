/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import Question from './components/Question';
import CategorySelector from './components/CategorySelector';
import ResultModal from './components/ResultModal';
import Scoreboard from './components/Scoreboard';
import './App.css';
import useTrivia from './useTrivia';

export default function App() {

  const { question, getQuestion, category, setCategory} = useTrivia();
  const [isCorrect, setIsCorrect] = useState(null);

  const override = {
    display: 'block',
    margin: '0 auto',
    borderColor: '#409182',
    border: '4px solid'
  }

  function handleNextQuestion() {
    setIsCorrect(null);
    getQuestion();
  }

  function handleQuestionAnswered(answer) {
    const isAnswerCorrect = answer === question.correct_answer;
    setIsCorrect(isAnswerCorrect);
  }

  return (
    <div className="app">
      {/* show the result modal ----------------------- */}
      {isCorrect !== null && <ResultModal isCorrect={isCorrect} question={question} getQuestion={handleNextQuestion}/>}

      {/* question header ----------------------- */}
      <div className="question-header">
        <CategorySelector 
          category={category} 
          chooseCategory={setCategory}
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
        {question === null && <ClipLoader loading={true} css={override} size={50} />}
      </div>

      {/* question footer ----------------------- */}
      <div className="question-footer">
        <button onClick={handleNextQuestion}>Go to next question 👉</button>
      </div>
    </div>
  );
}

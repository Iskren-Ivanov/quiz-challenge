import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import setResultToLocalStore from '../../helperFunc/setResultToLocalStore';
import Icons from '../../alphabetIcons/exportIcons';

const Quiz = ({ data }) => { 
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentQuestion = data[currentIndex];

  let interval;
  const router = useRouter();
  const [boxIsVisible, setBoxIsVisible] = useState(true);
  const progressRef = useRef();
  const quizBoxRef = useRef();
  const toggleClick = (answerId) => {
    currentQuestion.correctAnswerId === answerId
      ? setResultToLocalStore(true)
      : setResultToLocalStore(false);
    nextQuiz();
  };

  const resetProgress = () => {
    clearInterval(interval);
    progressRef.current.style.width = 0;
  };

  const nextQuiz = () => {
    setTimeout(() => {
      if (currentIndex < data.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        router.push(`/result`);
      }
    }, 500);
    slideUpAnimation();
  };

  const slideUpAnimation = () => {
    quizBoxRef.current.style.height = '60vh';
    setBoxIsVisible(false);
    setTimeout(function () {
      setBoxIsVisible(true);
      if (quizBoxRef.current) {
        quizBoxRef.current.style.height = 'auto';
      }
    }, 1000);
    resetProgress();
  };

  useEffect(() => {
    const allowedTime = 1 * 1999000;
    let counter = 0;
    interval = setInterval(function () { 
      if (counter >= allowedTime) {
        counter = 0;
        setResultToLocalStore(false);
        nextQuiz();
      } else {
        counter++;
        progressRef.current.style.width = `${counter / 10}%`;
      }
    }, 1);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return currentQuestion ? (
    <span className='quiz-page'>
      <div className='quiz-box' ref={quizBoxRef}>
        <div className='progress'>
          <div className='bar' ref={progressRef} />
        </div>
        <div
          className={boxIsVisible ? 'quiz-box__visible' : 'quiz-box__hidden'}
        >
          <div className='quiz-box__content'>
            <h1>
              Question with ID: {currentQuestion.id} {currentQuestion.question}
            </h1>
          </div>
          <div className='quiz-box__answers'>
            {currentQuestion.answers.map((answer) => (
              <div key={answer.id} className='answer-container'>
                <img src={Icons[answer.id].src} />
                <button
                  className='btn-answer'
                  key={answer.id}
                  onClick={() => toggleClick(answer.id)}
                >
                  {answer.id}: {answer.text}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </span>
  ) : null;
};

export default Quiz;

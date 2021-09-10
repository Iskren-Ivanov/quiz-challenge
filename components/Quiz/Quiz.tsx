import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import setResultToLocalStorage from '../../helperFunc/setResultToLocalStorage';
import Icons from '../../alphabetIcons/exportIcons';

interface IData {
  id: number;
  question: string;
  answers: [
    {
      id: number;
      text: string;
    }
  ];
  correctAnswerId: number;
}
interface PageProps {
  data: IData[];
}

function Quiz({ data }: PageProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentQuestion = data[currentIndex];

  let interval: NodeJS.Timer;

  const router = useRouter();
  const [boxIsVisible, setBoxIsVisible] = useState(true);
  const progressRef = useRef<HTMLDivElement | any>(null);
  const quizBoxRef = useRef<HTMLDivElement | any>(null);

  function toggleClick(answerId) {
    currentQuestion.correctAnswerId === answerId
      ? setResultToLocalStorage(true)
      : setResultToLocalStorage(false);
    nextQuiz();
  }

  function resetProgress() {
    clearInterval(interval);
    if (progressRef.current) {
      progressRef.current.style.width = 0;
    }
  }

  function nextQuiz() {
    setTimeout(() => {
      if (currentIndex < data.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        router.push('/result');
      }
    }, 500);
    slideUpAnimation();
  }

  function slideUpAnimation() {
    if (quizBoxRef.current) {
      quizBoxRef.current.style.height = '60vh';
    }
    setBoxIsVisible(false);
    setTimeout(function () {
      setBoxIsVisible(true);
      if (quizBoxRef.current) {
        if (quizBoxRef.current) {
          quizBoxRef.current.style.height = 'auto';
        }
      }
    }, 1000);
    resetProgress();
  }

  useEffect(() => {
    const allowedTime = 1 * 10000;
    let counter = 0;
    interval = setInterval(function () {
      if (counter >= allowedTime) {
        counter = 0;
        setResultToLocalStorage(false);
        nextQuiz();
      } else {
        counter++;
        if (progressRef.current) {
          progressRef.current.style.width = `${counter / 100}%`;
        }
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
              {currentQuestion.id}: {currentQuestion.question}
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
}

export default Quiz;

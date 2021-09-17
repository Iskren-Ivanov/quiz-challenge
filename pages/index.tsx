import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
 
function QuizPage() {
  const [boxIsVisible, setBoxIsVisible] = useState(true);
  const router = useRouter();
  useEffect(() => {
    localStorage.clear();
  }, []);
 
  const handlerClick = () => {
    setBoxIsVisible(false);
    setTimeout(() => {
      router.push('/quiz');
    }, 800);
  };
 
  return (
    <Fragment>
      <div className='start-quiz'>
      <div className='start-quiz-box__top' ></div>
        <div className='start-quiz-box'>
          <div
            className={
              boxIsVisible
                ? 'start-quiz-box__visible'
                : 'start-quiz-box__hidden'
            }
          >
            <h1>Are you ready to start the questions?</h1>
            <button className='start-btn' onClick={handlerClick}>
              START
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
 
export default QuizPage;
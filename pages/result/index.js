import { Fragment, useEffect, useState } from 'react';

function Result() {
  const [numberOfQuestion, setNumberOfQuestion] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  useEffect(() => {
    // if (typeof window !== 'undefined') {
      let arrayOfResult = JSON.parse(localStorage.getItem('result'));
      localStorage.clear();
      let correctAnswersCounter = arrayOfResult?.filter((res) => res === true);
      setNumberOfQuestion(arrayOfResult?.length);
      setCorrectAnswers(correctAnswersCounter?.length);
    // }
  }, []);

  return (
    <Fragment>
      <div className='quiz-result'>
        <div className='quiz-rezult-box'>
          <h1>
            Your correct answers from {numberOfQuestion} questions are:
            {correctAnswers}
          </h1>
        </div>
      </div>
    </Fragment>
  );
}

export default Result;

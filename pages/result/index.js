import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

function Result() {
  const [numberOfQuestion, setNumberOfQuestion] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const router = useRouter();
  let arrayOfResult;
  useEffect(() => {
    arrayOfResult = JSON.parse(localStorage.getItem('result'));
    if (arrayOfResult === null) {
      router.push('/');
    }
    localStorage.clear();
    let correctAnswersCounter = arrayOfResult?.filter((res) => res === true);
    setNumberOfQuestion(arrayOfResult?.length);
    setCorrectAnswers(correctAnswersCounter?.length);
  }, []);

  return numberOfQuestion > 0 ? (
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
  ) : null;
}

export default Result;

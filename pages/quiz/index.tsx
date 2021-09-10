import React, { Fragment } from 'react';
import Quiz from '../../components/Quiz/Quiz';
import { withRouter } from 'next/router';
import axios from 'axios';

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

function CurrentQuiz({ data }: PageProps) {
  return (
    <Fragment>
      <Quiz data={data} />
    </Fragment>
  );
}

export default CurrentQuiz;

export async function getStaticProps() {
  const data = await axios
    .get('http://localhost:3000/api')
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return {
    props: {
      data,
    },
  };
}

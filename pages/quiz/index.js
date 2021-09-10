import React, { Fragment, useEffect, useState } from 'react';
import Quiz from '../../components/Quiz/Quiz';
import { withRouter } from 'next/router';
import axios from 'axios';


function CurrentQuiz({ data }) { 
  return (
    <Fragment>
      <Quiz data={data} />
    </Fragment>
  );
}

export default withRouter(CurrentQuiz);

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

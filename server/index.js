const quizData = [
  {
    id: 1,
    question:
      'What are the technical and additional skills that are needed to be a front-end developer?',
    answers: [
      { id: 1, text: 'JavaSript, HTML, CSS, React.js' },
      { id: 2, text: 'Java, CSS, HTML, Next.js' },
      { id: 3, text: 'C#, Python, CSS, HTML' },
      { id: 4, text: 'Ruby, GO, HTML, CSS' },
    ],
    correctAnswerId: 1,
  },
  {
    id: 2,
    question: 'Describe what is the difference between Null and Undefined?',
    answers: [
      { id: 1, text: 'Null is an object with value of undefined' },
      { id: 2, text: 'Null is an object with value of 0.' },
      { id: 3, text: 'Null is an object with no value.' },
      { id: 4, text: 'None of the above' },
    ],
    correctAnswerId: 3,
  },
  {
    id: 3,
    question: 'How can you increase page performance?',
    answers: [
      { id: 1, text: 'Reduce external HTTP requests.' },
      { id: 2, text: 'CDN and Caching' },
      { id: 3, text: 'Minify CSS, JavaScript, HTML' },
      { id: 4, text: 'Аll listed above' },
    ],
    correctAnswerId: 4,
  },
  {
    id: 4,
    question: 'What are some frameworks for testing a JavaScript module?',
    answers: [
      { id: 1, text: 'Vue.js, Angular, Svelte, Node.js' },
      { id: 2, text: 'Angular, Mocha, Next.js, Java' },
      { id: 3, text: 'Ember.js, Backbone.js, Meteor, Jasmine' },
      { id: 4, text: 'Unit.js, Jasmine, QUnit, Mocha' },
    ],
    correctAnswerId: 4,
  },
];

const express = require('express');
const next = require('next');

const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    server.get('/api', (req, res) => {
      return res.send(quizData);
    });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(PORT, (err) => {
      if (err) throw err;
      console.log(`> Ready on ${PORT}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });

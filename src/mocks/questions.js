const questions = [
  {
    type: `artist`,
    song: {
      artist: `Jack Daniels`,
      src: `https://upload.wikimedia.org/wikipedia/commons/1/1f/Uganda_flag_and_national_anthem_-_Oh_Uganda_Land_o.ogg`,
    },
    answers: [
      {
        picture: `http://placehold.it/134x134`,
        artist: `John Snow`,
      },
      {
        picture: `http://placehold.it/134x134`,
        artist: `Jack Daniels`,
      },
      {
        picture: `http://placehold.it/134x134`,
        artist: `Jim Beam`,
      },
    ],
  },
  {
    type: `genre`,
    genre: `rock`,
    answers: [
      {
        src: `https://upload.wikimedia.org/wikipedia/commons/1/1f/Uganda_flag_and_national_anthem_-_Oh_Uganda_Land_o.ogg`,
        genre: `rock`,
      },
      {
        src: `https://upload.wikimedia.org/wikipedia/commons/1/1f/Uganda_flag_and_national_anthem_-_Oh_Uganda_Land_o.ogg`,
        genre: `pop`,
      },
      {
        src: `https://upload.wikimedia.org/wikipedia/commons/1/1f/Uganda_flag_and_national_anthem_-_Oh_Uganda_Land_o.ogg`,
        genre: `jazz`,
      },
      {
        src: `https://upload.wikimedia.org/wikipedia/commons/1/1f/Uganda_flag_and_national_anthem_-_Oh_Uganda_Land_o.ogg`,
        genre: `rock`,
      },
    ],
  }
];

const settings = {
  gameTime: 5,
  errorCount: 3
};

export {questions, settings};

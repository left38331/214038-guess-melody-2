const questions = [
  {
    type: `artist`,
    song: {
      artist: `Jack Daniels`,
      src: `https://upload.wikimedia.org/wikipedia/commons/1/1f/Uganda_flag_and_national_anthem_-_Oh_Uganda_Land_o.ogg`,
    },
    answers: [
      {
        id: 1,
        picture: `http://placehold.it/134x134`,
        artist: `John Snow`,
      },
      {
        id: 2,
        picture: `http://placehold.it/134x134`,
        artist: `Jack Daniels`,
      },
      {
        id: 3,
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
        id: 1,
        src: `https://upload.wikimedia.org/wikipedia/commons/1/1f/Uganda_flag_and_national_anthem_-_Oh_Uganda_Land_o.ogg`,
        genre: `rock`,
      },
      {
        id: 2,
        src: `https://upload.wikimedia.org/wikipedia/commons/1/1f/Uganda_flag_and_national_anthem_-_Oh_Uganda_Land_o.ogg`,
        genre: `pop`,
      },
      {
        id: 3,
        src: `https://upload.wikimedia.org/wikipedia/commons/1/1f/Uganda_flag_and_national_anthem_-_Oh_Uganda_Land_o.ogg`,
        genre: `jazz`,
      },
      {
        id: 4,
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

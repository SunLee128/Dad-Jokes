import React, { useState, useEffect } from 'react';
import Joke from './Joke';
import axios from 'axios';
import uuid from 'uuid/v4';
import './JokeList.css';

const JokeList = () => {
  const numJokesToGet = 10;
  const initialJokes = JSON.parse(window.localStorage.getItem('jokes') || '[]');
  const [ jokes, setJokes ] = useState(initialJokes);
  const [ loading, setLoading ] = useState(false);


  useEffect(
    () => {
      if (jokes.length === 0) getJokes();
    }
  );

  const getJokes = async () => {
    let tempJokes = [];
    while (tempJokes.length < numJokesToGet) {
      let res = await axios.get('https://icanhazdadjoke.com/', {
        headers: { Accept: 'application/json' },
      });
      tempJokes.push({ id: uuid(), joke: res.data.joke, vote: 0 });
    }
    setJokes(tempJokes);
    window.localStorage.setItem('jokes', JSON.stringify(jokes));
    setLoading(false);
  };


  const handleVote = (id, delta) => {
    const votedJokes = jokes.map((joke) => (joke.id === id ? { ...joke, vote: joke.vote + delta } : joke));
    setJokes(votedJokes);
    window.localStorage.setItem('jokes', JSON.stringify(jokes));
  };

  const handleClick = () => {
    setJokes(getJokes());
    setLoading(true);
  };

  if (loading) {
    return (
      <div className="JokeList-spinner">
        <i className="far fa-8x fa-laugh fa-spin" />
        <h1 className="JokeList-title">Loading...</h1>
      </div>
    );
  }

  jokes.sort((a, b) => b.vote - a.vote);

  return (
    <div className="JokeList">
      <div className="JokeList-sidebar">
        <h1 className="JokeList-title">
          <span>Dad</span> Jokes
        </h1>
        <img
          src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg"
          alt="smiley face"
        />
        <button className="JokeList-getmore" onClick={() => handleClick()}>
          Fetch Jokes
        </button>
      </div>

      <div className="JokeList-jokes">
        {jokes.map((j) => (
          <Joke
            key={j.id}
            votes={j.vote}
            text={j.joke}
            upvote={() => handleVote(j.id, 1)}
            downvote={() => handleVote(j.id, -1)}
          />
        ))}
      </div>
    </div>
  );
};
export default JokeList;

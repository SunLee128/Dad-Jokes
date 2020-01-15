import React, { Component } from 'react'
import axios from 'axios'
import Joke from './Joke'
import './JokeList.css'

class JokeList extends Component  {
  static defaultProps = {
    numJokesToGet: 10
  }
  constructor(props) {
    super(props)
    this.state = {
      jokes: []
    }
  }
  async componentDidMount() {
    //get 10 jokes
    let jokes=[]
    while(jokes.length < this.props.numJokesToGet){
      let res = await axios.get("https://icanhazdadjoke.com/",{
      headers: {Accept: "application/json "}
      })
      jokes.push({text:res.data.joke, votes:0 })
    }
    this.setState({jokes: jokes})
  }
  handleClick() {
    this.setState({ loading: true }, this.getJokes);
  }
  handleVote(id, delta) {
    this.setState(
      st => ({
        jokes: st.jokes.map(j =>
          j.id === id ? { ...j, votes: j.votes + delta } : j
        )
      }),
      () =>
        window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
    );
  }
  render() {
    return (
      <div className="JokeList">
        <div className="JokeList-sidebar">
          <h1 className="JokeList-title">
            <span>Joke</span>List
          </h1>
          <button className='JokeList-getmore' onClick={this.handleClick} >New Jokes</button>
        </div>
        <div className="JokeList-jokes">
          {this.state.jokes.map(j => (
            <Joke votes={j.votes} text={j.text}/>
          ))}
        </div>
      </div>
    )
  }
}

export default JokeList
import React, { Component } from 'react'
import axios from 'axios'
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
      jokes.push(res.data.joke)
    }
    this.setState({jokes: jokes})
  }
  render() {
    return (
      <div className="JokeList">
        <div className="JokeList-sidebar">
          <h1 className="JokeList-title">
            <span>Joke</span>List
          </h1>
          <button>New Jokes</button>
        </div>
        <div className="JokeList-jokes">
          {this.state.jokes.map(j => (
            <div>{j}</div>
          ))}
        </div>
      </div>
    )
  }
}

export default JokeList
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
const io = require('socket.io-client');
const socket = io();

class App extends Component {
  constructor() {
    super();

    this.state = {
      messages: [],
      message: ""
    }
  }

  componentDidMount() {
    socket.on('chat message', (msg) => {
      this.setState({ messages: [...this.state.messages, msg] });
    });
  }

  handleSendMessage = () => {
    socket.emit('chat message', this.state.message);
    this.setState({ message: "" });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        {this.state.messages.map((message) =>
          <div>{message}</div>
        )}
        <input
          type="text"
          value={this.state.message}
          onChange={(e) => this.setState({ message: e.currentTarget.value })} />
        <button type="button" onClick={this.handleSendMessage}>Send Message</button>
      </div>
    );
  }
}

export default App;

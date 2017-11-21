import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initializeChat } from '../stores/chat';
import './ChatManager.css';

const actionsToProps = dispatch  => ({
  configureChat: (nick) => dispatch(initializeChat(nick)),
});

class ChatMessages extends Component {
  state = {
    userName: '',
    error: ''
  }

  changeMessageContent(event) {
    event.preventDefault();
    const content = event.target.value;
    if (content.length > 20) return;
    this.setState({
      userName: content,
    })
  }

  initializeChat(event) {
    event.preventDefault();
    const { configureChat } = this.props;
    const { userName } = this.state;

    configureChat(userName);
    if (userName.length < 3) return this.setState({error: 'Liian lyhyt nimi'});
    this.setState({ userName: 'Rekisteröidään...' });
  }

  render() {
    return [
      <p className="ChatManager-disclaimer">
        Tervetuloa käyttämään risteilychättiä. Tämä yön pikkutunteina kokoon näperretty
        toiminnallisuus ei välttämättä toimi täydellisesti. Be patient! Ja käyttäydythän asiallisesti.
      </p>,
      <form className="ChatManager" onSubmit={(event) => this.initializeChat(event)}>
        <h3 className="ChatManager-label">Valitse käyttäjänimi</h3>
        <input className="ChatControls-input" onChange={(event) => this.changeMessageContent(event)} />
        <button className="ChatControls-button">Liity chättiin</button>
      </form>
    ];
  }
}

export default connect(null, actionsToProps)(ChatMessages);
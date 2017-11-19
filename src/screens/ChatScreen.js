import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initializeChat } from '../stores/chat';
import ChatMessages from '../components/ChatMessages';
import ChatControls from '../components/ChatControls';
import './ChatScreen.css';

const stateToProps = ({ chat }) => ({
  chat,
});

const actionsToProps = dispatch  => ({
  configureChat: (nick) => dispatch(initializeChat(nick)),
});

class Screen extends Component {
  componentWillMount() {
    const { configureChat, chat } = this.props;
    const chatInitialized = chat.get('initialized');
    if (!chatInitialized) this.initializeChatScreen();
  }
  
  initializeChatScreen(userId) {
    const { configureChat } = this.props;
    configureChat('Devaaja');
  }

  render() {
    const { chat } = this.props;
    const { initialized } = chat.toJS();
    if (!initialized) return <h1>Ladataan tietoja</h1>;
    return [
      <h2 className="ChatScreenHeader">Risteilychätti</h2>,
      <div className="ChatScreen">
        <ChatMessages />
        <ChatControls />
      </div>
    ];
  }
}

export default connect(stateToProps, actionsToProps)(Screen);

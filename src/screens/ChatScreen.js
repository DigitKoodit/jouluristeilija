import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initializeChat } from '../stores/chat';
import ChatMessages from '../components/ChatMessages';
import ChatControls from '../components/ChatControls';
import ChatManager from '../components/ChatManager';
import './ChatScreen.css';

const stateToProps = ({ chat }) => ({
  userName: chat.get('userName'),
  userId: chat.get('userId'),
  chatInitialized: chat.get('initialized'),
});

const actionsToProps = dispatch  => ({
  configureChat: () => dispatch(initializeChat()),
});

class Screen extends Component {
  componentDidUpdate() {
    const {
      configureChat,
      chatInitialized,
      userId,
      userName
    } = this.props;
    if (!userName || !userId) return;
    if (!chatInitialized) configureChat();
  }

  render() {
    const {
      userName,
      userId,
    } = this.props;

    return [
      <h2 className="ChatScreenHeader">Risteilychätti</h2>,
      <div className="ChatScreen">
        { (!userName || !userId)
          ? <ChatManager />
          : [
            <ChatMessages />,
            <ChatControls />
          ]
        }
      </div>
    ];
  }
}

export default connect(stateToProps, actionsToProps)(Screen);

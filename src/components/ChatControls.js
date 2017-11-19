import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendMessage } from '../stores/chat';
import './ChatControls.css';

const stateToProps = ({ chat }) => ({
  error: chat.get('error'),
  userId: chat.get('userId'),
  userName: chat.get('userName')
})

const actionsToProps = dispatch => ({
  sendMessage: (userId, userName, message) => dispatch(sendMessage(userId, userName, message))
});

class ChatMessages extends Component {
  state = {
    message: '',
  }

  changeMessageContent(event) {
    event.preventDefault();
    const content = event.target.value;
    if (content.length > 200) return;
    this.setState({
      message: content,
    })
  }

  sendMessage(event) {
    event.preventDefault();
    const { userId, userName, sendMessage } = this.props;
    const { message } = this.state;
    if (message.length > 0) sendMessage(userId, userName, message);
    this.setState({ message: '' });
  }

  render() {
    const { message } = this.state;
    return (
      <form className="ChatControls" onSubmit={(event) => this.sendMessage(event)}>
        <input value={message} className="ChatControls-input" onChange={(event) => this.changeMessageContent(event)} />
        <button className="ChatControls-button">Lähetä</button>
      </form>
    );
  }
}

export default connect(stateToProps, actionsToProps)(ChatMessages);
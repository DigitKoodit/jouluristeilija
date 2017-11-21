import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatTime } from '../core/time';
import './ChatMessages.css';

const stateToProps = ({ chat }) => ({
  messages: chat.get('messages')
    .sort((a, b) => a.get('timeStamp') - b.get('timeStamp'))
    .slice(-20),
});

class ChatMessages extends Component {
  componentDidMount() {
    this.scrollToBottom();
  }

  scrollToBottom(scrollBehavior) {
    this.chatBottom.scrollIntoView({behavior: scrollBehavior});
  }

  componentDidUpdate(){
    this.scrollToBottom('smooth');
  }

  render() {
    const { messages } = this.props;
    return (
      <div className="ChatMessages">
      { messages.map((message, i) =>
        <div key={`message__${i}`} className="ChatMessage">
          <h4>{message.get('userName')} - {formatTime(message.get('timeStamp'))}</h4>
          <p>{message.get('message')}</p>
        </div>
      ) }
      <div ref={chatBottom => { this.chatBottom = chatBottom } } />
    </div>
    );
  }
}

export default connect(stateToProps)(ChatMessages);
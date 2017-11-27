import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initializeChat } from '../stores/chat';
import ChatMessages from '../components/ChatMessages';
import ChatControls from '../components/ChatControls';
import ChatManager from '../components/ChatManager';
import './ChatScreen.css';

/* Regarding the following constant:
CHAT_INITIALIZATION_TIMESTAMP exists to stop users from accessing the chat before
the chat is officially opened. No it's not a fool proof method and clientside,
one can surely try to tweak the devices local time to go around it.

However, writing to the chat is blocked serverside before 14:00 on 30.11.2017.

You can still pre-register your nickname before the specified time locally.

If you have any concerns or issues regarding this, feel free to contact our developers. :)

julius(ät)jouluristeily.net for concerns and issues.
*/
const CHAT_INITIALIZATION_TIMESTAMP = 1512043200000;

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
    const currentTime = new Date().getTime();

    if (currentTime < CHAT_INITIALIZATION_TIMESTAMP) {
      return [
        <h2 className="ChatScreenHeader">Risteilychätti</h2>,
        <p className="ChatScreen-placeholder">
          Risteilychätti aukeaa noin kello 14:00, 30.11.2017. Rajallisista yhteyksistä johtuen,
          chätti ei välttämättä tule laivalla toimimaan täydellisesti.
        </p>,
        <p className="ChatScreen-placeholder">
          Chätin auettua, käyttäydythän asiallisesti ja otat muut keskustelijat huomioon.
        </p>
      ]
    }

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

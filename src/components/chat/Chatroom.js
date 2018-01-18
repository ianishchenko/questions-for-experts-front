import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import {SOCKET_URL, SOCKET_EVENTS} from 'Config';
import './index.css';
import Message from './Message.js';

export default class Chatroom extends Component {

    state = {
        socket: null,
        user: null,
        messages: [],
        isShowChat: false
    };

    componentWillMount() {
        this.initSocket();

    }

    componentDidMount() {
        this.setUser(this.props.user);
        this.scrollToBot();
    }

    componentDidUpdate() {
        this.scrollToBot();
    }

    scrollToBot = () => {
        const element = ReactDOM.findDOMNode(this.refs.messages);
        if(element){
            element.scrollTop = element.scrollHeight;
        }
    };

    submitMessage = (e) => {
        e.preventDefault();
        const {socket} = this.state;
        const {user} = this.props;
        const message = {
            message: ReactDOM.findDOMNode(this.refs.msg).value,
            email: user.email,
            id: new Date().getTime(),
            img: 'http://garden.zendesk.com/css-avatars/images/jz.png'
        };
        socket.emit(SOCKET_EVENTS.MESSAGE_SENT, message);
        this.setState({
            messages: this.state.messages.concat([message])
        });
        ReactDOM.findDOMNode(this.refs.msg).value = '';
    };

    initSocket = () => {
        const socket = io(SOCKET_URL,
            {
                transports: ['websocket']
            }
        );
        socket.on('reconnect_attempt', () => {
            socket.io.opts.transports = ['polling', 'websocket'];
        });
        socket.on(SOCKET_EVENTS.MESSAGE_RECEIVED, (message) => {
           this.setState({
               messages: this.state.messages.concat([message])
           });
        });
        this.setState({socket});
    };

    toggleChat = () => {
        this.setState((prevState) => ({
            isShowChat: !prevState.isShowChat
        }));
    };

    setUser = (user) => {
        const {socket} = this.state;

        socket.emit(SOCKET_EVENTS.USER_CONNECTED, user);
        this.setState({user});
    };

    render() {
        const {user} = this.props;
        const {messages, isShowChat} = this.state;
        if(!isShowChat){
            return <button className="btn btn-info" id="chat-button" onClick={this.toggleChat}>
                <img src="https://d30y9cdsu7xlg0.cloudfront.net/png/5982-200.png"/>
            </button>
        }
        return (
            <div className="chatroom">
                <div className="chat-header">
                    <div className="close-chat-button" onClick={this.toggleChat}>
                        <span className="glyphicon glyphicon-remove"/>
                    </div>
                    <h3>Make you question</h3>
                </div>

                <ul className="chats" ref="messages">
                    {
                        messages.map((message) =>
                            <Message key={message.id} message={message} user={user.email}/>
                        )
                    }
                </ul>
                <form className="input" onSubmit={(e) => this.submitMessage(e)}>
                    <input type="text" ref="msg"/>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
}
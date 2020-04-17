import React, { Component, useRef, useEffect } from 'react';
import firebase from '../../config/FirebaseSDK';
import uid from 'uid';
import StudentBoxItem from './StudentBoxItem';
import Message from './Message';
import {
  withRouter
} from "react-router-dom";
import { connect } from 'react-redux';

const db = firebase.firestore();
class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
			tutorId: 1,
      text: '',
      selectedStudent: 2,
      conversations: [
        {
          tutorId: 1,
          studentId: 1,
          from: 'tutor',
          text: 'how are you?',
          createdAt: 'Apr 1. 2020 10:00'
        },
        {
          tutorId: 1,
          studentId: 1,
          from: 'student',
          text: 'Im fine?',
          createdAt: 'Apr 1. 2020 10:00'
        },
        {
          tutorId: 1,
          studentId: 1,
          from: 'student',
          text: 'and you?',
          createdAt: 'Apr 1. 2020 10:00'
        },
        {
          tutorId: 1,
          studentId: 1,
          from: 'tutor',
          text: 'Im good',
          createdAt: 'Apr 1. 2020 10:00'
        },
      ],
      messages: [],
      places: [],
      students: [
        {id: 1, name: 'Nara Shikamaru', email: 'shika@fpt.edu.vn'},
        {id: 2, name: 'Aomine Daiki', email: 'aomine@fpt.edu.vn'},
        {id: 3, name: 'Eren Jeager', email: 'eren@fpt.edu.vn'},
        {id: 4, name: 'Tohsaka Rin', email: 'rin@fpt.edu.vn'},
        {id: 5, name: 'Shiba Tatsuya', email: 'tatsuya@fpt.edu.vn'},
      ],
      chatIds: []
    }

    this.messagesEndRef = React.createRef()
  }

  componentDidMount() {
    console.log('Noooooooooooooooooo');
    this.scrollToBottom();
    // db.collection('places').onSnapshot(querySnapshot => {
    //   const data = querySnapshot.docs.map(doc=> {doc.data()});
    //   this.setState({places: data})
    // });

    // db.collection('places').where('name', 'in', ['Haha', 'Campa']).onSnapshot(querySnapshot => {
    //   const data = querySnapshot.docs.map(doc=> doc.data());
    //   this.setState({places: data});
    // });

    // db.collection('conversations').where('studentId', 'in', [1]).where('tutorId', '==', 1).onSnapshot(querySnapshot => {
    //   const data = querySnapshot.docs.map(doc=> doc.data());
    //   this.setState({conversations: data});
    //   console.log(data);
    // });

    // db.collection('messages').where('studentId', '==', 1).onSnapshot(querySnapshot => {
    //   const data = querySnapshot.docs.map(doc=> doc.data());
    //   this.setState({messages: data});
    //   console.log(data);
    // });
		let chatIds = this.state.students.map(student => {
			return `${this.state.tutorId}_${student.id}`;
		});

		this.setState({chatIds: chatIds})
  }

  componentDidUpdate () {
    this.scrollToBottom()
  }

  selectStudent = (id) => {
		this.setState({selectedStudent: id})
		db.collection('conversations').doc(`${this.state.tutorId}__${id}`).collection('messages').orderBy('createdAt', 'asc').onSnapshot(querySnapshot => {
      const data = querySnapshot.docs.map(doc=> doc.data());
      this.setState({conversations: data});
			console.log(data);
			// console.log(querySnapshot);
    });

  }

  handleChange = e => {
    this.setState({ [e.target.name] : e.target.value});
  }

  scrollToBottom = () => {
    this.messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  handleSend = () => {
    if(this.state.text == '') return;
    let msg = {
      from: 'tutor',
      text: this.state.text,
      createdAt: (new Date()).toISOString()
		}

		console.log(`${this.state.tutorId}__${this.state.selectStudent}`);
		db.collection('conversations').doc(`${this.state.tutorId}__${this.state.selectedStudent}`).collection('messages').doc(uid(19)).set(msg);
    // this.setState({conversations: [...this.state.conversations, conv]})
    this.setState({text: ''});
  }

  render() {
    return (
      // <div className="row">
      //   <div className="col-3 student-message-list">
      //     {this.state.conversations.map(conversation => {
      //       return (
      //         <div key={conversation.studentId}>
      //           <p>{conversation.lastMessage}</p>
      //           <p>{conversation.createdAt}</p>
      //         </div>
      //         // <div></div>
      //       )
      //     })}
      //   </div>
      //   <div className="col-9 message-content">
      //     {this.state.messages.map(message => {
      //       return (
      //         <div key={message.createdAt}>
      //           <p>{message.text}</p>
      //           <p>{message.createdAt}</p>
      //           <br/>
      //         </div>
      //       )
      //     })}
      //   </div>
      // </div>


                <div className="content-wrapper chat-container chat-page">
                    <div className="row ">
                        <div className="col-md-4 chat">
                            <div className="card mb-sm-3 mb-md-0 contacts_card">
                                <div className="card-header">
                                    <div className="input-group">
                                        <input type="text" placeholder="Search..." name="" className="form-control search" />
                                        <div className="input-group-prepend">
                                            <span className="input-group-text search_btn"><i
                                                    className="mdi mdi-magnify"></i></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body contacts_body">
                                    <ui className="contacts">
                                      {this.props.students.map(student => <StudentBoxItem student={student} isSelected={this.state.selectedStudent === student.id} selectStudent={this.selectStudent} />)}
                                    </ui>
                                </div>
                                <div className="card-footer"></div>
                            </div>
                        </div>
                        <div className="col-md-8 chat">
                            <div className="card">
                                <div className="card-header msg_head">
                                    <div className="d-flex bd-highlight">
                                        <div className="img_cont">
                                            <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
                                                className="rounded-circle user_img" />
                                            <span className="online_icon"></span>
                                        </div>
                                        <div className="user_info">
                                            <span>Chat with Khalid</span>
                                            <p>1767 Messages</p>
                                        </div>
                                        
                                    </div>
                                </div>
                                <div className="card-body msg_card_body">
                                  {this.state.conversations.map(c => {
                                    return <Message conversation={c} />
                                  })}
                                  <div ref={this.messagesEndRef} />
                                </div>
                                <div className="card-footer">
                                    <div className="input-group">
                                        <div className="input-group-append">
                                            <span className="input-group-text attach_btn"><i
                                                    className="mdi mdi-attachment"></i></span>
                                        </div>
                                        <textarea name="text" value={this.state.text} onChange={this.handleChange} className="form-control type_msg"
                                            placeholder="Type your message..."></textarea>
                                        <div className="input-group-append" onClick={this.handleSend}>
                                            <span className="input-group-text send_btn"><i
                                                    className="mdi mdi-send"></i></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    );
  }
}


function mapState(state) {
  const { authentication } = state;
  console.log('Tutor chat');
  console.log(state);
  return {authentication: authentication};
}

const actionCreators = {
  // login: userActions.login,
};

// export default TutorDashboard;
export default connect(mapState)(withRouter(Chat));

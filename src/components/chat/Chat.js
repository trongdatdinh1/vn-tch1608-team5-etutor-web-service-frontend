import React, { Component, useRef, useEffect } from 'react';
import firebase from '../../config/FirebaseSDK';
import uid from 'uid';
import StudentBoxItem from './StudentBoxItem';
import Message from './Message';
import {
  withRouter
} from "react-router-dom";
import { connect } from 'react-redux';
import { API_ON } from '../../constants/ApiOn';

const db = firebase.firestore();
class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
			tutorId: null,
      text: '',
      selectedStudent: {id: 1, name: 'Nara Shikamaru', email: 'shika@fpt.edu.vn'},
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
    this.scrollToBottom();
    this.setState({tutorId: 1})
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
			return `${this.state.tutorId}__${student.id}`;
		});

		this.setState({chatIds: chatIds})
  }

  componentDidUpdate () {
    this.scrollToBottom()
  }

  selectStudent = (student) => {
    this.setState({selectedStudent: student})
    if(API_ON) {
      db.collection('conversations').doc(`${this.props.authentication.user.id}__${student.id}`).collection('messages').orderBy('createdAt', 'asc').onSnapshot(querySnapshot => {
        console.log('===============')
        console.log(`${this.state.tutorId}__${student.id}`)
        const data = querySnapshot.docs.map(doc=> doc.data());
        this.setState({conversations: data});
      });
    } else {
      db.collection('conversations').doc(`${this.state.tutorId}__${student.id}`).collection('messages').orderBy('createdAt', 'asc').onSnapshot(querySnapshot => {
        console.log('===============')
        console.log(`${this.state.tutorId}__${student.id}`)
        const data = querySnapshot.docs.map(doc=> doc.data());
        this.setState({conversations: data});
      });
    }
		

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
    if(API_ON) {
      db.collection('conversations').doc(`${this.props.authentication.user.id}__${this.state.selectedStudent.id}`).collection('messages').doc(uid(19)).set(msg);
    } else {
      db.collection('conversations').doc(`${this.state.tutorId}__${this.state.selectedStudent.id}`).collection('messages').doc(uid(19)).set(msg);
    }
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


                <div class="content-wrapper chat-container chat-page">
                    <div class="row ">
                        <div class="col-md-4 chat">
                            <div class="card mb-sm-3 mb-md-0 contacts_card">
                                <div class="card-header">
                                    <div class="input-group">
                                        <input type="text" placeholder="Search..." name="" class="form-control search" />
                                        <div class="input-group-prepend">
                                            <span class="input-group-text search_btn"><i
                                                    class="mdi mdi-magnify"></i></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body contacts_body">
                                    <ui class="contacts">
                                      {this.props.students.map(student => <StudentBoxItem student={student} isSelected={this.state.selectedStudent.id === student.id} selectStudent={this.selectStudent} />)}
                                    </ui>
                                </div>
                                <div class="card-footer"></div>
                            </div>
                        </div>
                        <div class="col-md-8 chat">
                            <div class="card">
                                <div class="card-header msg_head">
                                    <div class="d-flex bd-highlight">
                                        <div class="img_cont">
                                            <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
                                                class="rounded-circle user_img" />
                                            <span class="online_icon"></span>
                                        </div>
                                        <div class="user_info">
                                            <span>Chat with {this.state.selectedStudent.name}</span>
                                            <p>1767 Messages</p>
                                        </div>
                                        
                                    </div>
                                </div>
                                <div class="card-body msg_card_body">
                                  {this.state.conversations.map(c => {
                                    return <Message conversation={c} />
                                  })}
                                  <div ref={this.messagesEndRef} />
                                </div>
                                <div class="card-footer">
                                    <div class="input-group">
                                        <div class="input-group-append">
                                            <span class="input-group-text attach_btn"><i
                                                    class="mdi mdi-attachment"></i></span>
                                        </div>
                                        <textarea name="text" value={this.state.text} onChange={this.handleChange} class="form-control type_msg"
                                            placeholder="Type your message..."></textarea>
                                        <div class="input-group-append" onClick={this.handleSend}>
                                            <span class="input-group-text send_btn"><i
                                                    class="mdi mdi-send"></i></span>
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

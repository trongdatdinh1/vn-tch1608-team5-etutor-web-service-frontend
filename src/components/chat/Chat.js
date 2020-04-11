import React, { Component, useRef, useEffect } from 'react';
import firebase from '../../config/FirebaseSDK';

import StudentBoxItem from './StudentBoxItem';
import Message from './Message';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      selectedStudent: 2,
      conversations: [
        {
          tutorId: 1,
          studentId: 1,
          role: 'tutor',
          text: 'how are you?',
          createdAt: 'Apr 1. 2020 10:00'
        },
        {
          tutorId: 1,
          studentId: 1,
          role: 'student',
          text: 'Im fine?',
          createdAt: 'Apr 1. 2020 10:00'
        },
        {
          tutorId: 1,
          studentId: 1,
          role: 'student',
          text: 'and you?',
          createdAt: 'Apr 1. 2020 10:00'
        },
        {
          tutorId: 1,
          studentId: 1,
          role: 'tutor',
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
    }

    this.messagesEndRef = React.createRef()
  }

  componentDidMount() {
    console.log('Noooooooooooooooooo');
    const db = firebase.firestore();
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
    
  }

  componentDidUpdate () {
    this.scrollToBottom()
  }

  selectStudent = (id) => {
    this.setState({selectedStudent: id})
  }

  handleChange = e => {
    this.setState({ [e.target.name] : e.target.value});
  }

  scrollToBottom = () => {
    this.messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  handleSend = () => {
    if(this.state.text == '') return;
    let conv = {
      studentId: 1,
      role: 'tutor',
      text: this.state.text,
      createdAt: (new Date()).toISOString()
    }
    this.setState({conversations: [...this.state.conversations, conv]})
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

      <div class="container-scroller">
        <nav class="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row" >
            <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
                <a class="navbar-brand brand-logo" href="index.html"><img src="../assets/images/logo.svg"
                        alt="logo" /></a>
                <a class="navbar-brand brand-logo-mini" href="index.html"><img src="../assets/images/logo-mini.svg"
                        alt="logo" /></a>
            </div>
            <div class="navbar-menu-wrapper d-flex align-items-stretch">
                <button class="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
                    <span class="mdi mdi-menu"></span>
                </button>
                <div class="search-field d-none d-md-block">
                    <form class="d-flex align-items-center h-100" action="#">
                        <div class="input-group">
                            <div class="input-group-prepend bg-transparent">
                                <i class="input-group-text border-0 mdi mdi-magnify"></i>
                            </div>
                            <input type="text" class="form-control bg-transparent border-0"
                                placeholder="Search students" />
                        </div>
                    </form>
                </div>
                <ul class="navbar-nav navbar-nav-right">
                    <li class="nav-item nav-profile dropdown">
                        <a class="nav-link dropdown-toggle" id="profileDropdown" href="#" data-toggle="dropdown"
                            aria-expanded="false">
                            <div class="nav-profile-img">
                                <img src="../assets/images/faces/face1.jpg" alt="image" />
                                <span class="availability-status online"></span>
                            </div>
                            <div class="nav-profile-text">
                                <p class="mb-1 text-black">David Greymaax</p>
                            </div>
                        </a>
                        <div class="dropdown-menu navbar-dropdown" aria-labelledby="profileDropdown">
                            <a class="dropdown-item" href="#">
                                <i class="mdi mdi-cached mr-2 text-success"></i> Activity Log </a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#">
                                <i class="mdi mdi-logout mr-2 text-primary"></i> Signout </a>
                        </div>
                    </li>
            
                    <li class="nav-item nav-logout d-none d-lg-block">
                        <a class="nav-link" href="#">
                            <i class="mdi mdi-power"></i>
                        </a>
                    </li>
                  
                </ul>
                <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button"
                    data-toggle="offcanvas">
                    <span class="mdi mdi-menu"></span>
                </button>
            </div>
        </nav>
        <div class="container-fluid page-body-wrapper">
            <nav class="sidebar sidebar-offcanvas" id="sidebar">
                <ul class="nav">
                    <li class="nav-item nav-profile">
                        <a href="#" class="nav-link">
                            <div class="nav-profile-image">
                                <img src="../assets/images/faces/face1.jpg" alt="profile" />
                                <span class="login-status online"></span>
                            </div>
                            <div class="nav-profile-text d-flex flex-column">
                                <span class="font-weight-bold mb-2">David Grey. H</span>
                                <span class="text-secondary text-small">Staff member</span>
                            </div>
                            <i class="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="index.html">
                            <span class="menu-title">Home page</span>
                            <i class="mdi mdi-home menu-icon"></i>
                        </a>
                    </li>
                </ul>
            </nav>
            <div class="main-panel">
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
                                      {this.state.students.map(student => <StudentBoxItem student={student} isSelected={this.state.selectedStudent === student.id} selectStudent={this.selectStudent} />)}
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
                                            <span>Chat with Khalid</span>
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
                <footer class="footer">
                    <div class="d-sm-flex justify-content-center justify-content-sm-between">
                        <span class="text-muted text-center text-sm-left d-block d-sm-inline-block">Copyright © Team 05
                            <a href="#" target="_blank">TCH1608</a>. All rights reserved.</span>
                    </div>
                </footer>
            </div>
        </div>
    </div>
    );
  }
}


export default Chat;
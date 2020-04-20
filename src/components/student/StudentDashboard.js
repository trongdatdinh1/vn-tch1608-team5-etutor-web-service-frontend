import React from 'react';
import {
  Router,
  Switch,
  Link,
  Route,
  withRouter
} from "react-router-dom";
import { connect } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import firebase from '../../config/FirebaseSDK';
import circle_svg from '../../assets/images/dashboard/circle.svg';
import logo_svg from '../../assets/images/logo.svg';
import logo_mini_svg from '../../assets/images/logo-mini.svg';
import face_1 from '../../assets/images/faces/face1.jpg';
import img_1 from '../../assets/images/dashboard/img_1.jpg';
import moment from 'moment';
import axios from 'axios';
import BlogDetails from '../blog/BlogDetails';
import {BASEURL} from '../../constants/baseurl';
import {API_ON} from '../../constants/ApiOn';
import RequestModal from './RequestModal';
import MeetingModalDetails from './MeetingModalDetails';
import TutorCalendar from '../tutor/TutorCalendar';
import Message from '../chat/Message';
import BlogModal from './BlogModal';
import uid from 'uid'
import {ROLES} from '../../constants/roles'
import {avatarProfile} from '../../components/utils/ProfileGenerator'

const db = firebase.firestore();

class StudentDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: 'Hero',
      navbarCollapsed: false,
      selectedMeeting: null,
      modalMeetingDetailsOpen: false,
      modalMeetingOpen: false,
      modalRequestOpen: false,
      tutor: {
        id: 1,
        name: 'Tuto'
      },
      meetings: [
        {
          id: 0,
          title: 'Shika',
          // allDay: true,
          // start: moment().hour(10).minute(30).toDate(),
          start: moment('2020-04-12T08:30:00.000+0000').toDate(),
          // end: moment().hour(11).minute(0).toDate(),
          end: moment('2020-04-12T09:00:00.000+0000').toDate()
        },
        {
          id: 1,
          title: 'Long Event',
          start: moment('2020-04-14T08:30:00.000+0000').toDate(),
          // end: moment().hour(11).minute(0).toDate(),
          end: moment('2020-04-14T09:00:00.000+0000').toDate()
        },
      ],
      blogs: [
        {
          id: 1,
          content: 'Blog content',

        }
      ],
      requests: [
        {
          blog_id: 1,
          title: 'THis is a request title',
          content: 'This is a content',
          createdAt: '2010-04-20'
        }
      ],
      conversations: [],
      messageField: '',
      notifications: []
    }
  }

  componentDidMount() {
    console.log(this.props.match.params);
    if(API_ON) {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.props.authentication.user.accessToken}`
      }
      console.log('Sa================================')
      console.log(this.props.authentication.user.userRole)
      if(ROLES.student == this.props.authentication.user.userRole) {
        console.log('=========================stud')
        axios.get(`${BASEURL}/api/get_personal_tutor`, {headers: headers}).then(res => {
          this.setState({tutor: res.data})
          db.collection('conversations').doc(`${res.data.id}__${this.props.authentication.user.id}`).collection('messages').orderBy('createdAt', 'asc').onSnapshot(querySnapshot => {
            const data = querySnapshot.docs.map(doc=> doc.data());
            this.setState({conversations: data});
            console.log(data);
          });
        }).catch(error => {
          console.log(error);
        });
  
        axios.get(`${BASEURL}/api/meetings`, {headers: headers}).then(res => {
          let meetings = res.data.map(meeting => {
            return {
              id: meeting.id,
              title: meeting.title,
              start: moment(meeting.startDate).toDate(),
              end: moment(meeting.endDate).toDate(),
              content: meeting.content
            }
          });
          this.setState({meetings: meetings});
        });
  
        axios.get(`${BASEURL}/api/requests`, {headers: headers}).then(res => {
          console.log('requests', res.data)
          this.setState({requests: res.data})
        });
  
        axios.get(`${BASEURL}/api/blogs`, {headers: headers}).then(res => {
          this.setState({blogs: res.data})
        }).catch(e => {
          console.log(e);
        });
  
        axios.get(`${BASEURL}/api/notifications`, {headers: headers}).then(res => {
          console.log('Noti')
          console.log(res.data)
          this.setState({notifications: res.data});
        });
  
        // let studentId = this.props.authentication.user.id;
        // db.collection('conversations').doc(`${this.state.tutor.id}__${studentId}`).collection('messages').orderBy('createdAt', 'asc').onSnapshot(querySnapshot => {
        //   const data = querySnapshot.docs.map(doc=> doc.data());
        //   this.setState({conversations: data});
        //   console.log(data);
        // });
      } else if(ROLES.staff == this.props.authentication.user.userRole) {
        let student_id = this.props.match.params.student_id
        if(!student_id) {
          window.location.assign(`/staff_dashboard`);
        } else {
          axios.get(`${BASEURL}/api/student_statistics/${student_id}`, {headers: headers}).then(res => {
            console.log('requests', res.data)
            this.setState({meetings: res.data.meetings.map(meeting => {
              return {
                id: meeting.id,
                title: meeting.title,
                start: moment(meeting.start_date).toDate(),
                end: moment(meeting.end_date).toDate(),
                content: meeting.content
              }
            })})

            this.setState({requests: res.data.requests});

            this.setState({tutor: res.data.tutor})

            this.setState({blogs: res.data.blogs})
          });
        }
        
      }
      

      this.setState({userName: this.props.authentication.user.name})
    } else {
      let tutorId = 1;
      let studentId = 1;
      db.collection('conversations').doc(`${tutorId}__${studentId}`).collection('messages').orderBy('createdAt', 'asc').onSnapshot(querySnapshot => {
        const data = querySnapshot.docs.map(doc=> doc.data());
        this.setState({conversations: data});
        console.log(data);
      });
      // this.setState({tutor: null})
    }
    
  }
  
  toggleNavbar = () => {
    this.setState({navbarCollapsed: !this.state.navbarCollapsed})
  }

  onSelectMeeting = (e) => {
    console.log('event clicked');
    console.log(e);
    let meeting  = {
      title: e.title,
      content: e.content,
      start: e.start,
      end: e.end
    }
    this.setState({selectedMeeting: meeting})

    this.setState({modalMeetingDetailsOpen: true});
  }

  toggleModalMeeting = () => {
    this.setState({modalMeetingOpen: !this.state.modalMeetingOpen});
  }

  // toggleModalBlog = () => {
  //   this.setState({modalBlogOpen: !this.state.modalBlogOpen});
  //   this.setState({modalMeetingDetailsOpen: true})
  // }

  toggleModalRequest = () => {
    this.setState({modalRequestOpen: !this.state.modalRequestOpen});
  }

  toggleModalMeetingDetails = () => {
    this.setState({modalMeetingDetailsOpen: !this.state.modalMeetingDetailsOpen});
  }

  // createBlog = blog => {
  //   this.setState({blogs: [...this.state.blogs, blog]})
  // }

  createRequest = request => {
    if(API_ON) {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.props.authentication.user.accessToken}`
      }

      axios.get(`${BASEURL}/api/requests`, {headers: headers}).then(res => {
        this.setState({requests: res.data})
      });

    } else {
      this.setState({requests: [...this.state.requests, request]})
    }
  }

  changeHandler = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  sendMessage = () => {
    if(this.state.messageField == '') return;
    let msg = {
      from: 'student',
      text: this.state.messageField,
      createdAt: (new Date()).toISOString()
    }

    if(API_ON) {
      let studentId = this.props.authentication.user.id;
      db.collection('conversations').doc(`${this.state.tutor.id}__${studentId}`).collection('messages').doc(uid(19)).set(msg);
    } else {
      let tutorId = 1;
      let studentId = 1;
      db.collection('conversations').doc(`${tutorId}__${studentId}`).collection('messages').doc(uid(19)).set(msg);
    }

    this.setState({messageField: ''});
  }

  notificationClicked = (notification_id, blog_id) => {
    if(API_ON) {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.props.authentication.user.accessToken}`
      }

      let noti = {
        unread: false
      }

      axios.post(`${BASEURL}/api/notifications/${notification_id}`, noti, {headers: headers}).then(res => {
        axios.get(`${BASEURL}/api/notifications`, {headers: headers}).then(res => {
          this.setState({notifications: res.data});

          window.location.assign(`/student_dashboard/blogs/${blog_id}`);
        });
      });
    } else {
      window.location.assign(`/student_dashboard/blogs/${blog_id}`);
    }
    
  }

  render() {
    const collapsed = this.state.navbarCollapsed;
    const classOne = collapsed ? 'sidebar-icon-only' : '';
    const classTwo = collapsed ? 'active' : '';

    return (
      <div className={`container-scroller ${classOne}`}>
        <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
          <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
            <a className="navbar-brand brand-logo" href="index.html"><img src={logo_svg} alt="logo" /></a>
            <a className="navbar-brand brand-logo-mini" href="index.html"><img src={logo_mini_svg}
                alt="logo" /></a>
          </div>
          <div className="navbar-menu-wrapper d-flex align-items-stretch">
            <button className="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize" onClick={this.toggleNavbar}>
              <span className="mdi mdi-menu"></span>
            </button>
            {/* <div className="search-field d-none d-md-block">
              <form className="d-flex align-items-center h-100" action="#">
                <div className="input-group">
                  <div className="input-group-prepend bg-transparent">
                    <i className="input-group-text border-0 mdi mdi-magnify"></i>
                  </div>
                  <input type="text" className="form-control bg-transparent border-0" placeholder="Search students" />
                </div>
              </form>
            </div> */}
            
            <ul className="navbar-nav navbar-nav-right">
              <li className="nav-item dropdown">
                <Dropdown alignRight>
                  <Dropdown.Toggle href="#" variant="link" className="nav-link count-indicator dropdown-toggle" >
                    <i className="mdi mdi-bell-outline"></i>
                    <span className="count-symbol bg-danger"></span>
                  </Dropdown.Toggle>


                  <Dropdown.Menu className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list">
                    <h6 className="p-3 mb-0">Notifications</h6>
                    <div className="scroll-noti">
                    {this.state.notifications.map(notification => {
                      return (
                        
                        <Dropdown.Item className="dropdown-item preview-item" key={notification.id} onClick={() => {this.notificationClicked(notification.id, notification.relatedId)}} >
                            <div className="preview-thumbnail">
                              <div className={`preview-icon ${notification.unread ? 'bg-warning' : 'bg-info' }`}>
                                <i className="mdi mdi-calendar"></i>
                              </div>
                            </div>
                            <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                              {/* <h6 className="preview-subject font-weight-normal mb-1">{notification.content}</h6> */}
                              <p className="preview-subject ellipsis font-weight-normal mb-1"> {notification.content}</p>
                              <p className="text-gray ellipsis mb-0">{moment(notification.createdDate).fromNow()}</p>
                              {/* <p className="text-gray ellipsis mb-0">18/04/2020</p> */}
                            </div>
                            <div className="dropdown-divider"></div>
                        </Dropdown.Item>
                      )
                    })}
                    </div>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
              <li className="nav-item nav-profile dropdown">
                <a className="nav-link dropdown-toggle" id="profileDropdown" href="#" data-toggle="dropdown"
                  aria-expanded="false">
                  <div className="nav-profile-img">
                    <img src={avatarProfile(this.props.authentication.user.name)} alt="image" />
                    <span className="availability-status online"></span>
                  </div>
                  <div className="nav-profile-text">
                    <p className="mb-1 text-black">{this.state.userName}</p>
                  </div>
                </a>
                <div className="dropdown-menu navbar-dropdown" aria-labelledby="profileDropdown">
                  <a className="dropdown-item" href="#">
                    <i className="mdi mdi-cached mr-2 text-success"></i> Activity Log </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">
                    <i className="mdi mdi-logout mr-2 text-primary"></i> Signout </a>
                </div>
              </li>
              <li className="nav-item nav-logout d-none d-lg-block">
                <a className="nav-link" href="#">
                  <i className="mdi mdi-power"></i>
                </a>
              </li>
            </ul>
            <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button"
              data-toggle="offcanvas" onClick={this.toggleNavbar}>
              <span className="mdi mdi-menu"></span>
            </button>
          </div>
        </nav>

        <div className="container-fluid page-body-wrapper">
            <nav className={`sidebar sidebar-offcanvas ${classTwo}`} id="sidebar">
              {(!API_ON || ROLES.student === this.props.authentication.user.userRole) && (
                <ul className="nav">
                    <li className="nav-item nav-profile">
                      <a href="#" className="nav-link">
                        <div className="nav-profile-image">
                          <img src={avatarProfile(this.props.authentication.user.name)} alt="profile" />
                          <span className="login-status online"></span>
                        </div>
                        <div className="nav-profile-text d-flex flex-column">
                          <span className="font-weight-bold mb-2">{this.state.userName}</span>
                          <span className="text-secondary text-small">Student</span>
                        </div>
                        <i className="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
                      </a>
                    </li>
                    <li className="nav-item">
                      <Link to="/student_dashboard" className="nav-link">
                        <span className="menu-title">Home pages</span>
                        <i className="mdi mdi-home menu-icon"></i>
                      </Link>
                    </li>
                </ul>
              )}


              {(API_ON && ROLES.staff === this.props.authentication.user.userRole) && (
                <ul className="nav">
                  <li className="nav-item nav-profile">
                    <a href="#" className="nav-link">
                      <div className="nav-profile-image">
                        <img src={avatarProfile(this.props.authentication.user.name)} alt="profile" />
                        <span className="login-status online"></span>
                      </div>
                      <div className="nav-profile-text d-flex flex-column">
                        <span className="font-weight-bold mb-2">{this.state.userName}</span>
                        <span className="text-secondary text-small">Staff member</span>
                      </div>
                      <i className="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
                    </a>
                  </li>
                  <li className="nav-item">
                    <Link to="/staff_dashboard" className="nav-link">
                      <span className="menu-title">Dashboard</span>
                      <i className="mdi mdi-home menu-icon"></i>
                    </Link>
                  </li>
                  {(!API_ON || this.props.authentication.user.userRole == ROLES.super_staff) && (
                    <li className="nav-item">
                      <Link to="/staff_dashboard/logs" className="nav-link">
                        <span className="menu-title">Allocation logs</span>
                        <i className="mdi mdi-chart-bar menu-icon"></i>
                      </Link>
                    </li>
                  )}
                </ul>
              )}
            </nav>
            <div className="main-panel">
              <Route exact path='/student_dashboard/blogs/:id' component={BlogDetails} />
              <Route exact path={['/student_dashboard', '/staff/student_dashboard/:student_id']}>
                <div className="content-wrapper">
                    <div className="page-header">
                        <h3 className="page-title">
                            <span className="page-title-icon bg-gradient-primary text-white mr-2">
                                <i className="mdi mdi-home"></i>
                            </span> Student dashboard
                            {this.state.tutor && (
                              <span style={{color: 'blue'}}> (Tutor: {this.state.tutor.name})</span>
                            )}
                            {!this.state.tutor && (
                              <span style={{color: 'red'}}> (No personal tutor)</span>
                            )}
                        </h3>
                    </div>
                      <div className="page-header">
                        <h3 className="page-title"> Schedule </h3>
                      </div>
                      <div className="row">
                          <div className="col-12 grid-margin">
                              <div className="card">
                                  <div className="card-body">
                                      <TutorCalendar onSelectMeeting={this.onSelectMeeting} events={this.state.meetings} />
                                  </div>
                              </div>
                          </div>
                      </div>

                      <div className="row">
                        {(this.state.tutor && this.props.authentication.user.userRole == ROLES.student) && (
                          <div className="col-md-6 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body p-0">
                                    <div className="chat-container chat-page">
                                            <div className="chat">
                                                <div className="card">
                                                    <div className="card-header msg_head">
                                                        <div className="d-flex bd-highlight">
                                                            <div className="img_cont">
                                                                <img src={avatarProfile(this.state.tutor.name)}
                                                                    className="rounded-circle user_img" />
                                                                <span className="online_icon"></span>
                                                            </div>
                                                            <div className="user_info">
                                                                <span>Chat with {this.state.tutor.name}</span>
                                                            </div>

                                                        </div>
                                                    </div>
                                                    <div className="card-body msg_card_body">
                                                      {this.state.conversations.map(conversation => {
                                                        return (
                                                          <Message conversation={conversation} owner={'student'} tutor={this.state.tutor}/>
                                                        )
                                                      })}

                                                    </div>
                                                    <div className="card-footer">
                                                      <div className="input-group">
                                                        <div className="input-group-append">
                                                            <span className="input-group-text attach_btn"><i
                                                                    className="mdi mdi-attachment"></i></span>
                                                        </div>
                                                        <textarea name="" className="form-control type_msg"
                                                            placeholder="Type your message..." name='messageField' value={this.state.messageField} onChange={this.changeHandler}></textarea>
                                                        <div className="input-group-append" onClick={this.sendMessage}>
                                                            <span className="input-group-text send_btn"><i className="mdi mdi-send"></i></span>
                                                        </div>
                                                      </div>
                                                    </div>
                                                </div>
                                            </div>
                                    </div>
                                </div>
                            </div>
                          </div>
                        )}
                          <div className="col-md-6 grid-margin stretch-card">
                              <div className="card">
                                  <div className="card-body">
                                      <h4 className="card-title">Requests</h4>
                                      <div className="list-group scroll-blog">
                                        {this.state.requests.map(request => {
                                          return (
                                            <Link to={`/student_dashboard/blogs/${request.blog_id}`} className="list-group-item list-group-item-action" key={request.blog_id}>
                                              <div className="d-flex w-100 justify-content-between">
                                                <h5 className="mb-1">{request.title}</h5>
                                              </div>
                                              <p className="mb-1 text-muted"><i className="mdi mdi-account"></i> To: {request.tutor}</p>
                                              <p className="mb-1 text-muted">
                                                <i className="mdi mdi-clock-outline icon-sm"></i>
                                                {moment(request.created_date).fromNow()}
                                              </p>
                                              <p className="mb-1">{request.content}</p>
                                            </Link>
                                          )
                                        })}
                                      </div>
                                      {(!API_ON || this.state.tutor) && ROLES.student == this.props.authentication.user.userRole && (
                                        <button
                                        className="add btn btn-gradient-primary mt-4 font-weight-bold todo-list-add-btn btn-block"
                                        data-toggle="modal" data-target="#requestModal" onClick={this.toggleModalRequest}>
                                        <i className="mdi mdi-file-document-edit-outline mr-2"></i>Create Request</button>
                                      )}
                                  </div>
                              </div>
                          </div>
                          <div className="col-md-6 grid-margin stretch-card">
                              <div className="card">
                                  <div className="card-body">
                                      <h4 className="card-title">Bloging</h4>
                                      <div className="list-group scroll-blog">
                                        {this.state.blogs.map(blog => {
                                          return (
                                            <Link to={`/student_dashboard/blogs/${blog.id}`} className="list-group-item list-group-item-action" key={blog.id}>
                                              <div className="d-flex w-100 justify-content-between">
                                                <h5 className="mb-1">{blog.title}</h5>
                                              </div>
                                              <p className="mb-1">{blog.content}</p>
                                            </Link>
                                          )
                                        })}
                                      </div>
                                      {/* <button
                                          className="add btn btn-gradient-primary mt-4 font-weight-bold todo-list-add-btn btn-block"
                                          data-toggle="modal" data-target="#blogingModal" onClick={this.toggleModalBlog}>
                                          <i className="mdi mdi-file-document-edit-outline mr-2"></i>Create blog</button> */}
                                  </div>
                              </div>
                          </div>
                      </div>
                    
                </div>
              </Route>
              <footer className="footer">
                    <div className="d-sm-flex justify-content-center justify-content-sm-between">
                        <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">Copyright © Team 05
                            <a href="#" target="_blank">TCH1608</a>. All rights reserved.</span>
                    </div>
                </footer>
            </div>
        </div>
        <BlogModal isModalOpen={this.state.modalBlogOpen} toggleModal={this.toggleModalBlog} createBlog={this.createBlog} />
        <RequestModal isModalOpen={this.state.modalRequestOpen} toggleModal={this.toggleModalRequest} createRequest={this.createRequest} />
        <MeetingModalDetails isModalOpen={this.state.modalMeetingDetailsOpen} toggleModal={this.toggleModalMeetingDetails} meeting={this.state.selectedMeeting}/>}
    </div>
    )
  }
}


function mapState(state) {
  const { authentication } = state;
  console.log('Tutor dashboard state');
  console.log(state);
  return {authentication: authentication};
}

const actionCreators = {
  // login: userActions.login,
};

export default connect(mapState)(withRouter(StudentDashboard));

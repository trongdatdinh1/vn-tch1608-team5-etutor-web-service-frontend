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
import circle_svg from '../../assets/images/dashboard/circle.svg';
import logo_svg from '../../assets/images/logo.svg';
import logo_mini_svg from '../../assets/images/logo-mini.svg';
import face_1 from '../../assets/images/faces/face1.jpg';
import img_1 from '../../assets/images/dashboard/img_1.jpg';
import TutorCalendar from './TutorCalendar';
import MeetingModal from './MeetingModal';
import BlogModal from './BlogModal';
import moment from 'moment';
import axios from 'axios';
import BlogDetails from '../blog/BlogDetails';
import {BASEURL} from '../../constants/baseurl';
import {API_ON} from '../../constants/ApiOn';
import Chat from '../chat/Chat';
import MeetingModalDetails from './MeetingModalDetails';
import StudentBlogsModal from './StudentBlogsModal';
import {ROLES} from '../../constants/roles'
import {avatarProfile} from '../../components/utils/ProfileGenerator'
class TutorDashboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userName: '',
      selectedStudentBlogs: [],
      navbarCollapsed: false,
      selectedMeeting: null,
      modalMeetingDetailsOpen: false,
      modalMeetingOpen: false,
      modalStudentBlogsOpen: false,
      modalBlogOpen: false,
      students: [
        {id: 1, name: 'Nara Shikamaru', email: 'shika@fpt.edu.vn'},
        {id: 2, name: 'Aomine Daiki', email: 'aomine@fpt.edu.vn'},
        {id: 3, name: 'Eren Jeager', email: 'eren@fpt.edu.vn'},
        {id: 4, name: 'Tohsaka Rin', email: 'rin@fpt.edu.vn'},
        {id: 5, name: 'Shiba Tatsuya', email: 'tatsuya@fpt.edu.vn'}
      ],
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
      notifications: [
        {relatedId: 1, unread: true, created_date: '2020-04-07T03:57:49.720+0000', content: 'This is a first notification. Very very very very very very very very very very very long'},
        {relatedId: 2, unread: false, created_date: '2020-04-07T03:57:49.720+0000', content: 'This is a first notification. Very very very very very very very very very very very long'},
        
      ]
    }

    this.tutor_id = this.props.match.params.tutor_id;
  }

  componentDidMount() {
    console.log('Did mount');
    console.log(this.props.match);
    if(API_ON) {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.props.authentication.user.accessToken}`
      }

      if(ROLES.tutor === this.props.authentication.user.userRole) {
        axios.get(`${BASEURL}/api/get_list_assigned_students`, {headers: headers}).then(res => {
          this.setState({students: res.data.map(student => {
            return {
              id: student.id,
              name: student.basicProfile.name,
              email: student.basicProfile.email
            }
          })});
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
    
        axios.get(`${BASEURL}/api/blogs`, {headers: headers}).then(res => {
          this.setState({blogs: res.data})
        });
  
        axios.get(`${BASEURL}/api/notifications`, {headers: headers}).then(res => {
          console.log(res.data);
          this.setState({notifications: res.data});
        });
      } else if(ROLES.staff == this.props.authentication.user.userRole || ROLES.staff == this.props.authentication.user.userRole) {
        let tutor_id = this.props.match.params.tutor_id
        console.log('Get======================================')
        console.log(this.props.match.params)
        console.log(this.tutor_id)
        if(!tutor_id) {
          window.location.assign(`/staff_dashboard`);
        } else {
          axios.get(`${BASEURL}/api/tutor_statistics/${tutor_id}`, {headers: headers}).then(res => {
            this.setState({students: res.data.students.map(student => {
              return {
                id: student.id,
                name: student.basicProfile.name,
                email: student.basicProfile.email
              }
            })});

            this.setState({meetings: res.data.meetings.map(meeting => {
              return {
                id: meeting.id,
                title: meeting.title,
                start: moment(meeting.start_date).toDate(),
                end: moment(meeting.end_date).toDate(),
                content: meeting.content
              }
            })});


            this.setState({blogs: res.data.blogs});
            console.log('Statis')
            console.log(res.data)
          });
        }
      } else {

      }
  
      this.setState({userName: this.props.authentication.user.name})
    }
    

    console.log('Did moung');
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

  toggleModalBlog = () => {
    this.setState({modalBlogOpen: !this.state.modalBlogOpen});
  }

  toggleModalMeetingDetails = () => {
    this.setState({modalMeetingDetailsOpen: !this.state.modalMeetingDetailsOpen});
  }

  createMeeting = (meeting) => {
    this.setState({meetings: [...this.state.meetings, meeting]})
  }

  createBlog = blog => {
    this.setState({blogs: [...this.state.blogs, blog]})
  }

  // renderBlog = (routerProps) => {
  //   let blogId = parseInt(routerProps.match.params.id);
  //   let 
  // }

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

          window.location.assign(`/tutor_dashboard/blogs/${blog_id}`);
        });
      });
    } else {
      window.location.assign(`/tutor_dashboard/blogs/${blog_id}`);
    }
    
  }

  openModalStudentBlogs = studentId => {
    if(API_ON) {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.props.authentication.user.accessToken}`
      }

      if( ROLES.tutor == this.props.authentication.user.userRole) {
        axios.get(`${BASEURL}/api/blogs_with_student/${studentId}`, {headers: headers}).then(res => {
          // this.setState({selectedStudentBlogs: res.data})
          this.setState({
            modalStudentBlogsOpen: true,
            selectedStudentBlogs: res.data,
          })
        }).catch(error => {
          console.log(error);
        })
      }

      
    } else {
      let blogs = [
        {id: 1, title: `This is title of student ${studentId}`, content: 'This is content 1'},
        {id: 2, title: 'This is title 2', content: 'This is content 2'},
      ]
      this.setState({
        modalStudentBlogsOpen: true,
        selectedStudentBlogs: blogs,
      })
    }
    
  }

  toggleModalStudentBlogs = () => {
    this.setState({modalStudentBlogsOpen: !this.state.modalStudentBlogsOpen});
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
                    <img src={avatarProfile(this.props.authentication.user.name || 'a')} alt="image" />
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
              {(!API_ON || ROLES.tutor === this.props.authentication.user.userRole) && (
                <ul className="nav">
                    <li className="nav-item nav-profile">
                      <a href="#" className="nav-link">
                        <div className="nav-profile-image">
                          <img src={avatarProfile(this.props.authentication.user.name || 'a')} alt="profile" />
                          <span className="login-status online"></span>
                        </div>
                        <div className="nav-profile-text d-flex flex-column">
                          <span className="font-weight-bold mb-2">{this.state.userName}</span>
                          <span className="text-secondary text-small">Tutor</span>
                        </div>
                        <i className="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
                      </a>
                    </li>
                    <li className="nav-item">
                      <Link to="/tutor_dashboard" className="nav-link">
                        <span className="menu-title">Home pages</span>
                        <i className="mdi mdi-home menu-icon"></i>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/tutor_dashboard/chat" className="nav-link">
                        <span className="menu-title">Chat</span>
                        <i className="mdi mdi-chat-alert menu-icon"></i>
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
                  {!API_ON || this.props.authentication.user.userRole == ROLES.super_staff && (
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
              <Route path='/tutor_dashboard/blogs/:id' component={BlogDetails}  />
              <Route exact path={['/tutor_dashboard', '/staff/tutor_dashboard/:tutor_id']}>
                <div className="content-wrapper">
                    <div className="page-header">
                        <h3 className="page-title">
                            <span className="page-title-icon bg-gradient-primary text-white mr-2">
                                <i className="mdi mdi-home"></i>
                            </span> Tutor dashboard </h3>
                    </div>
                    {/* <div className="row">
                        <div className="col-md-6 stretch-card grid-margin">
                            <div className="card bg-gradient-danger card-img-holder text-white">
                                <div className="card-body">
                                    <img src={circle_svg} className="card-img-absolute"
                                        alt="circle-image" />
                                    <h4 className="font-weight-normal mb-3">Number of messages in last 7 days<i
                                            className="mdi mdi-chart-line mdi-24px float-right"></i>
                                    </h4>
                                    <h2 className="mb-5">15,0000</h2>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 stretch-card grid-margin">
                            <div className="card bg-gradient-info card-img-holder text-white">
                                <div className="card-body">
                                    <img src={circle_svg} className="card-img-absolute"
                                        alt="circle-image" />
                                    <h4 className="font-weight-normal mb-3">Average number of messages <i
                                            className="mdi mdi-bookmark-outline mdi-24px float-right"></i>
                                    </h4>
                                    <h2 className="mb-5">45,6334</h2>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    
                    <Route exact path={['/tutor_dashboard', '/staff/tutor_dashboard/:tutor_id']}>
                      <div className="page-header">
                        <h3 className="page-title"> Schedule </h3>
                        {(!API_ON || this.props.authentication.user.userRole == ROLES.tutor) && (
                          <button
                            className="add btn btn-gradient-primary font-weight-bold todo-list-add-btn btn-block col-3"
                            data-toggle="modal" data-target="#mettingModal" onClick={this.toggleModalMeeting}>
                            <i className="mdi mdi-calendar-month mr-2"></i>Create metting</button>
                        )}
                        
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
                          {/* <div className="col-md-6 grid-margin stretch-card">
                              <div className="card">
                                  <div className="card-body">
                                      <h4 className="card-title">Request</h4>
                                      <div className="list-group scroll-blog">
                                        <a href="#" className="list-group-item list-group-item-action">
                                          <div className="d-flex w-100 justify-content-between">
                                            <h5 className="mb-1">Title requirement</h5>
                                          </div>
                                          <p className="mb-1">Cottage out enabled was entered greatly prevent message.</p>
                                          <p className="mb-1 text-muted"><i className="mdi mdi-account"></i> To: Tutor 01</p>
                                          <p className="mb-1 text-muted">
                                            <i className="mdi mdi-clock-outline icon-sm"></i>
                                              8:58 PM 07/04/2020
                                          </p>
                                        </a>
                                        <a href="#" className="list-group-item list-group-item-action">
                                          <div className="d-flex w-100 justify-content-between">
                                              <h5 className="mb-1">Title requirement</h5>
                                          </div>
                                          <p className="mb-1">Cottage out enabled was entered greatly prevent message.</p>
                                          <p className="mb-1 text-muted"><i className="mdi mdi-account"></i> To: Tutor 01</p>
                                          <p className="mb-1 text-muted">
                                              <i className="mdi mdi-clock-outline icon-sm"></i>
                                              8:58 PM 07/04/2020
                                          </p>
                                        </a>
                                      </div>
                                      <button
                                          className="add btn btn-gradient-primary mt-4 font-weight-bold todo-list-add-btn btn-block"
                                          data-toggle="modal" data-target="#requestModal">
                                          <i className="mdi mdi-note-plus-outline mr-2"></i>Create request</button>
                                  </div>
                              </div>
                          </div> */}
                          <div className="col-md-6 grid-margin stretch-card">
                              <div className="card">
                                  <div className="card-body">
                                      <h4 className="card-title">Bloging</h4>
                                      <div className="list-group scroll-blog">
                                        {this.state.blogs.map(blog => {
                                          return (
                                            <Link to={`/tutor_dashboard/blogs/${blog.id}`} className="list-group-item list-group-item-action" key={blog.id}>
                                              <div className="d-flex w-100 justify-content-between">
                                                <h5 className="mb-1">{blog.title}</h5>
                                              </div>
                                              <p className="mb-1">{blog.content}</p>
                                            </Link>
                                          )
                                        })}
                                      </div>
                                      {(!API_ON || this.props.authentication.user.userRole == ROLES.tutor) && (
                                        <button
                                          className="add btn btn-gradient-primary mt-4 font-weight-bold todo-list-add-btn btn-block"
                                          data-toggle="modal" data-target="#blogingModal" onClick={this.toggleModalBlog}>
                                          <i className="mdi mdi-file-document-edit-outline mr-2"></i>Create blog</button>
                                      )}
                                      
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="row">
                          <div className="col-12 grid-margin stretch-card lst-content">
                              <div className="card">
                                  <div className="card-body">
                                      <h4 className="card-title">
                                          List students
                                      </h4>
                                      <div className="part-right">
                                          <span className="filter"><i className="mdi mdi-filter"></i> Filter by name </span> |
                                          <a href="" className="viw-all">View all >></a>
                                      </div>
                                      <div className="row">
                                          {this.state.students.map(student => {
                                              return (
                                                  <div className="col-6 col-sm-4 col-lg-2" key={student.id}>
                                                      <div className="item"
                                                        onClick={() => {
                                                          this.openModalStudentBlogs(student.id);
                                                        }}>
                                                          <div className="text-center">
                                                              <div className="placeholder-4x4 mb-2">
                                                              <img src={avatarProfile(student.name)}
                                                                  className="rounded" alt="image" />
                                                              </div>
                                                              <h6>{student.name}</h6>
                                                              <p>{student.email}</p>
                                                          </div>
                                                      </div>
                                                  </div>
                                              )
                                          })}
                                      </div>

                                  </div>
                              </div>
                          </div>
                    </div>
                  </Route>
                </div>
              </Route>
              <Route exact path='/tutor_dashboard/chat'>
                <Chat students={this.state.students} />
              </Route>
              <footer className="footer">
                    <div className="d-sm-flex justify-content-center justify-content-sm-between">
                        <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">Copyright © Team 05
                            <a href="#" target="_blank">TCH1608</a>. All rights reserved.</span>
                    </div>
                </footer>
            </div>
        </div>
        <MeetingModal isModalOpen={this.state.modalMeetingOpen} toggleModal={this.toggleModalMeeting} students={this.state.students} createMeeting={this.createMeeting}/>
        <BlogModal isModalOpen={this.state.modalBlogOpen} toggleModal={this.toggleModalBlog} students={this.state.students} createBlog={this.createBlog} />
        <MeetingModalDetails isModalOpen={this.state.modalMeetingDetailsOpen} toggleModal={this.toggleModalMeetingDetails} meeting={this.state.selectedMeeting} />
        <StudentBlogsModal isModalOpen={this.state.modalStudentBlogsOpen} toggleModal={this.toggleModalStudentBlogs} studentBlogs={this.state.selectedStudentBlogs} />
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

// export default TutorDashboard;
export default connect(mapState)(withRouter(TutorDashboard));

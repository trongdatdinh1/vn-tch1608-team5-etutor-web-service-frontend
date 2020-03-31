import React from 'react';
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import '../../assets/vendors/mdi/css/materialdesignicons.min.css';
import '../../assets/vendors/css/vendor.bundle.base.css'
import '../../assets/css/style.css';
import '../../assets/css/etutor.css';
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
import {BASEURL} from '../../constants/baseurl';
class TutorDashboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      navbarCollapsed: false,
      modalMeetingOpen: false,
      modalBlogOpen: false,
      students: [
        {id: 1, name: 'Nara Shikamaru', email: 'shika@fpt.edu.vn'},
        {id: 2, name: 'Aomine Daiki', email: 'aomine@fpt.edu.vn'},
        {id: 3, name: 'Eren Jeager', email: 'eren@fpt.edu.vn'},
        {id: 4, name: 'Tohsaka Rin', email: 'rin@fpt.edu.vn'},
        {id: 5, name: 'Shiba Tatsuya', email: 'tatsuya@fpt.edu.vn'}
      ],
      events: [
        {
          id: 0,
          title: 'Shika',
          // allDay: true,
          // start: moment().hour(10).minute(30).toDate(),
          start: moment('2020-03-26T08:30:00.000+0000').toDate(),
          // end: moment().hour(11).minute(0).toDate(),
          end: moment('2020-03-26T09:00:00.000+0000').toDate()
        },
        {
          id: 1,
          title: 'Long Event',
          start: moment('2020-03-26T08:30:00.000+0000').toDate(),
          // end: moment().hour(11).minute(0).toDate(),
          end: moment('2020-03-26T09:00:00.000+0000').toDate()
        },
      ],
      blogs: [
        {
          id: 1,
          content: 'Blog content',

        }
      ]
    }
  }

  // componentDidMount() {
  //   console.log('Did mount');
  //   console.log(this.props);
  //   const headers = {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${this.props.authentication.user.accessToken}`
  //   }
  //   console.log(this.props.authentication.user.accessToken);

  //   axios.get(`${BASEURL}/api/tutor_allocations`, {headers: headers}).then(res => {
  //     this.setState({students: res.data});
  //   });

  //   axios.get(`${BASEURL}/api/meetings`, {headers: headers}).then(res => {
  //     let meetings = res.data.map(meeting => {
  //       return {
  //         title: meeting.title,
  //         start: moment(meeting.startDate).toDate(),
  //         end: moment(meeting.endDate).toDate()
  //       }
  //     });
  //     this.setState({events: meetings});
  //   });

  //   axios.get(`${BASEURL}/api/blogs`, {headers: headers}).then(res => {
  //     this.setState({blogs: res.data})
  //   });

  //   console.log('Did moung');
  // }

  toggleNavbar = () => {
    this.setState({navbarCollapsed: !this.state.navbarCollapsed})
  }

  onSelectEvent = (e) => {
    console.log('event clicked');
    console.log(e);
  }

  toggleModalMeeting = () => {
    this.setState({modalMeetingOpen: !this.state.modalMeetingOpen});
  }

  toggleModalBlog = () => {
    this.setState({modalBlogOpen: !this.state.modalBlogOpen});
  }

  createEvent = (event) => {
    this.setState({events: [...this.state.events, event]})
  }

  createBlog = blog => {
    this.setState({blogs: [...this.state.blogs, blog]})
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
            <div className="search-field d-none d-md-block">
              <form className="d-flex align-items-center h-100" action="#">
                <div className="input-group">
                  <div className="input-group-prepend bg-transparent">
                    <i className="input-group-text border-0 mdi mdi-magnify"></i>
                  </div>
                  <input type="text" className="form-control bg-transparent border-0" placeholder="Search students" />
                </div>
              </form>
            </div>
            <ul className="navbar-nav navbar-nav-right">
              <li className="nav-item nav-profile dropdown">
                <a className="nav-link dropdown-toggle" id="profileDropdown" href="#" data-toggle="dropdown"
                  aria-expanded="false">
                  <div className="nav-profile-img">
                    <img src={face_1} alt="image" />
                    <span className="availability-status online"></span>
                  </div>
                  <div className="nav-profile-text">
                    <p className="mb-1 text-black">David Greymaax</p>
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
                <ul className="nav">
                    <li className="nav-item nav-profile">
                        <a href="#" className="nav-link">
                            <div className="nav-profile-image">
                                <img src={face_1} alt="profile" />
                                <span className="login-status online"></span>
                            </div>
                            <div className="nav-profile-text d-flex flex-column">
                                <span className="font-weight-bold mb-2">David Grey. H</span>
                                <span className="text-secondary text-small">Staff member</span>
                            </div>
                            <i className="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="index.html">
                            <span className="menu-title">Home page</span>
                            <i className="mdi mdi-home menu-icon"></i>
                        </a>
                    </li>
                </ul>
            </nav>
            <div className="main-panel">
                <div className="content-wrapper">
                    <div className="page-header">
                        <h3 className="page-title">
                            <span className="page-title-icon bg-gradient-primary text-white mr-2">
                                <i className="mdi mdi-home"></i>
                            </span> Tutor dashboard </h3>
                    </div>
                    <div className="row">
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
                    </div>
                    <div className="page-header">
                      <h3 className="page-title"> Schedule </h3>
                      <button
                        className="add btn btn-gradient-primary font-weight-bold todo-list-add-btn btn-block col-3"
                        data-toggle="modal" data-target="#mettingModal" onClick={this.toggleModalMeeting}>
                        <i className="mdi mdi-calendar-month mr-2"></i>Create metting</button>
                      
                    </div>
                    <div className="row">
                        <div className="col-12 grid-margin">
                            <div className="card">
                                <div className="card-body">
                                    <TutorCalendar onSelectEvent={this.onSelectEvent} events={this.state.events} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Chat</h4>
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
                                          <a href="#" className="list-group-item list-group-item-action" key={blog.id}>
                                            <div className="d-flex w-100 justify-content-between">
                                                <h5 className="mb-1">Requirement course work</h5>
                                              
                                            </div>
                                            <p className="mb-1">{blog.content}</p>

                                          </a>
                                        )
                                      })}
                                    </div>
                                    <button
                                        className="add btn btn-gradient-primary mt-4 font-weight-bold todo-list-add-btn btn-block"
                                        data-toggle="modal" data-target="#blogingModal" onClick={this.toggleModalBlog}>
                                        <i className="mdi mdi-file-document-edit-outline mr-2"></i>Create blog</button>
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
                                                    <a href="" className="item">
                                                        <div className="text-center">
                                                            <img src="../assets/images/dashboard/img_1.jpg"
                                                                className="mb-2 mw-100 w-100 rounded" alt="image" />
                                                            <h6>{student.name}</h6>
                                                            <p>{student.email}</p>
                                                        </div>
                                                    </a>
                                                </div>
                                            )
                                        })}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <footer className="footer">
                    <div className="d-sm-flex justify-content-center justify-content-sm-between">
                        <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">Copyright © Team 05
                            <a href="#" target="_blank">TCH1608</a>. All rights reserved.</span>
                    </div>
                </footer>
            </div>
        </div>
        <MeetingModal isModalOpen={this.state.modalMeetingOpen} toggleModal={this.toggleModalMeeting} students={this.state.students} createEvent={this.createEvent}/>
        <BlogModal isModalOpen={this.state.modalBlogOpen} toggleModal={this.toggleModalBlog} students={this.state.students} createBlog={this.createBlog} />
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
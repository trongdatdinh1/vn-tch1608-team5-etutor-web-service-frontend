import React from 'react';
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import '../../assets/vendors/mdi/css/materialdesignicons.min.css';
import '../../assets/vendors/css/vendor.bundle.base.css';
import '../../assets/css/style.css';
import '../../assets/css/etutor.css';
import circle_svg from '../../assets/images/dashboard/circle.svg';
import logo_svg from '../../assets/images/logo.svg';
import logo_mini_svg from '../../assets/images/logo-mini.svg';
import face_1 from '../../assets/images/faces/face1.jpg';
import img_1 from '../../assets/images/dashboard/img_1.jpg';
import TutorCheckbox from './TutorCheckbox';
import StudentCheckbox from './StudentCheckbox';
import axios from 'axios';
import {BASEURL} from '../../constants/baseurl';
class StaffDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navbarCollapsed: true,
      selectedTutor: 1,
      assignedStudents: [],
      tutors: [
        {id: 1, name: 'Dinh Trong Dat', email: 'datdt@fpt.edu.vn'},
        {id: 2, name: 'Nguyen Tien Viet', email: 'vietnt@fpt.edu.vn'},
        {id: 3, name: 'Nong Hoang Thai', email: 'thainh@fpt.edu.vn'},
        {id: 4, name: 'Tran Hoang Linh', email: 'linhth@fpt.edu.vn'},
        {id: 5, name: 'Nguyen Van A', email: 'anv@fpt.edu.vn'}
      ],
      students: [
        {id: 1, name: 'Nara Shikamaru', email: 'shika@fpt.edu.vn'},
        {id: 2, name: 'Aomine Daiki', email: 'aomine@fpt.edu.vn'},
        {id: 3, name: 'Eren Jeager', email: 'eren@fpt.edu.vn'},
        {id: 4, name: 'Tohsaka Rin', email: 'rin@fpt.edu.vn'},
        {id: 5, name: 'Shiba Tatsuya', email: 'tatsuya@fpt.edu.vn'}
      ],
      assigners: [
        {1: [1, 2]},
        {2: [2, 3]},
        {3: [3, 4]},
        {4: [4, 5]},
        {5: [1, 4]},
      ],
      studentKeyName: '',
      tutorKeyName: '',
      isSelectAllChecked: false
    }
  }

  // componentDidMount() {
  //   const headers = {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${this.props.authentication.user.accessToken}`
  //   }

  //   axios.get(`${BASEURL}/api/users/students`, {headers: headers}).then(res => {
  //     this.setState({students: res.data});
  //   });

  //   axios.get(`${BASEURL}/api/users/tutors`, {headers: headers}).then(res => {
  //     this.setState({tutors: res.data});
  //   });

  //   axios.get(`${BASEURL}/api/allocations`, {headers: headers}).then(res => {
  //     let arr = [];
  //     for(const obj in res.data) {
  //       arr.push({[obj]: res.data[obj]})
  //     }
  //     this.setState({assigners: arr});
  //   });
    
  // }

  toggleNavbar = () => {
    this.setState({navbarCollapsed: !this.state.navbarCollapsed})
  }

  changeHandler= (e) => {
    this.setState({ [e.target.name] : e.target.value});
  }

  assignedStudentsToTutor = tutorId => {
    let assignedStudents = this.state.assigners.find(object => object.hasOwnProperty(tutorId));
    return assignedStudents[tutorId];
  }

  chooseTutor = e => {
    console.log('Shit');
    console.log(e.target.value);
    this.setState({selectedTutor: e.target.value});
    this.setState({assignedStudents: this.assignedStudentsToTutor(e.target.value)})
  }

  selectAllStudents = () => {
    
  }

  onSelectAllChanged = () => {
    this.setState({isSelectAllChecked: !this.state.isSelectAllChecked});
    if(!this.state.isSelectAllChecked) {
      let studentIds = this.state.students.map(student => student.id);
      this.setState({assignedStudents: studentIds});
    }
  }

  handleStudentCheck = e => {
    let stringStudentId = e.target.value;
    let studentId = parseInt(stringStudentId);
    if(this.state.assignedStudents.includes(studentId)) {
      this.setState({ assignedStudents: this.state.assignedStudents.filter(id => id != studentId )});
    } else {
      this.setState({assignedStudents: [...this.state.assignedStudents, studentId]})
    }
    console.log(this.state.assignedStudents);
    // console.log(this.state.assignedStudents.includes(studentId));
  }

  assignStudentsToTutor = () => {
    let tutorId = this.state.selectedTutor;
    let students = this.state.assignedStudents;
    let items = [...this.state.assigners]
    let index = items.findIndex(el => {
      return el.hasOwnProperty(tutorId);
    })
    items[index][tutorId] = students;

    this.setState({assigners: items})
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
              <li className="nav-item">
                <a className="nav-link" href="register.html">
                  <span className="menu-title">Create account</span>
                  <i className="mdi mdi-contacts menu-icon"></i>
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
                  </span> Staff dashboard </h3>
              </div>
              <div className="row">
                <div className="col-md-4 stretch-card grid-margin">
                  <div className="card bg-gradient-danger card-img-holder text-white">
                    <div className="card-body">
                      <img src={circle_svg} className="card-img-absolute" alt="circle-image" />
                      <h4 className="font-weight-normal mb-3">Students not assigned <i
                          className="mdi mdi-chart-line mdi-24px float-right"></i>
                      </h4>
                      <h2 className="mb-5">15,0000</h2>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 stretch-card grid-margin">
                  <div className="card bg-gradient-info card-img-holder text-white">
                    <div className="card-body">
                      <img src={circle_svg} className="card-img-absolute" alt="circle-image" />
                      <h4 className="font-weight-normal mb-3">Students inactive in 7 days <i
                          className="mdi mdi-bookmark-outline mdi-24px float-right"></i>
                      </h4>
                      <h2 className="mb-5">45,6334</h2>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 stretch-card grid-margin">
                  <div className="card bg-gradient-success card-img-holder text-white">
                    <div className="card-body">
                      <img src={circle_svg} className="card-img-absolute" alt="circle-image" />
                      <h4 className="font-weight-normal mb-3">Students inactive in 28 days <i
                          className="mdi mdi-diamond mdi-24px float-right"></i>
                      </h4>
                      <h2 className="mb-5">95,5741</h2>
                    </div>
                  </div>
                </div>
              </div>
              <div className="page-header">
                <h3 className="page-title"> Assign student </h3>
              </div>
              
              <div className="row">
                  <div className="col-12 grid-margin">
                    <div className="card">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-12 col-sm-4 col-lg-4">
                            <h4 className="card-title">Tutor list</h4>
                            <div className="form-group">
                              <div className="input-group">
                                <input type="text" className="form-control" placeholder="Search tutor" name="tutorKeyName" value={this.state.tutorKeyName} onChange={this.changeHandler} />
                                <div className="input-group-append">
                                  <button className="btn btn-sm btn-gradient-primary" type="button">
                                    <i className="mdi mdi-account-search"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="list-wrapper">
                              <div className="scroll-list">
                                <ul className="d-flex flex-column-reverse todo-list-custom" onChange={this.chooseTutor}>
                                  {this.state.tutors.filter(tutor => tutor.name.toLowerCase().includes(this.state.tutorKeyName.toLowerCase())).map(tutor => {
                                    return (
                                      <TutorCheckbox tutor={tutor} />    
                                    )
                                  })}
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="col-12 col-sm-4 col-lg-4">
                            <h4 className="card-title">Student list</h4>
                            <div className="form-group">
                              <div className="input-group">
                                <input type="text" className="form-control" placeholder="Search student" name="studentKeyName" value={this.state.studentKeyName} onChange={this.changeHandler} />
                                <div className="input-group-append">
                                  <button className="btn btn-sm btn-gradient-primary" type="button">
                                    <i className="mdi mdi-account-search"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="list-wrapper">
                              <div className="form-check point-form-check">
                                <label className="form-check-label">
                                  <input type="checkbox" className="form-check-input" name='checkAll' checked={this.state.isSelectAllChecked} onChange={this.onSelectAllChanged} /> Select all <i
                                    className="input-helper"></i></label>
                              </div>
                              <div className="scroll-list">
                                <ul className="d-flex flex-column-reverse todo-list-custom">
                                  {this.state.students.filter(student => student.name.toLowerCase().includes(this.state.studentKeyName.toLowerCase())).map(student => {
                                    return (
                                      <StudentCheckbox student={student} isChecked={this.state.assignedStudents.includes(student.id)} handleStudentCheck={this.handleStudentCheck} />
                                    )
                                  })}
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="col-12 col-sm-4 col-lg-4">
                            <h4 className="card-title">&nbsp;</h4>
                            <div className="add-items d-flex">
                              <button className="add btn btn-gradient-primary font-weight-bold todo-list-add-btn btn-block" data-toggle="modal" data-target="#allocateModal" onClick={this.assignStudentsToTutor}> 
                                <i className="mdi mdi-account-check"></i>Assign</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              <div className="row">
                <div className="col-12 grid-margin stretch-card lst-content">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">
                        List Staffs
                      </h4>
                      <div className="part-right">
                        <span className="filter"><i className="mdi mdi-filter"></i> Filter by name</span> |
                        <a href="" className="viw-all">View all >></a>
                      </div>
                      <div className="row">
                        {this.state.tutors.map((tutor)=>{
                          return (
                            <div className="col-6 col-sm-4 col-lg-2">
                              <a href="" className="item">
                                <div className="text-center">
                                  <img src={img_1} className="mb-2 mw-100 w-100 rounded" alt="image" />
                                  <h6>{tutor.name}</h6>
                                  <p>{tutor.email}</p>
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
              <div className="row">
                <div className="col-12 grid-margin stretch-card lst-content">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">
                        List Tutor
                      </h4>
                      <div className="part-right">
                        <span className="filter"><i className="mdi mdi-filter"></i> Filter by name</span> |
                        <a href="" className="viw-all">View all >></a>
                      </div>
                      <div className="row">
                        {this.state.tutors.map((tutor)=>{
                          return (
                            <div className="col-6 col-sm-4 col-lg-2">
                              <a href="" className="item">
                                <div className="text-center">
                                  <img src={img_1} className="mb-2 mw-100 w-100 rounded" alt="image" />
                                  <h6>{tutor.name}</h6>
                                  <p>{tutor.email}</p>
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

              <div className="row">
                <div className="col-12 grid-margin stretch-card lst-content">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">
                        List Student
                      </h4>
                      <div className="part-right">
                        <span className="filter"><i className="mdi mdi-filter"></i> Filter by name </span> |
                        <a href="" className="viw-all">View all >></a>
                      </div>
                      <div className="row">
                        {this.state.students.map((student)=> {
                          return (
                            <div className="col-6 col-sm-4 col-lg-2">
                              <a href="" className="item">
                                <div className="text-center">
                                  <img src={img_1} className="mb-2 mw-100 w-100 rounded" alt="image" />
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
                <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">Copyright © Team 05 <a
                    href="#" target="_blank">TCH1608</a>. All rights reserved.</span>
              </div>
            </footer>
          </div>
        </div>
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

// export default StaffDashboard;
export default connect(mapState)(withRouter(StaffDashboard));
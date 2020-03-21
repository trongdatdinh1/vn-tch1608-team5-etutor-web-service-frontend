import React from 'react';
import '../../assets/vendors/mdi/css/materialdesignicons.min.css';
import '../../assets/vendors/css/vendor.bundle.base.css';
import '../../assets/css/style.css';
import '../../assets/css/etutor.css';
import circle_svg from '../../assets/images/dashboard/circle.svg';
import logo_svg from '../../assets/images/logo.svg';
import logo_mini_svg from '../../assets/images/logo-mini.svg';
import face_1 from '../../assets/images/faces/face1.jpg';
import img_1 from '../../assets/images/dashboard/img_1.jpg';
class StaffDashboard extends React.Component {


  render() {
    return (
      <div class="container-scroller">
        <nav class="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
          <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
            <a class="navbar-brand brand-logo" href="index.html"><img src={logo_svg} alt="logo" /></a>
            <a class="navbar-brand brand-logo-mini" href="index.html"><img src={logo_mini_svg}
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
                  <input type="text" class="form-control bg-transparent border-0" placeholder="Search students" />
                </div>
              </form>
            </div>
            <ul class="navbar-nav navbar-nav-right">
              <li class="nav-item nav-profile dropdown">
                <a class="nav-link dropdown-toggle" id="profileDropdown" href="#" data-toggle="dropdown"
                  aria-expanded="false">
                  <div class="nav-profile-img">
                    <img src={face_1} alt="image" />
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
                    <img src={face_1} alt="profile" />
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
              <li class="nav-item">
                <a class="nav-link" href="register.html">
                  <span class="menu-title">Create account</span>
                  <i class="mdi mdi-contacts menu-icon"></i>
                </a>
              </li>
            </ul>
          </nav>
          <div class="main-panel">
            <div class="content-wrapper">
              <div class="page-header">
                <h3 class="page-title">
                  <span class="page-title-icon bg-gradient-primary text-white mr-2">
                    <i class="mdi mdi-home"></i>
                  </span> Staff dashboard </h3>
              </div>
              <div class="row">
                <div class="col-md-4 stretch-card grid-margin">
                  <div class="card bg-gradient-danger card-img-holder text-white">
                    <div class="card-body">
                      <img src={circle_svg} class="card-img-absolute" alt="circle-image" />
                      <h4 class="font-weight-normal mb-3">Students not assigned <i
                          class="mdi mdi-chart-line mdi-24px float-right"></i>
                      </h4>
                      <h2 class="mb-5">15,0000</h2>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 stretch-card grid-margin">
                  <div class="card bg-gradient-info card-img-holder text-white">
                    <div class="card-body">
                      <img src={circle_svg} class="card-img-absolute" alt="circle-image" />
                      <h4 class="font-weight-normal mb-3">Students inactive in 7 days <i
                          class="mdi mdi-bookmark-outline mdi-24px float-right"></i>
                      </h4>
                      <h2 class="mb-5">45,6334</h2>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 stretch-card grid-margin">
                  <div class="card bg-gradient-success card-img-holder text-white">
                    <div class="card-body">
                      <img src={circle_svg} class="card-img-absolute" alt="circle-image" />
                      <h4 class="font-weight-normal mb-3">Students inactive in 28 days <i
                          class="mdi mdi-diamond mdi-24px float-right"></i>
                      </h4>
                      <h2 class="mb-5">95,5741</h2>
                    </div>
                  </div>
                </div>
              </div>
              <div class="page-header">
                <h3 class="page-title"> Allocate student </h3>
              </div>
              
              <div class="row">
                  <div class="col-12 grid-margin">
                    <div class="card">
                      <div class="card-body">
                        <div class="row">
                          <div class="col-12 col-sm-4 col-lg-4">
                            <h4 class="card-title">Tutor list</h4>
                            <div class="form-group">
                              <div class="input-group">
                                <input type="text" class="form-control" placeholder="Search tutor" />
                                <div class="input-group-append">
                                  <button class="btn btn-sm btn-gradient-primary" type="button">
                                    <i class="mdi mdi-account-search"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div class="list-wrapper">
                              <div class="scroll-list">
                                <ul class="d-flex flex-column-reverse todo-list-custom">
                                  <li>
                                    <div class="form-check">
                                      <label class="form-check-label">
                                        <input type="radio" class="form-check-input" name="optionsRadios" value="" /> Tutor <i
                                          class="input-helper" ></i></label>
                                    </div>
                                  </li>
                                  <li>
                                    <div class="form-check">
                                      <label class="form-check-label">
                                        <input type="radio" class="form-check-input" name="optionsRadios" value="" /> Tutor <i
                                          class="input-helper"></i></label>
                                    </div>
                                  </li>
                                  <li>
                                    <div class="form-check">
                                      <label class="form-check-label">
                                        <input type="radio" class="form-check-input" name="optionsRadios" value="" /> Tutor <i
                                          class="input-helper"></i></label>
                                    </div>
                                  </li>
                                  <li>
                                    <div class="form-check">
                                      <label class="form-check-label">
                                        <input type="radio" class="form-check-input" name="optionsRadios" value="" /> Tutor <i
                                          class="input-helper"></i></label>
                                    </div>
                                  </li>
                                  <li>
                                    <div class="form-check">
                                      <label class="form-check-label">
                                        <input type="radio" class="form-check-input" name="optionsRadios" value="" /> Tutor <i
                                          class="input-helper"></i></label>
                                    </div>
                                  </li>

                                </ul>
                              </div>
                            </div>
                          </div>
                          <div class="col-12 col-sm-4 col-lg-4">
                            <h4 class="card-title">Student list</h4>
                            <div class="form-group">
                              <div class="input-group">
                                <input type="text" class="form-control" placeholder="Search student" />
                                <div class="input-group-append">
                                  <button class="btn btn-sm btn-gradient-primary" type="button">
                                    <i class="mdi mdi-account-search"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div class="list-wrapper">
                              <div class="form-check point-form-check">
                                <label class="form-check-label">
                                  <input type="checkbox" class="form-check-input" /> Select all <i
                                    class="input-helper"></i></label>
                              </div>
                              <div class="scroll-list">
                                <ul class="d-flex flex-column-reverse todo-list-custom">
                                  <li>
                                    <div class="form-check">
                                      <label class="form-check-label">
                                        <input class="checkbox" type="checkbox" /> Student <i class="input-helper"></i></label>
                                    </div>
                                  </li>
                                  <li>
                                    <div class="form-check">
                                      <label class="form-check-label">
                                        <input class="checkbox" type="checkbox" /> Student <i class="input-helper"></i></label>
                                    </div>
                                  </li>
                                  <li>
                                    <div class="form-check">
                                      <label class="form-check-label">
                                        <input class="checkbox" type="checkbox" /> Student <i class="input-helper"></i></label>
                                    </div>
                                  </li>
                                  <li>
                                    <div class="form-check">
                                      <label class="form-check-label">
                                        <input class="checkbox" type="checkbox" /> Student <i class="input-helper"></i></label>
                                    </div>
                                  </li>
                                  <li>
                                    <div class="form-check">
                                      <label class="form-check-label">
                                        <input class="checkbox" type="checkbox" /> Student <i class="input-helper"></i></label>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div class="col-12 col-sm-4 col-lg-4">
                            <h4 class="card-title">&nbsp;</h4>
                            <div class="add-items d-flex">
                              <button class="add btn btn-gradient-primary font-weight-bold todo-list-add-btn btn-block" data-toggle="modal" data-target="#allocateModal"> 
                                <i class="mdi mdi-account-check"></i>Allocate</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              <div class="row">
                <div class="col-12 grid-margin stretch-card lst-content">
                  <div class="card">
                    <div class="card-body">
                      <h4 class="card-title">
                        List Staffs
                      </h4>
                      <div class="part-right">
                        <span class="filter"><i class="mdi mdi-filter"></i> Filter by name</span> |
                        <a href="" class="viw-all">View all >></a>
                      </div>
                      <div class="row">
                        {[1,2,3,4,5,6,7,8,9].map(()=>{
                          return (
                            <div class="col-6 col-sm-4 col-lg-2">
                              <a href="" class="item">
                                <div class="text-center">
                                  <img src={img_1} class="mb-2 mw-100 w-100 rounded" alt="image" />
                                  <h6>Donald Trump</h6>
                                  <p>trump@etutor.com.vn</p>
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
              <div class="row">
                <div class="col-12 grid-margin stretch-card lst-content">
                  <div class="card">
                    <div class="card-body">
                      <h4 class="card-title">
                        List Tutor
                      </h4>
                      <div class="part-right">
                        <span class="filter"><i class="mdi mdi-filter"></i> Filter by name</span> |
                        <a href="" class="viw-all">View all >></a>
                      </div>
                      <div class="row">
                        {[1,2,3,4,5,6,7,8,9,10].map(()=>{
                          return (
                            <div class="col-6 col-sm-4 col-lg-2">
                              <a href="" class="item">
                                <div class="text-center">
                                  <img src={img_1} class="mb-2 mw-100 w-100 rounded" alt="image" />
                                  <h6>Donald Trump</h6>
                                  <p>trump@etutor.com.vn</p>
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

              <div class="row">
                <div class="col-12 grid-margin stretch-card lst-content">
                  <div class="card">
                    <div class="card-body">
                      <h4 class="card-title">
                        List Student
                      </h4>
                      <div class="part-right">
                        <span class="filter"><i class="mdi mdi-filter"></i> Filter by name </span> |
                        <a href="" class="viw-all">View all >></a>
                      </div>
                      <div class="row">
                        {[1,2,3,5,6,7,8,9,10,11,12,13,14,15].map(()=> {
                          return (
                            <div class="col-6 col-sm-4 col-lg-2">
                              <a href="" class="item">
                                <div class="text-center">
                                  <img src={img_1} class="mb-2 mw-100 w-100 rounded" alt="image" />
                                  <h6>Donald Trump</h6>
                                  <p>trump@etutor.com.vn</p>
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
            <footer class="footer">
              <div class="d-sm-flex justify-content-center justify-content-sm-between">
                <span class="text-muted text-center text-sm-left d-block d-sm-inline-block">Copyright © Team 05 <a
                    href="#" target="_blank">TCH1608</a>. All rights reserved.</span>
              </div>
            </footer>
          </div>
        </div>
      </div>
    )
  }
}


export default StaffDashboard;

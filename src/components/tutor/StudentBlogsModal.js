import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import {
  Router,
  Switch,
  Link,
  Route,
  withRouter
} from "react-router-dom";
// import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';
// import "react-datepicker/dist/react-datepicker.css";
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import axios from 'axios';
import {BASEURL} from '../../constants/baseurl';
import {API_ON} from '../../constants/ApiOn';
class StudentBlogsModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: [
        
      ],
    }
  }

  closeModal = () => {
    this.props.toggleModal();
  }


  render() {
    return (
      <Modal
          isOpen={this.props.isModalOpen}
          // onAfterOpen={afterOpenModal}
          onRequestClose={this.closeModal}
          className='modal-dialog modal-xl modal-dialog-centered'
          overlayClassName='modal-backdrop modal-rgba'
          contentLabel="Blogs"
          ariaHideApp={false}
        >
          <div className="modal-dialog modal-xl modal-dialog-centered" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Blogs</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.props.toggleModal}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-lg-12">
                          {this.props.studentBlogs.map(blog => {
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

                    </div>
                </div>

            </div>
        </div>
        </Modal>
    )
  }
}


function mapState(state) {
  const { authentication } = state;
  return {authentication: authentication};
}

const actionCreators = {
  // login: userActions.login,
};

// export default TutorDashboard;
export default connect(mapState)(StudentBlogsModal);

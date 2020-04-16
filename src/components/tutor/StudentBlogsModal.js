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
    this.baseState = this.state;
  }

  closeModal = () => {
    this.setState(this.baseState)
    this.props.toggleModal();
  }



  componentDidUpdate(prevProps) {
    if(prevProps.studentId !== this.props.studentId) {
      if(API_ON) {
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.props.authentication.user.accessToken}`
        };
        
        axios.get(`${BASEURL}/api/students/${this.props.id}/blogs`, {headers: headers}).then(res => {
          this.setState({blogs: res.data})
        }).catch(error => {
          console.log(error);
        })
      } else {
        let blogs = [
          {id: 1, title: 'This is a title', content: 'This is a content'},
          {id: 2, title: 'This is a title', content: 'This is a content'},
          {id: 3, title: 'This is a title', content: 'This is a content'},
        ]
        this.setState({blogs: blogs})
      }
    }
  }

  


  render() {
    return (
      <Modal
          isOpen={this.props.isModalOpen}
          // onAfterOpen={afterOpenModal}
          onRequestClose={this.closeModal}
          className='modal-dialog modal-xl modal-dialog-centered'
          overlayClassName='modal-backdrop modal-rgba'
          contentLabel="Create Meeting"
          ariaHideApp={false}
        >
          <div className="modal-dialog modal-xl modal-dialog-centered" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Create blog</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.props.toggleModal}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="row">
                        <div className="col-12 col-sm-8 col-lg-8">
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

                    </div>
                </div>

                <div className="modal-footer">
                    <button type="button" data-dismiss="modal" aria-label="Close"
                        className="btn btn-light mr-2">Cancel</button>
                    <button type="submit" className="btn btn-gradient-primary" onClick={this.handleSubmit}>Submit</button>
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

import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
// import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';
// import "react-datepicker/dist/react-datepicker.css";
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import axios from 'axios';
import {BASEURL} from '../../constants/baseurl';
import {API_ON} from '../../constants/ApiOn';

class BlogModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      studentKeyName: '',
      isSelectAllChecked: false,
      content: '',
      selectedStudents: [],
      document: null
    }
    this.baseState = this.state;
  }

  closeModal = () => {
    this.setState(this.baseState)
    this.props.toggleModal();
  }

  onSelectAllChanged = () => {
    if(!this.state.isSelectAllChecked) {
      let studentIds = this.props.students.map(student => student.id);
      this.setState({selectedStudents: studentIds});
    } else {
      this.setState({selectedStudents: []})
    }
    this.setState({isSelectAllChecked: !this.state.isSelectAllChecked});
  }

  handleStudentCheck = e => {
    let stringStudentId = e.target.value;
    let studentId = parseInt(stringStudentId);
    if(this.state.selectedStudents.includes(studentId)) {
      this.setState({ selectedStudents: this.state.selectedStudents.filter(id => id != studentId )});
    } else {
      this.setState({selectedStudents: [...this.state.selectedStudents, studentId]})
    }
  }

  changeHandler = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = () => {

    console.log(this.state);

    let blog = {
      title: this.state.title,
      content: this.state.content,
      tutor_ids: this.state.selectedStudents
    }

    if(API_ON) {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.props.authentication.user.accessToken}`
      };
      
      axios.post(`${BASEURL}/api/blogs`, blog, {headers: headers}).then(res => {
        this.props.createBlog({
          id: res.data.id,
          title: res.data.title,
          content: res.data.content,
        });
      }).catch(error => {
        console.log(error);
      }).finally(() => {
        this.closeModal();
      });
    } else {
      this.props.createBlog(blog);
      this.closeModal();
    }
    
  }

  fileChangeHandler = (e) => {
    this.setState({document: e.target.files})
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
                            <form className="forms-sample">
                                <div className="form-group">
                                    <label for="exampleInputName1">Title</label>
                                    <input type="text" className="form-control" id="exampleInputName1" name='title' value={this.state.title} onChange={this.changeHandler} placeholder="Title" />
                                </div>
                                <div className="form-group">
                                    <label>Content</label>
                                    <textarea className="form-control" id="exampleTextarea1" rows="7" name='content' value={this.state.content} onChange={this.changeHandler}></textarea>
                                </div>
                                <div className="form-group">
                                  <label>Documents</label>
                                  <input type="file" name="documennt" multiple onChange={this.fileChangeHandler} />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    <button type="button" data-dismiss="modal" aria-label="Close"
                        className="btn btn-light mr-2" onClick={this.closeModal}>Cancel</button>
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
export default connect(mapState)(BlogModal);

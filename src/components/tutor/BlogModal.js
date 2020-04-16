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
      title: '',
      studentKeyName: '',
      isSelectAllChecked: false,
      content: '',
      selectedStudent: null,
      document: null
    }
    this.baseState = this.state;
  }

  closeModal = () => {
    this.setState(this.baseState)
    this.props.toggleModal();
  }

  handleStudentCheck = e => {
    let stringStudentId = e.target.value;
    let studentId = parseInt(stringStudentId);
    this.setState({selectedStudent: studentId})
  }

  changeHandler = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  fileChangeHandler = (e) => {
    this.setState({document: e.target.files})
  }

  handleSubmit = () => {

    console.log(this.state);

   

    if(API_ON) {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.props.authentication.user.accessToken}`
      };

      const multipart_header = {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${this.props.authentication.user.accessToken}`
      }

      const formData = new FormData();
      // formData.append("document", this.state.document);
      for(var x = 0; x<this.state.document.length; x++) {
        formData.append('files', this.state.document[x])
      }

      axios.post(`${BASEURL}/uploadMultipleFiles`, formData, {headers: multipart_header}).then(res => {
        let file_ids = res.data.map(file => {
          return file.id;
        })

        let blog = {
          title: this.state.title,
          content: this.state.content,
          student_id: this.state.selectedStudent,
          file_ids: file_ids
        }
        axios.post(`${BASEURL}/api/blogs`, blog, {headers: headers}).then(res => {
          console.log('Created Blog')
          console.log(res.data)
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
      })
      
    } else {
      let blog = {
        title: this.state.title,
        content: this.state.content,
        student_id: this.state.selectedStudent,
      }
      this.props.createBlog(blog);
      this.closeModal();
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
                            <form className="forms-sample">
                                <div className="form-group">
                                    <label >Title</label>
                                    <input type="text" className="form-control" id="exampleInputName1" name='title' value={this.state.title} onChange={this.changeHandler} placeholder="Title" />
                                </div>
                                <div className="form-group">
                                    <label>Content</label>
                                    <textarea className="form-control" id="exampleTextarea1" rows="7" name='content' value={this.state.content} onChange={this.changeHandler}></textarea>
                                </div>
                                <div>
                                  <label>Documents</label>
                                  <input type="file" name="documennt" multiple onChange={this.fileChangeHandler} />
                                </div>
                            </form>
                        </div>
                        <div className="col-12 col-sm-4 col-lg-4">
                                <p className="small-ttl">Student list</p>
                            <div className="form-group">
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Search student" name='studentKeyName'  value={this.state.studentKeyName} onChange={this.changeHandler} />
                                    <div className="input-group-append">
                                        <button className="btn btn-sm btn-gradient-primary" type="button">
                                            <i className="mdi mdi-account-search"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="list-wrapper">
                                <div className="scroll-list">
                                    <ul className="d-flex flex-column-reverse todo-list-custom">
                                      {this.props.students.filter(student => student.name.toLowerCase().includes(this.state.studentKeyName.toLowerCase())).map(student => {
                                        return (
                                          <li key={student.id}>
                                            <div className="form-check">
                                              <label className="form-check-label">
                                                <input className="" name="studentCheck" type="radio" value={student.id} onChange={this.handleStudentCheck} /> {student.name} <i className="input-helper" ></i>
                                              </label>
                                            </div>
                                          </li>
                                        )
                                      })}
                                        
                                    </ul>
                                </div>
                            </div>
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
export default connect(mapState)(BlogModal);

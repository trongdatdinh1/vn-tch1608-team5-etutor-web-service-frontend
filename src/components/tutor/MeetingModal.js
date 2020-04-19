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
const CalendarIcon = props => {
  return (
    <div className="btn btn-sm btn-gradient-primary">
      <i className="mdi mdi-calendar"></i>
    </div>
  )
}


class MeetingModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      studentKeyName: '',
      isSelectAllChecked: false,
      title: '',
      startDate: new Date(),
      endDate: new Date(),
      content: '',
      selectedStudent: null,
      errorMessage: ''
    }
    this.baseState = this.state;
  }

  // onSelectAllChanged = () => {
  //   if(!this.state.isSelectAllChecked) {
  //     let studentIds = this.props.students.map(student => student.id);
  //     this.setState({selectedStudents: studentIds});
  //   } else {
  //     this.setState({selectedStudents: []})
  //   }
  //   this.setState({isSelectAllChecked: !this.state.isSelectAllChecked});
  // }

  handleStudentCheck = e => {
    // let stringStudentId = e.target.value;
    // let studentId = parseInt(stringStudentId);
    // if(this.state.selectedStudents.includes(studentId)) {
    //   this.setState({ selectedStudents: this.state.selectedStudents.filter(id => id != studentId )});
    // } else {
    //   this.setState({selectedStudents: [...this.state.selectedStudents, studentId]})
    // }
    console.log('On select')
    this.setState({selectedStudent: e.target.value})
    console.log(this.state.selectedStudent);
  }

  changeHandler = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleChangeStartDate = value => {
    this.setState({
      startDate: value
    });
  };

  handleChangeEndDate = value => {
    this.setState({
      endDate: value
    })
  }

  handleSubmit = () => {
    

    if(API_ON) {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.props.authentication.user.accessToken}`
      }
      let meeting = {
        title: this.state.title,
        student_id: this.state.selectedStudent,
        start_date: this.state.startDate.toISOString(),
        end_date: this.state.endDate.toISOString(),
        content: this.state.content
      }
      
      axios.post(`${BASEURL}/api/meetings`, meeting, {headers: headers}).then(res => {
        console.log('You did it')
        console.log(res);
        let res_meeting = {
          id: res.data.id,
          title: res.data.title,
          content: res.data.content,
          start: moment(res.data.startDate).toDate(),
          end: moment(res.data.endDate).toDate()
        }
        this.props.createMeeting(res_meeting);
        this.closeModal();
      }).catch(error => {
        console.log(error.response)
        this.setState({errorMessage: error.response.data.message})
      }).finally(() => {
        
      });
    } else {
      let meeting = {
        title: this.state.title,
        student_id: this.state.selectedStudent,
        start: moment(this.state.startDate).toDate() ,
        end: moment(this.state.endDate).toDate() ,
        content: this.state.content
      }
      console.log(meeting);
      this.props.createMeeting(meeting);
      this.closeModal();
    }
    
  }

  closeModal = () => {
    this.setState(this.baseState)
    this.props.toggleModal();
  }

  render() {
    return(
      <Modal
          isOpen={this.props.isModalOpen}
          // onAfterOpen={afterOpenModal}
          onRequestClose={this.closeModal}
          style={{
            top                   : '50%',
            left                  : '50%',
            right                 : 'auto',
            bottom                : 'auto',
            marginTop             : '200px',
            transform             : 'translate(-50%, -50%)'
          }}
          className='modal-dialog modal-xl modal-dialog-centered'
          overlayClassName='modal-backdrop modal-rgba'
          contentLabel="Create Meeting"
          ariaHideApp={false}
        >
        <div className="modal-dialog modal-xl modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Create meeting !!</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.props.toggleModal}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-12 col-sm-8 col-lg-8">
                  <form className="forms-sample">
                    <div className="form-group">
                      <label>Title</label>
                      <input type="text" className="form-control" placeholder="Title" name='title' value={this.state.title} onChange={this.changeHandler} />
                    </div>

                    <div className="form-group">
                      <label >Time</label>
                      <div className="form-inline select-time">
                        <label className="sr-only" >Name</label>
                        <div className="input-group mb-2 mr-sm-2">
                          <DateTimePicker
                            value={this.state.startDate}
                            onChange={this.handleChangeStartDate}
                            disableClock={true}
                            calendarIcon={<CalendarIcon/>}
                            clearIcon={null}
                            name={'Dada'}
                          />
                        </div>

                        <div className="input-group mb-2 mr-sm-2">
                          <DateTimePicker
                            value={this.state.endDate}
                            onChange={this.handleChangeEndDate}
                            disableClock={true}
                            calendarIcon={<CalendarIcon/>}
                            clearIcon={null}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Content</label>
                      <textarea className="form-control" rows="7" name='content' value={this.state.content} onChange={this.changeHandler}></textarea>
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
                                      <input className="checkbox" type="radio" value={student.id} onChange={this.handleStudentCheck} name="studentCheck" /> {student.name} <i className="input-helper"></i></label>
                                  </div>
                                </li>
                              )
                            })}
                                
                          </ul>
                        </div>
                  </div>
                </div>
              </div>
              {this.state.errorMessage && (
                <p style={{color: 'red'}}>Error: {this.state.errorMessage}</p>
              )}
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
  console.log('Tutor dashboard state');
  console.log(state);
  return {authentication: authentication};
}

const actionCreators = {
  // login: userActions.login,
};

// export default TutorDashboard;
export default connect(mapState)(MeetingModal);

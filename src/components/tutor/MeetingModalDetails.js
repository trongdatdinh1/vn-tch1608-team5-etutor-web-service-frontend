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


class MeetingModalDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

    

  closeModal = () => {
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
          contentLabel="Meeting Details"
          ariaHideApp={false}
        >
          <div className="modal-dialog modal-xl modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Meeting Details !!</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.props.toggleModal}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-12 col-sm-8 col-lg-8">
                {this.props.meeting && (
                  <div className="">
                    <div>
                      <p>Title: {this.props.meeting.title}</p>
                      <p>Content: {this.props.meeting.content}</p>
                      {/* <p>Start Date: {this.props.meeting.start}</p> */}
                      {/* <p>End Date: {this.props.meeting.end}</p> */}
                    </div>
                  </div>
                )}
                 
                </div>
              </div>
            </div>

          </div>
        </div>
          
      </Modal>
    )
  }
}


// export default TutorDashboard;
export default MeetingModalDetails;

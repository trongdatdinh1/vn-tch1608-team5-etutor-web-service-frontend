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
class RequestModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
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

  

  changeHandler = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  fileChangeHandler = (e) => {
    this.setState({document: e.target.files})
  }

  handleSubmit = () => {

    console.log(this.state);

    let request = {
      title: this.state.title,
      content: this.state.content,
    }

    if(API_ON) {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.props.authentication.user.accessToken}`
      };

      if(this.state.document) {
        const multipart_header = {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${this.props.authentication.user.accessToken}`
        }
        
        const formData = new FormData();
        for(var x = 0; x < this.state.document.length; x++) {
          formData.append('files', this.state.document[x])
        }

        axios.post(`${BASEURL}/uploadMultipleFiles`, formData, {headers: multipart_header}).then(res => {
          let file_ids = res.data.map(file => {
            return file.id;
          })

          let request = {
            title: this.state.title,
            content: this.state.content,
            file_ids: file_ids
          }
          axios.post(`${BASEURL}/api/create_request`, request, {headers: headers}).then(res => {
            console.log('Created Request')
            console.log(res.data)

          }).catch(error => {
            console.log(error);
          }).finally(() => {
            this.closeModal();
          });
        })


      } else {
        axios.post(`${BASEURL}/api/create_request`, request, {headers: headers}).then(res => {
          this.props.createRequest({
            id: res.data.id,
            title: res.data.title,
            content: res.data.content,
          });
        }).catch(error => {
          console.log(error);
        }).finally(() => {
          this.closeModal();
        });
      }
      
      
    } else {
      this.props.createRequest(request);
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
                    <h5 className="modal-title" id="exampleModalLabel">Create Request</h5>
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
                            </form>
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
export default connect(mapState)(RequestModal);

import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter
} from "react-router-dom";
import { connect } from 'react-redux';
import Comment from './Comment';
import {BASEURL} from '../../constants/baseurl';
import {API_ON} from '../../constants/ApiOn';
import axios from 'axios';
import face_1 from '../../assets/images/faces/face1.jpg';
import moment from 'moment';
class BlogDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      title: '',
      content: '',
      comments: [],
      commentField: '',
      blog: {
        title: '',
        content: '',
        owner: {
          name: '',
          email: ''
        },
        created_date: '',
        comments: [],
        fileModels: [
          {id: '', fileName: '', downloadUri: ''}
        ]
      }
    }
  }

  componentDidMount() {
    if(API_ON) {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.props.authentication.user.accessToken}`
      }
      console.log('Blog details')
      console.log(this.state.id);

      axios.get(`${BASEURL}/api/blogs/${this.state.id}`, {headers: headers}).then(res => {
        console.log(res.data);
        this.setState({blog: res.data})
        this.setState({title: res.data.title});
        this.setState({content: res.data.content});
        this.setState({comments: res.data.comments});
      }).catch(e => {

      });

    }

    console.log(`logs here ${this.props.match.params.id}`)
  }

  changeHandler = e => {
    this.setState({[e.target.name]: e.target.value})
  }
  
  sendComment = () => {
    if(this.state.commentField.length == 0) return;
    if(API_ON) {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.props.authentication.user.accessToken}`
      }
      console.log('Blog details')
      console.log(this.state.id);

      let data = {
        content: this.state.commentField
      }

      axios.post(`${BASEURL}/api/blogs/${this.state.id}/comments`, data, {headers: headers}).then(res => {
        console.log(res.data);
        axios.get(`${BASEURL}/api/blogs/${this.state.id}`, {headers: headers}).then(res => {
          console.log(res.data);
          this.setState({blog: res.data});
        }).catch(e => {
  
        });
        // this.setState({comments: res.data.comments})
      }).catch(e => {

      }).finally(
        this.setState({commentField: ''})
      );
    }
  }
  

  render() {
    return (
      <div className="row">
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <div className="mdl-blog">
                <div className="item-blog">
                  <div className="sidebar">
                    <div className="nav">
                      <div className="nav-item nav-profile">
                        <div className="nav-link">
                          <div className="nav-profile-image">
                            <img src={face_1} alt="profile" />
                            <span className="login-status online"></span>
                          </div>
                          <div className="nav-profile-text d-flex flex-column">
                            <span className="font-weight-bold mb-2">{this.state.blog.owner.name}</span>
                            <span className="text-secondary text-small">{moment(this.state.blog.created_date).toDate().toString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h4 className="card-title">{this.state.blog.title}</h4>
                  <p className="card-description">{this.state.blog.content}</p>
                  {this.state.blog.fileModels.map(file => {
                    return (
                      <div>
                        <a className="text-muted" href={file.downloadUri} ><i className="mdi mdi-attachment"></i> {file.fileName}</a>
                        <br/>
                      </div>
                    )
                  })}
                </div>
                <div className="item-blog has-border">
                  <div className="txt-1">{this.state.blog.comments.length} blog comment</div>
                  {this.state.blog.comments.map(comment => {
                    return (
                      <Comment comment={comment} key={comment.id} />
                    )
                  } )}
                </div>

                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <img src={face_1} className="mr-2 avatar" alt="image" />
                    </div>
                    <textarea className="form-control" placeholder="Add blog comment ..." rows="1" name="commentField" value={this.state.commentField} onChange={this.changeHandler}></textarea>
                    <div className="input-group-append">
                      <button className="btn btn-sm btn-gradient-primary" type="button" onClick={this.sendComment}>Send</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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

// export default TutorDashboard;
export default connect(mapState)(withRouter(BlogDetails));

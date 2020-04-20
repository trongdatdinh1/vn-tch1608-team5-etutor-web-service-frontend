import React from 'react';
import face_1 from '../../assets/images/faces/face1.jpg';
import moment from 'moment'
import {avatarProfile} from '../../components/utils/ProfileGenerator'

class Comment extends React.Component {
  constructor(props) {
    super(props);
  }
  
  

  render() {
    return (
      <div className="content">
        <img src={avatarProfile(this.props.comment.user.name)} className="mr-2 avatar" alt="image" />
        <div className="right-content">
          <span className="font-weight-bold mb-2">{this.props.comment.user.name}</span>
          <span className="text-secondary text-small">{moment(this.props.comment.created_date).fromNow()}</span>
          <div className="txt-2">
            {this.props.comment.content}
          </div>
        </div>
      </div>
    )
  }
}


export default Comment;

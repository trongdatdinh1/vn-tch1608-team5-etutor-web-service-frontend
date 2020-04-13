import React from 'react';
import face_1 from '../../assets/images/faces/face1.jpg';
class Comment extends React.Component {
  constructor(props) {
    super(props);
  }
  
  

  render() {
    console.log(this.props);
    return (
      <div className="content">
        <img src={face_1} className="mr-2 avatar" alt="image" />
        <div className="right-content">
          <span className="font-weight-bold mb-2">{this.props.comment.user.name}</span>
          <span className="text-secondary text-small">{this.props.comment.created_date}</span>
          <div className="txt-2">
            {this.props.comment.content}
          </div>
        </div>
      </div>
    )
  }
}


export default Comment;

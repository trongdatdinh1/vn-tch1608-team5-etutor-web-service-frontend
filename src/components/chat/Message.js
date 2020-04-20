import React from 'react';
import {
  withRouter
} from "react-router-dom";
import { connect } from 'react-redux';
import {avatarProfile, otherAvatar} from '../../components/utils/ProfileGenerator'
import moment from 'moment'
class Message extends React.Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
  }

  render() {
    let owner = this.props.conversation.from === this.props.owner ? 'end' : 'start';
    let otherName = this.props.owner == 'tutor' ? this.props.student.name :  this.props.tutor.name ;
    let imageProfile = this.props.conversation.from === 'tutor' ? avatarProfile(this.props.authentication.user.name) : otherAvatar(otherName)
    return (
      <div className={`d-flex justify-content-${owner } mb-4`}>
        <div className="img_cont_msg">
          <img src={imageProfile}
              className="rounded-circle user_img_msg" />
        </div>
        <div className="msg_cotainer">
          {this.props.conversation.text}
          <span className="msg_time">{moment(this.props.conversation.createdAt).fromNow()}</span>
        </div>
      </div>
    )
  }
}


function mapState(state) {
  const { authentication } = state;
  return {authentication: authentication};
}

export default connect(mapState)(withRouter(Message));

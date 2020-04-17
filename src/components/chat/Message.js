import React from 'react';

class Message extends React.Component {
  constructor(props) {
    super(props);
  }
  
  

  render() {
    let owner = this.props.conversation.from === 'tutor' ? 'end' : 'start';
    return (
      <div className={`d-flex justify-content-${owner } mb-4`}>
        <div className="img_cont_msg">
          <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
              className="rounded-circle user_img_msg" />
        </div>
        <div className="msg_cotainer">
          {this.props.conversation.text}
          <span className="msg_time">{this.props.conversation.createdAt}</span>
        </div>
      </div>
    )
  }
}


export default Message;

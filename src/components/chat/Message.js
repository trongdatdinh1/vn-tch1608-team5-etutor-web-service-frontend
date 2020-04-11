import React from 'react';

class Message extends React.Component {
  constructor(props) {
    super(props);
  }
  
  

  render() {
    let owner = this.props.conversation.role === 'tutor' ? 'end' : 'start';
    return (
      <div class={`d-flex justify-content-${owner } mb-4`}>
        <div class="img_cont_msg">
          <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
              class="rounded-circle user_img_msg" />
        </div>
        <div class="msg_cotainer">
          {this.props.conversation.text}
          <span class="msg_time">{this.props.conversation.createdAt}</span>
        </div>
      </div>
    )
  }
}


export default Message;
import React from 'react';

class StudentBoxItem extends React.Component {
  constructor(props) {
    super(props);
  }
  
  studentClicked = () => {
    this.props.selectStudent(this.props.student.id);
  }

  render() {
    let active = this.props.isSelected ? 'active' : '';

    return (
      <li className={`${active}`} onClick={this.studentClicked} key={this.props.student.id}>
        <div class="d-flex bd-highlight">
          <div class="img_cont">
            <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
              class="rounded-circle user_img" />
            <span class="online_icon"></span>
          </div>
          <div class="user_info">
            <span>{this.props.student.name}</span>
          </div>
        </div>
    </li>
    )
  }
}


export default StudentBoxItem;
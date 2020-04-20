import React from 'react';
import {avatarProfile} from '../../components/utils/ProfileGenerator'

class StudentBoxItem extends React.Component {
  constructor(props) {
    super(props);
  }
  
  studentClicked = () => {
    this.props.selectStudent(this.props.student);
  }

  render() {
    let active = this.props.isSelected ? 'active' : '';

    return (
      <li className={`${active}`} onClick={this.studentClicked} key={this.props.student.id}>
        <div class="d-flex bd-highlight">
          <div class="img_cont">
            <img src={avatarProfile(this.props.student.name)}
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

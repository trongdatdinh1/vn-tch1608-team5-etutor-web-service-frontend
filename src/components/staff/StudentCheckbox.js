import React from 'react';

class StudentCheckbox extends React.Component {
  
  render() {
    let {student} = this.props
    return (
      <li>
        <div className="form-check">
          <label className="form-check-label">
            <input className="checkbox" name="studentPick" type="checkbox" value={student.id} checked={this.props.isChecked} onChange={this.props.handleStudentCheck} /> {student.name} <i className="input-helper"></i></label>
        </div>
      </li>
    );
  }
}


export default StudentCheckbox;
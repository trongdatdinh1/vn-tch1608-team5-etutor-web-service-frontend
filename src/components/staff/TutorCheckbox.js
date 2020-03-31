import React from 'react';

class TutorCheckbox extends React.Component {
  
  render() {
    let {tutor} = this.props
    return (
      <li key={tutor.id}>
        <div className="form-check">
          <label className="form-check-label">
            <input type="radio" className="form-check-input" name="tutorPick" value={tutor.id} onChange={this.props.handleStudentCheck} checked={this.props.checked}/>{tutor.name}<i
              className="input-helper" ></i></label>
        </div>
      </li>
    );
  }
}


export default TutorCheckbox;
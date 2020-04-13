import React, { Component } from 'react';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);
const events = [
  {
      id: 0,
      title: 'Shika',
      // allDay: true,
      // start: moment().hour(10).minute(30).toDate(),
      start: moment('2020-03-26T08:30:00.000+0000').toDate(),
      // end: moment().hour(11).minute(0).toDate(),
      end: moment('2020-03-26T09:00:00.000+0000').toDate()
  },
  {
      id: 1,
      title: 'Long Event',
      start: moment('2020-03-26T08:30:00.000+0000').toDate(),
      // end: moment().hour(11).minute(0).toDate(),
      end: moment('2020-03-26T09:00:00.000+0000').toDate()
  },

  {
      id: 2,
      'allDay': false,
      'title': 'DTS STARTS',
      'start': new Date(2020, 3, 27, 9, 0, 0),
      'end': new Date(2020, 3, 27, 10, 1, 0),
  },

  {
      id: 3,
      title: 'DTS ENDS',
      start: new Date(2020, 3, 29, 0, 0, 0),
      end: new Date(2020, 3, 29, 0, 1, 0),
  }
]
const TutorCalendar = props => {
  return(
    <div>
      <Calendar
        localizer={localizer}
        events={props.events}
        startAccessor="start"
        endAccessor="end"
        defaultDate={new Date()}
        defaultView="week"
        step={15}
        min={moment().hour(7).minute(0).toDate()}
        max={moment().hour(17).minute(0).toDate()}
        views={['month', 'week']}
        style={{ height: 700 }}
        selectable={true}
        onSelectEvent={props.onSelectMeeting}
      />
    </div>
  )
}

export default TutorCalendar;

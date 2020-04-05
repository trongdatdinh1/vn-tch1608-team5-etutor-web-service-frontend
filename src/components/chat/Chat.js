import React from 'react';
import firebase from '../../config/FirebaseSDK';
class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      conversations: [],
      messages: [],
      places: [],
      students: [
        {id: 1, name: 'Nara Shikamaru', email: 'shika@fpt.edu.vn'},
        {id: 2, name: 'Aomine Daiki', email: 'aomine@fpt.edu.vn'},
        {id: 3, name: 'Eren Jeager', email: 'eren@fpt.edu.vn'},
        {id: 4, name: 'Tohsaka Rin', email: 'rin@fpt.edu.vn'},
        {id: 5, name: 'Shiba Tatsuya', email: 'tatsuya@fpt.edu.vn'},
      ],
    }
  }

  componentDidMount() {
    console.log('Noooooooooooooooooo');
    const db = firebase.firestore();
    // db.collection('places').onSnapshot(querySnapshot => {
    //   const data = querySnapshot.docs.map(doc=> {doc.data()});
    //   this.setState({places: data})
    // });

    db.collection('places').where('name', 'in', ['Haha', 'Campa']).onSnapshot(querySnapshot => {
      const data = querySnapshot.docs.map(doc=> doc.data());
      this.setState({places: data});
    });

    db.collection('conversations').where('studentId', 'in', [1]).where('tutorId', '==', 1).onSnapshot(querySnapshot => {
      const data = querySnapshot.docs.map(doc=> doc.data());
      this.setState({conversations: data});
      console.log(data);
    });

    db.collection('messages').where('studentId', '==', 1).onSnapshot(querySnapshot => {
      const data = querySnapshot.docs.map(doc=> doc.data());
      this.setState({messages: data});
      console.log(data);
    });
    
  }


  render() {
    return (
      <div className="row">
        <div className="col-3 student-message-list">
          {this.state.conversations.map(conversation => {
            return (
              <div key={conversation.studentId}>
                <p>{conversation.lastMessage}</p>
                <p>{conversation.createdAt}</p>
              </div>
              // <div></div>
            )
          })}
        </div>
        <div className="col-9 message-content">
          {this.state.messages.map(message => {
            return (
              <div key={message.createdAt}>
                <p>{message.text}</p>
                <p>{message.createdAt}</p>
                <br/>
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}


export default Chat;
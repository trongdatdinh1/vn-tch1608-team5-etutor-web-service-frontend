import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDOZWq3ZrLkXObACj4TMvSYxDjdHOaHcKE",
  authDomain: "fir-demo-c823c.firebaseapp.com",
  databaseURL: "https://fir-demo-c823c.firebaseio.com",
  projectId: "fir-demo-c823c",
  storageBucket: "fir-demo-c823c.appspot.com",
  messagingSenderId: "850364044033",
  appId: "1:850364044033:web:ebc7bbc8bdb07cb1db8100"
};

firebase.initializeApp(config);
const database = firebase.database();

export default firebase;
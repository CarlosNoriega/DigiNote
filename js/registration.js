function redireccionar(){
  window.location="index.html";
} 
var config = {
    apiKey: "AIzaSyC-O4PI7rOxuyoD-oMcdSoYDSPBEOE6p7A",
    authDomain: "prueba-36fea.firebaseapp.com",
    databaseURL: "https://prueba-36fea.firebaseio.com",
    storageBucket: "prueba-36fea.appspot.com",
    messagingSenderId: "841271907598"
  };
  firebase.initializeApp(config);
        
        var database = firebase.database();


function handleSignUp() {
      var email = document.getElementById('email').value;
      var password = document.getElementById('psswd').value;
      var name = document.getElementById('name').value;
      if (email.length < 4) {
        alert('Please enter an email address.');
        return;
      }
      if (password.length < 4) {
        alert('Please enter a password.');
        return;
      }
      // Sign in with email and pass.
      // [START createwithemail]
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
          user.updateProfile({
              displayName: name
          }).then(function() {
              // Update successful.
          }, function(error) {
              // An error happened.
          }); 

        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
      });

      
      console.log(name);

      // [END createwithemail]
    }

function initApp() {
      // Listening for auth state changes.
      // [START authstatelistener]
      firebase.auth().onAuthStateChanged(function(user) {
        // [START_EXCLUDE silent]
        // [END_EXCLUDE]
        if (user) {
          // User is signed in.
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          changename();
          if (!emailVerified) {
          }
          // [END_EXCLUDE]
        } else {
          // [END_EXCLUDE]
        }

        // [END_EXCLUDE]
      });

    }

    window.onload = function() {
      initApp();
    };


function changename(){
  var userId = firebase.auth().currentUser.uid;
  var name = document.getElementById('name').value;
  var username  = document.getElementById('username').value;
  var country = document.getElementById('country').value;
    firebase.database().ref('users/' + userId).set({
      name : name,
      username : username,
      country : country
    });
    added();
    window.location='index.html';
  }

function added(){
    var userId = firebase.auth().currentUser.uid;
    var notaname = 'DigiNote';
    var textArea = 'Aqui puedes inciar a crear tus notas.\nPara crear una nota nueva cambia el nombre de esta nota y el texto de esta nota. :D';
    firebase.database().ref('users/' + userId+'/notas/'+notaname+userId).set({
      name : notaname,
      textArea : textArea
    });
  }

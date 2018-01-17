
// Initialize Firebase
var config = {
  apiKey: "AIzaSyC-O4PI7rOxuyoD-oMcdSoYDSPBEOE6p7A",
  authDomain: "prueba-36fea.firebaseapp.com",
  databaseURL: "https://prueba-36fea.firebaseio.com",
  storageBucket: "prueba-36fea.appspot.com",
  messagingSenderId: "841271907598"
};
firebase.initializeApp(config);



var datos="1";
  

  function singout(){
    firebase.auth().signOut();
    window.location='index.html';
  }

function agregarchat(){
    var userId = firebase.auth().currentUser.uid;
    var id = document.getElementById('idadd').value;
    console.log(id);
    const dbRefObject2=firebase.database().ref().child('lessons');
    const use=dbRefObject2.child(id);
    use.on('value', snapshot => {
          var name=snapshot.val().name;
          console.log(name);
          firebase.database().ref('users/' + userId+'/lessons/'+id).set({
            id : id,
            name : name
          });
        });
    document.getElementById('idadd').value = "";
  }

  function agregaramigos(){
    var userId = firebase.auth().currentUser.uid;
    var id = document.getElementById('amigos').value;
    console.log(id);
    const dbRefObject2=firebase.database().ref().child('users');
    const use=dbRefObject2.child(id);
    use.on('value', snapshot => {
          var name=snapshot.val().name;
          var username=snapshot.val().username;
          console.log(name);
          firebase.database().ref('users/' + userId+'/amigos/'+id).set({
            id : id,
            name : name,
            username : username
          });

          const dbRefObject3=firebase.database().ref().child('users');
          const use=dbRefObject3.child(userId);
          use.on('value', snapshot => {
                var name=snapshot.val().name;
                var username=snapshot.val().username;
                console.log(name);
                firebase.database().ref('users/' + id+'/amigos/'+userId).set({
                  id : userId,
                  name : name,
                  username : username
                });
              });


        });
    document.getElementById('amigos').value = "";
  }

function cambio(cam){
  window.location = "workarea.html?name="+cam;
}

function lesso(cam){
  window.location = "group.html?name="+cam;
}

function crearbotones(lasnotas){
  var tex=lasnotas[0].name;
    var s='';
    var sd='';
    for (var i = 0; i<lasnotas.length;i++) {
      sd="cambio('"+lasnotas[i].name+"')";
      s=s+'<div class="well" id="notas" onclick="'+sd+'">'+lasnotas[i].name+'</div>';
    }
    document.getElementById('botones').innerHTML = s;
  }


  function lessons(lasnotas){
  var tex=lasnotas[0].id;
  console.log(tex);
    var s='';
    var sd='';
    for (var i = 0; i<lasnotas.length;i++) {
      sd="lesso('"+lasnotas[i].id+"')";
      console.log(sd);
      s=s+'<div class="well" id="notas" onclick="'+sd+'">'+lasnotas[i].name+'</div>';
    }
    document.getElementById('lessons').innerHTML = s;
  }

function frien(cam){
  window.location = "conversation.html?name="+cam;
}

  function friends(lasnotas){
  var tex=lasnotas[0].id;
  console.log(tex);
    var s='';
    var sd='';
    for (var i = 0; i<lasnotas.length;i++) {
      sd="frien('"+lasnotas[i].id+"')";
      console.log(sd);
      s=s+'<div class="well" id="notas" onclick="'+sd+'">'+lasnotas[i].name+'</div>';
    }
    document.getElementById('listadeamigos').innerHTML = s;
  }


   var notas;
  function initApp() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        
        
        var userId = firebase.auth().currentUser.uid;
        const dbRefObject=firebase.database().ref().child('users');
        const us=dbRefObject.child(userId);
        const not=us.child('notas');
        not.on('value', snapshot => {
          var lasnotas = $.map(snapshot.val(), function(value, index) {
            return [value];
          });
          notas=lasnotas;
          crearbotones(lasnotas);

        });

        const less=us.child('lessons');
        less.on('value', snapshot => {
          var laslessons = $.map(snapshot.val(), function(value, index) {
            return [value];
          });          
          lessons(laslessons);

        });

        const fr=us.child('amigos');
        fr.on('value', snapshot => {
          var laslessons = $.map(snapshot.val(), function(value, index) {
            return [value];
          });          
          friends(laslessons);

        });
        
      } else {
        // User is signed out.
        // [START_EXCLUDE silent]
        // [END_EXCLUDE]
      }
      // [START_EXCLUDE silent]
      // [END_EXCLUDE]
    });
    // [END authstatelistener]

  }

  window.onload = function() {
    initApp();
  };

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


  function added(){
    var userId = firebase.auth().currentUser.uid;
    var notaname = document.getElementById('notaname').value;
    var textArea = document.getElementById('textArea').value;
    firebase.database().ref('users/' + userId+'/notas/'+notaname+userId).set({
      name : notaname,
      textArea : textArea
    });
    window.location="workarea.html?name="+geturl();
  }

function crearbotones(lasnotas){
  var tex=lasnotas[0].name;
  console.log(tex);
    var s='';
    var sd='';
    for (var i = 0; i<lasnotas.length;i++) {
      sd="cambiarnota('"+lasnotas[i].name+"')";
      console.log(sd);
      s=s+'<div class="well" id="notas" onclick="'+sd+'">'+lasnotas[i].name+'</div>';
    }
    document.getElementById('botones').innerHTML = s;
  }

  function cambiarnota(nam){
    console.log(nam);
    firebase.auth().onAuthStateChanged(function(user) {
      // [START_EXCLUDE silent]
      // [END_EXCLUDE]
      var userId = firebase.auth().currentUser;
      if (user) {
        
        var userId = firebase.auth().currentUser.uid;
        const dbRefObject=firebase.database().ref().child('users');
        const us=dbRefObject.child(userId);
        const not=us.child('notas');
        const pr=not.child(nam+userId);
        pr.on('value', snapshot => {
          //console.log(snapshot.val().name);
          document.getElementById('textArea').textContent =snapshot.val().textArea;
          document.getElementById('notaname').textContent =snapshot.val().name;
          notas=textContent =snapshot.val();
          //document.getElementById('citass').textContent = JSON.stringify(snapshot.val(), null, '  ');
        });
        
        
        //document.getElementById('citass').textContent = const;
        if (!emailVerified) {
        }
        // [END_EXCLUDE]
      } else {
        // User is signed out.
        // [START_EXCLUDE silent]
        // [END_EXCLUDE]
      }
      // [START_EXCLUDE silent]
      // [END_EXCLUDE]
    });
  }

  /**
   * initApp handles setting up UI event listeners and registering Firebase auth listeners:
   *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
   *    out, and that is where we update the UI.
   */
   var notas;

   function geturl(){
    //var first = getUrlVars()["name"];
    //console.log(first);
    var query = location.search.substr(1);
  var result = {};
  query.split("&").forEach(function(part) {
    var item = part.split("=");
    result[item[0]] = decodeURIComponent(item[1]);
  });
  console.log(result.name);
  return result.name;
   }

  function initApp() {
    geturl();
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        
        var userId = firebase.auth().currentUser.uid;
        const dbRefObject=firebase.database().ref().child('users');
        const us=dbRefObject.child(userId);
        const not=us.child('notas');
        const pr=not.child(geturl()+userId);
        not.on('value', snapshot => {
          //console.log(snapshot.val());
          var lasnotas = $.map(snapshot.val(), function(value, index) {
            return [value];
          });
          notas=lasnotas;
          crearbotones(lasnotas);
        });
        pr.on('value', snapshot => {
          //console.log(snapshot.val().name);
          document.getElementById('textArea').textContent =snapshot.val().textArea;
          document.getElementById('notaname').textContent =snapshot.val().name;
          notas=textContent =snapshot.val();
          //document.getElementById('citass').textContent = JSON.stringify(snapshot.val(), null, '  ');
        });
        if (!emailVerified) {
        }
      } else {
      }
    });

  }

  window.onload = function() {

    initApp();
  };
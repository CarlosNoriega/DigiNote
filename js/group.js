
// Initialize Firebase
var config = {
  apiKey: "AIzaSyC-O4PI7rOxuyoD-oMcdSoYDSPBEOE6p7A",
  authDomain: "prueba-36fea.firebaseapp.com",
  databaseURL: "https://prueba-36fea.firebaseio.com",
  storageBucket: "prueba-36fea.appspot.com",
  messagingSenderId: "841271907598"
};
firebase.initializeApp(config);

var materia='0';
var elname='';

var datos="1";
  

  function singout(){
    firebase.auth().signOut();
    window.location='index.html';
  }

  function changename(){
    
  }

  function added(){
    var userId = firebase.auth().currentUser.uid;
    var name;
    
    var mensaje = document.getElementById('mensaje').value;
    //console.log('materia '+name);
    var ss=new Date();
    var s=ss.getTime();
    firebase.database().ref('lessons/' + materia+'/chat/'+s).set({
      name : elname,
      mensaje : mensaje,
      id : userId
    });
    document.getElementById('mensaje').value = "";
    //window.location="groups.html?name="+geturl();
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

function crearbotones(lasnotas){
  var tex=lasnotas[0].name;
  //console.log(tex);
    var s='';
    var sd='';
    for (var i = 0; i<lasnotas.length;i++) {
      sd="cambiarnota('"+lasnotas[i].id+"')";
      //console.log(sd);
      s=s+'<div class="well" id="notas" onclick="'+sd+'">'+lasnotas[i].name+'</div>';
    }
    document.getElementById('botones').innerHTML = s;
  }


function cambiarchat(mensajes){
  var tex=mensajes[0].mensaje;
  var userId = firebase.auth().currentUser.uid;
  //console.log(tex);
    var s='';
    for (var i = 0; i<mensajes.length;i++) {
      if(userId.localeCompare(mensajes[i].id)==0){
        console.log('iguales');
        s=s+'<h3 style="clear:both;text-align:right;">'+mensajes[i].name+'</h3><div class="well" id="notas">'+mensajes[i].mensaje+'</div>';
      }else{
        s=s+'<h3 style="clear:both;text-align:left;">'+mensajes[i].name+'</h3><div class="well" id="notas">'+mensajes[i].mensaje+'</div>';
      }
      
    }
    document.getElementById('chat').innerHTML = s;
    var objDiv = document.getElementById("scroll");
    objDiv.scrollTop = objDiv.scrollHeight;
  }



  function cambiarnota(nam){
    console.log(nam);
    materia=nam;
    firebase.auth().onAuthStateChanged(function(user) {
      // [START_EXCLUDE silent]
      // [END_EXCLUDE]
      var userId = firebase.auth().currentUser;
      if (user) {
        document.getElementById('chat').innerHTML = '';
        var userId = firebase.auth().currentUser.uid;
        const dbRefObject2=firebase.database().ref().child('lessons');
        const use=dbRefObject2.child(nam);
        const dd=use.child('chat');
        dd.on('value', snapshot => {
          var dat=snapshot.val();
          //console.log(dat);
          var datoss = $.map(dat, function(value, index) {
            return [value];
          });
          cambiarchat(datoss);
        });
      } else {
      }
    });
  }
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
  //console.log(result.name);
  return result.name;
   }

  function initApp() {
    materia=geturl();
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        
        var userId = firebase.auth().currentUser.uid;
        const dbRefObjectname=firebase.database().ref().child('users');
        const usname=dbRefObjectname.child(userId);
        usname.on('value', snapshot => {
          //console.log(snapshot.val().username);
          elname = snapshot.val().username;
        });

        const dbRefObject=firebase.database().ref().child('users');
        const us=dbRefObject.child(userId);
        const not=us.child('lessons');
        const pr=not.child(geturl());
        not.on('value', snapshot => {
          //console.log(snapshot.val());
          var lasnotas = $.map(snapshot.val(), function(value, index) {
            return [value];
          });
          notas=lasnotas;
          crearbotones(lasnotas);
        });
        const dbRefObject2=firebase.database().ref().child('lessons');
        const use=dbRefObject2.child(geturl());
        const dd=use.child('chat');
        dd.on('value', snapshot => {
          var dat=snapshot.val();
          //console.log(dat);
          var datoss = $.map(dat, function(value, index) {
            return [value];
          });
          cambiarchat(datoss);
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
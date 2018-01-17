
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

  function changename(){
    
  }

  function added(){
    var userId = firebase.auth().currentUser.uid;
    var date = document.getElementById('date').value;
    var description = document.getElementById('description').value;
    console.log(date);
    if (date=='') {
      alert("No date??");
    }else{
      firebase.database().ref('users/' + userId+'/citas/'+date).set({
        description : description,
         date : date
      });
      window.location='profile.html';
    }
    
    //
  }



  /**
   * initApp handles setting up UI event listeners and registering Firebase auth listeners:
   *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
   *    out, and that is where we update the UI.
   */
  function initApp() {
    // Listening for auth state changes.
    // [START authstatelistener]
    firebase.auth().onAuthStateChanged(function(user) {
      // [START_EXCLUDE silent]
      // [END_EXCLUDE]
      if (user) {
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        // [START_EXCLUDE silent]
        
        var userId = firebase.auth().currentUser.uid;
        const dbRefObject=firebase.database().ref().child('users');
        const us=dbRefObject.child(userId);
        const nam=us.child('name');
        nam.on('value', snapshot => {
          console.log(snapshot.val());
          document.getElementById('nombre').textContent =snapshot.val();
          //document.getElementById('citass').textContent = JSON.stringify(snapshot.val(), null, '  ');
        });
        const cit=us.child('citas');
        
        cit.on('value', snapshot => {
          //console.log(snapshot.val());
          //document.getElementById('citass').textContent = JSON.stringify(snapshot.val(), null, '  ');
		       datos=snapshot.val();
            calendariodeamor(datos);
           //console.log(datos);
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
    // [END authstatelistener]

  }

  function knowid(){
  var userId = firebase.auth().currentUser.uid;
  alert(userId);
}

  window.onload = function() {
    initApp();
  };

function calendariodeamor(dato){
  $.getScript('http://arshaw.com/js/fullcalendar-1.6.4/fullcalendar/fullcalendar.min.js',function(){
  
  var dias = $.map(dato, function(value, index) {
    return [value];
  });
  var date = new Date();
  var d = date.getDate();
  var m = date.getMonth();
  var y = date.getFullYear();
  var i;
  var s= new Array();
  

  var array2 = $.map(dias[1], function(value, index) {
    return [value];
  });
  var fecha=array2[0];
  var dia="";
  var ano="";
  var mes="";
  
  var dat;
  
  
  

  console.log(array2[0]);
  
  for(i=0;i<dias.length;i++){
    array2 = $.map(dias[i], function(value, index) {
    return [value];
    });

    fecha=array2[0];
    dia="";
    ano="";
    mes="";
    for(var j=0; j<4; j++){
      ano=ano+fecha[j];
    }
    for(var j=0; j<2; j++){
      mes=mes+fecha[j+5];
    }
    for(var j=0; j<2; j++){
      dia=dia+fecha[j+8];
    }


    s[i]=new Object();
    s[i].title=array2[1];
    s[i].start=new Date(ano,mes-1,dia);
    
  }
  events=s;

  $('#calendar').fullCalendar({
  header: {
    left: 'prev,next today',
    center: 'title',
    right: 'month,agendaWeek,agendaDay'
  },
  editable: true,
  events
});
  
})
}
///////////////////////////////
//Firebase stuff. Don't touch//
///////////////////////////////

var firebaseConfig = {
  apiKey: "AIzaSyCEm64RK1USSE_47lHbJGhe_jXmCDzR6H0",
  authDomain: "bespoken-plugged-in.firebaseapp.com",
  databaseURL: "https://bespoken-plugged-in.firebaseio.com",
  projectId: "bespoken-plugged-in",
  storageBucket: "bespoken-plugged-in.appspot.com",
  messagingSenderId: "200029564567",
  appId: "1:200029564567:web:007ac92f65deead5b503d2",
  measurementId: "", //probaly don't need this unless you want to do some google analytics
};

firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
var database = firebase.database();


//preloads ALL of the firebase information
var ref = firebase.database().ref('project');
var allData;
var allDataSize;
ref.on("value", function(snapshot) {
  allData = snapshot.val();
  allDataSize = Object.keys(allData).length;
}, function (error) {
  console.log("Error: " + error.code);
});


function writeToFirebase(name, link, desc) {
  var fbRef = database.ref("project/" + name);//put in name of project
  var info = fbRef.set({
    name: name,
    link: link,
    desc: desc,
    likes: 0,
  });
}

function getRandSnapshot() {
  var keys = Object.keys(allData);
  var key = keys[Math.floor(Math.random() * Math.floor(keys.length))]
  console.log(key);
  return key;
}

function writeFromFirebase () {
  var snapshot = allData[getRandSnapshot()];
  console.log(snapshot);
  document.getElementById("color-block").innerHTML = snapshot.name;
  document.getElementById("resource-description").innerHTML = "<p>" + snapshot.desc + "</p>";
  document.getElementById("link").href = snapshot.link;
  // document.getElementById("img1").src = plug.img1;
  // document.getElementById("img2").src = plug.img2;
  // document.getElementById("img3").src = plug.img3;
  document.getElementById("like-count").innerHTML = snapshot.likes;
  // replaceMainImg(plug.img1);

}

function replaceMainImg(src) {
  document.getElementById("main-image").src = src;
}

function replaceMainImg1() {
  document.getElementById("main-image").src = document.getElementById("img1").src;
}

function replaceMainImg2() {
  document.getElementById("main-image").src = document.getElementById("img2").src;
}

function replaceMainImg3() {
  document.getElementById("main-image").src = document.getElementById("img3").src;
}


var formState = 1

// remove errorState
$('.entry-box').on('click', function() {
  $(this).removeClass('errorState');
});

// check if the form response is a url
function isValidUrl(string) {
  try {
    new URL(string);
  } catch (_) {
    return false;
  }

  return true;
};

$('#press-next').on('click', function() {

  console.log("formState is at " + formState);

  if(formState == 1) {

    // Check if the response form is empty
    if(!$('#resource-name-response').val()) {

      $('.entry-box').addClass('errorState');
      console.log('The form is empty!');

      // if the response is not empty
    } else {

      console.log('The form is not empty')
      $('.entry-box').removeClass('errorState'); // remove the errorState

      // Toggle new question
      $('#resource-name').toggleClass('hidden');
      $('#resource-link').toggleClass('hidden');

      // Show back button
      $('#press-back').toggleClass('hidden');

      // Move dot to next index
      $('#dot-2').toggleClass('indexAt');

      formState++; // move formState to next index
    }

  } else if(formState == 2) {

    // check if the response form is empty
    if(!$('#resource-link-response').val()) {

      $('.entry-box').addClass('errorState');
      console.log('The form is empty!');

    } else {

      console.log('The form is not empty')

      // // check if the response form contains 'https://'
      if(isValidUrl($('#resource-link-response').val())) {

        console.log('It is a link');
        $('.entry-box').removeClass('errorState'); // remove the errorState

        // Toggle new question
        $('#resource-link').toggleClass('hidden');
        $('#resource-desc').toggleClass('hidden');

        // Move dot to next index
        $('#dot-3').toggleClass('indexAt');

        $('#press-next').text('Submit'); // change the button text

        formState++;// move formState to next index

      } else {
        console.log('It is not a link');
        $('.entry-box').addClass('errorState');
      }
    }

  } else if(formState == 3) {

    // Check if the response form is empty
    if(!$('#resource-desc-response').val()) {

      $('#resource-desc-response').addClass('errorState2');
      console.log('The form is empty!');

      // if the response is not empty
    } else {

      console.log('It is not empty');
      $('#resource-desc-response').removeClass('errorState2'); // remove the errorState

      // Toggle new question
      $('#resource-desc').toggleClass('hidden');
      $('#thank-you').toggleClass('hidden');
      $('#press-next').text('Submit Another'); // change the button text

      // Hide back button
      $('#press-back').toggleClass('hidden');

      // Grab the response from questions 1 2 and 3 and upload to firebase
      var resName = document.getElementById('resource-name-response').value;
      var resLink = document.getElementById('resource-link-response').value;
      var resDesc = document.getElementById('resource-desc-response').value;

      writeToFirebase(resName, resLink, resDesc);

      formState++;// move formState to next index

    }


  } else if (formState == 4) {

    // Clear all form responses

    // Move all to first index
    $('#thank-you').toggleClass('hidden');
    $('#resource-name').toggleClass('hidden');
    $('#press-next').text('Next'); // change button text
    formState = 1; // reset index to 1

    // restart the form from beginning
    document.getElementById('resource-name-response').value = "";
    document.getElementById('resource-link-response').value = "";
    document.getElementById('resource-desc-response').value = "";
  }

})

// press-back button
$('#press-back').on('click', function() {

  if(formState == 2) {

    // Toggle new question
    $('#resource-name').toggleClass('hidden');
    $('#resource-link').toggleClass('hidden');

    // Hide back button
    $('#press-back').toggleClass('hidden');

    // Move dot to prev index
    $('#dot-2').toggleClass('indexAt');

    formState--; // move formState to prev index

  } else if(formState == 3) {

    // Toggle prev question
    $('#resource-link').toggleClass('hidden');
    $('#resource-desc').toggleClass('hidden');

    // Move dot to prev index
    $('#dot-3').toggleClass('indexAt');
    $('#press-next').text('Next'); // change the button text
    formState--;// move formState to prev index

  }

})

$('.select-view div').on('click', function() {

  console.log('select is clicked');

  // "View" is clicked
  $('#resource-view').on('click', function() {
    $('.view-submission').removeClass('hidden');
    $('.form-container').addClass('hidden');

    $('#resource-view').addClass('selected');
    $('#form-view').removeClass('selected');

    console.log('view is clicked');
  });

  // "Submit" is clicked
  $('#form-view').on('click', function() {
    $('.form-container').removeClass('hidden');
    $('.view-submission').addClass('hidden');

    $('#resource-view').removeClass('selected');
    $('#form-view').addClass('selected');

    console.log('submit is clicked');
  });

})

// Responsive display

//for,.html page end

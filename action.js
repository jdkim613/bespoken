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
var currentKey;


//preloads ALL of the firebase information
var ref = firebase.database().ref('plug');
var allData;
var allDataSize;
ref.on("value", function(snapshot) {
  allData = snapshot.val();
  allDataSize = Object.keys(allData).length;
}, function (error) {
  console.log("Error: " + error.code);
});

function writeToFirebase(name, link, desc) {
  var currentdate = new Date();
  var datetime = currentdate.getDate() + "" +
                  + (currentdate.getMonth()+1) + "" +
                  + currentdate.getFullYear() + "@"
                  + currentdate.getHours() + ":"
                  + currentdate.getMinutes() + ":"
                  + currentdate.getSeconds();
  var fbRef = database.ref("plug/" + datetime);//put in name of project
  var info = fbRef.set({
    name: name,
    link: link,
    desc: desc,
    likes: 1,
  });
}

//not being used yet, but once the like button has been implement it, reference this in the html
function updateLikes() {
  var fbRef = database.ref("plug/" + currentKey);
  var info = fbRef.set({
    name: allData[currentKey].name,
    link: allData[currentKey].link,
    desc: allData[currentKey].desc,
    likes: allData[currentKey].likes + 1,
  });
  document.getElementById("like-number").innerHTML = allData[currentKey].likes;
}

function removeLikes() {
  var fbRef = database.ref("plug/" + currentKey);
  var info = fbRef.set({
    name: allData[currentKey].name,
    link: allData[currentKey].link,
    desc: allData[currentKey].desc,
    likes: allData[currentKey].likes - 1,
  });
  document.getElementById("like-number").innerHTML = allData[currentKey].likes;
}

// Like animation + like count
$(function() {
  $( "i" ).click(function() {
    $( "i,#like-feedback" ).toggleClass( "press", 1000 );

    // check if the like-icon is pressed
    if(!$('#like-icon').hasClass('press')) {

      // if not, add a like
      removeLikes();
    } else {

      // else the like is already pressed, so remove like
      updateLikes();
    }

  });
});

function getRandSnapshot() {
  var keys = Object.keys(allData);
  var key = keys[Math.floor(Math.random() * Math.floor(keys.length))]
  currentKey = key;
  return key;
}

function writeFromFirebase () {
  // everytime the button is clicked if a like button is pressed
  if($('#like-icon' && '#like-feedback').hasClass('press')) {
    $('#like-icon').removeClass('press');
    $('#like-feedback').removeClass('press');
  }

  var snapshot = allData[getRandSnapshot()];
  console.log(snapshot);
  document.getElementById("color-block").innerHTML = snapshot.name;
  document.getElementById("resource-description").innerHTML = "<p>" + snapshot.desc + "</p>";
  document.getElementById("link").href = snapshot.link;
  // document.getElementById("img1").src = plug.img1;
  // document.getElementById("img2").src = plug.img2;
  // document.getElementById("img3").src = plug.img3;
  document.getElementById("like-number").innerHTML = snapshot.likes; // deleted like feature
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

// remove error class
$('.fill-out').on('click', function() {

  if(!$('#resource-name-response').val()) {
    // error state signifer
    $('#name-error').removeClass('slide-down');
  }

  if(!$('#resource-link-response').val() || !isValidUrl($('#resource-link-response').val())) {

    // error state signifer
    $('#link-error').removeClass('slide-down');
  }

  if($('.entry-box').hasClass('errorState2')) {
    $('.entry-box').removeClass('errorState2');
  }
})

// removeError;

// textfield char counter
function countChar(val) {
  var len = val.value.length;
  if (len >= 751) {
    val.value = val.value.substring(0, 751);
    $('#desc-counter').css("color", "red");
    $('#desc-counter').css("background-color", "#ffd4d4");
  } else {
    $('#desc-counter').text(len + "/750");
    $('#desc-counter').css("color", "#FFF");
    $('#desc-counter').css("background-color", "#000");
  }
};

// press enter to click next
$('#resource-name-response, #resource-link-response').keydown(function(event) {
  if(event.which == 13) {
    event.preventDefault();
    $('#press-next').click();
    console.log('pressed enter');
  }
})


// next button
$('#press-next').on('click', function() {

  console.log("formState is at " + formState);

  if(formState == 1) {

    $('#dot-1').addClass('indexAt');

    // Check if the response form is empty
    if(!$('#resource-name-response').val()) {

      $('.entry-box').addClass('errorState');
      console.log('The form is empty!');

      // error state signifer
      $('#name-error').addClass('slide-down');

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

      // error state signifer
      $('#link-error').addClass('slide-down');

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

        // error state signifer
        $('#link-error').addClass('slide-down');
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

    $('#dot-2').toggleClass('indexAt');
    $('#dot-3').toggleClass('indexAt');

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


})

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


// Responsive display

//for,.html page end

var plug = {
  name: 'JOHN THE MIGHTY',
  link: 'https://www.linkedin.com/in/jdkim613/',
  desc: "Sed ultrices tortor ut justo efficitur semper. In ut magna et nibh fringilla vestibulum. Aliquam vehicula nunc eu dui maximus, id interdum enim luctus. Donec sit amet blandit lectus. Nulla nec metus felis. Suspendisse congue pharetra nibh in mollis. Quisque at turpis eu lorem luctus venenatis. Duis convallis viverra neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi at tellus sem. Nunc tincidunt ex ut magna euismod, imperdiet imperdiet diam egestas. Praesent rutrum ligula ipsum, at condimentum orci molestie at. Cras fringilla risus ac lorem vestibulum, varius blandit dui feugiat.",
  img1: 'https://scontent-sea1-1.xx.fbcdn.net/v/t1.0-9/68896372_10206129791039172_3056380611385098240_n.jpg?_nc_cat=108&_nc_sid=09cbfe&_nc_ohc=XTYvpKZfVR4AX_EID32&_nc_ht=scontent-sea1-1.xx&oh=b4fadacf1be04362660b2830390d14d7&oe=5EDBE8EA',
  img2: 'https://scontent-sea1-1.xx.fbcdn.net/v/t1.0-9/64888247_10205915560963554_6729213588092747776_o.jpg?_nc_cat=111&_nc_sid=174925&_nc_ohc=paUEm_yEqawAX84HTXK&_nc_ht=scontent-sea1-1.xx&oh=125657ea5d446e1e01575d7c0746b015&oe=5EDF3467',
  img3: 'https://scontent-sea1-1.xx.fbcdn.net/v/t1.0-9/64207100_10205905437190466_7293496905521168384_n.jpg?_nc_cat=111&_nc_sid=174925&_nc_ohc=3WdXRd4vMPgAX-WJhJz&_nc_ht=scontent-sea1-1.xx&oh=3e51ae78eb80dba2696b27aad4d18d46&oe=5EDC8BE6',
  likes: 9001
}

function myFunction () {
  document.getElementById("color-block").innerHTML = plug.name;
  document.getElementById("resource-description").innerHTML = "<p>" + plug.desc + "</p>";
  document.getElementById("link").href = plug.link;
  document.getElementById("img1").src = plug.img1;
  document.getElementById("img2").src = plug.img2;
  document.getElementById("img3").src = plug.img3;
  document.getElementById("like-count").innerHTML = plug.likes;
  replaceMainImg(plug.img1);

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

document.getElementById("next-button").addEventListener("click", myFunction);
document.getElementById("img1").addEventListener("click", replaceMainImg1);
document.getElementById("img2").addEventListener("click", replaceMainImg2);
document.getElementById("img3").addEventListener("click", replaceMainImg3);

// var picList = document.querySelectorAll(".images");

// for(i = 0; i < picList.length; i++) {
//   picList[i].addEventListener('click', function() {
//     document.getElementById("main-image").src = picList[i].src
//   });
// }

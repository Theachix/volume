/*
 * Icons by:
 * Font Awesome – http://fontawesome.io/
 * Those Icons – https://www.flaticon.com/authors/those-icons
 * EpicCoders – https://www.flaticon.com/authors/epiccoders
 * Smashicons – https://www.flaticon.com/authors/smashicons
 */


$(document).ready(function () {
	let songs = [
		{
			title: "Gravité",
			artist: "Theachix",
			audioFile: "music/song2.mp3",
        	cover: "cover/img2.jpg",
		},
		{
			title: "Virus",
			artist: "Theachix",
			audioFile: "music/song3.mp3",
        	cover: "cover/img3.jpg",
		},
		{
			title: "Shortcut",
			artist: "Theachix",
			audioFile: "music/song4.mp3",
        	cover: "cover/img4.jpg",
		},
		{
			title: "Smoke",
			artist: "Theachix",
			audioFile: "music/song5.mp3",
        	cover: "cover/img5.jpg",
		},
		{
			title: "Odyssée",
			artist: "Theachix",
			audioFile: "music/song6.mp3",
        	cover: "cover/img6.jpg",
		},
		{
			title: "mephisto",
			artist: "Theachix",
			audioFile: "music/song7.mp3",
			cover: "cover/img7.jpg",
			singer: "Theachix",
		},
		{
			title: "darkside",
			artist: "Theachix",
			audioFile: "music/song8.mp3",
			cover: "cover/img8.jpg",
			singer: "Theachix",
		},
		{
			title: "cold",
			artist: "Theachix",
			audioFile: "music/song9.mp3",
			cover: "cover/img9.jpg",
			singer: "Theachix",
		},
		{
			title: "gambade",
			artist: "Theachix",
			audioFile: "music/song10.mp3",
			cover: "cover/img10.jpg",
			singer: "Theachix",
		},
		{
			title: "neon",
			artist: "Theachix",
			audioFile: "music/song11.mp3",
			cover: "cover/img11.jpg",
			singer: "Theachix",
		},
		{
			title: "sick of talking",
			artist: "Theachix",
			audioFile: "music/song12.mp3",
			cover: "cover/img12.jpg",
			singer: "Theachix",
		},
		{
			title: "balltrap",
			artist: "Theachix",
			audioFile: "music/song13.mp3",
			cover: "cover/img13.jpg",
			singer: "Theachix",
		},
		{
			title: "schwifty",
			artist: "Theachix",
			audioFile: "music/song14.mp3",
			cover: "cover/img14.jpg",
			singer: "Theachix",
		}
	];
	
	for (let song of songs) {
		$("#songs").append('<li class="song" data-audio="' + song.audioFile + '" data-color="'+ song.color +'">' + 
			'<img src="' + song.cover + '">' +
			'<p class="song-title">' + song.title + '</p>' +
			'<p class="song-artist">' + song.artist + '</p>' + 
			'</li>');
	}
	
	$('.jcarousel').jcarousel({
			wrap: 'circular'
	});
});

/*
 * Replace all SVG images with inline SVG
 */
jQuery('img[src$=".svg"]').each(function(){
	let $img = jQuery(this);
	let imgID = $img.attr('id');
	let imgClass = $img.attr('class');
	let imgURL = $img.attr('src');

	jQuery.get(imgURL, function(data) {
		// Get the SVG tag, ignore the rest
		let $svg = jQuery(data).find('svg');

		// Add replaced image's ID to the new SVG
		if(typeof imgID !== 'undefined') {
			$svg = $svg.attr('id', imgID);
		}
		// Add replaced image's classes to the new SVG
		if(typeof imgClass !== 'undefined') {
			$svg = $svg.attr('class', imgClass+' replaced-svg');
		}

		// Remove any invalid XML tags as per http://validator.w3.org
		$svg = $svg.removeAttr('xmlns:a');

		// Replace image with new SVG
		$img.replaceWith($svg);

	}, 'xml');

});

// Current slide
$('.jcarousel').on('jcarousel:visiblein', 'li', function(event, carousel) {
	let cover = $(this).find("img").attr("src");
	let songTitle = $(this).find("p.song-title").html();
	let songArtist = $(this).find("p.song-artist").html();
	let audioSrc = $(this).attr("data-audio");
	// let backgroundColor = $(this).attr("data-color");
	// $("body").css('background', backgroundColor)
	$("#background").css('background-image', 'url('+cover+')');
	$("audio").find("source").attr("src", ""+audioSrc+"");
	player.load();
	player.currentTime = 0;
	$("#song-info").find("img").attr("src", cover);
	$("#song-info .artist-wrap p").find("span.title").html(songTitle);
	$("#song-info .artist-wrap p").find("span.artist").html(songArtist);
});

// Previous slide
$('#previous-btn').click(function() {
	$('.jcarousel').jcarousel('scroll', '-=1');
	$('#play-btn i').removeClass('fa-pause');
	player.pause();
});

// Next slide
$('#next-btn').click(function() {
	if ($(".fa-random").hasClass('active')) {
		let songs = $("#songs li").length - 1;
		let randomSong = Math.floor(Math.random() * songs) + 1;
		$('.jcarousel').jcarousel('scroll', '+=' + randomSong);
	} else {
		$('.jcarousel').jcarousel('scroll', '+=1');
	}
	$('#play-btn i').removeClass('fa-pause');
	player.pause();
});

// Play Icon Switcher
$('#play-btn').click(function() {
	$(this).find('i').toggleClass('fa-pause');
});



// App
$(".app-icon").click(function() {
	$("#content-wrap").removeClass('minimized');
	setTimeout(function(){ $("#home-screen").removeClass('active'); }, 300);
});



$('#sub-controls i').click(function () {
	if(!$(this).hasClass('fa-bluetooth-b')) {
		$(this).toggleClass('active');
	}
	
	if ($("#heart-icon").hasClass('active')) {
		$("#heart-icon").removeClass('fa-heart-o');
		$("#heart-icon").addClass('fa-heart');
	} else {
		$("#heart-icon").removeClass('fa-heart');
		$("#heart-icon").addClass('fa-heart-o');
	};


	if ($("#volume-btn").hasClass('active')) {
		$("#volume-btn").removeClass('fa-volume-up');
		$("#volume-btn").addClass('fa-volume-off');
	} else {
		$("#volume-btn").removeClass('fa-volume-off');
		$("#volume-btn").addClass('fa-volume-up');
	}
	
});

/*
 * Music Player
 * By Greg Hovanesyan
 * https://codepen.io/gregh/pen/NdVvbm
 */

var audioPlayer = document.querySelector('#content');
var playpauseBtn = audioPlayer.querySelector('#play-btn');
var progress = audioPlayer.querySelector('.progress');
var sliders = audioPlayer.querySelectorAll('.slider');
var player = audioPlayer.querySelector('audio');
var currentTime = audioPlayer.querySelector('#current-time');
var totalTime = audioPlayer.querySelector('#total-time');

var draggableClasses = ['pin'];
var currentlyDragged = null;

window.addEventListener('mousedown', function(event) {
  
  if(!isDraggable(event.target)) return false;
  
  currentlyDragged = event.target;
  let handleMethod = currentlyDragged.dataset.method;
  
  this.addEventListener('mousemove', window[handleMethod], false);

  window.addEventListener('mouseup', () => {
    currentlyDragged = false;
    window.removeEventListener('mousemove', window[handleMethod], false);
  }, false);  
});

playpauseBtn.addEventListener('click', togglePlay);
player.addEventListener('timeupdate', updateProgress);
player.addEventListener('loadedmetadata', () => {
  totalTime.textContent = formatTime(player.duration);
});
player.addEventListener('ended', function(){
  player.currentTime = 0;
	
	if ($(".fa-refresh").hasClass('active')) {
		togglePlay();
	} else {
		if ($(".fa-random").hasClass('active')) {
			let songs = $("#songs li").length - 1;
			let randomSong = Math.floor(Math.random() * songs) + 1;
			$('.jcarousel').jcarousel('scroll', '+=' + randomSong);
		} else {
			$('.jcarousel').jcarousel('scroll', '+=1');
		}
		togglePlay();
	}
});

sliders.forEach(slider => {
  let pin = slider.querySelector('.pin');
  slider.addEventListener('click', window[pin.dataset.method]);
});

function isDraggable(el) {
  let canDrag = false;
  let classes = Array.from(el.classList);
  draggableClasses.forEach(draggable => {
    if(classes.indexOf(draggable) !== -1)
      canDrag = true;
  })
  return canDrag;
}

function inRange(event) {
  let rangeBox = getRangeBox(event);
  let direction = rangeBox.dataset.direction;
	let screenOffset = document.querySelector("#screen").offsetLeft + 26;
	var min = screenOffset - rangeBox.offsetLeft;
	var max = min + rangeBox.offsetWidth;   
	if(event.clientX < min || event.clientX > max) { return false };
  return true;
}

function updateProgress() {
  var current = player.currentTime;
  var percent = (current / player.duration) * 100;
  progress.style.width = percent + '%';
  
  currentTime.textContent = formatTime(current);
}

function getRangeBox(event) {
  let rangeBox = event.target;
  let el = currentlyDragged;
  if(event.type == 'click' && isDraggable(event.target)) {
    rangeBox = event.target.parentElement.parentElement;
  }
  if(event.type == 'mousemove') {
    rangeBox = el.parentElement.parentElement;
  }
  return rangeBox;
}

function getCoefficient(event) {
  let slider = getRangeBox(event);
	let screenOffset = document.querySelector("#screen").offsetLeft + 26;
  let K = 0;
	let offsetX = event.clientX - screenOffset;
	let width = slider.clientWidth;
	K = offsetX / width;
  return K;
}

function rewind(event) {
  if(inRange(event)) {
    player.currentTime = player.duration * getCoefficient(event);
  }
}

function formatTime(time) {
  var min = Math.floor(time / 60);
  var sec = Math.floor(time % 60);
  return min + ':' + ((sec<10) ? ('0' + sec) : sec);
}

function togglePlay() {
	player.volume = 0.5;
	
  if(player.paused) {
    player.play();
  } else {
    player.pause();
  }  
}

// let a;
let time;

setInterval(() => {
    let now = new Date();
	let heure   = ('0'+now.getHours()  ).slice(-2);
	let minute  = ('0'+now.getMinutes()).slice(-2);
    time = heure + ":" + minute;
    document.getElementById("time").innerHTML = time;
}, 1000);



// let root = document.querySelector(':root');
// let power_button = document.querySelector('.power-button');
// let volume_up_button = document.querySelector('.volume-up');
// let volume_down_button = document.querySelector('.volume-down');
// let volume_pannel = document.querySelector('.volume-pannel');
// let volume_slider_in = document.querySelector('.volume-slider-in');


// // power_button.addEventListener('click',()=>{
// // 	if(screen.style.display == "none"){
// // 	  screen.style.display = "block";
// // 	}
// // 	else{
// // 	  screen.style.display = "none";
// // 	}
// //   })
  
// function hide_volume_pannel(){
// 	if(parseInt(getComputedStyle(root).getPropertyValue('--volume-pannel-left')) == 10){
// 	  root.style.setProperty('--volume-pannel-left',"-35px");
// 	}
//   }
  
//   volume_up_button.addEventListener('click',()=>{
// 	let root_vals = getComputedStyle(root);
// 	if(root_vals.getPropertyValue('--volume-pannel-left') == "5px"){
// 	  root.style.setProperty('--volume-pannel-left',"10px");
// 	  hide_pannel = setTimeout(hide_volume_pannel,'2000');
// 	}
// 	else{
// 	  clearTimeout(hide_pannel);
// 	  hide_pannel = setTimeout(hide_volume_pannel,'2000');
// 	}
// 	if(parseInt(root_vals.getPropertyValue('--vol-slider-in-height')) < 140){
// 		let current = parseInt(root_vals.getPropertyValue('--vol-slider-in-height'));
// 		let cur_val = current+14;
// 		cur_val = cur_val.toString()+"px";
// 		root.style.setProperty('--vol-slider-in-height',cur_val);
// 	  }
//   })
  
//   volume_down_button.addEventListener('click',()=>{
// 	let root_vals = getComputedStyle(root);
// 	if(root_vals.getPropertyValue('--volume-pannel-left') == "5px"){
// 	  root.style.setProperty('--volume-pannel-left',"10px");
// 	  hide_pannel = setTimeout(hide_volume_pannel,'2000');
// 	}
// 	else{
// 	  clearTimeout(hide_pannel);
// 	  hide_pannel = setTimeout(hide_volume_pannel,'2000');
// 	}
// 	if(parseInt(root_vals.getPropertyValue('--vol-slider-in-height')) > 0){
// 		let current = parseInt(root_vals.getPropertyValue('--vol-slider-in-height'));
// 		let cur_val = current-14;
// 		cur_val = cur_val.toString()+"px";
// 		root.style.setProperty('--vol-slider-in-height',cur_val);
// 	  }
//   })
  

// let volume = audio.volume;

// //change volume 

// let volume_up = document.querySelector('.volume-up');
// let volume_down = document.querySelector('.volume-down');

// function volume_change(){
//     volume_show.innerHTML = recent_volume.value;
//     track.volume = recent_volume.value /100;
// }


// //Mute sound 
// function mute_sound(){
//     volume = 0;
//     volume.value = 0;
// }


// let volume_change = document.getElementById('volume-btn') 

// volume_change.addEventListener('click', () => {
// 	if (player.volume > 0) 
// { 	
// 	volume_change.classList.add('fa fa-volume-off');
// 	volume_change.classList.remove('fa fa-volume-up');
//     player.volume = 0;
// }
// else 
// {
//     volume_change.classList.add('fa fa-volume-up');
// 	volume_change.classList.remove('fa fa-volume-off');
//     player.volume = 0.5;
// }




let is_muted = false;

$('#volume-btn').click(function(){
	if(is_muted == false){
		is_muted = true;
		('#volume-btn').innerHTML
	}
	else{
		is_muted = false;
	}
	$('#audioPlayer').prop('muted',is_muted);
});



// //play song
// function playsong(){
//     track.play();
//     playing_song = true;
//     play.innerHTML = '<i class="fa fa-pause"></i>'
// }

// //pause song 
// function pausesong(){
//     track.pause();
//     playing_song = false;
//     play.innerHTML = '<i class="fa fa-play"></i>'

// }
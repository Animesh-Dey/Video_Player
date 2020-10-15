const player=document.querySelector('.player');
const video=document.querySelector('video');
const Progressrange=document.querySelector('.progress-range');
const Progressbar=document.querySelector('.progress-bar');
const playbtn=document.getElementById('play-btn');
const volumeicon=document.getElementById('volume-icon');
const volumerange=document.querySelector('.volume-range');
const volumebar=document.querySelector('.volume-bar');
const currenttime=document.querySelector('.time-elapsed');
const duration=document.querySelector('.time-duration');
const speed=document.querySelector('.player-speed');
const fullscreenbtn=document.querySelector('.fullscreen');

// Play & Pause ----------------------------------- //

function showplayicon()
{
    playbtn.innerHTML='<i class="fas fa-play"></i>'
    playbtn.setAttribute('title','play');
}

function toggleplay()
{
    if(video.paused)
    {
        video.play();
        playbtn.innerHTML='<i class="fas fa-pause"></i>';
        playbtn.setAttribute('title','pause');
    }
    else{
        video.pause();
        showplayicon();
    }
}
//on video end, show play icon
video.addEventListener('ended',showplayicon);

// Progress Bar ---------------------------------- //
 
//calculate display time format
function displaytime(time){
  let min=Math.floor(time/60);
  let seconds=Math.floor(time%60);
  min=min>9?min:`0${min}`;
  seconds=seconds>9?seconds:`0${seconds}`;
  //console.log(min,seconds);
  return `${min}:${seconds}`;
}

//update progress bar ass video plays
function updateprgress(){
    //console.log(video.currentTime,video.duration);
    Progressbar.style.width=`${(video.currentTime/video.duration)*100}%`
    currenttime.textContent=`${displaytime(video.currentTime)} /`;
    duration.textContent=`${displaytime(video.duration)}`;
}

function setprg(e){
    //console.log(e);
    const newtime=e.offsetX/Progressrange.offsetWidth;
    Progressbar.style.width=`${newtime*100}`;
    video.currentTime=newtime*video.duration;
    //console.log(newtime);
}


// Volume Controls --------------------------- //
let  lastvol=1;
//Volume bar
function changevol(e){
    let volume=e.offsetX/volumerange.offsetWidth;
    //round vol up or down
    if(volume<0.1)
    {
        volume=0;
    }
    if(volume>0.9)
    {
        volume=1;
    }
    volumebar.style.width=`${volume*100}%`;
    video.volume=volume;
    //console.log(volume);
    //change icon depending on vol
    volumeicon.className='';
    if(volume>0.7){
        volumeicon.classList.add('fas','fa-volume-up');
    }
    else if(volume<0.7 && volume>0)
    {
        volumeicon.classList.add('fas','fa-volume-down');
    }
    else if(volume===0){
        volumeicon.classList.add('fas','fa-volume-off');
    }
    lastvol=volume;
}

function togglemute(){
    volumeicon.className='';
    if(video.volume)
    {
        lastvol=video.volume;
        video.volume=0;
        volumebar.style.width=0;
        volumeicon.classList.add('fas','fa-volume-mute');
    }
    else{
        video.volume=lastvol;
        volumebar.style.width=`${lastvol*100}%`;
        volumeicon.classList.add('fas','fa-volume-up');
    }
}

// Change Playback Speed -------------------- //
function changespeed(){
    //console.log(video.playbackRate)
   // console.log(speed.value);
  video.playbackRate=speed.value;
}


// Fullscreen ------------------------------- //

function openFullscreen(elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
      elem.msRequestFullscreen();
    }
    video.classList.add('video-fullscreen')
  }



  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE/Edge */
      document.msExitFullscreen();
    }
    video.classList.remove('video-fullscreen')

  }

let fullscreen=false;
//toggle fullscreen
function togglefullscreen(){
    if(!fullscreen){
        openFullscreen(player);
    }
    else{
        closeFullscreen();
    }
    fullscreen=!fullscreen;
}

 //eventlistnrs
 playbtn.addEventListener('click',toggleplay);
 video.addEventListener('click',toggleplay);
 video.addEventListener('timeupdate',updateprgress)
 video.addEventListener('canplay',updateprgress);
 Progressrange.addEventListener('click',setprg);
 volumerange.addEventListener('click',changevol);
 volumeicon.addEventListener('click',togglemute);
 speed.addEventListener('change',changespeed);
 fullscreenbtn.addEventListener('click',togglefullscreen);
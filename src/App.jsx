import { useRef, useState } from 'react'
import './App.css'

function App() {
  const [audioProgress, setAudioProgress] = useState(0);
  const [avtarclassIndex, setAvtarclassIndex] = useState(0)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [musicIndex, setMusicIndex] = useState(0)
  const [musicTotalLength, setMusicTotalLength] = useState('04 : 38');
  const [musicCurrentTime, setMusicCurrentTime] = useState('00 : 00');
  const [videoIndex, setVideoIndex] = useState(0)


  const currentAudio = useRef()

  const [currentMusicDetails, setCurrentMusicDetails] = useState({
    songName: 'LAAL PARI',
    songArtist: 'Honey Singh',
    songsrc: '/assets/songs/LAAL PARI.mp3',
    songAvtar: '/assets/Images/lal pari.jpg'
  })


  // prevent all songs thruogh api 
  const musicApi = [
    {
      songName: 'LAAL PARI',
      songArtist: 'Honey Singh',
      songsrc: '/assets/songs/LAAL PARI.mp3',
      songAvtar: '/assets/Images/lal pari.jpg'
    },
    {
      songName: 'Apna Bana Le',
      songArtist: 'Arijit Singh',
      songsrc: '/assets/songs/Apna Bana Le.webm.mp3',
      songAvtar: '/assets/Images/image7.jpg'
    },

     {
      songName: 'jo tere sung',
      songArtist: 'Mustafa Zahid',
      songsrc: '/assets/songs/jo Tere Sang.mp3',
      songAvtar: '/assets/Images/jo tere sung img.jpg'
    },
    {
      songName: 'Barbaadiyan',
      songArtist: 'Sachin–Jigar',
      songsrc: '/assets/songs/Barbaadiyan.mp3',
      songAvtar: '/assets/Images/barbadiya.jpg'
    },
    {
      songName: 'Angreji Beat',
      songArtist: 'Honey Singh',
      songsrc: '/assets/songs/Angreji Beat.mp3',
      songAvtar: '/assets/Images/Angreji.jpg'
    },
    {
      songName: 'Taras',
      songArtist: 'Sachin-Jigar',
      songsrc: '/assets/songs/Taras.mp3',
      songAvtar: '/assets/Images/taras.jpg'
    },
    {
      songName: 'Chasing - NEFFEX',
      songArtist: 'Honey Singh',
      songsrc: '/assets/songs/Chasing - NEFFEX.mp3',
      songAvtar: '/assets/Images/image1.jpg'
    },
    {
      songName: 'Inspired (Clean) - NEFFEX',
      songArtist: 'Honey Singh',
      songsrc: '/assets/songs/Inspired (Clean) - NEFFEX.mp3',
      songAvtar: '/assets/Images/image2.jpg'
    },
    {
      songName: 'SOCH(Slowed+Reverbed) __ Hardy Sandhu',
      songArtist: 'Honey Singh',
      songsrc: '/assets/songs/SOCH(Slowed+Reverbed) __ Hardy Sandhu.mp3',
      songAvtar: '/assets/Images/image3.jpg'
    }
   
  ]


  // progress bar
  const handleMusicProgressBar = (e) => {
    setAudioProgress(e.target.value)
    currentAudio.current.currentTime = e.target.value * currentAudio.current.duration / 100;
  }

  const avtarClass = ['objectFitCover', 'objectFitContaint ', 'none']

  // fit avtar
  const handleAvtar = () => {
    if (avtarclassIndex >= avtarClass.length - 1) {
      setAvtarclassIndex(0)
    } else {
      setAvtarclassIndex(avtarclassIndex + 1)

    }
  }

  // play pause audio
  const handalAudioPlay = () => {
    if (currentAudio.current.paused) {
      currentAudio.current.play()
      setIsAudioPlaying(true)
    } else {
      currentAudio.current.pause()
      setIsAudioPlaying(false)
    }
  }

  // change next song
  const handleNextSong = () => {

    if (musicIndex >= musicApi.length - 1) {
      let number = 0
      setMusicIndex(number)
      currentMusicDetailsUdpate()
    } else {
      let number = musicIndex + 1
      setMusicIndex(number)
      currentMusicDetailsUdpate()
    }
  }

  // changeprevious song
  const handlePreviousSong = () => {
    if (musicIndex === 0) {
      let number = musicApi.length - 1
      setMusicIndex(number)
      currentMusicDetailsUdpate()
    } else {
      let number = musicIndex - 1
      setMusicIndex(number)
      currentMusicDetailsUdpate()
    }
  }

  const currentMusicDetailsUdpate = () => {
    setCurrentMusicDetails(
      musicApi[musicIndex],
      // setIsAudioPlaying(true),
      // currentAudio.current.play()
    )
  }



  const handleAudioUpdat = () => {
    let minutes = Math.floor(currentAudio.current.duration / 60);
    let seconds = Math.floor(currentAudio.current.duration % 60);
    let musicTotalLength0 = `${minutes < 10 ? `0${minutes}` : minutes} : ${seconds < 10 ? `0${seconds}` : seconds}`;
    setMusicTotalLength(musicTotalLength0);

    //Input Music Current Time
    let currentMin = Math.floor(currentAudio.current.currentTime / 60);
    let currentSec = Math.floor(currentAudio.current.currentTime % 60);
    let musicCurrentT = `${currentMin < 10 ? `0${currentMin}` : currentMin} : ${currentSec < 10 ? `0${currentSec}` : currentSec}`;
    setMusicCurrentTime(musicCurrentT);

    const progress = parseInt((currentAudio.current.currentTime / currentAudio.current.duration) * 100)
    setAudioProgress(isNaN(progress) ? 0 : progress)
  }

  const allVideo = [
    '/assets/Videos/video1.mp4',
    '/assets/Videos/video2.mp4',
    '/assets/Videos/video3.mp4',
    '/assets/Videos/video4.mp4',
    '/assets/Videos/video5.mp4'
  ]
  const bgChange = () => {
    if (videoIndex >= allVideo.length - 1) {
      let number = 0
      setVideoIndex(number)
    } else { 
      let number = videoIndex + 1
      setVideoIndex(number)
    }
  }

  return (
    <>
      <div className="container ">
        <audio src={currentMusicDetails.songsrc} ref={currentAudio} onEnded={handleNextSong} onTimeUpdate={handleAudioUpdat}></audio>
        <video 
          className='videoBackground'
          src={allVideo[videoIndex]} autoPlay muted loop></video>
        <div className="blackscreen"></div>
        <div className="music-container">
          <p className='musicPlayer'>Music Player</p>
          <p className='music-Head-name'>{currentMusicDetails.songName}</p>
          <p className='musci-Artist-name'>{currentMusicDetails.songArtist}</p>
          <img
            src={currentMusicDetails.songAvtar}
            alt="song Avtar"  
            id='songAvtar'  
            onClick={handleAvtar}
           className={`${avtarClass[avtarclassIndex]} ${isAudioPlaying ? "gg" : "bb"}`} 
 
          /> 
          <div className='musicTimerDiv'>
            <p className='musicCurrentTime'>{musicCurrentTime}</p>
            <p className='musicTotalLength'>{musicTotalLength}</p>
          </div>
          <input
            type="range"
            name='musicProgressBar' className='musicProgressBar'
            value={audioProgress}
            onChange={handleMusicProgressBar} />
          <div className="musicControlers">
            <i className='fa-solid fa-backward musicControler' onClick={handlePreviousSong}></i>
            <i className={`fa-solid ${isAudioPlaying ? 'fa-pause-circle' : 'fa-circle-play'} PlayBtn`} onClick={handalAudioPlay}></i>
            <i className='fa-solid fa-forward musicControler' onClick={handleNextSong}></i>
          </div>
        </div>
        <div className="changeBackBtn" onClick={bgChange}>
          Change Background
        </div>
      </div>
    </>
  )
}

export default App 

const handleMuteButtonClick = (myStream, myAudioDom) => {
  myStream.getAudioTracks().forEach((track) => {
    track.enabled = !track.enabled;
  });
  if (myAudioDom.current.innerText === 'myAudio') {
    myAudioDom.current.innerText = 'stop myAudio';
  }
};

export default handleMuteButtonClick;

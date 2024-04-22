const handleCameraButtonClick = (myStream, myVideoDom) => {
  myStream.getVideoTracks().forEach((track) => {
    track.enabled = !track.enabled;
  });
  if (myVideoDom.current.innerText === 'myVideo') {
    myVideoDom.current.innerText = 'stop myVideo';
  }
};

export default handleCameraButtonClick;

import React, { useEffect, useRef } from 'react';

interface OtherVideoProps {
  stream: MediaStream;
}

const OtherVideo: React.FC<OtherVideoProps> = ({ stream }) => {
  console.log(stream);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  console.log(videoRef);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return <video ref={videoRef} autoPlay playsInline width={200} height={200} />;
};

export default OtherVideo;

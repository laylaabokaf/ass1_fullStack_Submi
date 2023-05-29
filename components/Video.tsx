import { useState, useEffect } from "react";


export type VideoProps = {
    publicId: string;
  };

const Video: React.FC<{ video: VideoProps }> = ({ video }) => {
  const [videoPublicId, setPublicId] = useState(video.publicId);
  useEffect(() => {
    setPublicId(video.publicId);
  }, [video.publicId]);
  if (videoPublicId === '') {
    return <></>;
  }
  return (
    <video
      className={`${videoPublicId === '' ? "hidden" : "block m-4"}`}
     // autoPlay
      controls
      muted
      src= {videoPublicId}
    //  src={`https://res.cloudinary.com/dmwugmqp8/video/upload/vc_auto,q_auto,w_800/${videoPublicId}`}
    ></video>
  );
}

export default Video;
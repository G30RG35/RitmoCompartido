import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { api_key } from "../../hooks/PeticionesApi";
import "../../index.css";

export const Video = (videolist) => {
  const [number, setNumber] = useState(0);
  const [currentVideo, setCurrentVideo] = useState(videolist.videoList[number]);

  const handleVideoEnd = () => {
    const nextVideoIndex = (number + 1) % videolist.videoList.length;
    setCurrentVideo(videolist.videoList[nextVideoIndex]);
    setNumber(nextVideoIndex); // Not strictly necessary here
  };

  const handleVideoReady = () => {
    // Play the video automatically when it's ready
  };

  // Update number state and currentVideo whenever videoList changes
  useEffect(() => {
    setCurrentVideo(videolist.videoList[number]);
    setNumber(videolist.videoList.length - 1); // Set number to last index initially
  }, [videolist]);

  const generateVideoURLs = (videoIDs) => {
    return videoIDs.map((id) => `https://www.youtube.com/watch?v=${id}`);
  };

  const videoURLs = generateVideoURLs(videolist.videoList);

  return (
    <>
      <div className="playerwrapper">
        <ReactPlayer
          className="reactplayer"
          url={videoURLs}
          width="100%"
          height="100%"
          onEnded={handleVideoEnd}
          controls={true}
          config={{
            youtube: {
              key: api_key,
            },
          }}
        />
      </div>
    </>
  );
};

import React, { useState, useEffect } from "react";
import styles from "./VideoCard.module.css";
import { masPopulares } from "../../hooks/PeticionesApi";

function VideoCard({dataSearch, addVideoList }) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    console.log(dataSearch)
    if (dataSearch!=null) {
      setVideos(dataSearch);
    } else {
      traerMasPopulares();
    }
  }, []);

  useEffect(() => {
    console.log(dataSearch)
    if (dataSearch!=null) {
      setVideos(dataSearch);
    } else {
      traerMasPopulares();
    }
  }, [dataSearch])
  

  const traerMasPopulares = async () => {
    const resp = await masPopulares();
    console.log(resp);
    setVideos(resp);
  };

  const renderVideoCards = () => {
    return videos.map((video) => (
      <div
        className={styles.video}
        key={video?.id?.videoId||video?.id}
        onClick={() => addVideoList(video?.id,video?.id?.videoId)}
      >
        <img
          src={video.snippet.thumbnails.high.url}
          className={styles.thumbnail}
          alt=""
        />
        <div className={styles.content}>
          <img
            src={video.channelThumbnail}
            className={styles.channelicon}
            alt=""
          />
          <div className={styles.info}>
            <h4 className={styles.title}>{video.snippet.title}</h4>
            <p className={styles.channelname}>{video.snippet.channelTitle}</p>
          </div>
        </div>
      </div>
    ));
  };

  return <div className={styles.videoCardsContainer}>{renderVideoCards()}</div>;
}

export default VideoCard;

import React from "react";
import styles from "./SearchCards.module.css";

export const SearchCards = (dataSearch) => {

  const renderVideoCards = () => {
    const videos=dataSearch.dataSearch

    return videos?.map((video) => (
      <div
        className={styles.video}
        key={video.id}
        onClick={() => addVideoList(video.id)}
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
};

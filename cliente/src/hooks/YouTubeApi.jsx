import React, { useState, useEffect } from "react";
import styles from "../hooks/VideoCard.module.css";

function VideoCards() {
  const [videos, setVideos] = useState([]);
  const [api_key] = useState("AIzaSyArPcYH0y3x4aKJP56BbiMYi4vHhUaeg18");
  const videoHttp = "https://www.googleapis.com/youtube/v3/videos?";
  const channelHttp = "https://www.googleapis.com/youtube/v3/channels?";

  useEffect(() => {
    fetch(
      videoHttp +
        new URLSearchParams({
          key: api_key,
          part: "snippet",
          chart: "mostPopular",
          maxResult: "1",
          regionCode: "MX",
          videoCategoryId: "10",
        })
    )
      .then((res) => res.json())
      .then((data) => {
        const videoPromises = data.items.map((item) => getChannelIcon(item));
        Promise.all(videoPromises).then((updatedVideos) =>
          setVideos(updatedVideos)
        );
      })
      .catch((err) => console.error(err));
  }, []);

  const getChannelIcon = async (videoData) => {
    const channelRes = await fetch(
      channelHttp +
        new URLSearchParams({
          key: api_key,
          part: "snippet",
          id: videoData.snippet.channelId,
        })
    );
    const channelData = await channelRes.json();
    videoData.channelThumbnail =
      channelData.items[0].snippet.thumbnails.default.url;
    return videoData;
  };

  const renderVideoCards = () => {
    return videos.map((video) => (
      <div
        className={styles.video}
        key={video.id}
        onClick={() =>
          (window.location.href = `https://youtube.com/watch?v=${video.id}`)
        }
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

export default VideoCards;

// fetch(video_http + new URLSearchParams({
//     key: api_key,
//     part: "snippet",
//     chart: "mostPopular",
//     maxResult: "1",
//     regionCode: "MX",
//     videoCategoryId: "10",
// }))
// .then(res => res.json())
// .then(data => {
//     data.items.forEach(item => {
//         getChannelIcon(item);
//     })
// })
// .catch(err => console.log(err));

// const getChannelIcon = (video_data) => {
//     fetch(channel_http + new URLSearchParams({
//         key: api_key,
//         part: 'snippet',
//         id: video_data.snippet.channelId
//     }))
//     .then(res => res.json())
//     .then(data => {
//         video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
//         makeVideoCard(video_data);
//     })
// }

// const makeVideoCard = (data) => {
//     videoCardContainer.innerHTML += `
//     <div class="video" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
//         <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
//         <div class="content">
//             <img src="${data.channelThumbnail}" class="channel-icon" alt="">
//             <div class="info">
//                 <h4 class="title">${data.snippet.title}</h4>
//                 <p class="channel-name">${data.snippet.channelTitle}</p>
//             </div>
//         </div>
//     </div>
//     `;
// }

// search bar

// const searchInput = document.querySelector('.search-bar');
// const searchBtn = document.querySelector('.search-btn');
// let searchLink = "https://www.youtube.com/results?search_query=";

// searchBtn.addEventListener('click', () => {
//     if(searchInput.value.length){
//         location.href = searchLink + searchInput.value;
//     }
// })

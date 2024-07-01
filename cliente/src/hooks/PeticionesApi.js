export const api_key = "AIzaSyArPcYH0y3x4aKJP56BbiMYi4vHhUaeg18";
const videoHttp = "https://www.googleapis.com/youtube/v3/videos?";
const channelHttp = "https://www.googleapis.com/youtube/v3/channels?";
const search = "https://www.googleapis.com/youtube/v3/search?";
const maxResults = 1;

export const busqueda = async (params, includeThumbnails = true) => {
    try {
      const searchParams = new URLSearchParams({
        part: "snippet",
        maxResults: maxResults,
        q: params,
        type: "video", 
        key: api_key,
      });
  
      if (includeThumbnails) {
        searchParams.append('part', 'id'); // Include id for channel lookup
      }
  
      const fetchUrl = search + searchParams.toString();
  
      const response = await fetch(fetchUrl);
      const data = await response.json();
  
      if (includeThumbnails) {
        const enrichedVideos = await Promise.all(
          data.items.map(async (video) => {
            const channelId = video.snippet.channelId;
            const channelThumbnail = await getChannelThumbnail(channelId);
            return {
              ...video,
              channelThumbnail,
            };
          })
        );
        return enrichedVideos.filter((video) => video.id.kind === "youtube#video");
      } else {
        const filteredVideos = data.items.filter(
          (video) => video.id.kind === "youtube#video"
        );
        return filteredVideos;
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
      return Promise.reject(error); // Re-throw the error for proper handling
    }
  };
  
  

export const masPopulares = async () => {
    try {
      const searchParams = new URLSearchParams({
        part: 'snippet', // Include channel details
        chart: 'mostPopular',
        maxResults: maxResults, // Set desired number of results (5)
        regionCode: 'MX',
        videoCategoryId: '10',
        key: api_key,
      });
  
      const fetchUrl = videoHttp + searchParams.toString();
      const response = await fetch(fetchUrl);
      const data = await response.json();
  
      const enrichedVideos = data.items.map(async (video) => {
        const channelId = video.snippet.channelId;
        const channelThumbnail = await getChannelThumbnail(channelId);
        return {
          ...video, // Spread existing video data
          channelThumbnail, // Add channel thumbnail URL
        };
      });
  
      return Promise.all(enrichedVideos); // Wait for all promises to resolve
    } catch (error) {
      console.error('Error fetching most popular videos:', error);
      return null;
    }
  };
  
  async function getChannelThumbnail(channelId) {
  
    const searchParams = new URLSearchParams({
      part: 'snippet',
      id: channelId,
      key: api_key,
    });
  
    const fetchUrl = channelHttp + searchParams.toString();
  
    try {
      const response = await fetch(fetchUrl);
      const data = await response.json();
  
      if (data.items && data.items.length > 0) {
        const channel = data.items[0];
        const thumbnails = channel.snippet.thumbnails;
        return thumbnails.default.url || null; // Return default or null
      } else {
        return null; // Channel not found or error
      }
    } catch (error) {
      console.error('Error fetching channel thumbnail:', error);
      return null;
    }
  }
  


  
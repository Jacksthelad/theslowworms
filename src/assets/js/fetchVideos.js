require('dotenv').config();
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY,
});

async function fetchVideosDetails(videoIds) {
  const response = await youtube.videos.list({
    part: 'snippet',
    id: videoIds.join(','),
  });

  return response.data.items;
}

async function fetchLatestVideos() {
  try {
    const searchResponse = await youtube.search.list({
      channelId: process.env.CHANNEL_ID,
      part: 'snippet',
      order: 'date', // Order by upload date
      maxResults: 10, // Adjust based on how many videos you want to fetch
    });

    // Extract video IDs from the search response
    const videoIds = searchResponse.data.items.map(item => item.id.videoId);

    // Fetch details for these videos to access their tags
    const detailedVideos = await fetchVideosDetails(videoIds);

    // Filter videos by the specific tag
    const taggedVideos = detailedVideos.filter(video =>
      video.snippet.tags && video.snippet.tags.includes('theslowwormswebsite')
    );

    // Map the filtered videos to the desired structure
    const videos = taggedVideos.map(video => ({
      id: video.id,
      title: video.snippet.title,
      description: video.snippet.description,
      thumbnailUrl: video.snippet.thumbnails.high.url,
      publishTime: video.snippet.publishedAt,
    }));

    // Save the filtered list to /src/_data/videos.json
    fs.writeFileSync(path.join(__dirname, '../../_data', 'videos.json'), JSON.stringify(videos, null, 2), 'utf-8');
    console.log('Tagged videos fetched and saved successfully.');
  } catch (error) {
    console.error('Error fetching videos:', error);
  }
}

fetchLatestVideos();

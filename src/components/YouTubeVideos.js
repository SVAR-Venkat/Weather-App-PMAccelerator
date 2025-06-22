import React, { useEffect, useState } from "react";

const YouTubeVideos = ({ location }) => {
  const [videos, setVideos] = useState([]);
  const apiKey = "AIzaSyCuoGV_6y3nabFZiwHSWc-jAbz5pXSs-yc";

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=weather+in+${encodeURIComponent(
          location
        )}&type=video&maxResults=3&key=${apiKey}`;
        const res = await fetch(url);
        const data = await res.json();
        if (Array.isArray(data.items)) {
          setVideos(data.items);
        } else {
          setVideos([]);
        }
      } catch (error) {
        console.error("Error fetching YouTube videos:", error);
        setVideos([]);
      }
    };

    if (location) fetchVideos();
  }, [location]);

  if (!Array.isArray(videos) || videos.length === 0) return null;

  return (
    <div style={{ marginTop: "2rem" }}>
      <h3>Weather Videos for "{location}"</h3>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {videos.map((video) => (
          <div key={video.id.videoId}>
            <iframe
              width="300"
              height="180"
              src={`https://www.youtube.com/embed/${video.id.videoId}`}
              title={video.snippet.title}
              allowFullScreen
            ></iframe>
            <p style={{ maxWidth: "300px" }}>{video.snippet.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YouTubeVideos;

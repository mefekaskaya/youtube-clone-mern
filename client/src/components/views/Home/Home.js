import React, { useEffect, useState } from "react";
import { Row, Typography } from "antd";
import axios from "axios";
import RenderCard from '../VideoPage/Sections/RenderCard';

export default function Home() {

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios.get("/api/video/getVideos").then(response => {
      if (response.data.success) {
        setVideos(response.data.videos);
      } else {
        alert("Failed to get videos");
      }
    });
  }, []);

  const { Title } = Typography;

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <Title level={2}>Recommended</Title>
      <hr />
      <Row>
        <RenderCard videos={videos} />
      </Row>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Typography } from "antd";
import RenderCard from '../VideoPage/Sections/RenderCard';

export default function SubscriptionPage() {
  const [videos, setVideos] = useState([]);
  const { Title } = Typography;

  let variable = { userFrom: localStorage.getItem('userId') };

  useEffect(() => {
    axios.post("/api/video/getSubscriptionVideos", variable).then(response => {
      if (response.data.success) {
        setVideos(response.data.videos);
      } else {
        alert("Failed to get videos");
      }
    });
  }, []);


  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <Title level={2}> Subscribed Videos</Title>
      <hr />
      <Row>
        <RenderCard videos={videos} />
      </Row>
    </div>
  );
}

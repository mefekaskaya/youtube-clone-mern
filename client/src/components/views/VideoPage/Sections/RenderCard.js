import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Col, Card } from "antd";
import moment from "moment";
import "../../Home/Home.css";

export default function RenderCard({videos}) {
    const { Meta } = Card;

    return videos &&
    videos.map((video, index) => {
      let minutes = Math.floor(video.duration / 60);
      let seconds = Math.floor(video.duration - minutes * 60);

      return (
        <Col lg={6} md={8} xs={24}>
          <div>
            <div style={{ position: "relative" }}>
              <Link to={`/video/${video._id}`}>
                <img
                  style={{ width: "100%" }}
                  src={`http://localhost:5000/${video.thumbnail}`}
                  alt="thumbnail"
                />
                <div className="duration durationClass">
                  <span>
                    {minutes} : {seconds}
                  </span>
                </div>
              </Link>
            </div>
            <br />
            <Meta
              avatar={<Avatar src={video.writer.image} />}
              title={video.title}
            />
            <span>{video.writer.name}</span>
            <br />
            <span style={{ marginLeft: "3rem" }}>{video.views}</span>-
            <span>{moment(video.createdAt).format("MMM Do YY")}</span>
          </div>
        </Col>
      );
    });

}

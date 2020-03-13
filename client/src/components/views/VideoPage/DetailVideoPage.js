import React,{useEffect, useState} from 'react';
import { List, Avatar, Row, Col } from 'antd';
import axios from 'axios';
import SideVideo from './Sections/SideVideo';
import Subscriber from './Sections/Subscriber';
import Loading from '../../Loading';

export default function DetailVideoPage(props) {
    
    const videoId = props.match.params.videoId;
    const [video,setVideo] = useState([]);

    const videoVariable = {
        videoId : videoId
    }

    useEffect(() => {
        axios.post('/api/video/getVideo',videoVariable)
        .then(response => {
            if(response.data.success){
                setVideo(response.data.video);
            }else{
                alert('Failed to get video');
            }
        })
        

    },[])

    if(video.writer){
          return (
      <Row>
      <Col lg={18} xs={24}>
      <div className="postPage" style={{ width: "100%", padding: "3rem 4em" }}>
        <video
          style={{ width: "100%" }}
          src={`http://localhost:5000/${video.filePath}`}
          controls
        />
        <List.Item actions={[ <Subscriber userTo={video.writer._id} userFrom={localStorage.getItem('userId')} />]}>
          <List.Item.Meta
            avatar={<Avatar src={video.writer && video.writer.image} />}
            title={<a href="https://ant.design">{video.title}</a>}
            description={video.description}
          />
          <div></div>
        </List.Item>
      </div>
      </Col>
      <Col lg={6} xs={24}>
         <SideVideo id={videoId} />
      </Col>
      </Row>
    );
    }
    else{
     return <Loading />
    }
}

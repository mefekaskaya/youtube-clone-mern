import React,{useEffect, useState} from 'react';
import { List, Avatar, Row, Col } from 'antd';
import axios from 'axios';
import SideVideo from './Sections/SideVideo';
import Subscriber from './Sections/Subscriber';
import Loading from '../../Loading';
import Comment from './Sections/Comment';
import LikeDislikes from './Sections/LikeDislikes';

export default function DetailVideoPage(props) {
    
    const videoId = props.match.params.videoId;
    const [video,setVideo] = useState([]);
    const [commentList,setCommentList] = useState([]);

    const videoVariable = {
        videoId : videoId
    }

    useEffect(() => {
      axios.post('/api/video/getVideo', videoVariable)
          .then(response => {
              if (response.data.success) {
                  setVideo(response.data.video)
              } else {
                  alert('Failed to get video Info')
              }
          })

      axios.post('/api/comment/getComments', videoVariable)
          .then(response => {
              if (response.data.success) {
                  setCommentList(response.data.comments)
              } else {
                  alert('Failed to get video Info')
              }
          })
  }, [])

    const updateComment = (newComment) => {
      setCommentList(commentList.concat(newComment))
    }

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
        <List.Item actions={[<LikeDislikes video videoId={videoId} userId={localStorage.getItem('userId')} />,
         <Subscriber userTo={video.writer._id} userFrom={localStorage.getItem('userId')} />
      ]}>
          <List.Item.Meta
            avatar={<Avatar src={video.writer && video.writer.image} />}
            title={<a href="https://ant.design">{video.title}</a>}
            description={video.description}
          />
          <div></div>
        </List.Item>
        <Comment commentList={commentList} postId={videoId} refreshFunction={updateComment} />
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

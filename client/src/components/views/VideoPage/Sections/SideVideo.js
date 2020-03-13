import React,{ useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function SideVideo(props) {

    const [sideVideos,setSideVideos] = useState([]);

    useEffect(() => {
        axios.get("/api/video/getVideos").then(response => {
          if (response.data.success) {
            setSideVideos(response.data.videos);
          } else {
            alert("Failed to get videos");
          }
        });
      }, []);

      const sideVideoItem = sideVideos.filter(item=>{
        return item._id!==props.id;
      }).map((video,index)=>{
        
        let minutes = Math.floor(video.duration / 60);
        let seconds = Math.floor(video.duration - minutes * 60);
        return (
        <div style={{ display:"flex", marginTop:"1rem", padding:"0 2rem" }} key={index}>
             <div style={{ width:"40%", marginRight:"1rem" }}>
                 <Link to={`/video/${video._id}`} style={{ color:'gray' }}>
                 <img style={{ width:'100%' }} src={`http://localhost:5000/${video.thumbnail}`} alt="thumbnail" />
                 </Link>
             </div>
             <div style={{ width:"50%" }}>
                 <Link to="" style={{ color:'gray' }}>
                    <span style={{ fontSize:'1rem',color:'black' }}>{video.title}</span>
                    <br />
                    <span>{video.writer && video.writer.name}</span>
                    <br />
                    <span>{video.views}</span>
                    <br />
                    <span>{minutes} : {seconds}</span>
                    <br />
                 </Link>
             </div>
         </div>)
      })

    return (
        <>
        <div style={{ marginTop:"3rem" }}>
            {sideVideoItem}
        </div>
        </>
        
    )
}

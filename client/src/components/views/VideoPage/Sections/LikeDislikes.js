import React,{useState,useEffect} from 'react';
import { Tooltip,Icon } from 'antd';
import axios from 'axios';

export default function LikeDislikes(props) {

    const [likeLength, setLikeLength] = useState(0);
    const [likeAction, setLikeAction] = useState(null);
    const [dislikeLength, setDislikeLength] = useState(0);
    const [dislikeAction, setDislikeAction] = useState(null);

    let variable={};

    if(props.video){
        variable={videoId:props.videoId,userId:props.userId}
    }else{
        variable={commentId:props.commentId,userId:props.userId}
    }

    const onLike = () => {
        if(likeAction=== null) {

            axios.post('/api/like/increaseLike',variable)
            .then(response=>{
                if(response.data.success){
                    setLikeLength(likeLength+1);
                    setLikeAction('liked');

                    if(dislikeAction!==null){
                        setDislikeAction(null);
                        setDislikeLength(dislikeLength-1);
                    }

                }else{
                    alert('Failed to liked')
                }
            })
        }
        else{
            axios.post('/api/like/decreaseLike',variable)
            .then(response=>{
                if(response.data.success){
                    setLikeLength(likeLength-1);
                    setLikeAction(null);
                }else{
                    alert('Failed to decrease like')
                }
            })
        }
    }

    const onDislike = () => {
        if(dislikeAction !== null) {

            axios.post('/api/like/decreaseDislike',variable)
            .then(response=>{
                if(response.data.success){
                    setDislikeLength(dislikeLength-1);
                    setDislikeAction(null); 
                }else{
                    alert('Failed to disliked')
                }
            })
        }
        else{
            axios.post('/api/like/increaseDislike',variable)
            .then(response=>{
                if(response.data.success){
                    setDislikeLength(dislikeLength+1);
                    setDislikeAction('disliked');
                    
                    if(likeAction!==null){
                    setLikeAction(null);
                    setLikeLength(likeLength-1);
                }
                }else{
                    alert('Failed to decrease dislike')
                }
            })
        }
    }



    useEffect(() => {
        axios.post('/api/like/getLikes',variable)
        .then(response=>{
            if(response.data.success) {
                //How many likes does this video or comment have
                setLikeLength(response.data.likes.length);
                //if I have already clicked this button or not
                response.data.likes.map(like=>{
                    if(like.userId===props.userId) setLikeAction('liked');
                }) 
            }
            else{
                alert('Failed to get likes')
            }
        })

        axios.post('/api/like/getDislikes',variable)
        .then(response=>{
            if(response.data.success) {
                //How many likes does this video or comment have
                setDislikeLength(response.data.dislikes.length);
                //if I have already clicked this button or not
                response.data.dislikes.map(dislike=>{
                    if(dislike.userId===props.userId) setDislikeAction('disliked');
                }) 
            }
            else{
                alert('Failed to get dislikes')
            }
        })
    }, [])

    return (
        <>
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    <Icon type="like"
                    theme={likeAction === 'liked' ? 'filled' : 'outlined'}
                    onClick={onLike} />
                </Tooltip>
                <span style={{paddingLeft:'0.2rem',cursor:'auto'}}>
                    {likeLength}
                </span>
            </span>&nbsp;&nbsp;
            <span key="comment-basic-line">
            <Tooltip title="Dislike">
                <Icon type="dislike"
                theme={dislikeAction === 'liked' ? 'filled' : 'outlined'}
                onClick={onDislike} />
            </Tooltip>
            <span style={{paddingLeft:'0.2rem',cursor:'auto'}}>
                {dislikeLength}
            </span>                
            </span>   
        </>
    )
}

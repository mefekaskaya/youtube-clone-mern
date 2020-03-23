import React,{useState} from 'react';
import { Button, Input } from 'antd';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';
import axios from 'axios';

const {TextArea} = Input;

export default function Comment(props) {

    // const user=useSelector(state=>state.user);
    const userId=localStorage.getItem('userId');
    const [Comment,setComment] = useState("");

    const handleChange = (e) => {
        setComment(e.currentTarget.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const variables={ 
            content:Comment,
            writer: userId,
            postId: props.postId
         }

        axios.post('/api/comment/SaveComment',variables)
        .then(response=>{
            if(response.data.success){
                setComment("");
                props.refreshFunction(response.data.result)
            }else{
                alert('Failed to save Comment')
            }
        })
    }

    return (
        <div>
            <br />
            <p>Replies</p>
            <hr />
            {/*  Comment Lists */}
            {props.commentList && props.commentList.map((comment,index)=>(
                <>
                    <div style={{marginLeft:'1.5rem',width:'80%'}}>
                    <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} />
                    <ReplyComment commentList={props.commentList} postId={props.postId} parentCommentId={comment._id} refreshFunction={props.refreshFunction} />
                    </div>
                </>
                
                
            ))}
            {/*  Root Comment Form */}
            <form style={{display:'flex'}} onSubmit={onSubmit}>
                <TextArea style={{width:'100%',borderRadius:'5px'}} 
                onChange={handleChange} 
                value={Comment} 
                placeholder="write some comments" />
                <br />
                <Button style={{width:'20%',heiight:'2rem'}} onClick={onSubmit}>Submit</Button>
            </form>
        </div>
    )
}

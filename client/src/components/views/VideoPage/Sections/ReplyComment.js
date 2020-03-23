import React,{useState,useEffect} from 'react';
import SingleComment from './SingleComment';

export default function ReplyComment(props) {

    const [childCommentNumber, setChildCommentNumber] = useState(0);
    const [openReplyComments,setOpenReplyComments]=useState(false);

    useEffect(() => {
        setChildCommentNumber(props.commentList.filter(comment=>{
            return comment.responseTo===props.parentCommentId
        }).length)
    }, [props.commentList])

    let renderReplyComment = (parentCommentId) => 
        
            props.commentList && props.commentList.map((comment,index)=>(
            <>
            {comment.responseTo===parentCommentId &&
                <div style={{marginLeft:'1.2rem',width:'80%'}}>
                <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} />
                <ReplyComment commentList={props.commentList} postId={props.postId} parentCommentId={comment._id} refreshFunction={props.refreshFunction} />
                </div>
                }
            </>
            
            
        ))

        const handleChange=()=>{
            setOpenReplyComments(!openReplyComments);
        }
    

    return (
        <div>
            {childCommentNumber>0 && 
            <p style={{fontSize:'1rem',margin:'0',color:'gray', cursor:'pointer'}} onClick={handleChange} >
                View {childCommentNumber} more comment(s)
            </p>
            }

            {openReplyComments && renderReplyComment(props.parentCommentId)}
            
            
        </div>
    )
}

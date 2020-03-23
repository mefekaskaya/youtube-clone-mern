const express = require('express');
const router = express.Router();

const { Like } = require('../models/Like');  
const { Dislike } = require('../models/Dislike');  

router.post("/getLikes", (req, res) => {

    let variable = {};
    if(req.body.videoId){
        variable={videoId:req.body.videoId}
    }
    else{
        variable={commentId:req.body.commentId}
    }

    Like.find(variable).exec((err,likes)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({success:true,likes})
    })
});

router.post("/increaseLike", (req, res) => {

    let variable = {};
    if(req.body.videoId){
        variable={videoId:req.body.videoId, userId:req.body.userId}
    }
    else{
        variable={commentId:req.body.commentId, userId:req.body.userId}
    }

    const like = new Like(variable);

    like.save((err,likeResult) => {
        if(err) return res.json({success:false,err});
        Dislike.findOneAndDelete(variable).exec((err,disLikeResult)=>{
            if(err) return res.status(400).json({success:false,err});
            res.status(200).json({success:true})
        })
    })
});

router.post("/decreaseLike", (req, res) => {

    let variable = {};
    if(req.body.videoId){
        variable={videoId:req.body.videoId, userId:req.body.userId}
    }
    else{
        variable={commentId:req.body.commentId, userId:req.body.userId}
    }

    Like.findOneAndDelete(variable).exec((err,result)=>{
        if(err) return res.status(400).json({success:false,err});
        return res.status(200).json({success:true})
    })
});

router.post("/increaseDislike", (req, res) => {

    let variable = {};
    if(req.body.videoId){
        variable={videoId:req.body.videoId, userId:req.body.userId}
    }
    else{
        variable={commentId:req.body.commentId, userId:req.body.userId}
    }

    const dislike = new Dislike(variable);

    dislike.save((err,dislikeResult) => {
        if(err) return res.json({success:false,err});
        Dislike.findOneAndDelete(variable).exec((err,disLikeResult)=>{
            if(err) return res.status(400).json({success:false,err});
            res.status(200).json({success:true})
        })
    })
});

router.post("/decreaseDislike", (req, res) => {

    let variable = {};
    if(req.body.videoId){
        variable={videoId:req.body.videoId, userId:req.body.userId}
    }
    else{
        variable={commentId:req.body.commentId, userId:req.body.userId}
    }

    Like.findOneAndDelete(variable).exec((err,likeResult)=>{
        if(err) return res.status(400).json({success:false,err});
        return res.status(200).json({success:true})
    })
});

router.post("/getDislikes", (req, res) => {

    let variable = {};
    if(req.body.videoId){
        variable={videoId:req.body.videoId, userId:req.body.userId}
    }
    else{
        variable={commentId:req.body.commentId, userId:req.body.userId}
    }

    Dislike.find(variable).exec((err,dislikes)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({success:true,dislikes})
    })
});

module.exports = router;

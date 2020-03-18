import React,{useEffect,useState} from 'react';
import axios from 'axios';
import './Sections.css';

export default function Subscriber(props) {

    const {userTo,userFrom}=props;
    const [subscribeNumber,setSubscribeNumber]=useState(0);
    const [subscribed,setSubscribed]=useState(false);
    
    
    useEffect(() => {
        const subscribeNumberVariables={userTo:userTo,userFrom:userFrom}
        axios.post('/api/subscribe/subscribeNumber',subscribeNumberVariables)
        .then(response=>{
            if(response.data.success){
              setSubscribeNumber(response.data.subscribeNumber)
            }
            else{
                alert('Failed to get Subscriber Number')
            }
        })

        axios.post('/api/subscribe/subscribed',subscribeNumberVariables)
        .then(response=>{
            if(response.data.success){
                setSubscribed(response.data.subscribed);
            }else{
                alert('Failed to get Subscribed Information')
            }
        })
    }, [])

    const onSubscribe = () => {

        let subscribeVariables = {
            userTo : userTo,
            userFrom : userFrom
    }
    
        if(subscribed){
            axios.post('/api/subscribe/unsubscribe',subscribeVariables)
            .then(response=>{
                if(response.data.success){
                    setSubscribeNumber(subscribeNumber-1);
                    setSubscribed(!subscribed);
                }else{
                    alert('Failed to subscribe')
                }
            })
        }else{
        axios.post('/api/subscribe/subscribe',subscribeVariables)
        .then(response=>{
            if(response.data.success){
                setSubscribeNumber(subscribeNumber+1);
                setSubscribed(!subscribed);
            }else{
                alert('Failed to subscribe')
            }
        })
        }
    }

    return (
        <div>
            <button onClick={onSubscribe} className="SubscribeButton" style={{backgroundColor:`${subscribed ? '#AAA' : '#C00'}`}}>
                {subscribeNumber} {subscribed ? 'Subscribed' : "Subscribe"}
            </button>
        </div>
    )
}

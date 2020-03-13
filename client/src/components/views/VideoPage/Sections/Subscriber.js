import React, { useEffect, useState } from 'react';
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
                setSubscribed(response.data.subscribeNumber)
            }
            else{
                alert('Failed to get Subscriber Number')
            }
        })

        axios.post('/api/subscribe/subscribed',subscribeNumberVariables)
        .then(response=>{
            if(response.data.success){
                setSubscribeNumber(response.data.subscribeNumber)
            }else{
                alert('Failed to get Subscribed Information')
            }
        })
    }, [])

    return (
        <div>
            <button className="SubscribeButton" style={{backgroundColor:`${subscribed ? '#AAA' : '#C00'}`}}>
                {subscribeNumber} {subscribed ? 'Subscribed' : "Subscribe"}
            </button>
        </div>
    )
}

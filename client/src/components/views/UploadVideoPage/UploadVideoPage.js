import React, { useState,useEffect } from 'react';
import { Typography, Button, Form, Input, Icon } from 'antd';
import Dropzone from 'react-dropzone';
import axios from 'axios';

export default function UploadVideo() {
    
    const { Title } = Typography;
    const { TextArea } = Input;

    const Private = [
        {value:0,label:'Private'},
        {value:1,label:'Public'},
    ]

    const Category = [
        {value:0,label:'Film & Animation'},
        {value:1,label:'Autos & Vehicles'},
        {value:2,label:'Music'},
        {value:3,label:'Pets & Animals'},
        {value:4,label:'Sports'}
    ]

    const [title,setTitle] = useState("");
    const [description,setDescription]=useState("");
    const [privacy,setPrivacy]=useState(0);
    const [category,setCategory]=useState("Film & Animation");
    const [filePath,setFilePath]=useState("");

    const handleChangeTitle = event => {
        setTitle(event.currentTarget.value);
    };

    const handleChangeDescription = event => {
        setDescription(event.currentTarget.value);
    };

    const handleChangeOne = event => {
        setPrivacy(event.currentTarget.value);
    };

    const handleChangeTwo = event => {
        setCategory(event.currentTarget.value);
    };

    const onDrop = (files) => {
        let formData = new FormData();
        const config = {
            header:{'content-type':'multipart/form-data'}
        }
        formData.append("file",files[0]);

        axios.post('/api/video/uploadfiles',formData,config)
        .then(response=>{
            if(response.data.success){
                console.log(response.data);
                let variable = {
                    filePath : response.data.filePath,
                    fileName : response.data.fileName
                }
                setFilePath(response.data.filePath)
            }else{
                alert('failed to  save the video')
            }
        })
    }

    const onSubmit = () => {

    }

    return (
      <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <Title level={2}>Upload Video</Title>
        </div>
        <Form onSubmit={onSubmit}>
            <div style={{ display:"flex",justifyContent:"space-between" }}>
                <Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
                    {({ getRootProps,getInputProps }) => (
                        <div style={{ width:'300px',height:'240px',border:'1px solid lightgray',display:'flex',alignItems:'center',justifyContent:'center' }}
                        {...getRootProps()}>
                            <input {...getInputProps()} />
                            <Icon type="plus" style={{ fontSize:"3rem" }} />
                        </div>
                    )}
                </Dropzone>
                {/* {
                thumbnail !== "" && 
                <div>
                    <img src={`http://localhost:5000/${thumbnail}` alt={thumbnail}} />   
                </div>
                } */}
            </div>
            <br /><br />
            <label>Title</label>
            <Input onChange={handleChangeTitle} value={title} />
            <br /><br />
            <label>description</label>
            <TextArea onChange={handleChangeDescription} value={description} />
            <br /><br />
            <select onChange={handleChangeOne}>
                {
                    Private.map((item,index)=>(
                        <option key={index} value={item.value}>{item.label}</option>
    ))
                }
            </select>
            <br /><br />
            <select onChange={handleChangeTwo}>
                {
                    Category.map((item,index)=>(
                        <option key={index} value={item.value}>{item.label}</option>
    ))
                }
            </select>
            <Button type="primary" size="large" onClick={onSubmit}>
                Submit
            </Button>
        </Form>
      </div>
    );
}

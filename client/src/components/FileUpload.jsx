import React from 'react'
import { useState } from 'react';
import axios from "axios";
import "./FileUpload.css";

const FileUpload = ({account, provider, contract}) => {
  const [file,setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");

  const handleSubmit = async(e)=> {
    e.preventDefault();
    if(file){
      try {
        const formData = new FormData() ;
        formData.append("file", file)

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers : {
            pinata_api_key: `a1db87761a17295af9a3`,
            pinata_secret_api_key : `5e0d82959b60f36eb7e5af4cf76d4751a2e798fef7c6fa1cc57d4cf88e67ed1e`,
            "Content-Type" : "multipart/form-data",
          },
        });

        const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
        //const signer = contract.connect(provider.getSigner());
        contract.add(account, ImgHash);
        alert("Successfully image Uploaded. ");
        setFileName("No image selected");
        setFile(null);
      } catch (error) {
        alert("Unable to upload to Pinata.");
      }
    }

  };
  const retrieveFile=(e)=> {
    const data = e.target.files[0];
    //console.log(data);
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    }
    setFileName(e.target.files[0].name);
    e.preventDefault();
    
  };
  return (
    <div className='top'>
      <form className='form'
      onSubmit={handleSubmit} >
        <label htmlFor="file-upload" className='choose'>
          Choose Image
        </label>

        <input 
          disabled={!account} 
          type="file" 
          id='file-upload'
          name='data' 
          onChange={retrieveFile} />

        <span className='textArea'>Image: {fileName}</span>

        <button type='submit' className='upload' disabled={!file}>
          Upload file
        </button>
      </form>
    </div>
  )
}

export default FileUpload

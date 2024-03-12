import { useEffect, useState } from "react";
import {CopyToClipboard} from "react-copy-to-clipboard"
import axios from "axios";


const LinkResult = ({inputValue}) => {

    const [shortenLink , setShortenLink]= useState("");
    const [copied, setCopied]=useState(false);
    const [loading, setLoading]=useState(false);
    const [error, setError]=useState(false);

const fetchData= async()=>{
    try {
        setLoading(true);
       
        const url = process.env.REACT_APP_API_URL;
        const bearerToken=process.env.REACT_APP_API_TOKEN;
        const data={
            "url":`${inputValue}`,
        };
        const headers={
            Authorization:`Bearer ${bearerToken}`,
            'Content-Type':'application/json'
        };
    const response=await axios.post(url,data,{headers});
    setShortenLink(response.data.data.tiny_url);
  } catch(err){
        setError(err);
    }finally{
        setLoading(false);
    }
}


    //run every timee input value change
    useEffect(()=>{
        if(inputValue.length){
            fetchData();
        }
    },[inputValue]);


    useEffect(()=>{
        const timer = setTimeout(()=>{
            setCopied(false);
        },1000);
        
        return ()=> clearTimeout(timer);
    },[copied])
  
    if(loading){
        return <p className="noData">Loading...</p>
    }
    if(error){
        return <p className="noData">Something went wrong</p>
    }
    return (
       <>
       {shortenLink && ( <div className="result">
        <p>{shortenLink}</p>

        <CopyToClipboard 
            text={shortenLink}
            onCopy={()=>{
                setCopied(true)
        }}>

        <button className={copied? "copied":""} >Copy to Clipboard</button>
        </CopyToClipboard>
        
        </div>)}
       </>
  )
}

export default LinkResult

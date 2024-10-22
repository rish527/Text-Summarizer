import { useState, useEffect } from 'react';
import React from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import '../index.css'


export default function TextSummarizer(){
  const [value, setValue] = useState(null);
  const [data, setData] = useState([null]);
  const [submitting, setSubmitting] = useState(false);

  const key = import.meta.env.VITE_API_KEY;
  const genAI = new GoogleGenerativeAI(key);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  async function handleSubmit(){
    setSubmitting(true);
    try {
      const prompt = value+' summarise this text';
      const result = await model.generateContent(prompt);
      setData(result.response.text()); 
      console.log(result.response.text());
    } catch (error) {
      console.error("Error generating content:", error);
      setData("An error occurred while generating content."); 
    } finally {
      setSubmitting(false); 
      console.log("Submitted");
    }
    
  }

  return (
    

    <div className="summarizer flex justify-center items-center flex-col">
        
      <h2 className='p-3 font-normal text-xl'>Enter the Text</h2>
      <textarea value={value} name="inputText" id="inputText" onChange={(e)=>setValue(e.target.value)}  cols={40} rows={5} className='border-2 rounded-2xl p-2 '></textarea><br />
      {value?.length>0 && (submitting?( <p>Please Wait...</p> ):( <button onClick={handleSubmit}>Submit</button> ))}

      {data?.length>0 ?(<p>{data}</p>):""}
    </div>
  );

}
import React from "react";

import './App.css';
import TextSummarizer from "./Components/TextSummarizer";

import './index.css'

export default function App(){
  return(
    <div className="flex justify-center items-center h-screen bg-gray-100">
            <TextSummarizer />
    </div>
  )
}
import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

export default () => {
    const goToMain = useNavigate()
    return <div className="my-logo" onClick={e =>{
        goToMain("/");
    }}/>
}
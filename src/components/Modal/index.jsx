import React, { useContext, useState } from "react";
import Context from "../../Context";
import "./style.css";
import { XCircleFill } from "react-bootstrap-icons";


export default () => {
    const {api, setToken, showModal, setShowModal, setUserId, setUserToken, setUserName} = useContext(Context);
    const [email, setEmail] = useState("");
    const [psw, setPsw] = useState("");
    const [group, setGroup] =useState("group-7");
    const [flagSignUp , setFlagSignUp] = useState(false);
    
    const getToken = e => {
        e.preventDefault();
        api.getSignIn({"email": email, "password": psw})
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.data._id === "636a510659b98b038f779cfa"){
                    localStorage.setItem("token-admin", data.token);
                    setToken(localStorage.getItem("token-admin"))  
                    localStorage.setItem("id-admin", data.data._id);
                    setUserId(localStorage.getItem("id-admin"))
                    setShowModal(false);
                    localStorage.setItem("user-name", "admin");
                    setUserName(localStorage.getItem("user-name"))
                    window.location.reload();
                }else{
                    localStorage.setItem("token-user", data.token);
                    setUserToken(localStorage.getItem("token-user"))  
                    localStorage.setItem("id-user", data.data._id);
                    setUserId(localStorage.getItem("id-user"))
                    setShowModal(false);
                    localStorage.setItem("user-name", data.data.name);
                    setUserName(localStorage.getItem("user-name"))
                    window.location.reload();
                }
                 
            })
    }

    const getSignUp = e => {
        e.preventDefault();
        api.getSignUp({"email": email, "group": group, "password": psw})
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
    }
    const goToSignUp = e => {
        e.preventDefault();
        setFlagSignUp(true);
    }
    const goToSignIn = e => {
        e.preventDefault();
        setFlagSignUp(false);
    }

    const stBtnWidth = {
        width: "90%"
    }
    const stButtonSignUp = {
        width: "260px",
        pading: "20px",
        borderRadius: "20px"
    }

    return <div className={showModal ? "contain-popup active" : "contain-popup"}>
        {!flagSignUp ? <div className="popup">
            <XCircleFill 
            className="close-popup" 
            onClick={e =>{
                e.preventDefault();
                setShowModal(false);
            }}/>
            
            <form  className="form-contain-login">
                <div className="column-direction">
                    <label htmlFor="email" className="label-form-login">Электроная почта</label>
                    <input id="email" 
                    type="email" 
                    className="input-form-login"
                    value={email}
                    onChange={e => {
                        setEmail(e.target.value);
                    }}
                    />
                </div>
                <div className="column-direction">
                    <label htmlFor="password" className="label-form-login ">Пароль</label>
                    <input id="password" 
                    type="password" 
                    className="input-form-login"
                    value={psw}
                    onChange={e => {
                        setPsw(e.target.value);
                    }}
                    />
                </div>
                <button className="my_btn" style={stBtnWidth} type="submit" onClick={getToken}>Войти</button>
            </form>
            <button className="my-4 mx-3" style={stButtonSignUp} type="submit" onClick={goToSignUp}>Зарегистрироваться</button>
        </div>
        :
        <div className="popup">
            <XCircleFill 
            className="close-popup" 
            onClick={e =>{
                e.preventDefault();
                setShowModal(false);
            }}/>
            
            <form  className="form-contain-login">
                <div className="column-direction">
                    <label htmlFor="email" className="label-form-login">Электроная почта</label>
                    <input id="email" 
                    type="email" 
                    className="input-form-login"
                    value={email}
                    onChange={e => {
                        setEmail(e.target.value);
                    }}
                    />
                </div>
                <div className="column-direction">
                    <label htmlFor="group" className="label-form-login">Группа</label>
                    <input id="group" 
                    type="text" 
                    className="input-form-login"
                    value={group}
                    onChange={e => {
                        setGroup(e.target.value);
                    }}
                    />
                </div>
                <div className="column-direction">
                    <label htmlFor="password" className="label-form-login ">Пароль</label>
                    <input id="password" 
                    type="password" 
                    className="input-form-login"
                    value={psw}
                    onChange={e => {
                        setPsw(e.target.value);
                    }}
                    />
                </div>
                <button className="my_btn" style={stBtnWidth} type="submit" onClick={getSignUp}>Зарегистрироваться</button>
            </form>
            <button className="my-4 mx-3" style={stButtonSignUp} type="submit" onClick={goToSignIn}>Войти</button>
        </div>
        }
    </div>
}
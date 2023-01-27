import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../../Context";
import {BoxArrowInRight, BoxArrowLeft, PersonCheck, Search} from "react-bootstrap-icons"
import "./style.css";
import addBlog from "./img/add_blog.png"
import editBlog from "./img/edit_icon.png"
import Logo from "../Logo";

export default () => {
    const {token, setToken, userToken, setUserToken, setShowModal, searchText, setSearchText, recipes, setSearch, userName} = useContext(Context);
    const navigateToAddRecipe = useNavigate();
    const navigateToMain = useNavigate();
    const navigateToRecipies = useNavigate();
    const navigateToEditRecipe = useNavigate();
    const navigateToRecommendation = useNavigate();
    const navigateToServing = useNavigate();
    

    const getModal = () => {
        setShowModal(true);  
    }

    const getOut = () => {
        if(token){
            localStorage.removeItem("token-admin");
            localStorage.removeItem("id-admin");
            localStorage.removeItem("user-name");
        }else if(userToken){
            localStorage.removeItem("token-user");
            localStorage.removeItem("id-user");
            localStorage.removeItem("user-name");
        }
        window.location.reload()
    }
    const addRecipe = () => {
        navigateToAddRecipe("/addRecipe")
    }
    const editRecipe = () => {
        navigateToEditRecipe("/editRecipe")
    }
    const handler1 = e => {
        e.preventDefault();
        e.stopPropagation();
        navigateToRecipies("/recipes");
    }
    const handler2 = e =>{
        e.preventDefault();
        e.stopPropagation();
        if(recipes){
            let recipeFinde = recipes.filter(recipe => recipe.title.toLowerCase().search(searchText.toLowerCase()) !== -1)
            setSearch(recipeFinde);
        }
    }
    console.log(userName);
    return <header>
        <div className="container-header">
            <Logo/>
            <div className="menu">
                <div className="menu-button" onClick={() => {
                    navigateToMain("/")
                }}>Главная</div>
                <div className="menu-button" onClick={() =>{
                    navigateToRecipies("/recipes")
                }}>Рецепты</div>
                <div className="menu-button" onClick={() =>{
                    navigateToRecommendation("/recommendation")
                }}>Советы</div>
                <div className="menu-button" onClick={() =>{
                    navigateToRecommendation("/serving")
                }}>Сервировка</div>
            </div>
            <div className="search-content">
                <div className="row-direction">
                    <input className="search-input" type="text" value={searchText} onChange={e => setSearchText(e.target.value)}/>
                    <button id="search"  onMouseDown={handler1} onMouseUp={handler2}><Search/></button>
                </div>
            </div>
            <div className="user-menu row-direction">
            {(token || userToken) && <div className="name-user" 
                style={{color: "var(--main-color)"}}><PersonCheck style={{fontSize: "20px"}}/>{userName}
                </div>}
                {((!token && userToken) && (token && !userToken) || (!token && !userToken)) && <BoxArrowInRight className="user-login" onClick={getModal}/>}
                {token && <img className="edit-blog-icon" src={editBlog} onClick={editRecipe}/>}
                {token && <img className="add-blog-icon" src={addBlog} onClick={addRecipe}/>}
                {(token || userToken) && <BoxArrowLeft className="user-logout" onClick={getOut}/>}
                
            </div>
        </div>
    </header>
}
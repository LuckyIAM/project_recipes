import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../../Context";
import { Container, Form, Button } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import {BoxArrowInRight, BoxArrowLeft, PersonCheck, Search} from "react-bootstrap-icons"
import "./style.css";
import addBlog from "./img/add_blog.png"
import editBlog from "./img/edit_icon.png"
import Logo from "../Logo";
import logo2 from "../../assets/logo2.png"

export default () => {
    const {token, userToken, setShowModal, searchText, setSearchText, recipes, setSearch, userName, widthScreen} = useContext(Context);
    const navigateToAddRecipe = useNavigate();
    const navigateToMain = useNavigate();
    const navigateToRecipies = useNavigate();
    const navigateToEditRecipe = useNavigate();
    const navigateToRecommendation = useNavigate();
    
    

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
        // window.location.reload()
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
    const stImg = {
        width: "80px",
        height: "80px"
    }
    
    console.log(userName);
    return <header>
        {widthScreen >= 3 ?<div className="container-header">
            <Logo/>
            <div className="menu">
                <div className="menu-button" onClick={() => {
                    navigateToMain("/project_recipes/")
                }}>Главная</div>
                <div className="menu-button" onClick={() =>{
                    navigateToRecipies("./recipes")
                }}>Рецепты</div>
                <div className="menu-button" onClick={() =>{
                    navigateToRecommendation("./recommendation")
                }}>Советы</div>
                <div className="menu-button" onClick={() =>{
                    navigateToRecommendation("./serving")
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
        :
        <Navbar className="bg_color"  expand="lg">
        <Container fluid>
            <Navbar.Brand href="/project_recipes/"><img src={logo2} style={stImg}/></Navbar.Brand>
            <Navbar>{(token || userToken) && <div className="name-user" 
                style={{color: "#000", fontSize: "11px"}}><PersonCheck style={{fontSize: "20px"}}/>{userName}
                </div>}</Navbar>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
            <Nav
                className="dark_my my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
            >
                <Nav.Link href="/project_recipes/">Главная</Nav.Link>
                <Nav.Link href="/recipes">Рецепты</Nav.Link>
                <Nav.Link href="/recommendation">Советы</Nav.Link>
                <Nav.Link href="/serving">Сервировка</Nav.Link>
                <Nav.Link>{((!token && userToken) && (token && !userToken) || (!token && !userToken)) && <div onClick={getModal}>Войти</div>}</Nav.Link>
                <Nav.Link>{(token || userToken) && <div onClick={getOut}>Выйти</div>}</Nav.Link>
                <Nav.Link>{token && <div onClick={editRecipe}>Редактировать</div>}</Nav.Link>
                <Nav.Link>{token && <div onClick={addRecipe}>Добавить</div>}</Nav.Link>
                
            
            </Nav>
            <Form className="d-flex">
            <Form.Control
                // style={{borderColor: "#000", transition: "border-color .15s ease-in-out, box-shadow .15s ease-in-out;"}}
                value={searchText} 
                onChange={e => setSearchText(e.target.value)}
                placeholder="Пойск"
                className="dark_my"
                aria-label="dark"
            />
            <Button variant="outline-success" onMouseDown={handler1} onMouseUp={handler2}>Найти</Button>
            </Form>
        </Navbar.Collapse>
    </Container>
</Navbar>}
    </header>
}
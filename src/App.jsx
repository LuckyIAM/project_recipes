import React, { useState, useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import Context from "./Context";
import Api from "./Api"
import Modal from "./components/Modal";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AddRecipe from "./pages/AddRecipe";
import Main from "./pages/Main";
import Recipes from "./pages/Recipes";
import RecipePage from "./pages/RecipePage";
import EditRecipe from "./pages/EditRecipe";
import AddComment from "./pages/AddComment";
import Serving from "./pages/Serving"
import Recommendations from "./pages/Recommendations";

export default () => {
    const [defaultToken, setDefaultToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRmOTJkYmFmMjA3YTRlZGJmYmQzNDMiLCJncm91cCI6Imdyb3VwLTciLCJpYXQiOjE2OTk3MTM5ODAsImV4cCI6MTczMTI0OTk4MH0.nLhpIJLDCPhsu1SWR2YMEzLJl52ZScDqwSpKPuaBTzw")
    const [token, setToken] = useState(localStorage.getItem("token-admin") || "")
    const [userToken, setUserToken] = useState(localStorage.getItem("token-user") || "");
    const [apiUser, setapiUser] = useState( new Api(userToken))
    const [apiDefault, setApiDefault] =useState(new Api(defaultToken))
    const [api, setApi] = useState(new Api(token))
    const [showModal, setShowModal] = useState(false);
    const [recipes, setRecipes] = useState(JSON.parse(localStorage.getItem("all-data")) ||[]);
    const chapterDishesText = ["Закуски", "Салаты", "Супы", "Вторые блюда", "Выпечка", "Десерты", "Напитки", "Соусы", "Заготовки"];
    const secondMealText = ["Мясные вторые блюда", "Рыбные вторые блюда", "Овощные вторые блюда"]; 
    const bakeryText =["Торты/кексы/печенье", "Блины/оладье", "Хлеб/булочки"];
    const months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"]
    const [dataRecipe, setDataRecipe] = useState(JSON.parse(localStorage.getItem("recipe")) ? JSON.parse(localStorage.getItem("recipe")) : []);
    const [idRecipe, setIdRecipe] = useState(localStorage.getItem("id-recipe") || "");
    const [userId, setUserId] = useState(localStorage.getItem("id-admin") || "");
    const [favourite, setFavourite] = useState([]);
    const [flagLike, setFlagLike] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [search, setSearch] = useState([]);
    const [recentRecipe, setRecentRecipe] = useState(localStorage.getItem("recent-recipe") ? JSON.parse(localStorage.getItem("recent-recipe")) : []);
    const [titleChapter, setTitleChapter] = useState("");
    const [dataStep, setDataStep] = useState("");
    const [flagActiv, setFlagActiv] = useState(false);
    const [userName, setUserName] = useState(localStorage.getItem("user-name") || "");
    const [serving, setServing] = useState([])
    const [widthScreen, setWidthScreen] = useState();
    
    useEffect(()=>{
        if (innerWidth < 780){
            setWidthScreen(1);
        }else if (innerWidth >= 780 && innerWidth < 1100){
            setWidthScreen(2);
        }else if (innerWidth >= 1100 && innerWidth < 1400){
            setWidthScreen(3);
        }else if (innerWidth >= 1100){
            setWidthScreen(4);
        }
    }, []) 

    useEffect(()=>{
        if(token){
            api.getBlogs()
                .then(res => res.json())
                .then(data => {
                    let result = data.filter(r => {
                            if(new Date(r.created_at).getFullYear() >= 2023 && 
                            new Date(r.created_at).getDate() >= 11 && 
                            new Date(r.created_at).getMonth() >= 0 && r.author._id === "636a510659b98b038f779cfa"){
                                return r
                            }
                        })
                    localStorage.setItem("all-data", JSON.stringify(result));
                    setRecipes(JSON.parse(localStorage.getItem("all-data")));
                })
        }else if(userToken){
            apiUser.getBlogs()
                .then(res => res.json())
                .then(data => {
                    let result = data.filter(r => {
                        if(new Date(r.created_at).getFullYear() >= 2023 && 
                        new Date(r.created_at).getDate() >= 11 && 
                        new Date(r.created_at).getMonth() >= 0 && r.author._id === "636a510659b98b038f779cfa"){
                            return r
                        }
                    })
                localStorage.setItem("all-data", JSON.stringify(result));
                setRecipes(JSON.parse(localStorage.getItem("all-data")));
            })
        }else{
            apiDefault.getBlogs()
                .then(res => res.json())
                .then(data => {
                    let result = data.filter(r => {
                        if(new Date(r.created_at).getFullYear() >= 2023 && 
                        new Date(r.created_at).getDate() >= 11 && 
                        new Date(r.created_at).getMonth() >= 0 && r.author._id === "636a510659b98b038f779cfa"){
                            return r
                        }
                    })
                localStorage.setItem("all-data", JSON.stringify(result));
                setRecipes(JSON.parse(localStorage.getItem("all-data")));
            })
        }
        
    },[token, defaultToken, userToken]) 
    useEffect(() => {
        if(recipes){
            let result = recipes.filter(el => 
                el.tags[el.tags.length - 2] !== "Советы" &&  
                el.tags[el.tags.length - 2] !== "Сервировка/Салфетки" &&
                el.tags[el.tags.length - 2] !== "Сервировка/Сладкое меню" && 
                el.tags[el.tags.length - 2] !== "Сервировка/Напитки" &&
                el.tags[el.tags.length - 2] !== "Сервировка/Вазы" &&
                el.tags[el.tags.length - 2] !== "Сервировка/Скатерти" &&
                el.tags[el.tags.length - 2] !== "Сервировка/Именные таблички и меню" )
            if(result.length - 4 <=0 ){
                setRecentRecipe(result)
                localStorage.setItem("recent-recipe", JSON.stringify(result))
            }else if(result.length - 4 > 0){
                setRecentRecipe(() => {
                    localStorage.setItem("recent-recipe", JSON.stringify(result.slice((result.length - 4), (result.length))))
                    return [...result.slice((result.length - 4), (result.length))]
                    
                })
            }
            let res = recipes.filter(el => {
                if(el.tags[el.tags.length - 2] === "Сервировка/Салфетки" ||
                el.tags[el.tags.length - 2] === "Сервировка/Сладкое меню" ||
                el.tags[el.tags.length - 2] === "Сервировка/Напитки" ||
                el.tags[el.tags.length - 2] === "Сервировка/Вазы" ||
                el.tags[el.tags.length - 2] === "Сервировка/Скатерти" ||
                el.tags[el.tags.length - 2] === "Сервировка/Именные таблички и меню"){
                    return el
                }
            });
            setServing(res);
        }
    },[recipes])

   
    return <Context.Provider value={{
        showModal: showModal,
        setShowModal: setShowModal,
        api: api,
        token: token,
        setToken: setToken,
        defaultToken: defaultToken,
        chapterDishesText: chapterDishesText,
        recipes: recipes,
        setRecipes: setRecipes,
        months: months,
        dataRecipe: dataRecipe, 
        setDataRecipe: setDataRecipe,
        idRecipe: idRecipe,
        setIdRecipe: setIdRecipe,
        secondMealText: secondMealText,
        bakeryText: bakeryText,
        userId: userId,
        setUserId: setUserId,
        favourite: favourite, 
        setFavourite: setFavourite,
        flagLike: flagLike,
        setFlagLike: setFlagLike,
        searchText: searchText, 
        setSearchText: setSearchText,
        search: search, 
        setSearch: setSearch,
        recentRecipe: recentRecipe, 
        setRecentRecipe: setRecentRecipe,
        titleChapter: titleChapter, 
        setTitleChapter: setTitleChapter,
        dataStep: dataStep, 
        setDataStep: setDataStep,
        flagActiv: flagActiv, 
        setFlagActiv: setFlagActiv,
        apiDefault: apiDefault, 
        userToken: userToken, 
        setUserToken: setUserToken,
        apiUser: apiUser, 
        userName: userName, 
        setUserName: setUserName,
        serving: serving, 
        setServing: setServing,
        widthScreen: widthScreen, 
        setWidthScreen: setWidthScreen

    }}>
        <Modal/>
        <Header/>
        <Routes>
            <Route path="/project_recipes/" element={<Main/>}/>
            <Route path="/addRecipe" element={<AddRecipe/>}/>
            <Route path="/editRecipe" element={<EditRecipe/>}/>
            <Route path="/recipes" element={<Recipes/>}/>
            <Route path="/recipe/:id" element={<RecipePage/>}/>
            <Route path="/recommendation" element={<Recommendations/>}/>
            <Route path="/addcomment" element={<AddComment/>}/>
            <Route path="/serving" element={<Serving/>}/>
        </Routes>
        <Footer/>
    </Context.Provider>
}

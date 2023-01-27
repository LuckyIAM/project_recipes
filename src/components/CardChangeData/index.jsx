import React, { useContext, useState, useEffect } from "react";
import Context from "../../Context";
import { Container, Row, Col } from "react-bootstrap";


export default ({id, number, setRecipe, value, propertiesObj, tagMain, tagInput, buttons, index}) => {
    const {api, dataRecipe} = useContext(Context);
    const [editFlag, setEditFlag] = useState(false);
    const [content, setContent] = useState(value);
    const [valueTags, setValueTags] = useState(value);

    useEffect(() => {
        setValueTags(value)
    }, [])

    const editRecipe = e => {
        e.preventDefault()
        let body = {};
        console.log(body);
        body[propertiesObj] = content;
        api.editRecipe(id, body)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setRecipe(JSON.parse(localStorage.getItem("recipe")));
                setContent(data[propertiesObj])
                setEditFlag(false);
            })
    }
    const cancelEdit = e => {
        e.preventDefault();
        setContent(value);
        setEditFlag(false);
    }

    const stHeightTextarea ={
        height: "200px"
    }
    const addItems = e => {
        e.preventDefault();
        if(dataRecipe){
            let tags = dataRecipe.tags.map((el, i) => {
                if(i === index){
                    console.log(i === index);
                    return valueTags
                }else{
                    console.log(i === index);
                    return el
                }
            })
            console.log("tags", tags);
            
            api.editRecipe(id, {"tags": tags})
            .then(res => res.json())
            .then(data => {
                console.log(data);
                localStorage.setItem("recipe", JSON.stringify(data));
                setRecipe(JSON.parse(localStorage.getItem("recipe")));
                setValueTags(JSON.parse(localStorage.getItem("recipe")).tags[index]);
                setEditFlag(false);
                window.location.reload()
            })
        }
    }
    const delStep = e => {
        e.preventDefault();
        if(dataRecipe){
            if(dataRecipe.tags.length - 2 > index){
            let tags = dataRecipe.tags
            tags.splice(index, 1)
            console.log(index, valueTags, tags);
            api.editRecipe(id, {"tags": tags})
            .then(res => res.json())
            .then(data => {
                console.log(data);
                localStorage.setItem("recipe", JSON.stringify(data));
                setRecipe(JSON.parse(localStorage.getItem("recipe")));
                setValueTags(JSON.parse(localStorage.getItem("recipe")).tags[index]);
                setEditFlag(false);
                window.location.reload()
            })
            }
        }
    }

    return<> <div className="card-edit-recipe">
        {editFlag ? 
        <>
         <Container>
                <Row>
                    <Col className="mb-5" xs={12} md={12}>
                    {tagInput === "input" &&  <input className="input_recipe m-2"  value={content} onChange={e => setContent(e.target.value)}/>} 
                    {tagInput === "textarea" && buttons === "0" &&  <textarea className="textarea_recipe w-50 h-100 m-2" style={stHeightTextarea} value={content} onChange={e => setContent(e.target.value)}/>}
                    {tagInput === "textarea" && buttons === "step" && <div className="step-number fw-bolder fs-20"> {number}
                        <textarea className="textarea_recipe w-50 m-2" style={stHeightTextarea} value={valueTags} onChange={e => setValueTags(e.target.value)}/>
                    </div>}
                    {buttons === "0" && <div className="buttons-container">
                        <button className="my_btn mx-2 " 
                        onClick={editRecipe}>Изменить Данные Рецепта</button>
                        <button className="my_btn mx-2" 
                        onClick={cancelEdit}>Отменить изменение</button>
                    </div>}
                    
                    
                    {buttons === "step" && <div className="buttons-container1">
                    <button className="my_btn mx-2" 
                        onClick={addItems}>Изменить Данные Этапа</button>
                        <button className="my_btn mx-2" 
                        onClick={cancelEdit}>Отменить изменение</button>
                        <button className="my_btn mx-2" 
                        onClick={delStep}>Удалить Этап</button>
                    </div>}
                    </Col>
                </Row>
        </Container>
        </>
        :
        <>
        <Container>
                <Row>
                    <Col xs={12} md={12}>
                    {tagMain === "h1" && <h1>{content}</h1>}
                    {tagMain === "div" && <div>{content}</div>}
                    {tagMain === "img" &&  <img src={content} width={300}/>}
                    <div className="button-container m-2">
                        <button className="my_btn" onClick={e=> {
                        e.preventDefault(); 
                            setEditFlag(true)
                        }}>Изменить свойство</button>
                    </div>
                    </Col>
                </Row>
        </Container>
        
        </>
        }
    </div>
    </>
}
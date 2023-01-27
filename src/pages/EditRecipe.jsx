import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom"; 
import Context from "../Context";
import { Container, Row, Col } from "react-bootstrap";
import { PlusCircle } from "react-bootstrap-icons";
import WarningNotToken from "../components/WarningNotToken";
import CardChangeData from "../components/CardChangeData";
import InputCard from "../components/InputCard";

export default () => {
    const {token, setDataRecipe, dataRecipe, flagActiv, setFlagActiv } = useContext(Context);
    const [id, setId] = useState(localStorage.getItem("id-recipe") || "")
    const param=useParams();
    

    const addMoreStep = e => {
        e.preventDefault();
        setFlagActiv(true);
    }
    

    return <>{token ? <div className="container-edit-recipe" >
            <Container>
                <Row>
                    <Col className="m-2" xs={12} md={12}>
                        <div className="title-recipe fw-bolder fs-3 text-danger">Изменить Название Рецепта</div>
                        {dataRecipe.title && <CardChangeData value={dataRecipe.title} id={id} setRecipe={setDataRecipe} propertiesObj="title" tagMain="h1" tagInput="input" buttons="0"/>}
                    </Col>
                    <Col className="m-2" xs={12} md={12}>
                        <div className="mini-description fw-bolder fs-3 text-danger">Изменить Описание</div>
                        {dataRecipe.text && <CardChangeData value={dataRecipe.text} id={id} setRecipe={setDataRecipe} propertiesObj="text" tagMain="div" tagInput="textarea" buttons="0"/>}
                    </Col>
                    <Col className="m-2" xs={12} md={12}>
                        <div className="ingredients fw-bolder fs-3 text-danger">Изменить Изображение</div>
                        {dataRecipe.text && <CardChangeData value={dataRecipe.image} id={id} setRecipe={setDataRecipe} propertiesObj="image" tagMain="img" tagInput="textarea" buttons="0"/>}
                    </Col>
                    <Col className="m-2" xs={12} md={12}>
                        <div className="ingredients fw-bolder fs-3 text-danger">Изменить Шаги Приготовления</div>
                        {dataRecipe.tags && dataRecipe.tags.map((item, i) => <CardChangeData 
                        key={i} 
                        value={item} 
                        id={id} 
                        setRecipe={setDataRecipe} 
                        propertiesObj="tags" 
                        tagMain="div" 
                        tagInput="textarea" 
                        buttons={i < dataRecipe.tags.length - 2 ? "step": "time_chapter"} 
                        index={i}/>)}
                    </Col>
                    <Col xs={12} md={12}>
                    {flagActiv && <InputCard/>}
                    </Col>
                    <Col xs={12} md={12}>
                    {<div className="add-steps">
                        <button className="add-step" onClick={addMoreStep}>Добавить Этап <PlusCircle/></button>
                    </div>}
                    </Col>
                </Row>
            </Container>
        </div> 
        : 
        <WarningNotToken/>}
        
    </>

}
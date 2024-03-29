import React, { useContext, useState, useEffect } from "react";
import Context from "../Context";
import { Container, Row, Col, Figure, Table } from "react-bootstrap";
import FollowUs from "../components/FollowUs";
import RecentRecipes from "../components/RecentRecipes";


export default () => {
    const { recipes, widthScreen} = useContext(Context);
    const [recommendation, setRecommendation] = useState([]);
    const [itemsRecommend, setItemsRecommend] = useState([]);

    useEffect(() => {
        if(recipes){
            let result = recipes.filter(rcp => rcp.tags[(rcp.tags).length - 2] === "Советы")
            setRecommendation(result)
        }
    }, [recipes])


    useEffect(() => {
        if(recommendation[0]){
            setItemsRecommend(recommendation[0].tags.slice(0,recommendation[0].tags.length - 2))
        }
    }, [recommendation])


    const stContainerRecipe = {
        padding: "15px",
        borderRadius: "20px",
        margin: "10px"
    }

    const stCookingSteps = {
        paddingTop: widthScreen >=3 ? "30px" : "1px"
    }
   
    const stTitleSteps ={
        fontSize: "25px",
        fontWeight: 800,
        paddingRight: "20px"
    }
    const stColckIcon = {
        color: "var(--main-color)",
        fontWeight: 700,
        paddingRight: "6px"
    }
    const stNumberStep ={
        fontSize: widthScreen >=3 ? "120px" : "70px",
        fontWeight: "500"
    }
    const stTitleStep ={
        fontSize: "25px",
        fontWeight: "700"
    }
    
    const stAdviceFrom ={
        fontSize: "15px",
        textAlign: "end",
        color: "#777",
        padding: "10px"
    }
    const stAdviceSpan = {
        fontStyle: "italic"
    }
    const stCol1 ={
        boxShadow: "0 0 10px 0 #777",
        borderRadius: "20px",
        margin: widthScreen >=3 ? "20px 0px 20px 10px" : "7px 0px",
        width: widthScreen >=3 ? "calc(66% - 20px)" : "100%"        
    }
    
    const stCol ={
        borderRadius: "20px",
        boxShadow: "0 0 10px 0 #777",
    }
    const stContainerCards2 ={
        margin: widthScreen >=3 ? "20px 0px 20px 10px" : "10px 0px",
        width: widthScreen >=3 ? "calc(35% - 20px)" : "100%"
    }


    return <div className="recommendation">
        {recommendation && <div className="recommendation-box">
        <Container className="p-4">
            <Row>
                <Col xs={12} md={8} style={stCol1}>
                    <div className="container-recipe" style={stContainerRecipe}>
                        {recommendation[0] && <h1 className="title font-weight-bold mt-4 mb-4 ">
                            {recommendation[0].title}
                        </h1>}
                        
                        {recommendation[0] && <div className="d-flex justify-content-center"><Figure.Image src={recommendation[0].image} style={{width: "100%"}}/></div>}
                        {recommendation[0] && <div className="mt-6">{String(recommendation[0].text).split('=>')[0]}</div>}

                        <div className="cooking-steps" style={stCookingSteps}>
                            
                            {itemsRecommend && itemsRecommend.map((step, i) =>
                            <Table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div className="step d-flex justify-content-start align-items-center">
                                                <div className="number-step p-3" style={stNumberStep}>
                                                    {i + 1 }
                                                </div>
                                                <div className="title-step" style={stTitleStep}>{step.split("=>")[0]}</div>
                                            </div>
                                            <div className="text-step">{step.split("=>")[1]}</div>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>)}
                            <div className="wise-advice">
                                <div className="title-advice" style={stTitleSteps}>Заметки от повора</div>
                                <div className="advice" style={stColckIcon}>
                                "Выключите телевизор, не отвечайте на телефонные звонки, просто сидите и читайте." 
                                <div style={stAdviceFrom}>Мудрый совет от: <span style={stAdviceSpan}>Lauren Braun Costello’s</span></div>
                                </div>
                                
                            </div>
                            
                        </div>                    
                    </div>
                </Col>
                <Col xs={12} md={4} style={stContainerCards2}>
                    <Row className="col-position g-3 ">
                        <Col xs={12} md={12} style={stCol} >
                            <FollowUs/>
                        </Col>
                        <Col xs={12} md={12} style={stCol}>
                            <RecentRecipes/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
        </div>}
    </div>
}
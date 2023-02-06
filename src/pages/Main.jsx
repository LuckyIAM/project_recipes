import React, { useContext} from "react";
import Context from "../Context";
import { Container, Row, Col } from "react-bootstrap";
import MainMiniCarousel from "../components/MainMiniCarousel";
import Advertising from "../components/Advertising";
import Banner from "../components/Banner";
import ContainCardMainAll from "../components/ContainCardMainAll";
import ContainerCardPageRecipes from "../components/ContainerCardPageRecipes";
import FollowUs from "../components/FollowUs"

export default () => {
    const {recentRecipe, widthScreen} = useContext(Context);

    const stAdvertising = {
        background: "#f9f9f9",
        paddingTop: "40px",
        paddingLeft: "50px",
        paddingRight: "50px"
    }
    
    const stCol ={
        boxShadow: "0 0 10px 0 #777",
        borderRadius: "20px",
        padding: "30px"
    }
    const stCol2={
        background: "#fafafa",
        marginTop: "10px",
    }
    const stCol3 ={
        boxShadow: "0 0 10px 0 #777",
        borderRadius: "20px",
        paddingTop: "30px",
        paddingBottom: "30px",
        margin: "20px 10px 20px 0",
        width: widthScreen === 3 ? "calc(66% - 20px)": "100%"
    }
    const stCol33 ={
        boxShadow: "0 0 10px 0 #777",
        borderRadius: "20px",
        paddingTop: "30px",
        paddingBottom: "30px",
    }
    const stCol4 ={
        margin: widthScreen === 3 ? "20px 0px 20px 10px" : "5px 0px",
        width: widthScreen === 3 ? "calc(35% - 20px)":"100%"
    }
    const stCol44 ={
        boxShadow: "0 0 10px 0 #777",
        borderRadius: "20px",
    }
    const stPole3 = {
        marginTop: "10px",
        padding: "5px",
        background: "var(--main-color)",
        borderRadius: "5px",
        height: "30px",
        marginLeft: "10px"
    }
    const stTitlrRecentContain = {
        fontSize: "30px",
        fontWeight: 900,
        marginLeft: "15px" 
    }
    console.log(recentRecipe);
    return <div className="main-container">
        <Banner/>
        <div className="advertising" style={stAdvertising}><MainMiniCarousel/></div>
        <Container>
            <Row>
                <Col xs={12} md={12} style={stCol} >
                    <ContainCardMainAll/>
                </Col>
                <Col xs={12} md={12} style={stCol2}>
                <Advertising/>
                </Col>
                <Col xs={12} md={12} style={stCol33}>
                    <div className="title-recent-recipe-contain d-flex" >
                        <span style={stPole3}>&nbsp;&nbsp;</span><div style={stTitlrRecentContain}>&nbsp;&nbsp;Недавние Рецепты</div>
                    </div>
                </Col>
                
                <Col xs={12} md={8} style={stCol3}>
                    {recentRecipe && <ContainerCardPageRecipes arr={recentRecipe}/>}

                </Col>
                <Col xs={12} md={4}  style={stCol4}>
                    <Row className="col-position">
                        <Col xs={12} md={12} style={stCol44} >
                            <FollowUs/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    </div>
}
import React, {useState, useContext} from "react";
import {Container, Row, Col, Button, Spinner, Alert, Form} from 'react-bootstrap'
import { AccountInfoContext } from "../Context/AccountInfo";
import { useNavigate } from "react-router-dom";
import website_logo from '../images/website_logo.png'

import '../App.css'

function Mint() {
    let accountInfo = useContext(AccountInfoContext)

    const [clockId, setClockId] = useState(0)

    const choices = ['Clock Mode', 'Chrono Mode', 'Timer Mode', 'Alarm Mode']

    const [alert, setAlert] = useState({active: false, content: null, variant: null})

    async function handleMint(){
        let price = accountInfo.mintPrice
        accountInfo.updateAccountInfo({userFeedback: `Minting an clock for ${price/10**18} ETH...`})
        try{
            await accountInfo.ClockMintInstance.methods.publicMint(
                    ).send({from: accountInfo.account, value: price});
            displayAlert('Mint successful!', 'success')
        }catch(error){
            displayAlert(error.message, 'warning')
        }
    }
        
    async function handleIdChange(event){
        if(event.target.value >= accountInfo.lastClockId){
            setClockId(accountInfo.lastClockId);
        }else{
            setClockId(event.target.value)
        }
        console.log(clockId)
    }


    function displayAlert( message, variant){
        setAlert({active: true, content: message, variant: variant})
        setTimeout(function() { setAlert({active: false, content: null, variant: null}); }, 10000);
    }

    let navigate = useNavigate(); 
    const goToClock = () =>{ 
        let path = `clocks/${clockId}`; 
        navigate(path);
    }


    function renderMintButton(){
        if(!window.ethereum || !accountInfo.account){
            return null
        }else{
            return(
                <Row>
                    <Col className="d-flex align-items-center justify-content-center m-2">
                        <Button variant='warning' style={{maxWidth: '100px'}} className='mx-2' onClick={()=>handleMint()}>Mint</Button>
                    </Col>
                    
                </Row>
            )
        }
    }

    function renderUserInterface(){

        if(!window.ethereum || !accountInfo.account){
            return <div className="m-5" style={{fontSize:'20px'}}> <b>Please ensure you have a wallet before accessing this website</b></div>
        }else{
            return(
                <Container>
                    {renderMintButton()}
                    <Row>
                    <hr className="m-5"></hr>
                        <Col className="d-flex align-items-center justify-content-center m-2">
                            <div>
                                You can explore clocks ID 0  to {accountInfo.lastClockId - 1}
                                <br/>
                                Visit your clock to set it up. And even if it's not yours, you can visit it!
                            </div>
                        </Col>
                    </Row>
                    <Row className="d-flex align-items-center justify-content-center m-2">
                        <Col className="clockInput">
                            <Form id='mint_form'>
                                <Form.Group  controlId="clock_id" className="m-2">
                                    <Form.Control 
                                        type="number" 
                                        min="0"
                                        placeholder="Clock ID"
                                        value={clockId}
                                        onChange={(event) => handleIdChange(event)}/>
                                </Form.Group>
                                <a href={`/clocks/${clockId}`}>
                                    <Button variant='outline-light'>Go to Clock</Button>
                                </a>
                            </Form>
                        </Col>
                    </Row>

                </Container>
            )
        }
    }

    function renderUserFeedback(){
        if(accountInfo.userFeedback){
            return(
                <React.Fragment>
                    <div>
                        <Spinner animation="grow" variant="light"/>
                    </div>
                    <div>{accountInfo.userFeedback}</div>
                </React.Fragment>
            )
        }
    }

    function renderAlert(){
        if(alert.active){
            return(
            <Col className='m-3'>
                <br/><br/>
                <Alert variant={alert.variant}>{alert.content}</Alert>
            </Col>
            )
        }

    }

    return ( 
        <Container>
            <div className='blackOverlay'> </div>
            <Row className="mb-5">
            <a style={{ textDecoration: 'none', color: 'white' }} href={`/`}>
                <h1><b>Block Clock</b></h1>
            </a>
            </Row>
            <Row id="description_row">
                <span>Here, you can see all the different Block Clocks. Including your own and see it give you time in quasi real time!</span>
                <span>You don't have one? Mint one here or get one on <a style={{color: 'white' }} href="https://opensea.io/collection/block-clock" target="_blank" rel="noopener noreferrer">Opensea</a>
                </span>
            </Row>
            <Row>
                {renderUserInterface()}
            </Row>
            <Row className='m-3'>
                {renderUserFeedback()}
            </Row>
            <Row className="Home_row"> 
                {renderAlert()}
            </Row>
        </Container>
     );
}

export default Mint;



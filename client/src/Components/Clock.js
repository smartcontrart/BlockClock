import React, {useState, useContext, useEffect, useRef} from "react";
import {Container, Row, Col, Button, Spinner, Alert, Form} from 'react-bootstrap'
import { AccountInfoContext } from "../Context/AccountInfo";
import { useParams } from "react-router-dom";

import '../App.css'

function Clock() {
    let accountInfo = useContext(AccountInfoContext)
    const [clockURI, setClockURI]= useState('')
    const [clockOwner, setClockOwner]= useState('')
    const [clockLoaded, setClockLoaded] = useState(false)
    let params = useParams();
    const [clockId, setClockId] = useState('')
    const [clockMode, setClockMode] = useState('')
    const [timerValue, setTimerValue] = useState('')
    const [alarmValue, setAlarmValue] = useState('')
    const [alert, setAlert] = useState({active: false, content: null, variant: null})
    const choices = ['Clock Mode', 'Chrono Mode', 'Timer Mode', 'Alarm Mode']

    useEffect(() => {
        if(!clockLoaded){
            getClockURI()
        }
        if(clockURI !== accountInfo.clockURI){
            accountInfo.updateAccountInfo({clockIdPath: params.clockId})
            getClockOwner(params.clockId)
        }
    },[accountInfo.BlockClockInstance]);

    function useInterval(callback, delay) {
        const savedCallback = useRef();
      
        // Remember the latest callback.
        useEffect(() => {
          savedCallback.current = callback;
        }, [callback]);
      
        // Set up the interval.
        useEffect(() => {
          function tick() {
            savedCallback.current();
          }
          if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
          }
        }, [delay]);
    }

    useInterval(async () => {
        getClockURI()
    }, 10000);

    async function getClockURI(){
        if(accountInfo.clockIdPath !== null){
            let URI = await accountInfo.BlockClockInstance.methods.tokenURI(accountInfo.clockIdPath).call()
            const URIData = await fetch(URI)
            const URIDataJSON = await URIData.json();
            accountInfo.updateAccountInfo({clockURI: URIDataJSON})
            accountInfo.updateAccountInfo({backgroundColor: URIDataJSON.attributes[0].value})
            setClockLoaded(true)
        }
    }

    async function getClockOwner(clockId){
        if(accountInfo.BlockClockInstance){
            let owner = await accountInfo.BlockClockInstance.methods.ownerOf(clockId).call()
            console.log(owner)
            if(owner){ setClockOwner(owner)}
        }
    }

    // async function handleIdChange(event){
    //     if(event.target.value >= 300){
    //         setClockId(300);
    //     }else{
    //         setClockId(event.target.value)
    //     }
    //     console.log(clockId)
    // }
    

    async function handleInputChange(event, mode){
        if(mode === 'Timer Mode'){
            setTimerValue(event.target.value)
        }else if(mode === 'Alarm Mode'){
            setAlarmValue(event.target.value)
        }
    }

    function displayAlert( message, variant){
        setAlert({active: true, content: message, variant: variant})
        setTimeout(function() { setAlert({active: false, content: null, variant: null}); }, 10000);
    }

    function handleModeChange(event){
        setClockMode(event.target.value)
    }


    function mapAvailablechoices(choices){
        return(
            choices.map((choice, key)=>{
                return(
                    <option value={choice}>{choice}</option>
                )
            })
        )
    }

    async function handleClockSetup(){        
        accountInfo.updateAccountInfo({userFeedback: 'Checking clock ownership'})
        try{
            let owner = await accountInfo.BlockClockInstance.methods.ownerOf(accountInfo.clockIdPath).call();
            setClockOwner(owner)
            console.log(owner)
            if(owner === accountInfo.account){
                displayAlert('Ownership confirmed, clock setup allowed', 'success')
                try{
                    if(clockMode === 'Clock Mode'){
                        accountInfo.updateAccountInfo({userFeedback: 'Enabling clock mode'})
                        console.log( accountInfo.BlockClockInstance)
                        await  accountInfo.BlockClockInstance.methods.resetClock(accountInfo.clockIdPath).send({from: accountInfo.account})
                        displayAlert('Clock successfully setup!', 'success')
                    }else if(clockMode === 'Chrono Mode'){
                        accountInfo.updateAccountInfo({userFeedback: 'Starting chronograph'})
                        await  accountInfo.BlockClockInstance.methods.setChrono(accountInfo.clockIdPath).send({from: accountInfo.account})
                        displayAlert('Chrono successfully launched!', 'success')
                    }else if(clockMode === 'Timer Mode'){
                        accountInfo.updateAccountInfo({userFeedback: 'Starting Timer'})
                        await  accountInfo.BlockClockInstance.methods.setTimer(accountInfo.clockIdPath, timerValue).send({from: accountInfo.account})
                        displayAlert('Timer successfully setup!', 'success')
                    }else if(clockMode === 'Alarm Mode'){
                        accountInfo.updateAccountInfo({userFeedback: 'Setting Alarm up'})
                        await  accountInfo.BlockClockInstance.methods.setAlarm(accountInfo.clockIdPath, alarmValue.toString()).send({from: accountInfo.account})
                        displayAlert('Alarm successfully setup', 'success')
                    }else{
                        throw Error
                    }
                }
                catch(error){
                    displayAlert(error.message, 'warning')
                }
            }else{
                displayAlert(`You are not the owner of clock ${clockId}`, 'warning')
            }
        }
        catch(error){
            displayAlert(error.message, 'warning')
        }
        accountInfo.updateAccountInfo({userFeedback: null})
    }

    function renderInput(){
        if(clockMode === 'Timer Mode'){
            return <Form.Group  controlId="timer_value" className="m-2">
                        <Form.Control 
                            placeholder="Number of blocks"
                            value={timerValue}
                            onChange={(event) => handleInputChange(event, clockMode)}/>
                    </Form.Group>
        }else if(clockMode === 'Alarm Mode'){
            return (
                <Form.Group  controlId="alarm_value" className="m-2">
                    <Form.Control 
                        placeholder={`Last Block: ${accountInfo.currentBlockNumber}`}
                        value={alarmValue}
                        onChange={(event) => handleInputChange(event, clockMode)}/>
                </Form.Group>
            )
        }
    }



    function renderUserInterface(){

        if(!window.ethereum || !accountInfo.account){
            return null
        }else if(accountInfo.BlockClockInstance){
            if(accountInfo.account === clockOwner){
                return(
                    <Container>
                        <Row>
                            <Col className="d-flex align-items-center justify-content-center m-2">
                                <Form id='mint_form'>
                                    <Form.Select className='m-2' onChange={handleModeChange}>
                                        <option value='invalid'>Select a mode for your clock</option>
                                        {mapAvailablechoices(choices)}
                                </Form.Select>
                                {renderInput()}
                                </Form>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="d-flex align-items-center justify-content-center m-2">
                                <Button variant='light' style={{maxWidth: '100px'}} className='mx-2' onClick={()=>handleClockSetup()}>Save</Button>
                            </Col>
                        </Row>
                    </Container>
                )
            }else{
                return <Spinner variant="light"></Spinner>
            }
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

    function renderClock(){
        if(clockLoaded){
            console.log(accountInfo.clockURI)
            return <img 
            className="clock_img clock_svg"
            src={accountInfo.clockURI.image}></img>
        }else{
            return <div>Loading</div>
        }
    }

    return ( 
        <Container>
            <div className='blackOverlay'> </div>
            <Row>
            <a style={{ textDecoration: 'none', color: 'white' }} href={`/`}>
                <h1><b>Block Clock</b></h1>
            </a>
            </Row>
            <Row className="">
                <Col>
                    {renderClock()}
                </Col>
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

export default Clock;



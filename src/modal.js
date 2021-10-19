import React from 'react';
import {
    Container,
    Input,
    Label,
    Card,
    Row,
    Col,
    Button,
} from 'reactstrap';
import axios from 'axios';
var DatePicker = require("reactstrap-date-picker");


class Modal extends React.Component{
    constructor(props){
        super(props);
        this.state={
            value:new Date().toISOString()
        }
    }
    componentDidMount()
    {
        
    }
    handleChange(value, formattedValue) {
        let tempvalue=new Date(value);
        let year = tempvalue.getFullYear();
        let month= tempvalue.getMonth()+1;
        let date = tempvalue.getDate();
        if(month<10){
            month="0"+month;
        }
        if(date<10){
            date="0"+date;
        }
        this.setState({
        value: year+"-"+month+"-"+date, // ISO String, ex: "2016-11-19T12:00:00.000Z"
       // Formatted String, ex: "11/19/2016"
        })
    }
    onDoneClick=()=>{
        const AddUrl = async object =>
        await axios
        .post('http://localhost:8080/url/update',{  
            "shortUrl":this.props.rowData["shorturl"],
            "expiryDate":this.state.value
        })
        .then(response =>response )
        .catch(error => error.response);
        AddUrl();
        this.props.toggleModal();
    }
    render (){
        return (
            <Container style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                <Card style={{justifyContent:'center',alignItems:'center',marginTop:'20%'}}>
                    <Row>
                        <Col>
                            <Label>
                                ShortUrl
                            </Label>
                        </Col>
                    </Row>
                    
                    <Row>
                        <Col>
                            <Input disabled value ={this.props.rowData["shorturl"]}style={{fontSize:'20px',width:'100%'}}/>
                            
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Label>
                                Url
                            </Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Input disabled value ={this.props.rowData["url"]} style={{fontSize:'20px',width:'100%'}}/>
                            
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Label>Select Date</Label>
                        </Col>
                        
                    </Row>
                    <Row>
                        <Col >
                            <DatePicker id= "example-datepicker"
                                format="YYYY-MM-DD" 
                                //value ={this.props.rowData["expirydate"]}
                                       value   = {this.state.value} 
                                onChange= {(v,f) => this.handleChange(v, f)} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button onClick={this.onDoneClick}>Done</Button>
                        </Col>
                        <Col>
                            <Button onClick={this.props.toggleModal}>Cancel</Button>
                        </Col>
                    </Row>
                </Card>
            </Container>
        )
    }
}
export default Modal;
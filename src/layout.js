import MaterialTable from 'material-table';
import Modal from './modal';
import axios from 'axios';
import react from 'react';
import {
    Container,
    Input,
    Button,
    Label,
    Row,
    Col
} from 'reactstrap';


var DatePicker = require("reactstrap-date-picker");
class Layout extends react.Component{
    constructor(props) {
        super(props)
        this.state= {
          value: new Date().toISOString(),
          url:"",
          ButtonClicked:false,
          record:[],
          ModalOpen:false,
          rowData:{},
          doneButtonClicked:false,
          deleteButtonClcked:false
        }
    }    
    upDateTable=()=>{
        this.setState({deleteButtonClcked:false})
        this.setState({doneButtonClicked:false})
        this.setState({ButtonClicked:false});
        async function axiosTest() {
            const response = await axios.get('http://localhost:8080/url/get/all').then(response => response)
            .catch(error => error.response);
        
            return response
        }
        let userToken = axiosTest()
        userToken.then(result=>this.setState({record:result.data.data}));        

    }
    componentDidMount(){
        async function axiosTest() {
            const response = await axios.get('http://localhost:8080/url/get/all').then(response => response)
            .catch(error => error.response);
        
            return response
        }
        let userToken = axiosTest()
        userToken.then(result=>this.setState({record:result.data.data}));        
    }
    componentDidUpdate()
    {
        if(this.state.ButtonClicked===true || this.state.doneButtonClicked===true || this.state.deleteButtonClcked===true)
        {
            this.upDateTable();
        }

    }
    onUrlChanged=(e)=>
    {
        this.setState({url:e.target.value});
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
    onHyperLinkClicked=(data)=>{
        console.log(data);
        window.location.href = data;
    }
    onSubmit=()=>{
        if(this.state.url==="")
        {
            alert("all fields must be filled")
        }
        else{
            this.setState({ButtonClicked:true});
           const AddUrl = async object =>
            await axios
            .post('http://localhost:8080/url/add',{  
                "url":this.state.url,
                "expiryDate":this.state.value},
                {
                    headers: {
                        'Access-Control-Allow-Origin':'*'
                    }
                }
                
                )
    
            .then(response =>response )
            .catch(error => error.response);
            AddUrl();
            
            

        }
    }
    handleRowClick=(event,rowData)=>{
        console.log(rowData);
        console.log("hello world")
    }
    OnButtonClicked=(data)=>{
        this.setState({
            ModalOpen:true,
            rowData:data
        })
    }
    toggleModal=()=>{
        this.setState({
            ModalOpen:false,
            doneButtonClicked:true
        })
    }
    OnDeleteButtonClicked=(data)=>{
        this.setState({deleteButtonClcked:true})
         const deleteUrl = async object =>
         await axios
         .delete('http://localhost:8080/url/delete/'+data["hashUrl"])
         .then(response =>response )
         .catch(error => error.response);
         deleteUrl();
        
    }
    render()
    {

        

        return (
            <Container fluid style={{justifyContent:'center',alignItems:'center'}}>
                {this.state.ModalOpen===true?<Modal 
                    rowData={this.state.rowData}
                    toggleModal={this.toggleModal}
                
                />:<div>
                <Row style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <legend>Url Shortner</legend>
                </Row>
            <Row style={{display:'flex',fontSize:'18px'}}>
            <Col style={{width:'40%',fontSize:'18px'}}>
               
                   <Row>
                       <Col>
                            <Label>
                                Enter Url
                            </Label>
                       </Col>
                       <Col>
                            <Input placeholder="your Url"
                                type="text"
                                onChange={this.onUrlChanged}
                            /> 
                        </Col>
                    </Row>
                    <Row >
                        
                            
                                <Col>
                                    <Label>Select Date</Label>
                                </Col>
                                 <Col >
                                        <DatePicker id= "example-datepicker"
                                        format="YYYY-MM-DD" 
                                        value   = {this.state.value} 
                                        onChange= {(v,f) => this.handleChange(v, f)} />
                                </Col> 
                            
                      
                    </Row>
                    <Row>
                        <Button onClick={()=>this.onSubmit()}>
                            Add
                        </Button>
                    </Row>
                    
                    </Col>
                    <Col>
                     
                        
                        <MaterialTable
                          title="Record"
                          data={this.state.record}
                          columns={[
                            {title: "Short Url", field: 'name', render: row => <div  onClick={()=>{this.onHyperLinkClicked(row["shorturl"])}}style={{color :'#85019c',textDecoration:'underline'}}> {row["shorturl"]}</div> },
                            {title: "Url", field: 'sku', render: row => <div> {row["url"]}</div> },
                            {title: "Expiry Date", field: 'category', render: row => <div> {row["expirydate"]}</div> },
                            {title: "Edit", field: 'category', render: row => <Button onClick={()=>this.OnButtonClicked(row)}> Edit</Button> },
                            {title: "Delete", field: 'category', render: row => <Button onClick={()=>this.OnDeleteButtonClicked(row)}> Delete</Button> },
                        ]}  
                        options={{
                            actionsColumnIndex: -1,
                            search: true,
                            toolbar: false,
                            paging: true,
                            sorting: true
                        }}
                        
                  />

                    
                    </Col>
                </Row>
                </div>}
            </Container>
        )
    }
}
export default Layout;
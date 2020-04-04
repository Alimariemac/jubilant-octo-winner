import React, { Component } from 'react';
import {Card, CardImg, Label, CardText, CardBody, BreadcrumbItem, Breadcrumb, Button, Modal, ModalBody, ModalHeader} from 'reactstrap';
import {Link} from 'react-router-dom'
import {Control, LocalForm, Errors} from 'react-redux-form'


const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);
class CommentForm extends Component{
    constructor(props) {
        super(props);
        this.toggleModal = this.toggleModal.bind(this)
        this.state={
            isModalOpen:false,
            author:'',
            rating:'',
            text:'',
            touched:{
                author:false,
                rating:false,
                text:false
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    render(){
        return(
            <React.Fragment>
            <Button type = "submit" onClick = {this.toggleModal} outline><i className="fa fa-pencil" aria-hidden="true"></i> 
            Submit comment</Button>
            <Modal isOpen = {this.state.isModalOpen} toggle = {this.toggleModal}>
                <ModalHeader toggle = {this.toggleModal}>Submit Comment</ModalHeader>
                 <ModalBody>
                     
                 <LocalForm onSubmit={values=>this.handleSubmit(values)}>
                 <div className="col-md-10">
                    <div className="form-group">
                        <Label htmlFor="rating">Rating</Label>
                        <Control.select
                                model=".rating"
                                className="form-control"
                                id="rating"
                                name="rating"
                                placeholder="rating">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                        </Control.select>
                        </div>
                        <div className="form-group">
                        <Label htmlFor="author">Author</Label>
                        <Control.text
                                model=".author"
                                className="form-control"
                                id="author"
                                name="author"
                                placeholder="Your Name"
                                validators={{
                                    required,
                                    minLength:minLength(2),
                                    maxLength:maxLength(15)
                                }}/>
                                 <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    component="div"
                                    messages={{
                                        required:"Required",
                                        minLength: 'Must be at least 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                    />
                        </div>     
                        <div className="form-group">
                        <Label htmlFor="text">Comment</Label>
                        <Control.textarea
                                rows="6"
                                model=".text"
                                className="form-control"
                                id="text"
                                name="text"
                                />
                        </div>
                        </div>
                        <Button type="submit" color="primary">
                                        Send Feedback
                                    </Button>
                    </LocalForm>
                    
                </ModalBody>
            </Modal>
        </React.Fragment>
        )
    }
    handleSubmit(values){
        console.log("current state is: " + JSON.stringify(values))
        alert("current state is: " + JSON.stringify(values))
    }

    toggleModal(){
        console.log("toggeled")
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
}


    function RenderCampsite({campsite}){
        return(
            <div className="col-md-5 m-1">
                <Card>
                    <CardImg top src={campsite.image} alt={campsite.name}/>
                    <CardBody>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
                </Card>
            </div>
        )
    }
    
    function RenderComments({comments}){
        if(comments){
            return(
                <div className="col-md-5 m-1">
                    <h4>Comments</h4>
                    {comments.map(c => 
                    <div key = {c.id}>
                       <p> {c.text}</p>
                        <p>{c.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(c.date)))}</p>
                    </div>)}
                    <CommentForm/>
                </div>     
            )
        }
        return(
            <div></div>
        )
    }
    function CampsiteInfo(props){
            if(props.campsite){
                return(
                    <div className ="container">
                        <div className = "row">
                    <div className ="col">
                        <Breadcrumb>
                            <BreadcrumbItem>
                                <Link to="/directory">Directory</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem active>
                                    {props.campsite.name}
                            </BreadcrumbItem>
                        </Breadcrumb>
                        <h2> {props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                        <div className= "row">
                           <RenderCampsite campsite={props.campsite}/>
                            <RenderComments comments={props.comments}/>
                        </div>
                    </div>
                )
            
            }
           return <div/>
        }
    
export default CampsiteInfo
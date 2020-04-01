import React from 'react';
import {Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom'
function RenderDirectoryItem({campsite}){
    return(
        <Link to={`/directory/${campsite.id}`}>
        <Card>
        <CardImg with="100%" src = {campsite.image} alt={campsite.name}/>
        <CardImgOverlay>
            <CardTitle>{campsite.name}</CardTitle>
        </CardImgOverlay>
        </Card>
        </Link>
    )
}

function Directory(props){

        const directory = props.campsites.map(campsite => {
            return(
                <div className = "col-md-5 m-1" key ={campsite.id}>
                    <RenderDirectoryItem campsite = {campsite}/>
                </div>
            )
        })
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Directory</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>Directory</h2>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    {directory}
                </div>
            </div>
        );
    }

export default Directory

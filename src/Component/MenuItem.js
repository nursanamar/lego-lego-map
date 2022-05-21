import React from "react"
import {
    Card,
    Badge,
    Col,
    Row
} from 'react-bootstrap';

function MenuItem({ name, description, price, image, tenant }) {
    let foodImage = image ? image : "https://img.freepik.com/free-photo/delicious-grilled-burgers_62847-14.jpg?w=2000"
    let foodPrice = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(parseInt(price))
    return (
        <div className="MenuItem">
            <div style={{backgroundImage: "url("+foodImage+")"}} className="MenuItemImage">
                
            </div>
            <div className="MenuItemInfo">
                <span className="MenuItemName">{name}</span>
                <Badge bg="secondary" >{tenant.name}</Badge><br/>
                <Badge bg="primary">{foodPrice}</Badge>
            </div>
        </div>
    )
}

export default MenuItem;
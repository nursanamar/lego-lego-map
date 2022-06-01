import React, { useState, useEffect, useRef } from "react"
import {
    Row, Col,
    InputGroup,
    FormControl,
    Button,
    CardGroup
} from 'react-bootstrap';

    import {
        Routes,
        Route,
        Link,
        useParams
    } from "react-router-dom";

import { getFoodsWithTenant } from "../data/getter";
import MenuItem from "./MenuItem";
import { useSelector, useDispatch } from 'react-redux'
import { fetchData } from "../Store/slice";

function Menu() {

    const [search,setSearch] = useState("");
    const foods = useSelector(state => state.foodTenant.foods)
    
    const [foodList,setFoodList] = useState([]);
    const dispatch = useDispatch()
    
    
    useEffect(() => {
        dispatch(fetchData())
    },[])

    useEffect(() => {
        setFoodList(foods)
    },[foods])
    
    useEffect(() => {
        // Fungsi mencari menggunakan regex dari keyword yang di cari 
        // Untuk memfilter list
        let re = new RegExp(`${search.toLowerCase()}`);
        let filteredFood = foods.filter((food) => re.test(food.name.toLowerCase()) || re.test(food.tenant.name.toLowerCase()) );
        setFoodList(filteredFood);
    },[search])

    const navigeteMap = (id) => {
        window.mapMoveTo(id)
    }

    let items = []
    foodList.forEach((food,i) => {
        items.push(
            <Link key={i} onClick={() => navigeteMap(food.tenantId)} to={`/kedai/${food.tenantId}`}>
                <MenuItem {...food} />
            </Link>
        )
    })
    return (
        <div style={{display: "flex",flexDirection:"column"}}>
            <div>
                <InputGroup style={{ padding: "10px" }}>
                    <FormControl
                        placeholder="Cari Makanan"
                        aria-label="Cari Makanan"
                        aria-describedby=""
                        onChange={(e) => {
                            setSearch(e.target.value)
                            e.preventDefault()
                        }}

                    />
                    <Button variant="secondary" id="button-addon2">
                        Cari
                    </Button>
                </InputGroup>
            </div>
            <div className="MenuItemContainer customized-scrollbar">
                {items}
            </div>
        </div>
    )
}

function KedaiInfo() {
    let { id } = useParams();
    const tenants = useSelector(state => state.foodTenant.tenants)
    const foods = useSelector(state => state.foodTenant.foods)
    let info = tenants.find(tenant => tenant.id === id)
    let tenantFoods = foods.filter(food => food.tenantId === id)

    let items = []
    tenantFoods.forEach((food,i) => {
        items.push(
            <MenuItem key={i} {...food} />
        )
    })

    return info === undefined ? (
        <>
            <div style={{paddingLeft:"10px",marginBottom:"10px"}}>
                <Link className="BackButton btn btn-primary" to="/">
                    Kembali
                </Link>
            </div>
            <div className="MenuItemContainer customized-scrollbar">
                <div className="kedaiInfo" style={{display: "flex",alignItems: "center", justifyContent: "center",backgroundColor:"#181a18"}}>
                    <h3 className="kedaiName" style={{color:"#fff"}}>Masih Kosong</h3>
                </div>
                {items}
            </div>
        </>
    ) : (
        <>
            <div style={{paddingLeft:"10px",marginBottom:"10px"}}>
                <Link className="BackButton btn btn-primary" to="/">
                    Kembali
                </Link>
            </div>
            <div className="MenuItemContainer customized-scrollbar">
                <div className="kedaiInfo" style={{display: "flex",alignItems: "center", justifyContent: "center",backgroundPosition: "center",backgroundSize: "cover", backgroundImage: "url("+info.image+")"}}>
                    <h3 className="kedaiName" style={{color:"#fff"}}>{info.name}</h3>
                </div>
                {items}
            </div>
        </>
    )
}

function App() {
    return (
        // <Router>
            <Routes>
                <Route path="/" element={<Menu />} />
                <Route path="/kedai/:id" element={<KedaiInfo />} />
            </Routes>
        // </Router>
    )
}

export default App;

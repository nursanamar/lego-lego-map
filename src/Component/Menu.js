import React, { useState, useEffect } from "react"
import {
    InputGroup,
    FormControl,
    Button
} from 'react-bootstrap';

import {
    Routes,
    Route,
    Link,
    useParams,
    useNavigate
} from "react-router-dom";

import MenuItem from "./MenuItem";
import { useSelector, useDispatch } from 'react-redux'
import { fetchData } from "../Store/slice";

function Menu() {

    const navigate = useNavigate()
    const [search, setSearch] = useState("");
    const foods = useSelector(state => state.foodTenant.foods)

    const [foodList, setFoodList] = useState([]);
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(fetchData())
    }, [dispatch])

    useEffect(() => {
        setFoodList(foods)
    }, [foods])

    useEffect(() => {
        // Fungsi mencari menggunakan regex dari keyword yang di cari 
        // Untuk memfilter list
        let re = new RegExp(`${search.toLowerCase()}`);
        let filteredFood = foods.filter((food) => re.test(food.name.toLowerCase()) || re.test(food.tenant.name.toLowerCase()));
        setFoodList(filteredFood);
    }, [search, foods])

    const navigeteMap = (id) => {
        window.mapMoveTo(id)
    }

    let items = []
    foodList.forEach((food, i) => {
        items.push(
            <Link key={i} onClick={() => navigeteMap(food.tenantId)} to={`/kedai/${food.tenantId}`}>
                <MenuItem {...food} />
            </Link>
        )
    })

    const searchKedai = () => {
        let kedai = foods.find(food => food.tenant.name.toLowerCase() === search.toLowerCase())
        if (kedai) {
            navigeteMap(kedai.tenantId)
            navigate(`/kedai/${kedai.tenantId}`)
        }
    }

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div>
                <InputGroup style={{ padding: "10px" }}>
                    <FormControl
                        placeholder="Cari Makanan/Kedai"
                        aria-label="Cari Makanan/Kedai"
                        aria-describedby=""
                        onChange={(e) => {
                            setSearch(e.target.value)
                            e.preventDefault()
                        }}
                        onSubmit={() => console.log("HAlo")}
                    />
                    <Button onClick={searchKedai} variant="secondary" id="button-addon2">
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
    tenantFoods.forEach((food, i) => {
        items.push(
            <MenuItem key={i} {...food} />
        )
    })

    return info === undefined ? (
        <>
            <div style={{ paddingLeft: "10px", marginBottom: "10px" }}>
                <Link className="BackButton btn btn-primary" to="/menu">
                    Kembali
                </Link>
            </div>
            <div className="MenuItemContainer customized-scrollbar">
                <div className="kedaiInfo" style={{ display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#181a18" }}>
                    <h3 className="kedaiName" style={{ color: "#fff" }}>Masih Kosong</h3>
                </div>
                {items}
            </div>
        </>
    ) : (
        <>
            <div style={{ paddingLeft: "10px", marginBottom: "10px" }}>
                <Link className="BackButton btn btn-primary" to="/menu">
                    Kembali
                </Link>
            </div>
            <div className="MenuItemContainer customized-scrollbar">
                <div className="kedaiInfo" style={{ display: "flex", alignItems: "center", justifyContent: "center", backgroundPosition: "center", backgroundSize: "cover", backgroundImage: "url(" + info.image + ")" }}>
                    <h3 className="kedaiName" style={{ color: "#fff" }}>{info.name}</h3>
                </div>
                {items}
            </div>
        </>
    )
}

function Welcome() {
    return (
        <div className="welcome-container">
            <div className="messages">
                <img src="/logo.jpg" />
                <h1>Peta 3D Lego-Lego Food court</h1>
            </div>
            <div className="about">
                <span>Tentang</span>
                <span><b>Lego Lego</b></span>
                <p>
                    Dalam istilah bugis, Lego Lego diartikan <b>"Beranda di muka rumah."</b> Dalam tradisi keluarga,
                    beranda mencerminkan tempat yang penuh <b>keakraban</b> dan <b>kehangatan</b> suatu hubungan manusia,
                    baik antar keluarga maupun tamu yang berkunjung, sekaligus menjadi tempat ternyaman untuk menepi sejenak
                    dari rutinitas keseharian.
                </p>
                <p>
                    Pemahaman tersebut menjadikan Lego Lego sebagai <b><em>food court</em></b> yang ramah bagi
                    ragam masyarakat yang berkunjung untuk menikmati varian kuliner, merasakan suasana yang segar,
                    menggunakan fasilitas yang menyenangkan, dan sesekali mengingat <b>kebutuhan diri untuk relaksasi.</b>
                </p>
            </div>
            <div className="howto">
                <h1>Cara menggunakan peta</h1>
                <p>Mencari makanan</p>
                <ul>
                    <li>Gunakan pencarian untuk mencari makanan</li>
                    <li>Atau klik pada kedai untuk melihat menu dari kedai</li>
                </ul>
                <Link className="btn btn-primary" to="/menu">
                    Buka Peta
                </Link>
            </div>
        </div>
    )
}

function App() {
    return (
        // <Router>
        <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/kedai/:id" element={<KedaiInfo />} />
        </Routes>
        // </Router>
    )
}

export default App;

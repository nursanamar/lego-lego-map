import React, { Suspense, useEffect, useRef, useState } from "react"
import Map from "./Component/Map";
import { Container, Row, Col } from 'react-bootstrap';
import {
  BrowserRouter as Router, useLocation
} from "react-router-dom";
import { Provider } from 'react-redux'
import { store } from "./Store/store";

import Menu from "./Component/Menu";
import { BsCaretUp } from "react-icons/bs";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function App() {

  const menuListRef = useRef(null)
  const location = useLocation()
  const [isBarShowed,setBarShowed] = useState(true);

  useEffect(() => {
    if (menuListRef.current) {
      menuListRef.current.scroll({ top: 0 })
    }
  }, [location])

  const toggle = (e) => {
    setBarShowed(prev => !prev)
    e.preventDefault()
  }

  return (
    // <Router>
      <Container fluid={true}>
        <Row>
          {/* <Col ref={menuListRef} className="customized-scrollbar d-none d-lg-block" lg="3" style={{ height: "100vh", overflowY: "scroll" }}>
            
          </Col> */}
          <Col style={{padding:0}} lg="12" xs="12" sm="12">
            <div style={{ height: "100vh" }}>
              <Suspense fallback={null}>
                <Map />
              </Suspense>
            </div>
            <div className={`MenuContainer ${isBarShowed ? 'show_side_bar' : 'hide_side_bar'}`} style={{position: "fixed",bottom:0, width: "100vw"}}>
              <button onClick={toggle} className={`toggleMenu ${isBarShowed ? "toggleMenu-hide" : "toggleMenu-show"} btn btn-sm btn-secondary`}>
                <BsCaretUp className={`${isBarShowed ? "down-icon" : "up-icon"} toggleIcon`} />
                {isBarShowed ? "Sembunyikan menu" : "Tampilkan menu"}
              </button>
              <Provider store={store}>
                <Menu />
              </Provider>
            </div>
          </Col>
        </Row>
      </Container>
    // </Router>
  );
}

export default App;

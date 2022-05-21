import React, { Suspense, useEffect, useRef } from "react"
import Map from "./Component/Map";
import { Container, Row, Col } from 'react-bootstrap';
import {
  BrowserRouter as Router, useLocation
} from "react-router-dom";
import { Provider } from 'react-redux'
import { store } from "./Store/store";

import Menu from "./Component/Menu";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function App() {

  const menuListRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    if (menuListRef.current) {
      menuListRef.current.scroll({ top: 0 })
    }
  }, [location])

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
            <div className="MenuContainer" style={{position: "fixed",bottom:0, width: "100vw"}}>
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

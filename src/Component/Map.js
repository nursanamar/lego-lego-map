import React, { Suspense, useState, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { useProgress, Html } from "@react-three/drei";
import { useNavigate } from 'react-router'
import { BsCompass } from "react-icons/bs";

import MapControls from "./Controls";

import Model from "./Model"

function Loader() {
    const { progress } = useProgress()
    return <Html center>{progress} % loaded</Html>
}

export default function Map() {
    const [selected, setSelected] = useState("");
    const navigate = useNavigate();

    const modelRef = useRef();
    const controlRef = useRef();

    window.mapMoveTo = (id) => {
        modelRef.current.setFocus(id);
    }

    const selectHandler = (e) => {
        setSelected(e.key);

        if (e.key) {
            navigate('kedai/' + e.key)
            controlRef.current.focusTo(e.pos)
        }
    }

    const resetControl = () => {
        controlRef.current.resetTo()
    }

    return (
        // <Canvas camera={{position: [1.202857067957607, 0.17795647522858266, 1.0680462328280964]}}>
        <>
            <Canvas style={{ width: "100%", height: "100%" }} camera={{ position: [1.202857067957607, 0.17795647522858266, 1.0680462328280964] }}>
                <Suspense fallback={<Loader />}>
                    <pointLight position={[5, 5, 0]} />
                    <Model ref={modelRef} onSelect={selectHandler} active={selected} />
                    <MapControls ref={controlRef} />
                </Suspense>
            </Canvas>
            <button onClick={resetControl} className='resetButton btn btn-small btn-primary'><BsCompass /></button>
        </>
    )

}


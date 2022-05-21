import React, { Suspense, useState, useMemo, useRef } from 'react'
import { Canvas,useThree,useFrame } from '@react-three/fiber'
import { MapControls, useProgress, Html  } from "@react-three/drei";
import { useNavigate } from 'react-router'
import CameraControls from 'camera-controls'
import * as THREE from 'three';

import Model from "./Model"

function Loader() {
    const { progress } = useProgress()
    return <Html center>{progress} % loaded</Html>
}

CameraControls.install({ THREE })

function Controls({ zoom, focus, pos = new THREE.Vector3(), look = new THREE.Vector3() }) {
  const camera = useThree((state) => state.camera)
  const gl = useThree((state) => state.gl)

  
  const controls = useMemo(() => new CameraControls(camera, gl.domElement), [])
  return useFrame((state, delta) => {
    zoom ? pos.set(focus.x + 0.2, focus.y + 0.05 , focus.z + 0.2) : pos.set(0, 0, 5)
    zoom ? look.set(focus.x, focus.y, focus.z) : look.set(0, 0, 4)

    state.camera.position.lerp(pos, 0.5)
    state.camera.updateProjectionMatrix()

    controls.setLookAt(state.camera.position.x, state.camera.position.y, state.camera.position.z, look.x, look.y, look.z, true)
    return controls.update(delta)
  })
}

export default function Map() {
    const [selected,setSelected] = useState("");
    const [zoom,setZoom] = useState(false)
    const [focus,setFocus] = useState({})
    const navigate = useNavigate();

    const modelRef = useRef();

    window.mapMoveTo = (id) => {
        modelRef.current.setFocus(id);
    }

    const selectHandler = (e) => {
        setSelected(e.key);
        setFocus(e.pos);
        setZoom(true);

        if(e.key){
            navigate('kedai/'+e.key)
        }
    }

    return (
        // <Canvas camera={{position: [1.202857067957607, 0.17795647522858266, 1.0680462328280964]}}>
        <Canvas style={{width:"100%",height: "100%"}} camera={{position: [1.202857067957607, 0.17795647522858266, 1.0680462328280964]}}>
            <Suspense fallback={<Loader />}>
                <pointLight position={[5, 5, 5]} />
                <Model ref={modelRef} onSelect={selectHandler} active={selected} />
                {
                    selected ? 
                    <Controls zoom={zoom} focus={focus} />
                    :
                    <MapControls onUpdate={console.log} onChange={console.log} />
                }
            </Suspense>
        </Canvas>
    )

}


import React from 'react'
import * as THREE from 'three'
import { Text } from "@react-three/drei";

export default function Marker({ node, isActive = false, onClick = () => { }, key }) {
    const textRotation = new THREE.Euler();
    const textPosistion = new THREE.Vector3();

    textPosistion.set(node.position.x, node.position.y + 0.045, node.position.z)
    textRotation.set(node.rotation.x, node.rotation.y, node.rotation.z - 0.8)

    return (
        <>
            <Text
                color={isActive ? "red" : "black"}
                anchorX="center"
                anchorY="top"
                fontSize={1}
                position={textPosistion}
                scale={node.scale}
                rotation={textRotation}
            >
                {node.userData.name.replace("_"," ")}
            </Text>
            <mesh
                castShadow
                receiveShadow
                onClick={(e) => {
                    onClick()
                    e.stopPropagation()
                }}
                geometry={node.geometry}
                position={node.position}
                rotation={node.rotation}
                scale={node.scale}
            >
                <meshStandardMaterial color={isActive ? "red" : "grey"} />
            </mesh>
        </>
    )
}

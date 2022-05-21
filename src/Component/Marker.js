import React, { Component, useState } from 'react'

export default function Marker({node, isActive = false ,onClick = () => {}}) {
    return (
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
            <meshStandardMaterial color={isActive ? "red" : "pink"} />
        </mesh>
    )
}

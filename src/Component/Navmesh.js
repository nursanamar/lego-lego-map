import React, { forwardRef, useImperativeHandle, useMemo, useState } from 'react'
import { useGLTF, Line } from '@react-three/drei'
import { Pathfinding } from "three-pathfinding";


function Navmesh({ }, ref) {
    const { nodes, materials } = useGLTF('/navmesh.gltf')
    const [closest, setClosest] = useState(null);
    const [path,setPath] = useState([])

    let startPoint = nodes.start.position

    const pathFinding = useMemo(() => {
        const obj = new Pathfinding();
        obj.setZoneData("ZONE1", Pathfinding.createZone(nodes.Navmesh.geometry));

        return obj
    })

    useImperativeHandle(ref, () => ({
        findPath: (target) => {

            if (!target) {
                setPath([])
                return;
            }

            const groupID = pathFinding.getGroup("ZONE1",startPoint)
            const closest = pathFinding.getClosestNode(target,"ZONE1",groupID)

            const to = closest.centroid
            setClosest(to)

            const path = pathFinding.findPath(startPoint,to,"ZONE1",groupID)

            if (path) {
                let points = [[startPoint.x,startPoint.y,startPoint.z]];
                path.forEach(pos => {
                    points.push([pos.x,pos.y,pos.z])
                })
                

                setPath(points)
            }else{
                setPath([])
            }
        }
    }))

    return (
        <>
            {/* {
                closest ?
                    <mesh
                        position={closest}
                        geometry={nodes.start.geometry}
                        rotation={nodes.start.rotation}
                        scale={nodes.start.scale}
                    >
                        
                        <meshStandardMaterial color="red" />
                    </mesh>

                    :
                    null
            } */}

            {
                path.length ?
                <Line
                    points={path}      
                    color="red"                  
                    lineWidth={4}                  
                    dashed={false}
                />
                :
                null
            }

            {/* <mesh
                onClick={(arg) => console.log(arg, "clicked")}
                castShadow
                receiveShadow
                geometry={nodes.Navmesh.geometry}
                position={nodes.Navmesh.position}
                rotation={nodes.Navmesh.rotation}
                scale={nodes.Navmesh.scale}
            >
                <meshStandardMaterial color="blue" />
            </mesh> */}
        </>
    )
}

export default forwardRef(Navmesh)
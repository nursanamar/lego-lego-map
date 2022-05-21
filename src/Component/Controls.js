import { useFrame, useThree } from '@react-three/fiber'
import * as React from 'react'
import * as THREE from 'three'
import { MapControls as MapControlsImpl } from 'three-stdlib'


const MapControls =  React.forwardRef((props = { enableDamping: true }, ref) => {
    
    const { domElement, camera, onChange, onStart, onEnd, ...rest } = props
    const invalidate = useThree((state) => state.invalidate)
    const defaultCamera = useThree((state) => state.camera)
    const gl = useThree((state) => state.gl)
    const events = useThree((state) => state.events)
    const explDomElement = (domElement || events.connected || gl.domElement)
    const focus = React.useRef()
    
    
    const explCamera = camera || defaultCamera
    
    const controls = React.useMemo(() => new MapControlsImpl(explCamera), [explCamera])
    const lerpTarget = React.useMemo(() => new THREE.Vector3(),[]);
    const lookTarget = React.useMemo(() => new THREE.Vector3(),[]);

    React.useImperativeHandle(ref, () => ({
        focusTo: (target) => {
            focus.current = target
        }
    }))

    React.useEffect(() => {
        controls.connect(explDomElement)
        const callback = (e) => {
          invalidate()
          if (onChange) onChange(e)
        }
        controls.addEventListener('change', callback)
  
        if (onStart) controls.addEventListener('start', onStart)
        if (onEnd) controls.addEventListener('end', onEnd)
  
        return () => {
          controls.dispose()
          controls.removeEventListener('change', callback)
          if (onStart) controls.removeEventListener('start', onStart)
          if (onEnd) controls.removeEventListener('end', onEnd)
        }
      }, [onChange, onStart, onEnd, controls, invalidate, explDomElement])
  
      useFrame((state) => {
        
        if (focus.current) {
            lerpTarget.set(focus.current.x + 0.2, focus.current.y + 0.05 , focus.current.z + 0.2);
            lookTarget.set(focus.current.x, focus.current.y,focus.current.z);

            state.camera.position.lerp(lerpTarget,0.1);
            state.camera.updateProjectionMatrix();
            controls.target = lookTarget
            
            if(state.camera.position.distanceTo(lerpTarget) < 0.0005){
                focus.current = null
            }
        }

        controls.update()
      }, -1)
  
      return <primitive object={controls} enableDamping {...rest} />
})

export default MapControls
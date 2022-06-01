import { useFrame, useThree } from '@react-three/fiber'
import * as React from 'react'
import * as THREE from 'three'
import { MapControls as MapControlsImpl } from 'three-stdlib'

// Implemantasi dari Control yang digunakan mengikuti implementasi yang 
// sama dengan MapControl dari three.js dengan modifikasi tambahan
// fungsi untuk dapat melakukan focus ke pada target dan reset control ke 
// posisi awal
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
            // Set target yang akan di 
            // jadikan focus saat kedai di pilih
            focus.current = target
        },
        resetTo: () => {
          // Reset control kembali ke 
          // initial state yang sudah disimpan
          controls.reset()
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
        
        // Simpan initial state dari control 
        // untuk di gunakan saat reset control
        controls.saveState();

        return () => {
          controls.dispose()
          controls.removeEventListener('change', callback)
          if (onStart) controls.removeEventListener('start', onStart)
          if (onEnd) controls.removeEventListener('end', onEnd)
        }
      }, [onChange, onStart, onEnd, controls, invalidate, explDomElement])
  
      useFrame((state) => {
        
        if (focus.current) {
            lerpTarget.set(focus.current.x + 0.2, focus.current.y + 0.05 , focus.current.z - 0.05);
            lookTarget.set(focus.current.x, focus.current.y,focus.current.z);

            // Gerakan kamera ke posisi di dekat kedai yang dipilih
            state.camera.position.lerp(lerpTarget,0.1);
            state.camera.updateProjectionMatrix();
            
            // Arahkan kamera menghadap ke kedai
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
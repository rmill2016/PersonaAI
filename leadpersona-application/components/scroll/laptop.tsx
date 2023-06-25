'use client'

import React, { useRef } from 'react'
import { useGLTF, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import './laptop.css'

type Props = {}

const Laptop = (props: Props) => {
  const { scene: laptop } = useGLTF('/laptop.glb')

  return (
    <div className="place-items-center grid py-10">
      <Canvas>
        <ambientLight color="white" />
        <pointLight position={[0, 0, 4]} />
        <PerspectiveCamera makeDefault position={[0, -1, 10]} />
        <mesh
          position={[0, -1, 0]}
          rotation={[Math.PI / 5, 0, 0]}
          receiveShadow
        >
          <primitive object={laptop} />
        </mesh>
        <OrbitControls
          enableRotate={false}
          enableZoom={false}
          enableDamping // Enable damping for smoother rotation
          dampingFactor={0.1} // Adjust the damping factor
          rotateSpeed={0.5} // Adjust the rotation speed
          target={[0, 0, 0]} // Set the target for the camera
        />
      </Canvas>
    </div>
  )
}

export default Laptop

'use client'

import React, { useRef } from 'react'
import { useGLTF, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import './laptop.css'

type Props = {}

const Laptop = (props: Props) => {
  const { scene: laptop } = useGLTF('/laptop.glb')

  return (
    <div className="place-items-center grid w-full h-full">
      {/* <Canvas>
        <ambientLight color="white" />
        <pointLight position={[0, 0, 4]} />
        <PerspectiveCamera makeDefault position={[0, -1, 10]} />
        <mesh
          position={[0, -1, 0]}
          rotation={[Math.PI / 8, 0, 0]}
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
      </Canvas> */}
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/reUZRyXxUs4"
        title="LeadPersona AI Video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="video"
      ></iframe>
    </div>
  )
}

export default Laptop

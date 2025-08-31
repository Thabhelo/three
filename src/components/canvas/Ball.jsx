import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Decal,
  Float,
  OrbitControls,
  Preload,
  useTexture,
} from "@react-three/drei";

import CanvasLoader from "../Loader";

const Ball = (props) => {
  const [decal] = useTexture([props.imgUrl]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <Float speed={isMobile ? 0.5 : 1.4} rotationIntensity={isMobile ? 0.4 : 0.8} floatIntensity={isMobile ? 0.8 : 1.4}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[2, 2, 2]} intensity={0.9} />
      <mesh castShadow receiveShadow scale={isMobile ? 1.4 : 1.8}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color={'#f7f7f7'}
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={isMobile ? 0.8 : 1}
          map={decal}
          flatShading
        />
      </mesh>
    </Float>
  );
};

const BallCanvas = ({ icon }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 1]}
      gl={{ 
        preserveDrawingBuffer: true,
        antialias: true,
        alpha: true
      }}
      camera={{ position: [0, 0, 2.5] }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
        />
        {/* Neutral background plane for light mode readability */}
        <mesh position={[0, 0, -1]} receiveShadow>
          <planeGeometry args={[6, 6]} />
          <meshBasicMaterial color={'#ffffff'} transparent opacity={0.0} />
        </mesh>
        <Ball imgUrl={icon} />
      </Suspense>
    </Canvas>
  );
};

export default BallCanvas;

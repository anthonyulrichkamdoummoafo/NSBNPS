import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Environment, 
  Float, 
  Text, 
  Html,
  ContactShadows,
  useGLTF
} from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'motion/react';
import { Navigation2, Globe, Users, BookOpen } from 'lucide-react';

const Building = ({ position, rotation, scale, color, label, details, onSelect }: any) => {
  const [hovered, setHovered] = useState(false);
  
  return (
    <group 
      position={position} 
      rotation={rotation} 
      scale={scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => onSelect({ label, details })}
    >
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial 
          color={hovered ? '#fbbf24' : color} 
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>
      
      {/* Windows */}
      {[0.2, 0.5, 0.8].map((x) => (
        [-0.4, 0, 0.4].map((y) => (
          <mesh position={[0.51, y, x - 0.5]} key={`win-${x}-${y}`}>
            <planeGeometry args={[0.1, 0.2]} />
            <meshStandardMaterial color="#87ceeb" emissive="#87ceeb" emissiveIntensity={hovered ? 2 : 0.5} />
          </mesh>
        ))
      ))}

      {hovered && (
        <Html position={[0, 1.2, 0]} center>
          <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg border border-blue-100 whitespace-nowrap animate-bounce pointer-events-none">
            <p className="text-xs font-bold text-blue-900">{label}</p>
          </div>
        </Html>
      )}
    </group>
  );
};

const Tree = ({ position }: { position: [number, number, number] }) => {
  return (
    <group position={position}>
      <mesh position={[0, 0.4, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.1, 0.8]} />
        <meshStandardMaterial color="#5d4037" />
      </mesh>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh position={[0, 1, 0]} castShadow>
          <coneGeometry args={[0.4, 0.8, 8]} />
          <meshStandardMaterial color="#2e7d32" />
        </mesh>
      </Float>
    </group>
  );
};

const Campus = ({ onSelectBuilding }: { onSelectBuilding: (info: any) => void }) => {
  return (
    <group>
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#a5d6a7" roughness={0.8} />
      </mesh>

      {/* Main Admin Block */}
      <Building 
        position={[0, 0.75, -2]} 
        scale={[3, 1.5, 1.5]} 
        color="#1d4ed8" 
        label="Administration Block"
        details="Offices of the Proprietress, Madame Djoubang Desiree, and the accounting department."
        onSelect={onSelectBuilding}
      />

      {/* Classrooms Left */}
      <Building 
        position={[-3, 0.5, 1]} 
        scale={[2, 1, 1.5]} 
        color="#15803d" 
        label="Nursery Section"
        details="Safe and colorful spaces for our youngest learners to grow and play."
        onSelect={onSelectBuilding}
      />

      {/* Classrooms Right */}
      <Building 
        position={[3, 0.5, 1]} 
        scale={[2, 1, 1.5]} 
        color="#15803d" 
        label="Primary Section"
        details="Well-ventilated classrooms where children master English and French bilingual skills."
        onSelect={onSelectBuilding}
      />

      {/* Playground Area */}
      <group position={[0, 0, 3]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <circleGeometry args={[2, 32]} />
          <meshStandardMaterial color="#ffcc80" />
        </mesh>
        <Tree position={[-1.5, 0, -1.5]} />
        <Tree position={[1.5, 0, -1.5]} />
        <Tree position={[0, 0, 1.5]} />
        <Text
          position={[0, 0.5, 0]}
          fontSize={0.2}
          color="#d84315"
          font="https://fonts.gstatic.com/s/robotoslab/v7/B0lbGU98_93vSwn50N04_j8.woff"
          anchorX="center"
          anchorY="middle"
        >
          Playground
        </Text>
      </group>

      {/* School Bus */}
      <Float speed={5} rotationIntensity={0.2} floatIntensity={0.2}>
        <group position={[5, 0.3, 4]} rotation={[0, -Math.PI / 4, 0]}>
          <mesh castShadow>
            <boxGeometry args={[1.2, 0.6, 0.6]} />
            <meshStandardMaterial color="#fbbf24" />
          </mesh>
          <mesh position={[0.4, 0, 0.3]} castShadow>
            <boxGeometry args={[0.2, 0.1, 0.1]} />
            <meshStandardMaterial color="#333" />
          </mesh>
          <mesh position={[-0.4, -0.3, 0.3]} castShadow>
             <cylinderGeometry args={[0.1, 0.1, 0.1]} rotation={[Math.PI/2, 0, 0]} />
             <meshStandardMaterial color="#000" />
          </mesh>
          <mesh position={[0.4, -0.3, 0.3]} castShadow>
             <cylinderGeometry args={[0.1, 0.1, 0.1]} rotation={[Math.PI/2, 0, 0]} />
             <meshStandardMaterial color="#000" />
          </mesh>
        </group>
      </Float>

      <ContactShadows 
        position={[0, 0, 0]} 
        opacity={0.4} 
        scale={20} 
        blur={2} 
        far={4.5} 
      />
    </group>
  );
};

export default function ThreeScene() {
  const [selectedInfo, setSelectedInfo] = useState<any>(null);

  return (
    <div className="relative w-full h-[600px] md:h-[800px] bg-slate-50 cursor-grab active:cursor-grabbing overflow-hidden rounded-3xl shadow-inner my-8 border border-slate-200">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[10, 10, 10]} fov={35} />
        <OrbitControls 
          enablePan={false} 
          maxPolarAngle={Math.PI / 2.1} 
          minDistance={8}
          maxDistance={15}
          autoRotate
          autoRotateSpeed={0.5}
        />
        
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} castShadow />
        <spotLight position={[-5, 10, 5]} angle={0.2} penumbra={1} intensity={1} castShadow />
        <Environment preset="park" />
        
        <Campus onSelectBuilding={setSelectedInfo} />
      </Canvas>

      {/* Campus HUD */}
      <div className="absolute top-6 left-6 z-10 pointer-events-none">
        <h2 className="text-2xl font-bold text-blue-900 drop-shadow-sm">Interactive Campus</h2>
        <p className="text-blue-600/80 text-sm">Explore our Limbe grounds</p>
      </div>

      <div className="absolute bottom-6 right-6 flex flex-col gap-4 pointer-events-none">
        <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 w-64 ring-1 ring-black/5 animate-in slide-in-from-right duration-500">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <Navigation2 className="w-4 h-4 text-blue-600" /> Guide
          </h3>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            Click on buildings to learn more about our facilities. Drag to rotate the view.
          </p>
        </div>
      </div>

      {/* Info Modal/Overlay */}
      {selectedInfo && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-8 rounded-3xl shadow-2xl max-w-md w-full relative"
          >
            <button 
              onClick={() => setSelectedInfo(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex items-center gap-4 mb-4">
               <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
                  <BookOpen className="w-6 h-6" />
               </div>
               <h3 className="text-2xl font-black text-slate-900">{selectedInfo.label}</h3>
            </div>
            <p className="text-slate-600 mb-6 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
              {selectedInfo.details}
            </p>
            <button 
              onClick={() => setSelectedInfo(null)}
              className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all"
            >
              Continue Exploring
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}

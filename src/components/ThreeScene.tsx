import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Environment, 
  Float, 
  Text, 
  Html,
  ContactShadows,
} from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'motion/react';
import { Navigation2, Globe, Users, BookOpen, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const WebGLContextHandler = () => {
  const { gl } = useThree();
  
  useEffect(() => {
    const handleContextLoss = (event: Event) => {
      event.preventDefault();
      console.warn('WebGL context lost, attempting recovery...');
      // Force canvas recreation
      window.location.reload();
    };
    
    const canvas = gl.domElement;
    canvas.addEventListener('webglcontextlost', handleContextLoss);
    
    return () => {
      canvas.removeEventListener('webglcontextlost', handleContextLoss);
    };
  }, [gl]);
  
  return null;
};

const ShadowConfig = () => {
  const { gl } = useThree();
  gl.shadowMap.type = THREE.PCFShadowMap;
  return null;
};

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
          color={hovered ? '#c0a080' : color} 
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>
      
      {/* Simplified Windows - reduced from 9 to 3 per building */}
      {[0.3, 0.7].map((x) => (
        <mesh position={[0.51, 0, x - 0.5]} key={`win-${x}`}>
          <planeGeometry args={[0.15, 0.3]} />
          <meshStandardMaterial color="#333" emissive="#000" />
        </mesh>
      ))}
      <mesh position={[0.51, 0.3, 0]}>
        <planeGeometry args={[0.15, 0.3]} />
        <meshStandardMaterial color="#333" emissive="#000" />
      </mesh>

      {hovered && (
        <Html position={[0, 1.2, 0]} center>
          <div className="bg-slate-900 border-t-4 border-uniform-red px-4 py-2 rounded-xl shadow-2xl whitespace-nowrap animate-bounce pointer-events-none">
            <p className="text-[10px] font-black text-white uppercase tracking-widest leading-none">{label}</p>
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
        <cylinderGeometry args={[0.03, 0.08, 0.8]} />
        <meshStandardMaterial color="#3e2723" />
      </mesh>
      <Float speed={3} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh position={[0, 1, 0]} castShadow>
          <sphereGeometry args={[0.3, 8, 8]} />
          <meshStandardMaterial color="#1b5e20" />
        </mesh>
      </Float>
    </group>
  );
};

const Campus = ({ onSelectBuilding }: { onSelectBuilding: (info: any) => void }) => {
  const { lang, t } = useLanguage();
  
  return (
    <group>
      {/* Ground - Richer soil/grass */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#2e7d32" roughness={1} />
      </mesh>

      {/* Main Admin Block - Red Accent */}
      <Building 
        position={[0, 0.75, -2]} 
        scale={[3, 1.5, 1.5]} 
        color="#8b1a1a" 
        label={lang === 'EN' ? "Administration Block" : "Bâtiment Administratif"}
        details={t.about.quote}
        onSelect={onSelectBuilding}
      />

      {/* Classrooms Left - Navy Accent */}
      <Building 
        position={[-3, 0.5, 1]} 
        scale={[2, 1, 1.5]} 
        color="#1e293b" 
        label={t.academics.nursery}
        details={t.academics.nursery_desc}
        onSelect={onSelectBuilding}
      />

      {/* Classrooms Right - Navy Accent */}
      <Building 
        position={[3, 0.5, 1]} 
        scale={[2, 1, 1.5]} 
        color="#1e293b" 
        label={t.academics.primary}
        details={t.academics.primary_desc}
        onSelect={onSelectBuilding}
      />

      {/* Playground Area - Volcanic Sand feel */}
      <group position={[0, 0, 3]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <circleGeometry args={[2.5, 32]} />
          <meshStandardMaterial color="#424242" />
        </mesh>
        <Tree position={[-1.8, 0, -1.8]} />
        <Tree position={[1.8, 0, -1.8]} />
        <Tree position={[0, 0, 1.8]} />
        <Text
          position={[0, 0.1, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.2}
          color="#fcd116"
          anchorX="center"
          anchorY="middle"
        >
          {lang === 'EN' ? "Assembly Ground" : "Terrain de Rassemblement"}
        </Text>
      </group>

      {/* School Bus - Cameroon Yellow */}
      <Float speed={4} rotationIntensity={0.1} floatIntensity={0.2}>
        <group position={[5, 0.3, 4]} rotation={[0, -Math.PI / 4, 0]}>
          <mesh castShadow>
            <boxGeometry args={[1.4, 0.7, 0.7]} />
            <meshStandardMaterial color="#fcd116" />
          </mesh>
          <mesh position={[-0.4, -0.3, 0.35]} rotation={[Math.PI/2, 0, 0]} castShadow>
             <cylinderGeometry args={[0.12, 0.12, 0.1]} />
             <meshStandardMaterial color="#000" />
          </mesh>
          <mesh position={[0.4, -0.3, 0.35]} rotation={[Math.PI/2, 0, 0]} castShadow>
             <cylinderGeometry args={[0.12, 0.12, 0.1]} />
             <meshStandardMaterial color="#000" />
          </mesh>
        </group>
      </Float>

      <ContactShadows 
        position={[0, 0, 0]} 
        opacity={0.6} 
        scale={25} 
        blur={2.5} 
        far={5} 
      />
    </group>
  );
};

export default function ThreeScene() {
  const [selectedInfo, setSelectedInfo] = useState<any>(null);
  const [contextLost, setContextLost] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const { lang } = useLanguage();

  useEffect(() => {
    return () => {
      // forces GL context release on unmount
    };
  }, []);

  const handleCanvasError = () => {
    setContextLost(true);
    setRetryCount(prev => prev + 1);
  };

  const handleRetry = () => {
    setContextLost(false);
    setRetryCount(0);
  };

  if (contextLost && retryCount > 2) {
    return (
      <div className="relative w-full h-[600px] md:h-[900px] bg-[#fdfaf6] rounded-[2.5rem] shadow-2xl my-12 border-8 border-slate-900 flex items-center justify-center">
        <div className="text-center p-8">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-2xl font-black text-slate-900 mb-4">
            {lang === 'EN' ? '3D Scene Unavailable' : 'Scène 3D Indisponible'}
          </h3>
          <p className="text-slate-600 mb-6">
            {lang === 'EN' 
              ? 'The 3D campus tour could not load. This may be due to graphics limitations.'
              : 'La visite du campus 3D n\'a pas pu charger. Ceci peut être dû à des limitations graphiques.'}
          </p>
          <button 
            onClick={handleRetry}
            className="african-btn"
          >
            {lang === 'EN' ? 'Try Again' : 'Réessayer'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[600px] md:h-[900px] bg-[#fdfaf6] cursor-grab active:cursor-grabbing overflow-hidden rounded-[2.5rem] shadow-2xl my-12 border-8 border-slate-900">
      <Canvas
        shadows
        dpr={[1, 1.2]}  // Further reduced to minimize context loss
        gl={{
          preserveDrawingBuffer: false, // Changed to false to reduce memory
          antialias: false, // Disable antialiasing to reduce GPU load
          powerPreference: "default", // Changed from high-performance
          failIfMajorPerformanceCaveat: false, // Allow fallback rendering
        }}
        onError={handleCanvasError}
      >
        <WebGLContextHandler />
        <ShadowConfig />
        <PerspectiveCamera makeDefault position={[12, 12, 12]} fov={30} />
        <OrbitControls 
          enablePan={false} 
          maxPolarAngle={Math.PI / 2.2} 
          minDistance={10}
          maxDistance={20}
          autoRotate
          autoRotateSpeed={0.3}
        />
        
        <ambientLight intensity={0.7} />
        <directionalLight 
          position={[10, 20, 10]} 
          intensity={2} 
          castShadow 
          shadow-mapSize={[2048, 2048]}
        />
        <Environment preset="forest" />
        
        <Campus onSelectBuilding={setSelectedInfo} />
      </Canvas>

      {/* Campus HUD */}
      <div className="absolute top-10 left-10 z-10 pointer-events-none">
        <h2 className="text-4xl font-serif font-black text-slate-900 leading-none">
          {lang === 'EN' ? "The Academy" : "L'Académie"}
        </h2>
        <p className="text-uniform-red text-sm font-black uppercase tracking-widest mt-2">
          {lang === 'EN' ? "Isokolo Village Campus" : "Campus du Village Isokolo"}
        </p>
      </div>

      <div className="absolute bottom-10 right-10 flex flex-col gap-4 pointer-events-none">
        <div className="bg-slate-900 p-6 rounded-2xl shadow-2xl border-l-4 border-uniform-red w-64 ring-1 ring-black/5 animate-in slide-in-from-right duration-500">
          <h3 className="font-serif font-black text-white flex items-center gap-2">
            <Navigation2 className="w-4 h-4 text-uniform-red" /> 
            {lang === 'EN' ? "Interactive Tour" : "Visite Interactive"}
          </h3>
          <p className="text-[10px] text-slate-400 mt-2 uppercase font-black tracking-widest leading-loose">
            {lang === 'EN' 
              ? "Tap the colorful buildings to explore our standard facilities."
              : "Appuyez sur les bâtiments colorés pour explorer nos installations."}
          </p>
        </div>
      </div>

      {/* Info Modal/Overlay */}
      {selectedInfo && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-10 rounded-[2rem] shadow-2xl max-w-md w-full relative border-t-[12px] border-uniform-red"
          >
            <button 
              onClick={() => setSelectedInfo(null)}
              className="absolute top-6 right-6 text-slate-300 hover:text-slate-900 transition-colors"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex items-center gap-4 mb-6">
               <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-uniform-red">
                  <BookOpen className="w-8 h-8" />
               </div>
               <h3 className="text-3xl font-serif font-black text-slate-900">{selectedInfo.label}</h3>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border-2 border-slate-100 mb-8">
              <p className="text-slate-700 leading-relaxed font-bold">
                {selectedInfo.details}
              </p>
            </div>
            <button 
              onClick={() => setSelectedInfo(null)}
              className="african-btn w-full flex items-center justify-center gap-2"
            >
              {lang === 'EN' ? "Close Window" : "Fermer la Fenêtre"}
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}

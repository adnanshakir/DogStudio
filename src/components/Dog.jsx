import * as THREE from "three";
import { OrbitControls, useGLTF, useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { sample } from "three/tsl";

const Dog = () => {
  const model = useGLTF("/models/dog.drc.glb");

  useThree(({ camera, gl, scene }) => {
    camera.position.z = 0.6;
    gl.toneMapping = THREE.ReinhardToneMapping;
    gl.outputColorSpace = THREE.SRGBColorSpace;
  });

  const textures = useTexture({
    normalMap:"models/dog_normals.jpg",
    sampleMatCap:"/matcap/mat-2.png"
  })

  textures.normalMap.flipY = false
  textures.sampleMatCap.colorSpace = THREE.SRGBColorSpace

  model.scene.traverse((child) => {
    if(child.name.includes("DOG")){
      child.material = new THREE.MeshMatcapMaterial({
        normalMap:textures.normalMap,
        matcap:textures.sampleMatCap
      })
    }
  })


  return (
    <>
      <primitive
        object={model.scene}
        position={[.2, -0.72, .1]}
        rotation={[0, Math.PI/4.8, 0]}
        scale={1.2}
      />
      <directionalLight position={[0, 5, 5]} color={0xfff} intensity={10} />
      <OrbitControls />
    </>
  );
};

export default Dog;

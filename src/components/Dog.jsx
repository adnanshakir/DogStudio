import * as THREE from "three";
import {
  OrbitControls,
  useGLTF,
  useTexture,
  useAnimations,
} from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { sample, texture } from "three/tsl";
import { useEffect } from "react";

const Dog = () => {
  const model = useGLTF("/models/dog.drc.glb");

  useThree(({ camera, gl, scene }) => {
    camera.position.z = 0.6;
    gl.toneMapping = THREE.ReinhardToneMapping;
    gl.outputColorSpace = THREE.SRGBColorSpace;
  });

  const { actions } = useAnimations(model.animations, model.scene);

  useEffect(() => {
    actions["Take 001"].play();
  }, [actions]);

  const [normalMap, sampleMatCap, branchMap, branchNormalMap] = useTexture([
    "models/dog_normals.jpg",
    "/matcap/mat-1.png",
    "/models/branches_diffuse.jpg",
    "/models/branches_normals.jpg",
  ]).map((texture) => {
    texture.flipY = false;
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  });

  const dogMaterial = new THREE.MeshMatcapMaterial({
    normalMap: normalMap,
    matcap: sampleMatCap,
  });

  const brachMaterial = new THREE.MeshMatcapMaterial({
    normalMap: normalMap,
    map: branchMap,
  });

  model.scene.traverse((child) => {
    if (child.name.includes("DOG")) {
      child.material = dogMaterial;
    } else child.material = brachMaterial;
  });

  return (
    <>
      <primitive
        object={model.scene}
        position={[0.2, -0.72, 0.1]}
        rotation={[0, Math.PI / 4.8, 0]}
        scale={1.2}
      />
      <directionalLight position={[0, 5, 5]} color={0xfff} intensity={10} />
      {/* <OrbitControls /> */}
    </>
  );
};

export default Dog;

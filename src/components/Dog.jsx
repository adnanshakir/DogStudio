import { OrbitControls, useGLTF } from "@react-three/drei";
import React from "react";
import { useThree } from "@react-three/fiber";

const Dog = () => {
  const model = useGLTF("/models/dog.drc.glb");

  useThree(({ camera, gl, scene }) => {
    camera.position.z = 0.6;
    console.log(camera.position);
  });

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

import * as THREE from "three";
import {
  OrbitControls,
  useGLTF,
  useTexture,
  useAnimations,
} from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { sample, texture } from "three/tsl";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Dog = () => {
  gsap.registerPlugin(useGSAP());
  gsap.registerPlugin(ScrollTrigger);

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

  const dogModel = useRef(model);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#section-1",
        endTrigger: "#section-3",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    tl.to(dogModel.current.scene.position, {
      z: "-=0.75",
      y: "+=0.1",
    })
      .to(dogModel.current.scene.rotation, {
        x: `+=${Math.PI / 15}`,
        y: `+=${Math.PI / 20}`,
      })
      .to(
        dogModel.current.scene.rotation,
        {
          x: `+=${Math.PI / 40}`,
          y: `-=${Math.PI}`,
        },
        "third",
      )
      .to(
        dogModel.current.scene.position,
        {
          x: "-=0.5",
          z: "+=0.5",
          y: "+=0.02",
        },
        "third",
      );
  }, []);

  return (
    <>
      <primitive
        object={model.scene}
        position={[0.2, -0.6, .2]}
        rotation={[0, Math.PI / 6, 0]}
        scale={1}
      />
      <directionalLight position={[0, 5, 5]} color={0xfff} intensity={10} />
      {/* <OrbitControls /> */}
    </>
  );
};

export default Dog;

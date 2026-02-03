import { Canvas } from "@react-three/fiber";
import Dog from "./components/Dog";

const App = () => {
  return (
    <main className="relative">
      <Canvas style={{
            height: "100vh",
            width: "100vw",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 1,
            backgroundImage: "url(/background-xl.png)",
            objectPosition: "cover",
            backgroundRepeat:"no-repeat"
          }}>
        <Dog />
      </Canvas>

      <section id="section-1" className="min-h-screen relative z-10 border border-black" />
      <section id="section-2" className="min-h-screen relative z-10 border border-black" />
      <section id="section-3" className="min-h-screen relative z-10 border border-black" />
    </main>
  );
};

export default App;

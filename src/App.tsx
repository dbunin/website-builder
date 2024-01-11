import { Canvas } from "./components/canvas";
import { ComponentList } from "./components/component-list";

function App() {
  return (
    <div className="flex h-screen">
      <div className="flex flex-1 overflow-hidden">
        <ComponentList />
        <Canvas />
      </div>
    </div>
  );
}

export default App;

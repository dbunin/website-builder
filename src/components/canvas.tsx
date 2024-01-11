import { idToChildrenFamily } from "@/state";
import { useAtomValue } from "jotai";
import { useMemo } from "react";
import { Block } from "./block";

export const Canvas = () => {
  const valueAtom = useMemo(() => idToChildrenFamily(undefined), []);
  const canvasBlocks = useAtomValue(valueAtom);

  return (
    <div id="canvas" className="flex relative flex-col p-1 grow border h-full">
      {canvasBlocks.map((block) => (
        <Block key={block.id} blockId={block.id} />
      ))}
    </div>
  );
};

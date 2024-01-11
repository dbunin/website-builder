import { atom } from "jotai";
import { atomFamily } from "jotai/utils";
import { v4 as uuidv4 } from "uuid";

export type BlockTypes = "text" | "container" | "image";

export type ContainerBlock = {
  type: "container";
  width: number;
  height: number;
  parentId?: string;
};

export type ImageBlock = {
  type: "image";
  source: string;
  width: number;
  height: number;
  parentId?: string;
};

export type TextBlock = {
  type: "text";
  content: string;
  fontSize: number;
  parentId?: string;
};

export type Absolute = {
  position: "absolute";
  top: number;
  bottom: number;
  right: number;
  left: number;
};

export type Relative = {
  position: "relative";
};

export type BlockObject = {
  id: string;
  type: ContainerBlock | ImageBlock | TextBlock;
  position: Absolute | Relative;
};

export type CanvasState = Array<BlockObject>;

const getInitialContainer = (parentId: string | undefined): BlockObject => {
  return {
    id: uuidv4(),
    type: {
      type: "container",
      width: 200,
      height: 300,
      parentId: parentId,
    },
    position: {
      position: "relative",
    },
  };
};

const getInitialImage = (parentId: string | undefined): BlockObject => {
  return {
    id: uuidv4(),
    type: {
      type: "image",
      source:
        "https://png.pngtree.com/png-vector/20191126/ourmid/pngtree-image-of-cute-radish-vector-or-color-illustration-png-image_2040180.jpg",
      width: 200,
      height: 300,
      parentId: parentId,
    },
    position: {
      position: "relative",
    },
  };
};

const getInitialText = (parentId: string | undefined): BlockObject => {
  return {
    id: uuidv4(),
    type: {
      type: "text",
      content: "New text",
      fontSize: 14,
      parentId: parentId,
    },
    position: {
      position: "relative",
    },
  };
};

export const getInitialBlock = (
  blockType: BlockTypes,
  parentId: string | undefined,
): BlockObject => {
  if (blockType === "image") return getInitialImage(parentId);
  if (blockType === "text") return getInitialText(parentId);
  return getInitialContainer(parentId);
};

const initialState: CanvasState = [
  getInitialContainer(undefined),
  {
    id: "2",
    type: {
      type: "container",
      width: 100,
      height: 100,
      parentId: "1",
    },
    position: {
      position: "relative",
    },
  },
  {
    id: "3",
    type: {
      type: "text",
      content: "hello world",
      fontSize: 14,
    },
    position: {
      position: "relative",
    },
  },
  {
    id: "4",
    type: {
      type: "text",
      content: "hello world",
      fontSize: 14,
      parentId: "2",
    },
    position: {
      position: "relative",
    },
  },
  {
    id: "5",
    type: {
      type: "container",
      width: 200,
      height: 300,
    },
    position: {
      position: "relative",
    },
  },
];
const canvasAtom = atom(initialState);
export const activeBlock = atom<null | string>(null);

const idsToBlockAtom = atom<
  Record<string, BlockObject>,
  [Record<string, BlockObject>],
  void
>(
  (get) => {
    const canvas = get(canvasAtom);
    return canvas.reduce((acc, block) => ({ ...acc, [block.id]: block }), {});
  },
  (_get, set, newBlocks) => {
    set(canvasAtom, Object.values(newBlocks));
  },
);

export const idToBlockFamily = atomFamily((id: string) =>
  atom(
    (get) => get(idsToBlockAtom)[id],
    (get, set, newBlock: BlockObject | null) => {
      const prev = get(idsToBlockAtom);
      if (newBlock) {
        set(idsToBlockAtom, { ...prev, [id]: newBlock });
      } else {
        delete prev[id];
        const newBlocks = Object.values(prev)
          .map((block) =>
            block.type.parentId === id
              ? { ...block, type: { ...block.type, parentId: undefined } }
              : block,
          )
          .reduce((acc, block) => ({ ...acc, [block.id]: block }), {});
        set(idsToBlockAtom, newBlocks);
        // TODO clean up family atoms on delete
      }
    },
  ),
);

export const idToChildrenFamily = atomFamily((id: string | undefined) =>
  atom(
    (get) => get(canvasAtom).filter((block) => block.type.parentId === id),
    (get, set, newBlocks: Array<BlockObject>) => {
      const prev = get(canvasAtom);
      set(canvasAtom, [
        ...prev.filter((block) => block.type.parentId !== id),
        ...newBlocks,
      ]);
    },
  ),
);

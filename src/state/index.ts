import { atom } from "jotai";
import { atomFamily } from "jotai/utils";
import { v4 as uuidv4 } from "uuid";

export type BlockTypes = "text" | "container" | "image";

export type ContainerBlock = {
  type: "container";
  parentId?: string;
};

export type ImageBlock = {
  type: "image";
  source: string;
  parentId?: string;
};

export type TextBlock = {
  type: "text";
  content: string;
  fontSize: string;
  color: string;
  textDecoration: "normal" | "italic" | "bold" | "strikethrough";
  parentId?: string;
};

const getInitialAbsolutePosition = (): Absolute => {
  return {
    position: "absolute",
    top: "0px",
    bottom: "auto",
    right: "auto",
    left: "0px",
  };
};

const getInitialFixedPosition = (): Fixed => {
  return {
    position: "fixed",
    top: "0px",
    bottom: "auto",
    right: "auto",
    left: "0px",
  };
};

const getInitialRelativePosition = (): Relative => {
  return {
    position: "relative",
  };
};

export const getInitialPosition = (position: Positions) => {
  if (position === "absolute") return getInitialAbsolutePosition();
  if (position === "fixed") return getInitialFixedPosition();
  return getInitialRelativePosition();
};

export type Size = {
  width: string;
  height: string;
};

export type Positions = "absolute" | "fixed" | "relative";

export type Fixed = {
  position: "fixed";
  top: string;
  bottom: string;
  right: string;
  left: string;
};

export type Absolute = {
  position: "absolute";
  top: string;
  bottom: string;
  right: string;
  left: string;
};

export type Relative = {
  position: "relative";
};

export const getInitialLayout = (): Layout => ({
  display: "flex",
  direction: "row",
  reverse: false,
  justifyContent: "normal",
  align: "flex-start",
  gap: "0px",
});

export type Layout = {
  display: "flex";
  direction: "column" | "row";
  reverse: boolean;
  justifyContent:
    | "normal"
    | "start"
    | "end"
    | "center"
    | "between"
    | "around"
    | "evenly";
  align: "flex-start" | "flex-end" | "center";
  gap: string;
};

export type BlockObject = {
  id: string;
  size: Size;
  layout: Layout;
  // think about naming. type.type seems yikes, and position.position too.
  type: ContainerBlock | ImageBlock | TextBlock;
  position: Absolute | Relative | Fixed;
};

export type CanvasState = Array<BlockObject>;

const getInitialContainer = (parentId: string | undefined): BlockObject => {
  return {
    id: uuidv4(),
    size: {
      width: "100%",
      height: "300px",
    },
    type: {
      type: "container",
      parentId: parentId,
    },
    layout: getInitialLayout(),
    position: {
      position: "relative",
    },
  };
};

const getInitialImage = (parentId: string | undefined): BlockObject => {
  return {
    id: uuidv4(),
    size: {
      width: "auto",
      height: "auto",
    },
    layout: getInitialLayout(),
    type: {
      type: "image",
      source:
        "https://png.pngtree.com/png-vector/20191126/ourmid/pngtree-image-of-cute-radish-vector-or-color-illustration-png-image_2040180.jpg",
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
    size: {
      width: "100%",
      height: "auto",
    },
    layout: getInitialLayout(),
    type: {
      type: "text",
      content: "New text",
      fontSize: "14px",
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
    size: {
      width: "100px",
      height: "100px",
    },
    layout: getInitialLayout(),
    type: {
      type: "container",
      parentId: "1",
    },
    position: {
      position: "relative",
    },
  },
  {
    id: "3",
    size: {
      width: "100%",
      height: "20px",
    },
    layout: getInitialLayout(),
    type: {
      type: "text",
      content: "hello world",
      fontSize: "14px",
    },
    position: {
      position: "relative",
    },
  },
  {
    id: "4",
    size: {
      width: "100%",
      height: "20px",
    },
    layout: getInitialLayout(),
    type: {
      type: "text",
      content: "hello world",
      fontSize: "14px",
      parentId: "2",
    },
    position: {
      position: "relative",
    },
  },
  {
    id: "5",
    size: {
      width: "200px",
      height: "300px",
    },
    layout: getInitialLayout(),
    type: {
      type: "container",
    },
    position: {
      position: "relative",
    },
  },
];
const canvasAtom = atom(initialState);
export const activeBlockId = atom<null | string>(null);

export const activeBlock = atom(
  (get) => {
    const blockId = get(activeBlockId);
    const blocks = get(canvasAtom);

    return blocks.find((block) => block.id === blockId);
  },
  (get, set, newBlock: BlockObject) => {
    const canvas = get(canvasAtom);
    set(
      canvasAtom,
      canvas.map((block) => (block.id === newBlock.id ? newBlock : block)),
    );
  },
);

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
      if (newBlock) {
        const prev = get(idsToBlockAtom);
        prev[id] = newBlock;
        set(idsToBlockAtom, prev);
      } else {
        const prev = get(canvasAtom);
        const newBlocks = prev
          .filter((block) => block.id !== id)
          .map((block) =>
            block.type.parentId === id
              ? { ...block, type: { ...block.type, parentId: undefined } }
              : block,
          );
        set(canvasAtom, newBlocks);
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

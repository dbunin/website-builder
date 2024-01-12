import {
  Absolute,
  Fixed,
  ImageBlock,
  Layout,
  Relative,
  Size,
  TextBlock,
  activeBlockId,
  idToBlockFamily,
  idToChildrenFamily,
} from "@/state";
import { useAtom, useAtomValue } from "jotai";
import { useMemo } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "./ui/context-menu";

const BlockContextMenu = ({
  trigger,
  onDelete,
}: {
  trigger: JSX.Element;
  onDelete: () => void;
}) => (
  <ContextMenu>
    <ContextMenuTrigger>{trigger}</ContextMenuTrigger>
    <ContextMenuContent>
      <ContextMenuItem onClick={onDelete}>Delete</ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
);
const Text = ({
  block,
  position,
  size,
  isActive,
  onClick,
  onDelete,
}: {
  block: TextBlock;
  position: Absolute | Relative | Fixed;
  size: Size;
  isActive: boolean;
  onClick: (e: React.FormEvent<HTMLParagraphElement>) => void;
  onDelete: () => void;
}) => {
  const textDecorationStyles = {
    fontWeight: block.textDecoration === "bold" ? "bold" : "",
    fontStyle: block.textDecoration === "italic" ? "italic" : "",
    textDecoration: block.textDecoration === "strikethrough" ? "underline" : "",
  };
  return (
    <BlockContextMenu
      onDelete={onDelete}
      trigger={
        <p
          className="data-[active=true]:border-primary data-[active=true]:border-4"
          data-active={isActive}
          onClick={onClick}
          style={{
            ...position,
            fontSize: block.fontSize,
            height: size.height,
            width: size.width,
            ...textDecorationStyles,
          }}
        >
          {block.content}
        </p>
      }
    />
  );
};

const Image = ({
  block,
  position,
  size,
  isActive,
  onClick,
  onDelete,
}: {
  block: ImageBlock;
  size: Size;
  position: Absolute | Relative | Fixed;
  isActive: boolean;
  onClick: (e: React.FormEvent<HTMLImageElement>) => void;
  onDelete: () => void;
}) => (
  <BlockContextMenu
    onDelete={onDelete}
    trigger={
      <img
        style={{
          ...position,
          height: size.height,
          width: size.width,
        }}
        src={block.source}
        className="data-[active=true]:border-primary data-[active=true]:border-4"
        data-active={isActive}
        onClick={onClick}
      />
    }
  />
);

const Container = ({
  position,
  size,
  id,
  layout,
  isActive,
  onClick,
  onDelete,
}: {
  position: Absolute | Relative | Fixed;
  size: Size;
  id: string;
  layout: Layout;
  isActive: boolean;
  onClick: (e: React.FormEvent<HTMLDivElement>) => void;
  onDelete: () => void;
}) => {
  const childrenAtom = useMemo(() => idToChildrenFamily(id), [id]);
  const children = useAtomValue(childrenAtom);
  return (
    <BlockContextMenu
      onDelete={onDelete}
      trigger={
        <div
          className="data-[active=true]:border-primary data-[active=true]:border-4"
          data-active={isActive}
          onClick={onClick}
          style={{
            ...position,
            // layout
            display: layout.display,
            flexDirection: layout.reverse
              ? `${layout.direction}-reverse`
              : layout.direction,
            justifyContent: layout.justifyContent,
            alignItems: layout.align,
            gap: layout.gap,

            // size
            width: size.width,
            height: size.height,

            // styles
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          {children.map((child) => (
            <Block blockId={child.id} />
          ))}
        </div>
      }
    />
  );
};

const typeToComponent = {
  text: Text,
  container: Container,
  image: Image,
} as const;

export const Block = ({ blockId }: { blockId: string }) => {
  const valueAtom = useMemo(() => idToBlockFamily(blockId), [blockId]);
  const [block, setBlock] = useAtom(valueAtom);
  const BlockComponent = typeToComponent[block.type.type];
  const [active, setActive] = useAtom(activeBlockId);

  return (
    <BlockComponent
      id={blockId}
      // @ts-expect-error: TODO: figure out how to do typeToComponent in ts
      block={block.type}
      size={block.size}
      position={block.position}
      layout={block.layout}
      isActive={active === blockId}
      onDelete={() => setBlock(null)}
      onClick={(e) => {
        e.stopPropagation();
        setActive(blockId);
      }}
    />
  );
};

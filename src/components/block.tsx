import {
  Absolute,
  ContainerBlock,
  Fixed,
  ImageBlock,
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
}) => (
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
        }}
      >
        {block.content}
      </p>
    }
  />
);

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
  isActive,
  onClick,
  onDelete,
}: {
  position: Absolute | Relative | Fixed;
  size: Size;
  id: string;
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
            width: size.width,
            height: size.height,
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
      block={block.type}
      size={block.size}
      position={block.position}
      isActive={active === blockId}
      onDelete={() => setBlock(null)}
      onClick={(e) => {
        e.stopPropagation();
        setActive(blockId);
      }}
    />
  );
};

import {
  ContainerBlock,
  ImageBlock,
  TextBlock,
  activeBlock,
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
  isActive,
  onClick,
  onDelete,
}: {
  block: TextBlock;
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
      >
        {block.content}
      </p>
    }
  />
);

const Image = ({
  block,
  isActive,
  onClick,
  onDelete,
}: {
  block: ImageBlock;
  isActive: boolean;
  onClick: (e: React.FormEvent<HTMLImageElement>) => void;
  onDelete: () => void;
}) => (
  <BlockContextMenu
    onDelete={onDelete}
    trigger={
      <img
        src="https://png.pngtree.com/png-vector/20191126/ourmid/pngtree-image-of-cute-radish-vector-or-color-illustration-png-image_2040180.jpg"
        className="data-[active=true]:border-primary data-[active=true]:border-4"
        data-active={isActive}
        onClick={onClick}
      />
    }
  />
);

const Container = ({
  block,
  id,
  isActive,
  onClick,
  onDelete,
}: {
  block: ContainerBlock;
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
            position: `relative`,
            width: `${block.width}px`,
            height: `${block.height}px`,
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
  const [active, setActive] = useAtom(activeBlock);

  return (
    <BlockComponent
      id={blockId}
      block={block.type}
      isActive={active === blockId}
      onDelete={() => setBlock(null)}
      onClick={(e) => {
        e.stopPropagation();
        setActive(blockId);
      }}
    />
  );
};

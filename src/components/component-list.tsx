import {
  BlockTypes,
  activeBlockId,
  getInitialBlock,
  idToBlockFamily,
  idToChildrenFamily,
} from "@/state";
import { useAtom } from "jotai";
import { useMemo, useState } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@radix-ui/react-icons";

import { Button } from "./ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "./ui/context-menu";

const ListItem = ({
  childrenIds,
  blockId,
  label,
  type,
  onDelete,
  onAdd,
}: {
  childrenIds: string[];
  blockId: string | null;
  label: string;
  type: BlockTypes;
  onDelete?: () => void;
  onAdd: (blockType: BlockTypes) => void;
}) => {
  const [expanded, setExpanded] = useState(true);
  const [active, setActive] = useAtom(activeBlockId);
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <li>
          <div
            onClick={() => setActive(blockId)}
            className="flex gap-1 items-center rounded-md border border-transparent pr-3 py-2 data-[active=true]:border-border data-[open=true]:bg-muted"
            data-open={expanded && childrenIds.length}
            data-active={active === blockId}
          >
            {childrenIds.length > 0 ? (
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  return setExpanded((expanded) => !expanded);
                }}
              >
                {expanded ? (
                  <ChevronUpIcon className="h-2 w-2" />
                ) : (
                  <ChevronDownIcon className="h-2 w-2" />
                )}
              </Button>
            ) : (
              <div className="h-4 w-4"></div>
            )}
            <span className="text-xs text-muted-foreground cursor-default flex-1">
              {label}
            </span>
          </div>
          {childrenIds.length > 0 && expanded && (
            <ul className="pl-4">
              {childrenIds.map((blockId) => (
                <Component blockId={blockId} />
              ))}
            </ul>
          )}
        </li>
      </ContextMenuTrigger>
      <ContextMenuContent>
        {type === "container" && (
          <ContextMenuSub>
            <ContextMenuSubTrigger>Add block</ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48">
              <ContextMenuItem onClick={() => onAdd("container")}>
                Container
              </ContextMenuItem>
              <ContextMenuItem onClick={() => onAdd("image")}>
                Image
              </ContextMenuItem>
              <ContextMenuItem onClick={() => onAdd("text")}>
                Text
              </ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
        )}
        {onDelete && (
          <ContextMenuItem onClick={onDelete}>Delete</ContextMenuItem>
        )}
      </ContextMenuContent>
    </ContextMenu>
  );
};

const Component = ({ blockId }: { blockId: string }) => {
  const valueAtom = useMemo(() => idToBlockFamily(blockId), [blockId]);
  const [block, setBlock] = useAtom(valueAtom);
  const childrenAtom = useMemo(() => idToChildrenFamily(blockId), [blockId]);
  const [children, setChildren] = useAtom(childrenAtom);

  return (
    <ListItem
      childrenIds={children.map((child) => child.id)}
      onDelete={() => setBlock(null)}
      onAdd={(blockType: BlockTypes) =>
        setChildren([...children, getInitialBlock(blockType, block.id)])
      }
      type={block.type.type}
      blockId={blockId}
      label={`${block.type.type}-${blockId}`}
    />
  );
};

export const ComponentList = () => {
  const valueAtom = useMemo(() => idToChildrenFamily(undefined), []);
  const [canvasBlocks, setCanvasBlocks] = useAtom(valueAtom);

  return (
    <div className="w-[240px] overflow-hidden border-r">
      <div id="component-list" className="flex h-full overflow-scroll p-1">
        <ul className="w-full">
          <ListItem
            blockId={null}
            childrenIds={canvasBlocks.map((child) => child.id)}
            label="Root"
            onAdd={(blockType: BlockTypes) =>
              setCanvasBlocks([
                ...canvasBlocks,
                getInitialBlock(blockType, undefined),
              ])
            }
            type="container"
          />
        </ul>
      </div>
    </div>
  );
};

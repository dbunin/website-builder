import {
  Absolute,
  ImageBlock,
  Positions,
  Relative,
  TextBlock,
  activeBlock,
  getInitialPosition,
} from "@/state";
import { useAtom, useAtomValue } from "jotai";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const DataTab = () => {
  const [block, setBlock] = useAtom(activeBlock);

  if (typeof block === "undefined") return null;
  return (
    <TabsContent value="data">
      <Card>
        <CardHeader>
          <CardTitle>Content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {block.type.type === "text" && (
            <div className="space-y-1">
              <Input
                id="content"
                value={block.type.content}
                onChange={(e) => {
                  setBlock({
                    ...block,
                    type: {
                      ...block.type,
                      content: e.target.value,
                    } as TextBlock,
                  });
                }}
              />
            </div>
          )}
          {block?.type.type === "image" && (
            <div className="space-y-1">
              <Input
                id="new"
                value={block.type.source}
                onChange={(e) => {
                  setBlock({
                    ...block,
                    type: {
                      ...block.type,
                      source: e.target.value,
                    } as ImageBlock,
                  });
                }}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </TabsContent>
  );
};

const DesignTab = () => {
  const [block, setBlock] = useAtom(activeBlock);

  if (typeof block === "undefined") return null;
  return (
    <TabsContent value="design" className="flex flex-col gap-2">
      <Card>
        <CardHeader>
          <CardTitle>Position</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label>Email</Label>
            <Select
              onValueChange={(position: Positions) => {
                setBlock({
                  ...block,
                  position: getInitialPosition(position),
                });
              }}
              defaultValue={block.position.position}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="absolute">Absolute</SelectItem>
                <SelectItem value="fixed">Fixed</SelectItem>
                <SelectItem value="relative">Relative</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {(block.position.position === "absolute" ||
            block.position.position === "fixed") && (
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label>Top</Label>
                <Input
                  value={block.position.top}
                  onChange={(e) => {
                    setBlock({
                      ...block,
                      position: {
                        ...block.position,
                        top: e.target.value,
                      } as Absolute | Relative,
                    });
                  }}
                />
              </div>
              <div className="space-y-1">
                <Label>Bottom</Label>
                <Input
                  value={block.position.bottom}
                  onChange={(e) => {
                    setBlock({
                      ...block,
                      position: {
                        ...block.position,
                        bottom: e.target.value,
                      } as Absolute | Relative,
                    });
                  }}
                />
              </div>
              <div className="space-y-1">
                <Label>Right</Label>
                <Input
                  value={block.position.right}
                  onChange={(e) => {
                    setBlock({
                      ...block,
                      position: {
                        ...block.position,
                        right: e.target.value,
                      } as Absolute | Relative,
                    });
                  }}
                />
              </div>
              <div className="space-y-1">
                <Label>Left</Label>
                <Input
                  value={block.position.left}
                  onChange={(e) => {
                    setBlock({
                      ...block,
                      position: {
                        ...block.position,
                        left: e.target.value,
                      } as Absolute | Relative,
                    });
                  }}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Size</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label>Width</Label>
            <Input
              id="width"
              value={block.size.width}
              onChange={(e) => {
                setBlock({
                  ...block,
                  size: {
                    ...block.size,
                    width: e.target.value,
                  },
                });
              }}
            />
          </div>
          <div className="space-y-1">
            <Label>Height</Label>
            <Input
              id="height"
              value={block.size.height}
              onChange={(e) => {
                setBlock({
                  ...block,
                  size: {
                    ...block.size,
                    height: e.target.value,
                  },
                });
              }}
            />
          </div>
        </CardContent>
      </Card>

      {block.type.type === "text" && (
        <Card>
          <CardHeader>
            <CardTitle>Text Style</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label>Font size</Label>
              <Input
                id="fontSize"
                value={block.type.fontSize}
                onChange={(e) => {
                  setBlock({
                    ...block,
                    type: {
                      ...block.type,
                      fontSize: e.target.value,
                    } as TextBlock,
                  });
                }}
              />
            </div>
          </CardContent>
        </Card>
      )}
    </TabsContent>
  );
};

export const EditBar = () => {
  const block = useAtomValue(activeBlock);

  return (
    <div className="w-[440px] overflow-hidden border-r">
      <div id="edit-pane" className="flex h-full overflow-scroll p-1">
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="design">Design</TabsTrigger>
            {(block?.type.type === "text" || block?.type.type === "image") && (
              <TabsTrigger value="data">Data</TabsTrigger>
            )}
          </TabsList>
          <DesignTab />
          <DataTab />
        </Tabs>
      </div>
    </div>
  );
};

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
import { useEffect, useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { FontBoldIcon, FontItalicIcon } from "@radix-ui/react-icons";
import { UnderlineIcon } from "lucide-react";

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
              value={block.position.position}
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

            <div className="space-y-1">
              <ToggleGroup
                className="justify-start"
                value={
                  block.type.textDecoration === "normal"
                    ? undefined
                    : block.type.textDecoration
                }
                onValueChange={(
                  value: "italic" | "bold" | "strikethrough" | "",
                ) => {
                  setBlock({
                    ...block,
                    type: {
                      ...block.type,
                      textDecoration: value === "" ? "normal" : value,
                    } as TextBlock,
                  });
                }}
                type="single"
                variant="outline"
              >
                <ToggleGroupItem value="bold" aria-label="Toggle bold">
                  <FontBoldIcon className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="italic" aria-label="Toggle italic">
                  <FontItalicIcon className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="strikethrough"
                  aria-label="Toggle strikethrough"
                >
                  <UnderlineIcon className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </CardContent>
        </Card>
      )}

      {block.type.type === "container" && (
        <Card>
          <CardHeader>
            <CardTitle>Layout</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label>Direction</Label>
              <Select
                onValueChange={(direction: "column" | "row") => {
                  setBlock({
                    ...block,
                    layout: {
                      ...block.layout,
                      display: "flex",
                      direction: direction,
                    },
                  });
                }}
                value={block.layout.direction}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="column">Column</SelectItem>
                  <SelectItem value="row">Row</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label>Distribute content</Label>
              <Select
                onValueChange={(
                  justifyConent:
                    | "normal"
                    | "start"
                    | "end"
                    | "center"
                    | "between"
                    | "around"
                    | "evenly",
                ) => {
                  setBlock({
                    ...block,
                    layout: {
                      ...block.layout,
                      display: "flex",
                      justifyContent: justifyConent,
                    },
                  });
                }}
                value={block.layout.justifyContent}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="start">Start</SelectItem>
                  <SelectItem value="end">End</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="between">Space between</SelectItem>
                  <SelectItem value="around">Space around</SelectItem>
                  <SelectItem value="evenly">Space evenly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label>align content</Label>
              <Select
                onValueChange={(
                  align: "flex-start" | "flex-end" | "center",
                ) => {
                  setBlock({
                    ...block,
                    layout: {
                      ...block.layout,
                      display: "flex",
                      align: align,
                    },
                  });
                }}
                value={block.layout.align}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="flex-start">Start</SelectItem>
                  <SelectItem value="flex-end">End</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label>Gap</Label>
              <Input
                id="content"
                value={block.layout.gap}
                onChange={(e) => {
                  setBlock({
                    ...block,
                    layout: {
                      ...block.layout,
                      gap: e.target.value,
                    },
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
  const [activeTab, setActiveTab] = useState("design");

  useEffect(() => {
    setActiveTab("design");
  }, [block?.id]);

  return (
    <div className="w-[440px] overflow-hidden border-r">
      <div id="edit-pane" className="flex h-full overflow-y-auto p-1">
        <Tabs
          value={activeTab}
          onValueChange={(newActiveTab) => setActiveTab(newActiveTab)}
          className="w-full"
        >
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

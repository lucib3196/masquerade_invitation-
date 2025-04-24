"use client";
import { Stage, Layer, Image, Line } from "react-konva";
import React, { useEffect, useState } from "react";
import useImage from "use-image";
import ColorWheel from "./components/ColorWheel";

type ToolInterface = {
  tool: string;
  points: number[];
  stroke: string;
};
type ColorInterface = {
  name: string;
  class: string;
  hex: string;
};

const ImageBoard = () => {
  // Define the mask selection
  const [selectedMask, setSelectedMask] = useState(1); //Default value of the mask
  const [maskImage, status] = useImage(`/images/mask${selectedMask}.png`);

  //   Define the drawing board tools and lines and overall drawing utilities
  const [tool, setTool] = React.useState("brush");
  const [lines, setLines] = React.useState<ToolInterface[]>([]);
  const isDrawing = React.useRef(false);

  //   Define Color Selection
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  //   Define the dimensions of the windows
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  //   Handle Events for mask change
  const handleMaskChange = (e: any) => {
    setSelectedMask(Number(e.target.value));
  };

  //   Handle Color Change
  const onColorChange = (color: ColorInterface) => {
    setSelectedColor(color.hex);
  };

  //   Handle drawings
  const handleMouseDown = (e: any) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    console.log(lines)
    setLines((prevLines) => [
      ...prevLines,
      { tool, points: [pos.x, pos.y], stroke: selectedColor ?? "#000000" },
    ]);
  };

  const handleMouseMove = (e: any) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();

    // To draw line
    let lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  useEffect(() => {
    if (typeof window != "undefined") {
      setDimensions({ width: window.innerWidth, height: window.innerWidth });
    }
  }, []);

  //   Returns jsx for rendering
  const maskSelector = () => {
    const mask_len = 4;
    const options = Array.from({ length: mask_len }, (_, i) => i + 1);
    return (
      <select
        id="mask-selector"
        value={selectedMask}
        onChange={handleMaskChange}
      >
        {options.map((i) => (
          <option key={i} value={i}>
            Mask {i}
          </option>
        ))}
      </select>
    );
  };

  const ToolSelector = () => {
    return (
      <select
        value={tool}
        id="tool-selection"
        onChange={(e) => {
          setTool(e.target.value);
        }}
      >
        <option value="brush">Brush</option>
        <option value="eraser">Eraser</option>
      </select>
    );
  };

  return (
    <>
      <div>
        <h1>Mask Invitation Maker</h1>
        <div id="mask-select">{maskSelector()}</div>
        <div id="tool-select">{ToolSelector()}</div>
        <Stage
          width={dimensions.width}
          height={dimensions.height}
          onMouseDown={handleMouseDown}
          onMousemove={handleMouseMove}
          onMouseup={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
        >
          <Layer>
            <Image
              x={0}
              y={0}
              image={maskImage}
              width={dimensions.width}
              height={dimensions.height}
            />
          </Layer>
          <Layer>
            {lines.map((line, i) => (
              <Line
                key={i}
                points={line.points}
                strokeWidth={5}
                stroke={line.stroke}
                tension={0.5}
                lineCap="round"
                lineJoin="round"
                globalCompositeOperation={
                  line.tool === "eraser" ? "destination-out" : "source-over"
                }
              />
            ))}
          </Layer>
        </Stage>
      </div>
      <ColorWheel onColorSelect={onColorChange} />
    </>
  );
};

export default ImageBoard;

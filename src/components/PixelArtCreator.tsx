"use client";

import { useState, useRef } from "react";
import html2canvas from "html2canvas";

type ColorMap = {
  [key: string]: string;
};

export default function PixelArtCreator() {
  const gridSize = 8;
  const colors: ColorMap = {
    a: "rgb(255, 255, 255)", // White
    b: "rgb(105, 105, 105)", // DimGray
    c: "rgb(0, 0, 0)", // Black
    d: "rgb(100, 149, 237)", // CornflowerBlue
    e: "rgb(0, 0, 205)", // MediumBlue
    f: "rgb(25, 25, 112)", // MidnightBlue
    g: "rgb(0, 191, 255)", // DeepSkyBlue
    h: "rgb(0, 255, 255)", // Cyan
    j: "rgb(143, 188, 143)", // DarkSeaGreen
    k: "rgb(46, 139, 87)", // SeaGreen
    l: "rgb(0, 255, 127)", // SpringGreen
    m: "rgb(34, 139, 34)", // ForestGreen
    n: "rgb(154, 205, 50)", // YellowGreen
    o: "rgb(128, 128, 0)", // Olive
    p: "rgb(240, 230, 140)", // Khaki
    q: "rgb(255, 255, 0)", // Yellow
    r: "rgb(184, 134, 11)", // DarkGoldenrod
    s: "rgb(139, 69, 19)", // SaddleBrown
    t: "rgb(255, 140, 0)", // DarkOrange
    u: "rgb(178, 34, 34)", // Firebrick
    v: "rgb(255, 0, 0)", // Red
    w: "rgb(255, 192, 203)", // Pink
    y: "rgb(255, 20, 147)", // DeepPink
    z: "rgb(153, 50, 204)" // DarkOrchid
  };

  const [grid, setGrid] = useState<string[][]>(
    Array(gridSize).fill(null).map(() => Array(gridSize).fill("c"))
  );
  const [selectedColor, setSelectedColor] = useState<string>("c");
  const gridRef = useRef<HTMLDivElement>(null);

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    const newGrid = grid.map((row, r) =>
      row.map((cell, c) => (r === rowIndex && c === colIndex ? selectedColor : cell))
    );
    setGrid(newGrid);
  };

  const handleReset = () => {
    setGrid(Array(gridSize).fill(null).map(() => Array(gridSize).fill("c")));
  };

  const handleExport = () => {
    if (gridRef.current) {
      html2canvas(gridRef.current, {
        scale: 4,
        backgroundColor: null,
        logging: false,
      }).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "pixel_art.png";
        link.click();
      });
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="grid grid-cols-6 gap-1">
        {Object.keys(colors).map((key) => (
          <button
            key={key}
            className={`w-8 h-8 border-2 ${selectedColor === key ? "border-black" : "border-gray-300"} flex items-center justify-center text-xs font-bold`}
            style={{ backgroundColor: colors[key] }}
            onClick={() => setSelectedColor(key)}
          >
            {key}
          </button>
        ))}
      </div>

      <div ref={gridRef} className="grid grid-cols-8 border border-gray-500 mt-4">
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="w-16 h-16 border border-gray-200"
              style={{ backgroundColor: colors[cell] }}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            ></div>
          ))
        )}
      </div>

      <div className="flex gap-2">
        <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={handleReset}>
          Reset
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleExport}>
          Export as Image
        </button>
      </div>

      <div className="mt-4 p-2 bg-gray-100 border border-gray-300 rounded">
        <p className="text-sm font-mono mt-2"># Colour definitions:</p>
        <pre className="text-sm font-mono">
          {Array.from(new Set(grid.flat())).map(key => `${key} = ${colors[key].replace('rgb', '')}`).join("\n")}
        </pre>
        <p className="text-sm font-mono mt-6"># Image definitions:</p>
        <p className="text-sm font-mono">image= </p>
        <pre className="text-sm font-mono">[
          {grid.map(row => row.join(", ")).join(",\n  ")}
        ]</pre>
      </div>
    </div>
  );
} 
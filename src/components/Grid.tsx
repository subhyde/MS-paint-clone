import React from "react";
import "rsuite-color-picker/lib/styles.css";
import "rsuite/dist/styles/rsuite-default.css";
import "./Grid.css";

function Grid(grid: any) {
  const hex2RBG = (hex: any) => {
    let aRgbHex = hex.match(/.{1,2}/g);
    let aRgb = [
      parseInt(aRgbHex[0], 16),
      parseInt(aRgbHex[1], 16),
      parseInt(aRgbHex[2], 16),
    ];
    return "rgb(" + aRgb.join(", ") + ")";
  };

  const handleFill = (id: any, colour: any) => {
    if (id === null) {
      return;
    }
    console.log(colour);
    console.log(id.style.backgroundColor);
    console.log(id.style.backgroundColor === colour);
    let row = Math.floor(id.id / grid.gridColumns);
    let col = id.id % grid.gridColumns;
    if (col === 0) {
      col = grid.gridColumns;
    }
    if (row === 0) {
      row = 1;
    }

    if (row <= 0 || row > grid.gridRows) {
      return;
    }
    if (col <= 0 || col > grid.gridColumns) {
      return;
    }
    const node = id;

    if (node.style.backgroundColor === colour) {
      console.log("same color check stopped");
      console.log(grid.colourStorage);

      console.log(colour);
      console.log(id.style.backgroundColor);
      console.log(id.style.backgroundColor === colour);
      return;
    }

    // if (node.style.backgroundColor !== colour && grid.colour.includes(colour)) {
    //   console.log("background colour check thing");
    //   return;
    // }

    node.style.backgroundColor = colour.toString();

    handleFill(document.getElementById(String(parseInt(node.id) + 1)), colour);
    handleFill(document.getElementById(String(parseInt(node.id) - 1)), colour);
    handleFill(
      document.getElementById(
        String(parseInt(node.id) - parseInt(grid.gridColumns))
      ),
      colour
    );
    handleFill(
      document.getElementById(
        String(parseInt(node.id) + parseInt(grid.gridColumns))
      ),
      colour
    );
  };

  function handleClick(target: any) {
    if (grid.toolButtons.pen) {
      target.style.backgroundColor = grid.colour;
    } else {
      //converting the hex value to rgb and removing the #
      let colour = hex2RBG(grid.colour.substring(1));
      console.log("testing the colour that should be converted", colour);
      handleFill(target, colour);
    }
  }

  return (
    <div
      className="grid-container"
      style={{ gridTemplateColumns: `repeat(${grid.gridColumns}, 1fr)` }}
    >
      {Array.from({ length: grid.gridColumns * grid.gridRows }).map((_, j) => (
        <div
          key={j + 1}
          id={`${j + 1}`}
          onClick={(event) => handleClick(event.target)}
          className={"grid-item"}
          style={{
            backgroundColor: grid.resetGrid
              ? "rgb(255,255,255)"
              : "rgb(254,255,255)",
            border: grid.showGrid ? "none" : "solid 1px #ddd",
          }}
        />
      ))}
    </div>
  );
}

export default Grid;

import React from "react";
import "rsuite-color-picker/lib/styles.css";
import "rsuite/dist/styles/rsuite-default.css";
import "./Grid.css";

function Grid(grid: any) {
  //hex to rgb converter. we have to do this because the colour picker we are using passes rgb as an array, so hex is easier to mutate
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
    //simple check to make sure that the div exists
    if (id === null) {
      return;
    }

    //getting the row and column of the div
    let row = Math.floor(id.id / grid.gridColumns);
    let col = id.id % grid.gridColumns;

    //since we are using a "pseudo 2d array" we have to alter some of the values
    if (col === 0) {
      col = grid.gridColumns;
    }
    if (row === 0) {
      row = 1;
    }

    //check to make sure that we do not go out of bounds of the current grid, and that we are not wasting resources and filling the same div twice with the same colour
    const node = id;
    if (
      row <= 0 ||
      row > grid.gridRows ||
      col <= 0 ||
      col > grid.gridColumns ||
      node.style.backgroundColor === colour
    ) {
      return;
    }

    //setting the background colour of the current div
    node.style.backgroundColor = colour.toString();

    // a 4 way flood fill algorithm, going right, left, up, down
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

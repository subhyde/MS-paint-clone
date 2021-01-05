import React from "react";
import "rsuite/dist/styles/rsuite-default.css";
import "rsuite-color-picker/lib/styles.css";
import "./Grid.css";

function Grid(grid: any) {
  const handleFill = (id: any, colour: any) => {
    if (id == null) {
      return;
    }
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

    if (node.style.backgroundColor === grid.colour) {
      return;
    }
    if (
      node.style.backgroundColor !== "rgb(255, 255, 255)" &&
      node.style.backgroundColor !== "rgb(254, 255, 255)"
    ) {
      return;
    }

    node.style.backgroundColor = colour;

    handleFill(
      document.getElementById(String(parseInt(node.id) + 1)),
      grid.colour
    );
    handleFill(
      document.getElementById(String(parseInt(node.id) - 1)),
      grid.colour
    );
    handleFill(
      document.getElementById(
        String(parseInt(node.id) - parseInt(grid.gridColumns))
      ),
      grid.colour
    );
    handleFill(
      document.getElementById(
        String(parseInt(node.id) + parseInt(grid.gridColumns))
      ),
      grid.colour
    );
  };

  function handleClick(target: any) {
    if (grid.toolButtons.pen) {
      target.style.backgroundColor = grid.colour;
    } else {
      handleFill(target, grid.colour);
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

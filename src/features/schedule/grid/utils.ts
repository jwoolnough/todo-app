type Cell = {
  x: number;
  y: number;
};

type Item = Cell & {
  w: number;
  h: number;
};

const GRID_COLS = 7;
const GRID_ROWS = 32;

const getAllCells = () => {
  const cells: Cell[] = [];

  // Iterate through all cells in the grid
  for (let x = 0; x < GRID_COLS; x++) {
    for (let y = 0; y < GRID_ROWS; y++) {
      cells.push({ x, y });
    }
  }
  return cells;
};

const getEmptyCellsFromData = (data: Item[]) => {
  const cells = new Set<string>();

  // Iterate through all cells in the grid
  for (let x = 0; x < GRID_COLS; x++) {
    for (let y = 0; y < GRID_ROWS; y++) {
      cells.add(`${x},${y}`);
    }
  }

  const nonEmptyCells = new Set<string>();

  // Iterate through data and add non-empty cells to a set
  data.forEach((cell) => {
    for (let w = 0; w < cell.w; w++) {
      for (let h = 0; h < cell.h; h++) {
        // nonEmptyCells.add({ x: cell.x + w, y: cell.y + h });
        nonEmptyCells.add(`${cell.x + w},${cell.y + h}`);
      }
    }
  });

  // Remove non-empty cells from all cells
  nonEmptyCells.forEach((cell) => {
    cells.delete(cell);
  });

  return [...cells.values()].map((cell) => {
    const [x, y] = cell.split(",").map(Number);
    return { x, y } as Cell;
  });
};

export { getAllCells, getEmptyCellsFromData, GRID_COLS, GRID_ROWS };

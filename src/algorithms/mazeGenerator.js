//=========================================
//  MAZE GENERATION
//=========================================

function addOuterWalls(grid, walledNodes) {
  for (var i = 0; i < grid.length; i++) {
    if (i === 0 || i === grid.length - 1) {
      for (var j = 0; j < grid[i].length; j++) {
        grid[i][j].isWall = true;
        walledNodes.push(grid[i][j]);
      }
    } else {
      grid[i][0].isWall = true;
      walledNodes.push(grid[i][0]);
      grid[i][grid[i].length - 1].isWall = true;
      walledNodes.push(grid[i][grid[i].length - 1]);
    }
  }
}

export function recursiveDivision(grid) {
  let walledNodes = [];
  let rowStart = 0;
  let rowEnd = grid.length - 1;
  let colStart = 0;
  let colEnd = grid[1].length - 1;

  function divide(minY, maxY, minX, maxX, h) {
    if (h) {
      if (maxX - minX < 2) return;
      const y = Math.floor(randomNumber(minY, maxY) / 2) * 2;
      addHWall(minX, maxX, y);

      divide(minY, y - 1, minX, maxX, !h);
      divide(y + 1, maxY, minX, maxX, !h);
    } else {
      if (maxY - minY < 2) return;
      const x = Math.floor(randomNumber(minX, maxX) / 2) * 2;
      addVWall(minY, maxY, x);

      divide(minY, maxY, minX, x - 1, !h);
      divide(minY, maxY, x + 1, maxX, !h);
    }
  }

  function addHWall(minX, maxX, y) {
    const hole = Math.floor(randomNumber(minX, maxX) / 2) * 2 + 1;
    for (var i = minX; i <= maxX; i++) {
      if (i === hole) {
        // if (grid[y][i].isStart || grid[y][i].isFinish) continue;
        if (
          i === 0 ||
          i === grid[y].length - 1 ||
          y === 0 ||
          y === grid.length - 1
        )
          continue;
        grid[y][i].isWall = false;
      } else {
        if (grid[y][i].isStart || grid[y][i].isFinish) continue;
        grid[y][i].isWall = true;
        walledNodes.push(grid[y][i]);
      }
    }
  }

  function addVWall(minY, maxY, x) {
    const hole = Math.floor(randomNumber(minY, maxY) / 2) * 2 + 1;
    for (var i = minY; i <= maxY; i++) {
      if (i === hole) {
        // if (grid[i][x].isStart || grid[i][x].isFinish) continue;
        if (
          i === 0 ||
          i === grid.length - 1 ||
          x === 0 ||
          x === grid[i].length - 1
        )
          continue;
        grid[i][x].isWall = false;
      } else {
        if (grid[i][x].isStart || grid[i][x].isFinish) continue;
        grid[i][x].isWall = true;
        walledNodes.push(grid[i][x]);
      }
    }
  }

  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  addOuterWalls(grid, walledNodes);
  divide(rowStart, rowEnd, colStart, colEnd, false);
  return { walledNodes, newGrid: grid };
}

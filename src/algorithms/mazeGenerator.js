function addOuterWalls(grid, walledNodes){
    for(var i = 0; i < grid.length; i++){
        console.log(i === 0 || i === grid.length - 1)
        if(i === 0 || i === grid.length - 1){
            for(var j = 0; j < grid[i].length; j++){
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
    // for(let r in grid){
    //     if(r === 0 || r === grid.length - 1){
    //         for(let c in grid[r]){
    //             grid[r][c].isWall = true;
    //             walledNodes.push(grid[r][c]);
    //         }
    //     } else {
    //         grid[r][0].isWall = true;
    //         walledNodes.push(grid[r][0]);
    //         grid[r][grid[r].length - 1].isWall = true;
    //         walledNodes.push(grid[r][grid[r].length - 1]);
    //     }
    // }
    console.log(grid)
}

export function recursiveDivision(grid){
    let walledNodes = [];
    let rowStart = 1;
    let rowEnd = grid.length - 2;
    let colStart = 1;
    let colEnd = grid[0].length - 2;
    // function divide(rowStart, rowEnd, colStart, colEnd, horizontal){
    //     if(rowEnd <= rowStart || colEnd <= colStart) return
    //     if(horizontal){
    //         let mid = Math.floor((rowEnd + rowStart)/2);
    //         let rnd = Math.floor(Math.random() * colEnd) + colStart 
    //         for(var i = colStart; i <= colEnd; i++){
    //             if(i === rnd || i === rnd + 1) continue;
    //             grid[mid][i].isWall = true;
    //             walledNodes.push(grid[mid][i]);
    //         }
    //         divide(rowStart, mid-2, colStart, colEnd, false)
    //         divide(mid+2, rowEnd, colStart, colEnd, false)
    //     } else {
    //         let mid = Math.floor((colEnd + colStart)/2);
    //         let rnd = Math.floor(Math.random() * rowEnd) + rowStart 
    //         for(var i = rowStart; i <= rowEnd; i++){
    //             if(i === rnd || i === rnd + 1) continue;
    //             grid[i][mid].isWall = true;
    //             walledNodes.push(grid[i][mid]);
    //         }
    //         divide(rowStart, rowEnd, colStart, mid-2, true)
    //         divide(rowStart, rowEnd, mid+2, colEnd, true)
    //     }
    // }

    function divide(minY, maxY, minX, maxX, h) {
        if (h) {
    
            if (maxX - minX < 2) {
                return;
            }
    
            var y = Math.floor(randomNumber(minY, maxY)/2)*2;
            addHWall(minX, maxX, y);
    
            divide(minY, y-1, minX, maxX, !h);
            divide(y + 1, maxY, minX, maxX, !h);
        } else {
            if (maxY - minY < 2) {
                return;
            }
    
            var x = Math.floor(randomNumber(minX, maxX)/2)*2;
            addVWall(minY, maxY, x);
    
            divide(minY, maxY, minX, x-1, !h);
            divide(minY, maxY, x + 1, maxX, !h);
        }
    }
    
    function addHWall(minX, maxX, y) {
        var hole = Math.floor(randomNumber(minX, maxX)/2)*2+1;
    
        for (var i = minX; i <= maxX; i++) {
            if (i == hole) {
                if(grid[y][i].isStart || grid[y][i].isFinish) continue;
                grid[y][i].isWall = false;
            } else {
                if(grid[y][i].isStart || grid[y][i].isFinish) continue;
                grid[y][i].isWall = true;
                walledNodes.push(grid[y][i])
            }
        }
    }
    
    function addVWall(minY, maxY, x) {
        var hole = Math.floor(randomNumber(minY, maxY)/2)*2+1;
    
        for (var i = minY; i <= maxY; i++) {
            if (i == hole) {
                if(grid[i][x].isStart || grid[i][x].isFinish) continue;
                grid[i][x].isWall = false;
            } else {
                if(grid[i][x].isStart || grid[i][x].isFinish) continue;
                grid[i][x].isWall = true;
                walledNodes.push(grid[i][x])
            }
        }
    }
    
    function randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    addOuterWalls(grid, walledNodes);
    divide(rowStart, rowEnd, colStart, colEnd, false);
    return { walledNodes, newGrid: grid }
}
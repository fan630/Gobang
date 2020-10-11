var youWon = {
    // 橫向
    isRowVictory(cell, target, gameBoard, wins) {
        var victory = false
        //判定
        var row = cell[0]
        var col = cell[1]
        var type = cell[2]
        // 傳進來的參數
        var target = target
        var gameBoard = gameBoard
        var gameBoardRow = gameBoard.length; 
        var gameBoardCol = gameBoard[0].length;
        var wins = wins
        wins = 0
        // 首先, 判斷格子的左邊
        for (var i = 0; i < target; i++) {
            var nextRow = row
            var nextCol = col - i

            // 因為是左方判斷,都不能小於0
            if (nextRow >= 0 && nextCol >= 0) {
                var item = gameBoard[nextRow][nextCol]
                if (item[2] && item[2] === type) {
                    wins += 1
                } else {
                    break;
                }
            }
        }

        // 判斷格子的右下方
        for (var i = 1; i < target; i++) {
            var nextRow = row
            var nextCol = col + i

            // 因為是右下方判斷,都不能小於0
            if (nextRow < gameBoardRow && nextCol < gameBoardCol) {
                var item = gameBoard[nextRow][nextCol]
                if (item[2] && item[2] === type) {
                    wins += 1
                } else {
                    break;
                }
            }
        }

        if (wins >= target) {
            victory = true
        }

        return victory
    },
    // 縱項
    isColumnVictory(cell, target, gameBoard, wins) {
        var victory = false

        //判定
        var row = cell[0]
        var col = cell[1]
        var type = cell[2]

        // 傳進來的參數
        var target = target
        var gameBoard = gameBoard
        var gameBoardRow = gameBoard.length; 
        var gameBoardCol = gameBoard[0].length;
        var wins = wins
        wins = 0

        // 首先, 判斷格子的上面
        for (var i = 0; i < target; i++) {
            var nextRow = row - i
            var nextCol = col

            // 因為是上方判斷,都不能小於0
            if (nextRow >= 0 && nextCol >= 0) {
                var item = gameBoard[nextRow][nextCol]
                if (item[2] && item[2] === type) {
                    wins += 1
                } else {
                    break;
                }
            }
        }

        // 判斷格子的下面
        for (var i = 1; i < target; i++) {
            var nextRow = row + i
            var nextCol = col

            // 因為是右下方判斷,都不能小於0
            if (nextRow < gameBoardRow && nextCol < gameBoardCol) {
                var item = gameBoard[nextRow][nextCol]
                if (item[2] && item[2] === type) {
                    wins += 1
                } else {
                    break;
                }
            }
        }

        if (wins >= target) {
            victory = true
        }

        return victory
    },
    //斜向
    isSlashVictory(cell, target, gameBoard, wins) {
        var victory = false

        //判定
        var row = cell[0]
        var col = cell[1]
        var type = cell[2]

        // 傳進來的參數
        var target = target
        var gameBoard = gameBoard
        var gameBoardRow = gameBoard.length; 
        var gameBoardCol = gameBoard[0].length;
        var wins = wins

        // 首先, 判斷格子的右上方
        // 避免橫向,縱向 棋盤列數不一樣
        for (var i = 0; i < target && i < target; i++) {
            var nextRow = row - i
            var nextCol = col + i

            // 因為是右上方判斷,都不能小於0
            if (nextRow >= 0 && nextCol < gameBoardCol) {
                var item = gameBoard[nextRow][nextCol]
                if (item[2] && item[2] === type) {
                    wins += 1
                } else {
                    break;
                }
            }
        }

        //判斷格子的左下方
        for (var i = 1; i < target && i < target; i++) {
            var nextRow = row + i
            var nextCol = col - i

            // 因為是左下方判斷,都不能小於0
            if (nextRow < gameBoardRow && nextCol >= 0) {
                var item = gameBoard[nextRow][nextCol]
                if (item[2] && item[2] === type) {
                    wins += 1
                } else {
                    break;
                }
            }
        }

        if (wins >= target) {
            victory = true
        }

        return victory
    },
    //反斜向 
    isBackSlashVictory(cell, target, gameBoard, wins) {
        var victory = false

        //判定
        var row = cell[0]
        var col = cell[1]
        var type = cell[2]

        // 傳進來的參數
        var target = target
        var gameBoard = gameBoard
        var gameBoardRow = gameBoard.length; 
        var gameBoardCol = gameBoard[0].length;
        var wins = wins

        // 首先, 判斷格子的左上方
        // 避免橫向,縱向 棋盤列數不一樣
        for (var i = 0; i < target && i < target; i++) {
            var nextRow = row - i
            var nextCol = col - i

            // 因為是左上方判斷,都不能小於0
            if (nextRow >= 0 && nextCol >= 0) {
                var item = gameBoard[nextRow][nextCol]
                if (item[2] && item[2] === type) {
                    wins += 1
                } else {
                    break;
                }
            }
        }

        // 判斷格子的右下方
        for (var i = 1; i < target && i < target; i++) {
            var nextRow = row + i
            var nextCol = col + i

            // 因為是右下方判斷,都不能小於0
            if (nextRow < gameBoardRow  && nextCol < gameBoardCol) {
                var item = gameBoard[nextRow][nextCol]
                if (item[2] && item[2] === type) {
                    wins += 1
                } else {
                    break;
                }
            }
        }

        if (wins >= target) {
            victory = true
        }

        return victory
    },
}


export default youWon
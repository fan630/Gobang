<template>
<div class="go-bang">
    <div class="go-bang__broad">
        <div class="go-bang__broad__row" v-for="(row, index) in gameBoard" :key="index" :row="row">
            <div class="go-bang__broad__row__cell" v-for="(cell, index) in row" :key="index" :cell="cell">
                <GobangCell :cell="cell" @handle="handle" />
            </div>
        </div>
    </div>
    <div class="go-bang__with-draw">
        <button class="go-bang__with-draw__btn" @click="onDraw">
            Regret
        </button>

        <button class="go-bang__cpu-test" @click="onCpuPlay">
            Computer
        </button>
    </div>

    <div>
        <!-- 模態組件 -->
        <Victory :name="name" :showModel="showModel" @hideModel="hideModel" @startNewGame="reStart" />
    </div>

</div>
</template>

<script>
import GobangCell from "../components/GobangCell"
import Victory from "../components/Victory"

export default {
    name: 'Online',
    components: {
        GobangCell,
        Victory
    },
    data() {
        return {
            gameBoard: [],
            step: [],
            cpuStep: [],
            BOARD_ROWS: 5,
            BOARD_COLS: 5,
            leftCells: 0,
            // 有幾個連珠
            wins: 0,
            // 目標連珠數
            Target: 3,
            // 顯示模態框
            showModel: false,
            name: 'Jack'
        }
    },
    // computed:{
    //     leftCells(){
    //        return this.BOARD_ROWS * this.BOARD_COLS
    //     }
    // },
    watch: {
        // gameBoard發生改變的時候, 實現偵聽
        gameBoard() {
            // 檢查是否為致勝的一步
            if (this.detectVictory(this.step)) {
                this.showModel = true
            } else if (this.detectVictory(this.cpuStep)) {
                console.log('computer win')
            }
        }
    },
    methods: {
        initBoard() {
            this.gameBoard.length = 0
            var BOARD_ROWS = 5;
            var BOARD_COLS = 5;
            for (let i = 0; i < BOARD_ROWS; i++) {
                var arr = []
                for (let j = 0; j < BOARD_ROWS; j++) {
                    arr.push([i, j])
                }
                this.gameBoard.push(arr)
            }
        },
        handle(input) {
            // 最後剩下一格不能點擊
            if (this.leftCells < 2) {
                console.log('no more cell')
                return
            }

            var row = input[0]
            var col = input[1]
            // 點擊後給予藍色
            if (this.gameBoard[row][col].length < 3) {
                this.gameBoard[row][col].push('blue')
                this.step = this.gameBoard[row][col]
                this.onCpuPlay();
                // 玩家和電腦各佔一顆琪子
                this.leftCells -= 2
            }
        },

        onDraw() {
            this.step.splice(2, 1)
            this.cpuStep.splice(2, 1)
            this.leftCells += 2
        },
        onCpuPlay() {
            if (this.leftCells < 2) {
                console.log('no more cell')
                return
            }

            var row = this.gameBoard.length
            var col = this.gameBoard[0].length

            var rnd_row = Math.floor(Math.random() * row)
            var rnd_col = Math.floor(Math.random() * col)

            // 點擊後給予黃色, 若是有重複再下一次
            if (this.gameBoard[rnd_row][rnd_col].length < 3) {
                this.gameBoard[rnd_row][rnd_col].push('yellow')
                this.cpuStep = this.gameBoard[rnd_row][rnd_col]
            } else {
                this.onCpuPlay()
            }
        },
        detectVictory(cell) {
            var victory = false

            // 檢測人是否勝利
            //var cell = this.step
            if (this.isRowVictory(cell)) {
                victory = true
            }

            if (this.isColumnVictory(cell)) {
                victory = true
            }

            if (this.isSlashVictory(cell)) {
                victory = true
            }

            if (this.isBackSlashVictory(cell)) {
                victory = true
            }

            return victory

        },
        // 橫向
        isRowVictory(cell) {
            // 初始化
            var victory = false
            this.wins = 0
            //判定
            var row = cell[0]
            var col = cell[1]
            var type = cell[2]

            // 首先, 判斷格子的左邊
            for (var i = col; i >= 0; i--) {
                var item = this.gameBoard[row][i]
                if (item[2] && item[2] === type) {
                    this.wins += 1
                } else {
                    break;
                }
            }
            // 判斷格子的右邊
            if (col + 1 < this.BOARD_COLS) {
                for (var i = col + 1; i < this.BOARD_COLS; i++) {
                    var item = this.gameBoard[row][i]
                    if (item[2] && item[2] === type) {
                        this.wins += 1
                    } else {
                        break;
                    }
                }
            }

            if (this.wins >= this.Target) {
                victory = true
            }

            return victory
        },
        // 縱項
        isColumnVictory(cell) {
            // 初始化
            var victory = false
            this.wins = 0
            //判定
            var row = cell[0]
            var col = cell[1]
            var type = cell[2]

            // 首先, 判斷格子的上面
            for (var i = 0; i < this.BOARD_ROWS && i < this.BOARD_COLS; i++) {
                var nextRow = row - i
                var nextCol = col

                // 因為是上方判斷,都不能小於0
                if (nextRow >= 0 && nextCol < this.BOARD_COLS) {
                    var item = this.gameBoard[nextRow][nextCol]
                    if (item[2] && item[2] === type) {
                        this.wins += 1
                    } else {
                        break;
                    }
                }
            }
            // 判斷格子的下面
            for (var i = 1; i < this.Target && i < this.Target; i++) {
                var nextRow = row + i
                var nextCol = col

                // 因為是下方判斷,都不能小於0
                if (nextRow < this.BOARD_ROWS && nextCol >= 0) {
                    var item = this.gameBoard[nextRow][nextCol]
                    if (item[2] && item[2] === type) {
                        this.wins += 1
                    } else {
                        break;
                    }
                }
            }

            if (this.wins >= this.Target) {
                victory = true
            }

            return victory
        },
        //斜向
        isSlashVictory(cell) {
            var victory = false
            this.wins = 0
            //判定
            var row = cell[0]
            var col = cell[1]
            var type = cell[2]

            // 首先, 判斷格子的右上方
            // 避免橫向,縱向 棋盤列數不一樣
            for (var i = 0; i < this.BOARD_ROWS && i < this.BOARD_COLS; i++) {
                var nextRow = row - i
                var nextCol = col + i

                // 因為是右上方判斷,都不能小於0
                if (nextRow >= 0 && nextCol < this.BOARD_COLS) {
                    var item = this.gameBoard[nextRow][nextCol]
                    if (item[2] && item[2] === type) {
                        this.wins += 1
                    } else {
                        break;
                    }
                }
            }

            //判斷格子的左下方
            for (var i = 1; i < this.BOARD_ROWS && i < this.BOARD_COLS; i++) {
                var nextRow = row + i
                var nextCol = col - i

                // 因為是左下方判斷,都不能小於0
                if (nextRow < this.BOARD_ROWS && nextCol >= 0) {
                    var item = this.gameBoard[nextRow][nextCol]
                    if (item[2] && item[2] === type) {
                        this.wins += 1
                    } else {
                        break;
                    }
                }
            }

            if (this.wins >= this.Target) {
                victory = true
            }

            return victory
        },
        //反斜向 
        isBackSlashVictory(cell) {
            var victory = false
            this.wins = 0
            //判定
            var row = cell[0]
            var col = cell[1]
            var type = cell[2]

            // 首先, 判斷格子的左上方
            // 避免橫向,縱向 棋盤列數不一樣
            for (var i = 0; i < this.BOARD_ROWS && i < this.BOARD_COLS; i++) {
                var nextRow = row - i
                var nextCol = col - i

                // 因為是左上方判斷,都不能小於0
                if (nextRow >= 0 && nextCol >= 0) {
                    var item = this.gameBoard[nextRow][nextCol]
                    if (item[2] && item[2] === type) {
                        this.wins += 1
                    } else {
                        break;
                    }
                }
            }

            // 判斷格子的右下方
            for (var i = 1; i < this.BOARD_ROWS && i < this.BOARD_COLS; i++) {
                var nextRow = row + i
                var nextCol = col + i

                // 因為是右下方判斷,都不能小於0
                if (nextRow < this.BOARD_ROWS && nextCol < this.BOARD_COLS) {
                    var item = this.gameBoard[nextRow][nextCol]
                    if (item[2] && item[2] === type) {
                        this.wins += 1
                    } else {
                        break;
                    }
                }
            }

            if (this.wins >= this.Target) {
                victory = true
            }

            return victory
        },
        hideModel() {
            this.showModel = false
        },
        reStart() {
            this.initBoard();
        },
        // showModelHandler(bool) {
        //     this.showModel = bool
        // },
    },
    created() {
        this.initBoard()
        this.leftCells = this.BOARD_ROWS * this.BOARD_COLS
    },
    // updated(){
    //    // 在data任一個屬性發生改變的時候, 就會執行update
    //    this.detectVictory()
    // }, 

}
</script>

<style lang="scss" scoped>
.go-bang__broad__row {
    display: flex;
    justify-content: center;
}

.go-bang__with-draw {
    display: flex;
    justify-content: space-around;
}

.go-bang__with-draw__btn {
    width: 100px;
    height: 40px;
    font-size: 18px;
    background-color: aqua;
}

.go-bang__cpu-test {
    width: 100px;
    height: 40px;
    font-size: 18px;
    background-color: aqua;
}
</style>

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
import youWon from "../Utilities/youWon"

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
            if (youWon.isRowVictory(cell, this.Target, this.gameBoard, this.wins)) {
                victory = true
            }

            if (youWon.isColumnVictory(cell, this.Target, this.gameBoard, this.wins)) {
                victory = true
            }

            if (youWon.isSlashVictory(cell, this.Target, this.gameBoard, this.wins)) {
                victory = true
            }

            if (youWon.isBackSlashVictory(cell, this.Target, this.gameBoard, this.wins)) {
                victory = true
            }

            return victory
        },
        hideModel() {
            this.showModel = false
            this.reStart()
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

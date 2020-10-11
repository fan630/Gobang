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
</div>
</template>

<script>
import GobangCell from "../components/GobangCell"

export default {
    name: 'Online',
    components: {
        GobangCell
    },
    data() {
        return {
            gameBoard: [],
            step: [],
            cpuStep: [],
            BOARD_ROWS :5, 
            BOARD_COLS :5,
            leftCells: 0,

            // 有幾個連珠
            wins: 0,

            // 目標連珠數
            Target:3
        }
    },
    // computed:{
    //     leftCells(){
    //        return this.BOARD_ROWS * this.BOARD_COLS
    //     }
    // },
    watch:{
      // gameBoard發生改變的時候, 實現偵聽
      gameBoard(){
        this.detectVictory()
      }
    },
    methods: {
        initBoard() {
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
        detectVictory(cell){
          var victory = false

          // 檢測人是否勝利
          var cell = this.step
          if(this.isRowVictory(cell)){
             victory = true
          }

          if(this.isColumnVictory(cell)){
             victory = true
          }

          if(this.isSlashVictory()){
             victory = true
          }

          if(this.isBackSlashVictory()){
             victory = true
          }

          return victory

        }, 
        // 橫向
        isRowVictory(cell){
            // 初始化
            var victory = false
            this.wins = 0
            //判定
            var row = cell[0]
            var col = cell[1]
            var type = cell[2]

            // 首先, 判斷格子的左邊
            for(var i = col; i >=0; i--){
                 var item = this.gameBoard[row][i]
                 if(item[2] && item[2] === type){
                   this.wins +=1
                 }else{
                   break;
                 }
            }


            // 判斷格子的右邊
            if(col + 1 < this.BOARD_COLS){
              for(var i = col + 1; i < this.BOARD_COLS; i++){
                  var item = this.gameBoard[row][i]
                  if(item[2] && item[2] === type){
                    this.wins +=1
                  }else{
                    break;
                  }
              }
            }

            if(this.wins >= this.Target){
                victory = true
            }

            if(victory){
              console.log('you win')
            }

            return victory
        }, 
        // 縱項
        isColumnVictory(cell){
            // 初始化
            var victory = false
            this.wins = 0
            //判定
            var row = cell[0]
            var col = cell[1]
            var type = cell[2]

            // 首先, 判斷格子的上面
            for(var i = row; i >=0; i--){
                 var item = this.gameBoard[i][col]
                 if(item[2] && item[2] === type){
                   this.wins +=1
                 }else{
                   break;
                 }
            }
            // 判斷格子的下面
            if(row + 1 < this.BOARD_ROWS){
              for(var i = row + 1; i < this.BOARD_ROWS; i++){
                  var item = this.gameBoard[i][col]
                  if(item[2] && item[2] === type){
                    this.wins +=1
                  }else{
                    break;
                  }
              }
            }

            if(this.wins >= this.Target){
                victory = true
            }

            if(victory){
              console.log('you win')
            }

            return victory
        },
        //斜向
        isSlashVictory(){

        },
        //反斜向 
        isBackSlashVictory(){

        }
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

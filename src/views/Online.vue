<template>
  <div class="go-bang">
       <div class="go-bang__broad">
          <div class="go-bang__broad__row"
              v-for="(row, index) in gameBoard"
              :key="index"
              :row="row">
              <div class="go-bang__broad__row__cell"
              v-for="(cell, index) in row"
              :key="index"
              :cell="cell"
              >   
                <GobangCell :cell="cell"/>
              </div>
          </div>
       </div>
      <h1>Online Page</h1>
  </div>
</template>

<script>
import GobangCell from "../components/GobangCell"

export default {
  name: 'Online',
  components:{
     GobangCell
  },
  data(){
    return{
        gameBoard:[]
    }
  },
  methods:{
     initBoard(){
        var row = 5; 
        var col = 5;
        for(let i = 0; i < row; i++){
            var arr = []
            for(let j=0; j< row; j++){
                arr.push([i, j])
            }
            this.gameBoard.push(arr)
        }
     }
  }, 
  created(){
     this.initBoard()
  }
}
</script>

<style scoped lang="scss">
  .go-bang__broad__row{
    display:flex; 
    justify-content:center;
  }
</style>

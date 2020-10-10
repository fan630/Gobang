<template>
    <div class="text-box">
        <div v-for="(row, index) in array" :key="index" :row="row" class="row">
            <!-- {{row}} -->
            <div v-for="(cell, index) in row" :key="index">
                {{cell}}
            </div>
        </div>
        <div v-for="(item,index) in list" :key="index">{{item}}</div>
    </div>
</template>

<script>
export default {
    name: "Test",
    data(){
        return{
            array:[], 
            list:[1, 2, 3, 4]
        }
    },
    created(){
        var row = 5; 
        var col = 5;
        for(let i = 0; i < row; i++){
            var arr = []
            for(let j=0; j< row; j++){
                arr.push([i, j])
            }
            this.array.push(arr)
        }
    }
}
</script>

<style lang="scss">
    .row{
        display: flex;
    }
</style>
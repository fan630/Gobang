<template>
<div class="go-bang-cell" @click="changeColor" :class='cell[2] ? cell[2]: ""'>
    <!-- {{cell}} -->
</div>
</template>

<script>
export default {
    name: "GobangCell",
    props: {
        cell: {
            type: Array,
            required: true,
            value: [1, 1, 'blue']
        }
    },
    data() {
        return {
            testClass: "aTestDiv"
        }
    },
    methods: {
        changeColor() {
            if (this.cell.length > 2) {
                return
            } else {
                this.$emit('handle', this.cell)
            }
        }
    }
}
</script>

<style lang="scss">
.go-bang-cell {
    width: 60px;
    height: 60px;
    background-color: red;
    border-radius: 50%;
}

.blue {
    background-color: blue;
}

.yellow {
    background-color: yellow;
}
</style>

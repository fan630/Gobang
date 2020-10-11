<template>
<div>
    <div class="game-victory" v-if="showModel" @click="hideModel">
        <!-- this is Victory Page -->
        <button @click="reStart">
            Restart
        </button>
        {{fullName}}
    </div>
</div>
</template>

<script>
export default {
    name: "Victory",
    data() {
        return {
            //showModel: false
        }
    },
    props: {
        showModel: {
            type: Boolean,
            required: false,
            value: false
        },
        name: {
            type: String,
        }
    },
    computed: {
        fullName() {
            return this.name + 'Wu'
        }
        // fullName: {
        //     get() {
        //         return this.name + 'Wu'
        //     },
        //     set(input) {
        //         // this.fullName = "haha"
        //     }
        // }
    },
    methods: {
        hideModel() {
            // 原本寫法, 注入是單向的, 這是props進來的值
            // 不應該在組件中改變, 因此改為emit的寫法
            // this.showModel = false
            this.$emit('hideModel')
        },
        reStart() {
            this.$emit('startNewGame')
        },

    }
}
</script>

<style lang="scss">
.game-victory {
    background-color: rgba(20, 243, 180, 0.6);
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}

.test {
    background-color: rgba(20, 243, 180, 0.6);
}
</style>

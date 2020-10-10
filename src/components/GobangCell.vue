<template>
    <div>
        {{cell}}
    </div>
</template>

<script>
export default {
    name: "GobangCell",
    props:{
        cell: {
            type:Array, 
            required: true,
            value:[]
        }
    }
}
</script>
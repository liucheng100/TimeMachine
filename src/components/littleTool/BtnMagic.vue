<template>
    <div class="btn-magic">
        <div :class="{line:1, 'line-1-on':ON, 'line-1-off':!ON}"></div>
        <div :class="{line:1, 'line-2-on':ON, 'line-2-off':!ON}"></div>
        <div :class="{line:1, 'line-3-on':ON, 'line-3-off':!ON}"></div>
    </div>
</template>

<script>
export default {
    props:{
        ON:{
            type: Boolean,
            required: false,
            default: false,
        }
    },
    data(){
        return{

        }
    },
    methods:{

    },

}
</script>


<style scoped>
.btn-magic{
    height: 14px;
    width: 16px;
    /* background-color: #000000; */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}
.line{
    transition: .3s;
    background-color: white;
    height: 1.5px;
    width: 16px;
    border-radius: 1px;
}
.line-1-on{
    transform-origin: 50% 50%;
    transform:translateY(6.25px) rotate(-45deg);
}
.line-1-off{
    transform-origin: 50% 50%;
}
.line-3-on{
    transform-origin: 50% 50%;
    transform: translateY(-6.25px) rotate(45deg);
}
.line-3-off{
    transform-origin: 50% 50%;
}
.line-2-on{
    transform: scale(0.01,0.5);
    opacity: 0;
}
.line-2-off{
}
</style>
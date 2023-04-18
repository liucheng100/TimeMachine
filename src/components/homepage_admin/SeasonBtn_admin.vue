<template>
    <div class="season-btn" :style="{backgroundColor: typeList[state].bgc}">
        <div class="icon" :style="{backgroundImage: `url('${typeList[state].icon}')`}"></div>
        <div class="text">{{ typeList[state].text }}</div>
    </div>
</template>

<script>
    import pubuse from '@/utils/pub-use';
    export default {
        name: 'SeasonBtn_admin ',
        props: {
            state: {
                required: true,
                type: Number,
            }
        },
        data() {
            return {
                typeList: [
                    {
                        icon: pubuse('seasonBtn/3.svg'),
                        text: '未开始',
                        bgc: 'rgba(68, 68, 68, 1)',
                    },
                    {
                        icon: pubuse('seasonBtn/1.svg'),
                        text: '评审中',
                        bgc: 'rgba(68, 68, 68, 1)',
                    },
                    {
                        icon: pubuse('seasonBtn/1.svg'),
                        text: '评审中',
                        bgc: 'rgba(68, 68, 68, 1)',
                    },
                    {
                        icon: pubuse('seasonBtn/2.svg'),
                        text: '已结束',
                        bgc: 'rgba(68, 68, 68, 1)',
                    },
                ]
            }
        },
        methods: {

        },

    }
</script>


<style scoped>
    .season-btn {
        width: 118px;
        height: 48px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        padding: 0 13px;
        justify-content: space-between;
        transition: .2s;
    }

    .icon {
        height: 24px;
        width: 24px;
        background: center center / 100% no-repeat;
    }

    .text {
        color: white;
        font-size: 20px;
        transform: translateY(-.6px);
    }
</style>
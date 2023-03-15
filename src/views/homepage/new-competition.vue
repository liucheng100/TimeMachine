<template>
    <div class="new-competition">
        <div class="submit-main-picture">
            
        </div>
        <div class="text-input"></div>
        <div class="text-input"></div>
        <div class="text-input"></div>
        <div class="competition-state"></div>
        <div class="competition-introduction"></div>
        <div class="medal-setting"></div>
        <div class="refresh-competition"></div>
        <button class="submit">提交</button>
    </div>
</template>
<script>
export default {
    name:"new-competition",
    data(){
        return{
            main_picture:undefined,
            heading:"",
            subtitle:"",
            submit_time:"",
            competition_state:"",
            competition_introduction:undefined,
            medal_setting:[
                {
                    medal_name:"",
                    medal_people:1,
                    prize_name:"",
                    prize_link:""
                }
            ],
            password:""
        }
    }
}
</script>
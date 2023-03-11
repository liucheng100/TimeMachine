<template>
  <div class="pass">
    <div></div>
    {{ pass ? "通过" : "未通过" }}
  </div>
</template>

<script>
export default {
  props: ["pass"],
};
</script>

<style>
.pass {
  background: #fafafa;
  border-radius: 15px;
  padding: 3px 15px;
  width: fit-content;
  vertical-align: middle;
}
.pass div {
  width: 6px;
  height: 6px;
  border-radius: 3px;
  display: inline-block;
  margin-right: 5px;
  vertical-align: middle;
  background-color: #21b339;
}
</style>
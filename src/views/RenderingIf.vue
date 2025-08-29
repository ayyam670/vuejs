<template>
  <div>
    <p v-if="type == 'A'">A를 선택했습니다.</p>
    <p v-else-if="type == 'B'">B를 선택했습니다.</p>
    <p v-else>A,B가 아닙니다.</p>
  </div>
  <div>
    <p v-if="showItem">v-if 조건을 만족함.</p>
    <p v-else>v-if 조건을 만족하지 않음.</p>
    <button v-on:click="changeValue">show값을 변경</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "v-if 지시자.",
      type: "B",
      showItem: true,
    };
  },
  methods: {
    changeValue() {
      this.showItem = !this.showItem;
    },
  },
};
</script>

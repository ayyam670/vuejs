<template>
  <div class="parent-container">
    {{ msg }} / {{ age }}
    <!--<PageTitle v-bind:title="Data from Parent" />-->
    <button @click="ToggleDetails">Toggle</button>
    <PageTitle
      v-bind:title="title"
      v-bind:likes="likeCnt"
      v-bind:isOK="OkVal"
      :memberList="members"
      :isShow="showDetail"
      @child-clicked="handleChildClick"
      ref="page-component"
    />
  </div>
</template>

<script>
import PageTitle from "../components/PageTitle.vue";
export default {
  components: {
    PageTitle,
  },
  data() {
    return {
      msg: "Parent Component",
      age: 0,
      title: "Dynamic Data from Parent",
      likeCnt: 3,
      OkVal: true,
      showDetail: true,
      members: [
        { name: "father", age: 40 },
        { name: "mother", age: 35 },
        { name: "son", age: 6 },
      ],
    };
  },
  methods: {
    ToggleDetails() {
      this.showDetail = !this.showDetail;
    },
    handleChildClick(payload = { name: "Lee", age: 0 }) {
      // payload={} 초기값 설정해줌
      // payload={ name: "Lee", age: 0} 으로 초기값 설정도 가능
      // this.msg = "event from child component";
      this.msg = payload.name;
      this.age = payload.age;
    },
  },
  mounted() {
    //console.log(this);
  },
};
</script>

<style scoped>
.parent-container {
  border: 2px solid green;
}
</style>

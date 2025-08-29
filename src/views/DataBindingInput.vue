<template>
  <h3><input type="number" v-model="valueText" /></h3>
  <h3><input type="number" v-model.number="valueNum" /></h3>
  <p>
    <select v-on:change="result" v-model="operator">
      <option value="+">더하기</option>
      <option value="-">빼기</option>
      <option value="*">곱하기</option>
      <option value="/">나누기</option>
    </select>
  </p>

  <h3>
    <button v-on:click="sumNumber">더하기</button>
    <button v-on:click="multiNumber">곱하기</button>
    <button v-on:click="minusNumber">빼기</button>
  </h3>

  <p>{{ valueText }}</p>
  <p>{{ sumVal }}</p>
  <p>{{ operator }}</p>
  <b style="text">{{ resultNum }}</b>
</template>

<script>
export default {
  data() {
    return {
      valueText: 20,
      valueNum: 10,
      sumVal: 0,
      resultNum: 0,
      operator: "*",
    };
  },
  methods: {
    sumNumber() {
      this.sumVal = this.valueText + this.valueNum;
    },
    multiNumber() {
      this.sumVal = this.valueText * this.valueNum;
    },
    minusNumber() {
      this.sumVal = this.valueText - this.valueNum;
    },
    result() {
      if (this.operator == "+") {
        this.resultNum = this.valueText + this.valueNum;
      } else if (this.operator == "-") {
        this.resultNum = this.valueText - this.valueNum;
      } else if (this.operator == "*") {
        this.resultNum = this.valueText * this.valueNum;
      } else if (this.operator == "/") {
        this.resultNum = this.valueText / this.valueNum;
      }
      this.resultNum = `${this.valueText} ${this.operator} ${this.valueNum} = ${this.resultNum}`;
    },
  },
  beforeUpdate() {
    console.log("beforeUpdate");
  },
  updated() {
    console.log("updated");
  },
};
</script>

<style scoped></style>

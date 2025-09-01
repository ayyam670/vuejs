<template>
  <div>
    <h3>{{ msg }}</h3>
    <table>
      <thead>
        <tr v-bind:key="i" v-for="(product, i) in prodList">
          <th>{{ product.product_name }}</th>
          <th>{{ product.price }}</th>
          <th>{{ product.category }}</th>
          <th>{{ product.delivery_price }}</th>
        </tr>
      </thead>
      <tbody>
        <!--<tr v-bind:key="prod.id" v-for="prod in data">-->
        <tr v-bind:key="i" v-for="(prod, i) in data">
          <td>{{ prod.id }}</td>
          <td v-text="prod.name"></td>
          <td>{{ prod.age }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "학생목록",
      data: [
        { id: 1, name: "홍길동", age: 20 },
        { id: 2, name: "김민수", age: 22 },
        { id: 3, name: "최익수", age: 23 },
      ],
      prodList: [],
    };
  },
  beforeCreate() {
    console.log("beforeCreate");
  },
  created() {
    console.log("created");
  },
  beforeMount() {
    console.log("beforeMount");
  },
  //beforeCreate, created, beforeMount 훅이라 부름
  beforeUpdate() {
    console.log("beforeUpdate");
  },
  updated() {
    console.log("updated");
  },
  // beforeUpdate, updated 데이터 값이 바뀔때 실행
  mounted() {
    // DataBindingList 컴포넌트가 생성이 되면 생성, 마운트, 소멸... 주기가 있음
    fetch("http://192.168.0.8:3000/products")
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        this.prodList = result; // 데이터 변경.
      });
  },
};
</script>

<style scoped></style>

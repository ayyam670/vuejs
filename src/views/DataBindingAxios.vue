<template>
  <div>{{ msg }}</div>

  <table class="add">
    <tr>
      <th>상품명</th>
      <td><input type="text" v-model="prod_name" /></td>
    </tr>
    <tr>
      <th>가격</th>
      <td><input type="text" v-model="prod_price" /></td>
    </tr>
    <tr>
      <td colspan="2" align="'center'">
        <button @click="registProd">상품등록</button>
      </td>
    </tr>
  </table>

  <table class="list">
    <thead>
      <tr>
        <th>상품번호</th>
        <th>상품명</th>
        <th>가격</th>
        <th>Category</th>
      </tr>
    </thead>
    <tbody>
      <tr v-bind:key="i" v-for="(prod, i) in prodList">
        <td>{{ prod.id }}</td>
        <td>{{ prod.product_name }}</td>
        <td>{{ prod.product_price }}</td>
        <td>{{ prod.category1 }}/{{ prod.category2 }}/{{ prod.category3 }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      msg: "Axios 연습",
      prod_name: "",
      prod_price: 1000,
      prodList: [],
    };
  },
  methods: {
    async getProdList() {
      // pending, fullfiled, rejected
      let response = await axios.post(
        "http://localhost:3000/api/productList",
        []
      );

      return response.data; // promise 타입반환
      // .then((result) => console.log(result.data))
      // .catch((err) => console.error(err));
    },
    // axios의 상품등록
    async registProd() {
      // 등록할 상품의 정보. axois.post의 메소드를 활용할경우: 값은{} 감싸도록 해야함
      let product = {
        product_name: this.prod_name,
        product_price: this.prod_price,
        seller_id: 1,
        category_id: 1,
      };
      console.log(product);
      let response = await axios.post(
        "http://localhost:3000/api/productInsert",
        { param: [product] }
      );
      console.log(response);
      response = await this.getProdList(); // 목록을 가져오는 메소드 호출
      this.prodList = response; // 상품목록을 보여주는 배열에 값을 저장
    },
  },
  mounted() {
    // /api/productList
    this.getProdList() //
      .then((list) => {
        this.prodList = list;
        console.log(list);
      });
  },
};
</script>

<style scoped>
table.add {
  width: 70%;
  margin: auto;
  border-collapse: collapse;
}
.add th,
.add td {
  border: 1px solid green;
}
table.list {
  width: 100%;
  margin: auto;
  border-collapse: collapse;
}
.list th,
.list td {
  border: 1px solid green;
}
</style>

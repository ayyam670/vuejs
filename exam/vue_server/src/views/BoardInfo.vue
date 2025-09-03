<template>
  <div class="container">
    <table class="tbl">
      <thead>
        <tr>
          <th>번호</th>
          <td>{{ no }}</td>
          <th>작성일</th>
          <td>{{ boardInfo.created_date }}</td>
          <th>이름</th>
          <td>{{ boardInfo.writer }}</td>
        </tr>
        <tr>
          <th>제목</th>
          <td>{{ boardInfo.title }}</td>
        </tr>
      </thead>
      <tbody>
        <p>{{ boardInfo.content }}</p>
      </tbody>
      <!--<button @click="">수정</button>-->
      <tbody>
        <tr>
          <th>댓글목록</th>
          <td>{{ comment }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      boardNo: null,
      boardInfo: {},
    };
  },
  props: ["no"],
  mounted() {
    this.boardNo = this.$route.params.no;
    axios //

      .get(`http://localhost:3000/api/info/${this.boardNo}`)
      .then((res) => {
        this.boardInfo = res.data.board;
      })
      .catch((err) => {
        console.error("상세 불러오기 실패", err);
      });
  },
  // created() {
  //   this.boardNo = this.$route.query.no;
  //   console.log(this.boardNo);

  //   axios({
  //     method: "post",
  //     url: "/api/boardInfo",
  //     data: { param: [this.boardNo] },
  //   }).then((result) => {
  //     console.log(result);
  //     this.boardInfo = result.data[0];
  //   });
  // },
};
</script>

<style scoped>
.container {
  margin: auto;
}
.tbl {
  border: 1px solid green;
}
</style>

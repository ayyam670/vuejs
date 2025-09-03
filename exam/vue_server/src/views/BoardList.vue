<template>
  <div class="container">
    <table class="table table-hover">
      <thead>
        <tr>
          <th>No.</th>
          <th>제목</th>
          <th>작성자</th>
          <th>작성일자</th>
          <th>댓글 수</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(board, i) in boardList"
          :key="i"
          @click="oneBoardDetail(board.no)"
          style="cursor: pointer"
        >
          <td>{{ board.no }}</td>
          <td>{{ board.title }}</td>
          <td>{{ board.writer }}</td>
          <td>{{ board.created_date }}</td>
          <td>{{ board.cnt }}</td>
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
      boardList: [],
    };
  },
  methods: {
    oneBoardDetail(no) {
      this.$router.push(`/info/${no}`);
    },
  },
  mounted() {
    axios
      .get("http://localhost:3000/api/boardList") //
      .then((res) => {
        this.boardList = res.data;
      })
      .catch((err) => {
        console.error("게시판 목록 불러오기 실패", err);
      });
  },
};
</script>

<style scoped>
.container {
  margin: auto;
}
</style>

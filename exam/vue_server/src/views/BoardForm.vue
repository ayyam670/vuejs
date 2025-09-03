<template>
  <div class="container">
    <div class="inner">
      <p>No.</p>
      <input type="text" value="자동으로 입력됩니다." readonly />
      <p>제목</p>
      <input type="text" v-model="board.title" />
      <p>작성자</p>
      <input type="text" v-model="board.writer" />
      <p>내용</p>
      <textarea v-model="board.content"></textarea>
      <p>작성일자</p>
      <input type="text" value="자동으로 입력됩니다." readonly />
      <br />
      <button type="button" @click="saveBoard" class="btn btn-success">
        저장
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      board: {
        title: "",
        writer: "",
        content: "",
        created_date: new Date().toLocaleDateString,
      },
    };
  },
  methods: {
    saveBoard() {
      axios
        .post("http://localhost:3000/api/boardForm", this.board)
        .then(() => {
          alert("게시글이 등록되었습니다!");
          this.$router.push("/list");
        })
        .catch((err) => {
          console.error("게시글 등록 실패", err);
        });
    },
  },
};
</script>

<style scoped>
.container {
  background-color: #ddd;
  text-align: left;
  margin: auto;
  padding: 0 20px;
}
input,
textarea {
  width: 100%;
}
</style>

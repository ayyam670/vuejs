<template>
  <h3>{{ msg }}</h3>
  <slot name="header"></slot>
  <form @submit.prevent="handleSubmit" class="post-form">
    <div class="form-group">
      <label for="title">제목</label>
      <input type="text" id="title" v-model="title" required />
    </div>
    <div class="form-group">
      <label for="content">내용</label>
      <textarea id="content" v-model="content" rows="4" required></textarea>
    </div>
    <slot></slot>
    <button type="submit">글 등록</button>
  </form>
  <slot name="footer"></slot>
</template>

<script>
export default {
  data() {
    return {
      msg: "게시글 작성",
      title: "",
      content: "",
    };
  },
  computed: {
    boardNo() {
      return this.$store.getters.getBoardNo;
    },
    logId() {
      return this.$store.getters.getLogId;
    },
  },
  methods: {
    handleSubmit() {
      let post = {
        id: this.boardNo,
        title: this.title,
        content: this.content,
        date: new Date().toLocaleDateString(),
        writer: this.logId,
      };
      //this.$emit("add-post", post);
      //this.$store.commit("addBoard", post); // mutations 에 정의된 함수
      this.$store.dispatch("saveBoard", post); // actions 에 정의된 함수

      // 입력필드 초기화.
      this.title = "";
      this.content = "";
    },
  },
};
</script>

<style scoped>
.post-form {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #dddddd71;
}
.form-group {
  margin-bottom: 15px;
}
label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}
input,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
button {
  padding: 12px 20px;
  background-color: green;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>

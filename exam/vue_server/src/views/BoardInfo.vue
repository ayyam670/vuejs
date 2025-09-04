<template>
  <div class="container">
    <table class="tbl">
      <thead>
        <tr>
          <th>번호</th>
          <td>{{ boardInfo.no }}</td>
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
          <td colspan="5">
            <ul>
              <li v-for="(c, i) in commentList" :key="i">
                {{ c.writer }} : {{ c.content }}
              </li>
            </ul>
          </td>
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
      boardInfo: {},
      commentList: [],
    };
  },
  mounted() {
    // URL에 있는 no 값 가져오기
    const no = this.$route.params.no;

    // 게시글 상세 정보 불러오기
    axios
      .get(`http://localhost:3000/api/boardInfo/${no}`)
      .then((res) => {
        this.boardInfo = res.data[0];
      })
      .catch((err) => {
        console.error("게시글 불러오기 실패", err);
      });

    // 댓글 목록 불러오기
    axios
      .get(`http://localhost:3000/api/commentList/${no}`)
      .then((res) => {
        this.commentList = res.data;
      })
      .catch((err) => {
        console.error("댓글 불러오기 실패", err);
      });
  },
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

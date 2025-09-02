<template>
  <div class="container">
    <h3>초간단 게시판</h3>
    <p v-if="!user.id">로그인 후 게시글 작성이 가능합니다.</p>
    <div v-else>
      <PostForm @add-post="addPost">
        <template v-slot:header>
          <div>Header</div>
        </template>
        <template #default>
          <p>이름없는 slot</p>
        </template>
        <template v-slot:footer>
          <div>&copy;since 1990</div>
        </template>
      </PostForm>
    </div>
    <hr />
    <PostList v-bind:posts="posts" />

    <a @click="kakaoLogin">
      <img src="./assets/kakao_logo.png" />
    </a>
  </div>
</template>

<script>
import PostForm from "./components/PostForm.vue";
import PostList from "./components/PostList.vue";
//import { ref } from "vue";

export default {
  // OptionsAPI 방식(객체활용) / CompositionAPI 방식(함수기반)
  name: "App",
  components: {
    PostForm,
    PostList,
  },
  data() {
    return {
      user: { id: "", name: "" },
      //uid: ref(null), // null 대신 '' 공백도 가능 // 일반 데이터타입을 참조형식으로 바꿔주는게 ref함수
      //posts: [], // 게시글 데이터 담는 반응형(reactive) 데이터
      //state: {uid: "",},
    };
  },
  computed: {
    // 계산된 속성.
    posts() {
      return this.$store.getters.getBoardList;
    },
  },
  methods: {
    addPost(payload) {
      this.posts.push({
        id: this.posts.length + 1,
        title: payload.title,
        content: payload.content,
        date: new Date().toLocaleDateString(),
      });
    },
    kakaoLogin() {
      window.Kakao.Auth.login({
        scope: "profile_nickname, account_email",
        success: this.getKakaoAccount,
      });
    },
    getKakaoAccount() {
      window.Kakao.API.request({
        url: "/v2/user/me",
        success: (res) => {
          console.log(res);
          const kakao_account = res.kakao_account;
          const nickname = kakao_account.profile.nickname; // 카카오닉네임
          const email = kakao_account.email; //카카오이메일
          console.log("nickname", nickname);
          console.log("email", email);

          //로그인 처리 구현
          alert("로그인 성공");
          //this.user = { id: email, name: nickname }; // data(){return{user:'';}} 여기서 가져옴
          this.user.id = email; // 로그인 성공 시 uid 업데이트.
          this.user.name = nickname;
          this.$store.commit("setId", email);
        },
        fail: (error) => {
          console.log(error);
        },
      });
    },
  },
  provide() {
    return {
      user: this.user, // App.vue > PostForm > PostList.vue > PostItem.vue
    };
  },
  mounted() {
    console.log(this.$store); // 컴포넌트 실행 시 데이터 한번만 가져올 수 있음
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

const express = require("express");
const cors = require("cors");
const mysql = require("./mysql");

// connection pool.
// const pool = mysql.createPool({
//   host: "127.0.0.1",
//   port: 3306,
//   user: "dev01",
//   password: "dev01",
//   database: "dev",
//   connectionLimit: 10,
// });

const app = express();
app.use(express.json());
app.use(cors());

app.listen(3000, () => {
  console.log("http://localhost:3000");
});

app.get("/", (req, resp) => {
  resp.send("/ root 경로.");
});

app.get("/api/boardList", async (req, resp) => {
  // 글목록 json 포멧으로 반환.
  const result = await mysql.execute(
    `select no, title, writer, 
            date_format(created_date, '%Y-%m-%d') created_date,
	         (select count(1) from t_comment where bno = b.no) cnt
    from t_board b 
    order by no`,
    []
  );
  resp.send(result);
});
// pool.getConnection((err, connection) => {
//   if (err) {
//     resp.send("db error!");
//     return;
//   }
//   connection.query("select * from t_board", (queryErr, results) => {
//     connection.release();
//     if (queryErr) {
//       resp.send("query error!");
//       return;
//     }
//     resp.json(results);
//   });
// });
// });

// 댓글등록.
app.post("/api/comment", async (req, resp) => {
  let data = req.body.param;
  const result = await mysql.execute("insert into t_comment set ?", data);
  resp.send(result);
});

// pool.getConnection((err, connection) => {
//   if (err) {
//     resp.send("db error!");
//     return;
//   }
//   connection.query(
//     "insert into t_comment set ?",
//     data,
//     (queryErr, results) => {
//       connection.release();
//       if (queryErr) {
//         resp.send("query error!");
//         return;
//       }
//       resp.json(results);
//     }
//   );
// });
// });

// 댓글목록
app.get("/api/commentList/:bno", async (req, resp) => {
  let bno = req.params.bno;
  const result = await mysql.execute(
    "select * from t_comment where bno=?",
    bno
  );
  resp.send(result);
});

// function execute(sql, param) {
//   return new Promise((resolve, reject) => {
//     pool.getConnection((err, connection) => {
//       if (err) {
//         return reject("db error!");
//       } // connection 에러
//       connection.query(sql, param, (queryErr, results) => {
//         connection.release();
//         if (queryErr) {
//           return reject("query error!");
//         } // 쿼리 에러
//         resolve(results); // 정상실행
//       });
//     });
//   });
// }

// 게시글 단건조회
app.get("/api/boardInfo/:no", async (req, resp) => {
  let bno = req.params.no;
  const result = await mysql.execute("select * from t_board where no=?", [bno]);
  resp.send(result);
});

// 게시글 등록
app.post("/api/boardForm", async (req, resp) => {
  const { no, title, writer, content, created_date } = req.body;
  console.log("받은 데이터:", req.body);
  const sql = `
      insert into t_board (title, writer, content, created_date)
      values (?, ?, ?, sysdate())
    `;
  const result = await mysql.execute(sql, [
    title,
    writer,
    content,
    created_date,
  ]);
  resp.send({ success: true, result });
});

const mysql = require("mysql2");
//const cors = require("cors");

// connection pool.
const pool = mysql.createPool({
  host: "127.0.0.1",
  port: 3306,
  user: "dev01",
  password: "dev01",
  database: "dev",
  connectionLimit: 10,
});

//app.use(cors());

function execute(sql, param) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return reject("db error!");
      } // connection 에러
      connection.query(sql, param, (queryErr, results) => {
        connection.release();
        if (queryErr) {
          return reject("query error!");
        } // 쿼리 에러
        resolve(results); // 정상실행
      });
    });
  });
}

module.exports = {
  execute,
};

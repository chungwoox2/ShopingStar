// Express 애플리케이션 및 Sequelize 객체 가져오기
const app = require('./index'); // index.js 파일에서 Express 애플리케이션 객체 가져오기
const { sequelize } = require('./config/database'); // config/database.js 파일에서 Sequelize 객체 가져오기

// 포트 설정
const PORT = process.env.PORT || 5000; // 환경 변수에서 포트 가져오거나 기본값으로 5000번 포트 설정

// 데이터베이스 연결 확인 후 서버 시작
sequelize.authenticate() // Sequelize 객체를 사용하여 데이터베이스에 연결 시도
  .then(() => {
    console.log('Database connection has been established successfully.'); // 데이터베이스 연결 성공 메시지 출력
    // Express 애플리케이션을 지정된 포트에서 실행
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`); // 서버가 지정된 포트에서 실행되었음을 출력
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error); // 데이터베이스 연결 실패 시 오류 메시지 출력
  });

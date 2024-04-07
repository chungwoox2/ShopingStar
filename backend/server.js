
const { sequelize } = require('./config/database'); // 데이터베이스 연결 설정 가져오기

const PORT = process.env.PORT;

// 데이터베이스 연결 확인 후 서버 시작
sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');

    // index.js 파일에서 Express 애플리케이션 객체 가져오기
    const indexApp = require('./index');

    // Express 애플리케이션을 지정된 포트에서 실행
    indexApp.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

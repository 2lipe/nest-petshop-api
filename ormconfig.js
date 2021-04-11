module.exports = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'reallyStrongRootPwd123',
  database: 'petshop_db',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
};

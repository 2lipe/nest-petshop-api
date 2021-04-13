module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: 'reallyStrongPwd123',
  database: 'petshop_db',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
};

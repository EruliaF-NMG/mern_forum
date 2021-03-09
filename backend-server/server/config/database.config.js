/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-06 09:29:29
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-09 14:17:18
 */

const dbConfig = {
  connection: process.env.DB_CONNECTION || '',
  host: process.env.DB_HOST || '',
  port: process.env.DB_PORT || 27017,
  database: process.env.DB_DATABASE || 'myFirstDatabase',
  userName: process.env.DB_USERNAME || 'nisal',
  password: process.env.DB_PASSWORD || 'nisal',
};

//const mongoUri = `mongodb+srv://${dbConfig.userName}:${dbConfig.password}@cluster0.uac76.mongodb.net/${dbConfig.database}?retryWrites=true&w=majority`;
const mongoUri = 'mongodb://localhost:27017/merntest';

export { dbConfig, mongoUri };

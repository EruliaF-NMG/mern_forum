/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-06 09:29:29
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-14 16:17:02
 */

const dbConfig = {
  connection: process.env.DB_CONNECTION || '',
  host: process.env.DB_HOST || '',
  port: process.env.DB_PORT || 27017,
  database: process.env.DB_DATABASE || 'merntest',
  userName: process.env.DB_USERNAME || '',
  password: process.env.DB_PASSWORD || '',
};

const mongoUri = 'mongodb://localhost:27017/merntest';

export { dbConfig, mongoUri };

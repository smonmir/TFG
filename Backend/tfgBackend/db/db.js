import { Sequelize } from 'sequelize';
import { DB_HOST, DB_PORT, DB_DATABASE, DB_USER, DB_PASSWORD } from '../src/config.js'

const sequelizeBd = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  dialect: 'mysql',
  host: DB_HOST,
  port: DB_PORT,
  define: {
    timestamps: false //Hace que no se creen dos columnas extras 'createdAt' y 'updatedAt'
  },
});

export {Sequelize, sequelizeBd}

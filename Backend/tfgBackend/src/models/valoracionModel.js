import {sequelizeBd, Sequelize} from '../../db/db.js'
import { Usuario } from './usuarioModel.js'
import { Servicio } from './servicioModel.js';


export const Valoracion = sequelizeBd.define('valoracion', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    puntuacion: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 1,
        max: 10
      }
    },
    comentario: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    usuario_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Usuario,
        key: 'id'
      },
      onDelete: 'cascade'
    },
    servicio_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Servicio,
        key: 'id'
      },
      onDelete: 'cascade'
    }
  }, {
    freezeTableName: true
});

Valoracion.belongsTo(Usuario, { foreignKey: 'usuario_id', onDelete: 'cascade' });

Valoracion.belongsTo(Servicio, { foreignKey: 'servicio_id', onDelete: 'cascade' });
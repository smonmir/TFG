import {sequelizeBd, Sequelize} from '../../db/db.js'
import {Usuario} from './usuarioModel.js'
import {Servicio} from './servicioModel.js'
import {Estado} from './estadoModel.js'

export const Pedido = sequelizeBd.define('pedido', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        fecha: {
          type: Sequelize.DATE,
          allowNull: false
        },
        precio: {
          type: Sequelize.DECIMAL(3, 2),
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
        },
        estado_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: Estado,
            key: 'id'
          },
          onDelete: 'cascade'
        }
    }, {
        freezeTableName: true
});

Pedido.belongsTo(Usuario, { foreignKey: 'usuario_id', onDelete: 'CASCADE' });

Pedido.belongsTo(Servicio, { foreignKey: 'servicio_id', onDelete: 'CASCADE' });

Pedido.belongsTo(Estado, { foreignKey: 'estado_id', onDelete: 'CASCADE' });

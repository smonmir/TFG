import {sequelizeBd, Sequelize} from '../../db/db.js'
import {Usuario} from './usuarioModel.js'

export const Servicio = sequelizeBd.define("servicio", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        descripcion: {
            type: Sequelize.STRING,
            allowNull: false
        },
        precio: {
            type: Sequelize.DECIMAL(3, 2),
            allowNull: false
        },
        imagen: {
            type: Sequelize.STRING,
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
        }
    }, {
        freezeTableName: true
});

Servicio.belongsTo(Usuario, { foreignKey: 'usuario_id', onDelete: 'cascade' });


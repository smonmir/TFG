import {sequelizeBd, Sequelize} from '../../db/db.js'
import {Rol} from './rolModel.js'

export const Usuario = sequelizeBd.define("usuario", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        contrasena: {
            type: Sequelize.STRING,
            allowNull: false
        },
        telefono: {
            type: Sequelize.STRING
        },
        rol_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: { 
                model: Rol, 
                key: 'id' 
            },
            onDelete: 'cascade'
        }
    }, {
        freezeTableName: true
});

Usuario.belongsTo(Rol, { foreignKey: 'rol_id', onDelete: 'CASCADE' });


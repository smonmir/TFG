import {sequelizeBd, Sequelize} from '../../db/db.js'


export const Rol = sequelizeBd.define('rol', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        descripcion: {
            type: Sequelize.STRING,
            allowNull: false
        }

    }, {
    freezeTableName: true
});


import {sequelizeBd, Sequelize} from '../../db/db.js'
import { Servicio } from './servicioModel.js'
import { Categoria } from './categoriaModel.js';

export const ServicioCategoria = sequelizeBd.define("servicio_categoria", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
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
        categoria_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: { 
                model: Categoria, 
                key: 'id'
            },
            onDelete: 'cascade'
        }
    }, {
        freezeTableName: true
});

ServicioCategoria.belongsTo(Servicio, { foreignKey: 'servicio_id', onDelete: 'cascade' });

ServicioCategoria.belongsTo(Categoria, { foreignKey: 'categoria_id', onDelete: 'cascade' });


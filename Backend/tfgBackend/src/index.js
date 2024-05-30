import app from './app.js'
import {PORT} from './config.js'

import {sequelizeBd} from '../db/db.js'

sequelizeBd.sync()
.then(() => {
  console.log('Base de datos sincronizada');
  app.listen(PORT, () => {
      console.log('Servidor en ejecución en el puerto ' + PORT);
  });
  })
.catch(error => {
  console.error('Error al sincronizar la base de datos:', error);
});




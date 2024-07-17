import express from 'express';
import bodyParser from 'body-parser';
import gameRoutes from './routes/gameRoutes';
import walletRoutes from './routes/walletRoutes';
import sequelize from './config/database';

const app = express();

app.use(bodyParser.json());
app.use('/', gameRoutes);
app.use('/wallet', walletRoutes);

let server: any;

const startServer = (port: number | string) => {
  return sequelize.sync().then(() => {
    server = app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  });
};

const stopServer = () => {
  if (server) {
    return server.close();
  }
  return Promise.resolve();
};

export { app, startServer, stopServer };

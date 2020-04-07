/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/
import { Server } from 'hapi';
const h2o2 = require('@hapi/h2o2');
import { environment } from './environments/environment';

const init = async () => {
  const server = new Server({
    port: 3333,
    host: 'localhost',
    routes: {
      cors: {
        origin: ["*"],
        headers: ["Accept", "Content-Type"]
      }
    }
  });

  await server.register(h2o2);

  const getChartData = async (symbol, period) => {
      const result =  await server.inject(`/proxy/stock/${symbol}/chart/${period}`)
    return result.payload;
  };

  server.method({
    name: 'getChartData',
    method: getChartData,
    options: {
      cache: {
        expiresIn: 30 * 60 * 1000,
        generateTimeout: 3000
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return {
        hello: 'world'
      };
    }
  });

  server.route({
    method: 'GET',
    path: '/beta/stock/{symbol}/chart/{period}',
    options: {
      handler: {
        proxy: {
          uri: environment.apiURL + '/beta/stock/{symbol}/chart/{period}?token=' + environment.apiKey
        }
      }
    }
  });


  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();

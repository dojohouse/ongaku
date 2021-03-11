const app = require('./app');

const server = app.listen(8888, () => {
  console.log(
    'Ongaku server up. Now go to http://localhost:8888/api/spotify/login in your browser.',
  );
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION!!!  shutting down ...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

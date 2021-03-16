import app from './app';

const port = app.get('port');

const server = app.listen(port, () => {
  console.log(
    `Ongaku server up. Now go to http://localhost:${port}/api/auth/spotify/login in your browser.`,
  );
});

// eslint-disable-next-line
process.on('unhandledRejection', (err: any): void => {
  console.log('UNHANDLED REJECTION!!!  shutting down ...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

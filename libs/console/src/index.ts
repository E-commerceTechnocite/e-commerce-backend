import { ApplicationConsoleModule } from '@app/console/application-console.module';
import { BootstrapConsole } from 'nestjs-console';

const bootstrap = new BootstrapConsole({
  module: ApplicationConsoleModule,
  useDecorators: true,
});

bootstrap.init().then(async (app) => {
  try {
    await app.init();
    await bootstrap.boot();
    await app.close();
  } catch (err) {
    console.error(err);
    await app.close();
    process.exit(1);
  }
});

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MaintenanceInterceptor } from './interceptors/maintenance.interceptor';
import { LoggerInterceptor } from './interceptors/logger.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * Swagger Documentation
   */
  const options = new DocumentBuilder()
  .setTitle('Google Drive Video Download & Upload APIs')
  .setDescription('Google Drive Video Download & Upload APIs enable seamless integration for retrieving and uploading video content to Google Drive, enhancing application capabilities.')
  .setVersion('1.0')
  .addServer(process.env.INSTANCE_URL, 'Default environment')
  .addServer('http://localhost:3000/', 'Local environment')
  .addServer('https://google-drive-api-e228.onrender.com/', 'Production environment')
  .build();
  
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  /**
   * Exception Handler
   */
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new MaintenanceInterceptor());
  app.useGlobalInterceptors(new LoggerInterceptor());

  await app.listen(3000);
}
bootstrap();

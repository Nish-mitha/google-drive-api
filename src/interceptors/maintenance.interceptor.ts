import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
  
  @Injectable()
  export class MaintenanceInterceptor implements NestInterceptor {
  
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const isUnderMaintenance = process.env.API_MAINTENANCE_STATUS || "false";
  
      if (isUnderMaintenance === "true") {
        throw new HttpException('API is under maintenance, Please try again after some time',HttpStatus.SERVICE_UNAVAILABLE);
      }
  
      return next.handle();
    }
  }
  
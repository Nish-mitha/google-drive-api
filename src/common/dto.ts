import { HttpStatus } from '@nestjs/common';

export type ResponseDTO = {
  statusCode: HttpStatus;
  message: string;
};

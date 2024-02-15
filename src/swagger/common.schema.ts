import { HttpStatus } from '@nestjs/common';

export const commonResponseSchema = {
    responses: {
        [HttpStatus.UNAUTHORIZED]: {
          status: 403,
          description: 'Authorization Failure',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  statusCode: {
                    type: 'number',
                    example: 403,
                  },
                  message: {
                    type: 'string',
                    example: 'Authorization failure',
                  },
                },
              },
            },
          },
        },
        [HttpStatus.NOT_FOUND]: {
          status: 404,
          description: 'Not Found',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  statusCode: {
                    type: 'number',
                    example: 404,
                  },
                  message: {
                    type: 'string',
                    example: 'Not Found',
                  },
                },
              },
            },
          },
        },
        [HttpStatus.INTERNAL_SERVER_ERROR]: {
          status: 500,
          description: 'Something went wrong',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  statusCode: {
                    type: 'number',
                    example: 500,
                  },
                  message: {
                    type: 'string',
                    example: 'Unexpected behavior, Please try again after some time',
                  },
                },
              },
            },
          },
        },
        [HttpStatus.SERVICE_UNAVAILABLE]: {
          status: 503,
          description: 'API Service is under maintenance',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  statusCode: {
                    type: 'number',
                    example: 503,
                  },
                  message: {
                    type: 'string',
                    example: 'API is under maintenance, Please try again after some time',
                  },
                },
              },
            },
          },
        },
      },
}
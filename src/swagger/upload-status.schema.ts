import { HttpStatus } from '@nestjs/common';

export const uploadStatusSchema = {
  tags: 'Monitor Upload Status',
  parameters: [
    {
      name: 'fileId',
      in: 'path',
      required: true,
      description: 'Google drive file ID',
      schema: {
        type: 'string',
      },
    }
  ],
  responses: {
    [HttpStatus.OK]: {
      status: 200,
      description: 'Everything is working fine',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              statusCode: {
                type: 'number',
                example: 200,
              },
              message: {
                type: 'string',
                example: 'Video upload is still in-progress',
              },
            },
          },
        },
      },
    },
    [HttpStatus.BAD_REQUEST]: {
      status: 400,
      description: 'Bad Request',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              statusCode: {
                type: 'number',
                example: 400,
              },
              message: {
                type: 'string',
                example: 'Invalid File Id',
              },
            },
          },
        },
      },
    }
  },
};

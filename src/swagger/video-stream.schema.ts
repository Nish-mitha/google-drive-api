import { HttpStatus } from '@nestjs/common';

export const videoStreamSchema = {
  tags: 'Download & Upload API',
  parameters: [
    {
      name: 'fileId',
      in: 'path',
      required: true,
      description: 'Google drive file ID to download',
      schema: {
        type: 'string',
      },
    },
    {
      name: 'destinationFolderId',
      in: 'path',
      required: true,
      description: 'Google drive folder ID to upload downloaded file',
      schema: {
        type: 'string',
      },
    },
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
                example: 'Video download and Upload Task has been initiated.',
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
                example: 'Invalid File Id / Folder Id',
              },
            },
          },
        },
      },
    }
  },
};

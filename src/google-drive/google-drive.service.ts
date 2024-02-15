import { HttpException, Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { API_KEY_FILE_NAME, DRIVE_SCOPE } from 'src/common/constant';

@Injectable()
export class GoogleDriveService {

  /**
   * Authenticate with API key
   * @returns authClient
   */
  initialize() {
    try {
      const authClient = new google.auth.GoogleAuth({
        scopes: [DRIVE_SCOPE],
        keyFilename: API_KEY_FILE_NAME,
      });
      return google.drive({ version: 'v3', auth: authClient });
    } catch(err) {
      const errorRes = JSON.parse(err.response.data);
      throw new HttpException(errorRes.error.message, errorRes.error.code);
    }
  }

}

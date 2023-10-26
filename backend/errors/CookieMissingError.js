// импортируем константы ошибок
import { constants } from 'http2';
import HTTPError from './HTTPError.js';

class CookieMissingError extends HTTPError {
  constructor(message) {
    super(message);
    this.name = 'CookieMissingError';
    this.statusCode = constants.HTTP_STATUS_NO_CONTENT;
  }
}

export default CookieMissingError;

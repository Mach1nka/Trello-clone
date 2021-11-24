import { httpService } from './utils';
import { ErrorParams } from './types';

const errorLog = (userData: ErrorParams): Promise<Response> =>
  httpService.post({ url: '/error', data: userData });

export { errorLog };

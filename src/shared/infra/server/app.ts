import express, { urlencoded } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cors from 'cors';
import api from './api';
import cookieparser from 'cookie-parser';
import { whitelist } from '../../../config/cors.json';

const app = express();
app.use(morgan('tiny'));
app.use(urlencoded({ extended: true }));
app.use(helmet());
app.use(cookieparser());
app.use(bodyParser.json());
app.use(
  cors({
    origin: function (origin: string | undefined, cb: (err: Error | null, allow?: boolean) => void): void {
      if (origin === undefined || whitelist.indexOf(origin) !== -1) {
        cb(null, true);
      } else {
        cb(new Error('Not allowed'));
      }
    },
  }),
);

app.use('/', api);
export default app;

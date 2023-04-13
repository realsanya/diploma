import express from 'express';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.routes.js';
import reviewRoutes from './routes/review.routes.js';
import userRoutes from './routes/user.routes.js';
import articleRoutes from './routes/article.routes.js';
import storageRoutes from './routes/storage.routes.js';
import { executePython } from './utils/execute-python.js';

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use(cookieParser())
app.use(fileUpload());
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

app.use('/api', userRoutes);
app.use('/api', reviewRoutes);
app.use('/api', articleRoutes);
app.use('/api/auth', authRoutes);
app.use(storageRoutes);

app.get('/python', async (req, res) => {
  try {
    const result = await executePython('./keywords-extractor.py', []);
  
    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: err })
  }
});

app.use((_, res) => {
  res.status(404).send("Sorry can't find that!")
});

app.use((err) => {
  res.status(500).send({ error: err })
});

const hostname = process.env.HOST;
const port = process.env.API_PORT;

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

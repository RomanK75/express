import express from 'express';
import router from './routes/user.js';

const app = express();

app.use(express.json());
app.use('/api', router);

const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

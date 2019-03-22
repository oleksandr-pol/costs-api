import express from 'express';
const port = process.env.PORT || 3000;

const app = express();
const costRouter = express.Router();

costRouter.route('/costs')
  .get((req, res) => {
    const response = { hello: 'This is API' };
    return res.json(response);
  });

app.use('/api', costRouter);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(port, () => console.log(`Running on port ${port}`));

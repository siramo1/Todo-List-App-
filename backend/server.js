import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send("<h1>your home page is Workin</h1>")
})

const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
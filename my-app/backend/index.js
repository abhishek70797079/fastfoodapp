const express = require('express');
const app = express();
const port = 5000;
const dbConnect = require('./db');  
const authRoutes = require('./Routes/CreatUser'); 
const cors = require ('cors')

app.use(cors())
app.use(express.json())


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

dbConnect();

app.use(express.json());
app.use(cors())

app.use('/api', require("./Routes/CreatUser"));
app.use('/api', require("./Routes/DisplayData"));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

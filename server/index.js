import express from 'express';
import cors from 'cors';
import mongoose from './database/index.js';
import chalk from 'chalk';
import router from './Routes/index.js';

const PORT = 8000;

const app = express();
app.use(express.json());
app.use(cors());

const db = mongoose.connection;
db.on('error',console.error.bind(console , chalk.red("===== Error connecting Mongodb =====")));
db.once('open' , ()=>{
    console.log(chalk.bgGreen("===== Connected to Mongodb ====="))
});

app.use('/', (req, res, next) => {
    console.log(chalk.whiteBright("Request Comes in Middle Ware"));
    next()
})


app.use('/api',router)

app.listen(PORT,()=>{
    console.log(chalk.blueBright(`App is running on Port ${PORT}`));
});
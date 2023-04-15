import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import router from "./routes/index.js";

dotenv.config({ path: './.env'})

const app = express();

//settings
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

//routes
app.use('/api',router)

//Serve
app.listen(app.get('port'), () => {
  console.log('Server on port ' + app.get('port'));
})

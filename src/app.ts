import  express  from "express";
import cors from "cors";
import http from 'http'
import dotenv from "dotenv";
import connect from "./database/mongoose";
import userRoute from "./routes/index";

dotenv.config();




const app = express();
const server = http.createServer(app);


app.use(cors());
app.use(express.json({limit: '4mb'}));

app.use('/api/auth', userRoute)

const PORT = process.env.PORT || 8000;

server.listen(PORT, async() => {
  console.log(`Server is running on port ${PORT}`);
  await connect()
});
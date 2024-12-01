import express, {Application, Request, Response} from 'express';
import cors from 'cors'
import { Server } from 'socket.io'
import { createServer } from 'http' 
import { createAdapter } from "@socket.io/redis-streams-adapter"
import { instrument } from "@socket.io/admin-ui";
import dotenv from 'dotenv'
import router from './routes'
import { setupSocket } from './socket';
import redis from './config/redis';
import { connectKafkaProducer } from './config/kafka.config';
import { consumeMessages } from './helper';

// secret file path
dotenv.config({
    path: './env'
})

const app: Application = express()

const server = createServer(app)

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000", "https://admin.socket.io"],
        credentials: true
    },
    adapter: createAdapter(redis)
})

instrument(io, {
    auth: false,
    mode: "development",
});

setupSocket(io)

export {io}

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended: false}))

//routing
app.get('/', (req: Request, res: Response): any  => {
    return res.send("It is working perfectly ✌️")
})


// * Add Kafka Producer
connectKafkaProducer().catch((err) => console.log("Kafka Consumer error", err));

consumeMessages(process.env.KAFKA_TOPIC!).catch((err) =>
    console.log("The Kafka Consume error", err)
);
  


app.use('/api', router)

server.listen(process.env.PORT, () => {
    console.log(`🚀 Server is running on port: ${process.env.PORT}`)
})

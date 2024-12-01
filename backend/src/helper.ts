import prisma from "./config/db.config"
import { consumer, producer } from "./config/kafka.config"

export const produceMessage = async (topic: string, message: any) => {
    await producer.send({
        topic,
        messages: [{value: JSON.stringify(message)}]
    })
}

export const consumeMessages = async (topic: string) => {
    await consumer.connect()
    await consumer.subscribe({topic: topic})

    await consumer.run({
        eachMessage: async ({topic, partition, message}) => {
        // Check if message.value is defined, or provide a fallback value
        const data = message.value ? JSON.parse(message.value.toString()) : null;

         if (data) {
            // console.log({
            //   partition,
            //   offset: message.offset,
            //   value: data,
            //   topic,
            // });
    
            await prisma.chats.create({
              data: data,
            });
          } else {
            console.warn("Received message with undefined value");
          }
        }
    })
}
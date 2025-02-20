import express from "express";
import { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import router from "./routers";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/errorHandler";

import WebSocket, { RawData } from "ws";
import { createClient } from "redis";

dotenv.config();
const PORT = process.env.PORT || 3000;
const DB_CONNECTION_URI =
  process.env.DB_CONNECTION_URI || "mongodb://localhost:27017/sharing-todo";

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(DB_CONNECTION_URI)
  .then(() => console.log("[mongodb]: MongoDB connected"))
  .catch((err) => console.log("[mongodb]: Database connection error:", err));

app.use(router);
app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});

// const wss = new WebSocket.Server({ server });
// const redisClient = createClient();
// const redisPublisher = createClient();
// const redisSubscriber = createClient();

// redisClient.connect();
// redisPublisher.connect();
// redisSubscriber.connect();

// const updateOnlineUsers = async () => {
//   const users = await redisClient.sMembers("user_online");
//   const message = JSON.stringify({ type: "update_users", users });

//   wss.clients.forEach((client) => {
//     if (client.readyState === WebSocket.OPEN) {
//       client.send(message);
//     }
//   });
// };

// redisSubscriber.subscribe("user_status", async (message) => {
//   console.log(`Обновление из Redis: ${message}`);
//   await updateOnlineUsers();
// });

// wss.on("connection", async (ws: WebSocket & { userId?: string }) => {
//   console.log("Новое подключение WebSocket");

//   const users = await redisClient.sMembers('user_online');
//   ws.send(JSON.stringify({ type: 'update_users', users }));

//   ws.on("message", async (message: RawData) => {
//     try {
//       const { status, userId } = JSON.parse(message.toString());

//       if (!userId) {
//         console.warn("⚠️ Пользователь без ID. Отклоняем обработку.");
//         return;
//       }

//       if (status === "online") {
//         await redisClient.sAdd("user_online", userId);
//         await redisPublisher.publish("user_status", JSON.stringify({ userId, status: "online" }));
//         ws.userId = userId;
//       }

//       if (status === "offline") {
//         await redisClient.sRem("user_online", userId);
//         await redisPublisher.publish("user_status", JSON.stringify({ userId, status: "offline" }));
//       }
//     } catch (error) {
//       console.error("Ошибка обработки сообщения:", error);
//     }
//   });

//   ws.on("close", async () => {
//     console.log("WebSocket отключен");
//     if (ws.userId) {
//       await redisClient.sRem("user_online", ws.userId);
//       await redisPublisher.publish("user_status", JSON.stringify({ userId: ws.userId, status: "offline" }));
//     }
//   });
// });

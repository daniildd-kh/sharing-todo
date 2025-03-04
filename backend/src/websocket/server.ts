import WebSocket from "ws";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/User";
import { TaskModel } from "../models/Task";

const JWT_ACCESS_SECRET: string = process.env.JWT_SECRET || "secret-jwt";
type AuthSocket = {
  type: "auth" | "updateTodo";
  token: string;
};

let usersStatuses = new Map<string, string>();

const updateUserStatus = ({ user, data }: { user: string; data: string }) => {
  usersStatuses.set(user, data);
  console.log(`User ${user} status: ${data}`);
};

const authenticateUser = async (token: string): Promise<string | null> => {
  try {
    const payload = jwt.verify(token, JWT_ACCESS_SECRET) as { id: string };
    const user = await UserModel.findOne({ _id: payload.id });
    return user ? user.email : null;
  } catch (err) {
    return null;
  }
};

export const initSocket = (server: any) => {
  const wss = new WebSocket.Server({ server });

  async function updateTodo() {
    const todo = await TaskModel.find({
      common: { $ne: false, $exists: true },
    });
    broadcast({ type: "updateTodo", data: Array.from(todo) });
  }

  function broadcast(data: any) {
    const message = JSON.stringify(data);
    wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(message);
      }
    });
  }

  wss.on("connection", (ws) => {
    console.log("Client connected");
    let userEmail: string | null;

    ws.on("message", async (data) => {
      try {
        const message = JSON.parse(data.toString()) as AuthSocket;

        if (message.type === "updateTodo") {
          updateTodo();
        }
        if (message.type === "auth") {
          userEmail = await authenticateUser(message.token);
          if (!userEmail) {
            ws.send(JSON.stringify({ message: "Authentication failed" }));
            ws.close();
            return;
          }

          ws.send(JSON.stringify({ type: "status", message: "online" }));
          updateUserStatus({ user: userEmail, data: "online" });
          broadcast({
            type: "updateUsers",
            data: Array.from(usersStatuses, ([email, status]) => ({
              email,
              status,
            })),
          });
        }
      } catch (error) {
        ws.send(JSON.stringify({ message: "Server error" }));
        ws.close();
      }
    });

    ws.on("close", () => {
      console.log("Client disconnected");
      if (userEmail) {
        usersStatuses.delete(userEmail);
        broadcast({
          type: "updateUsers",
          data: Array.from(usersStatuses, ([email, status]) => ({
            email,
            status,
          })),
        });
      }
    });
  });
};

import { createContext, ReactNode, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { setStatus } from "../store/authSlices";
import { setUsers } from "../store/usersSlice";

interface WebSocketContextType {
  webSocket?: WebSocket | null;
}

export const WebSocketContext = createContext<WebSocketContextType | null>(
  null
);

export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const webSocketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const webSocket = new WebSocket("ws://localhost:3000");
    if (webSocket) {
      webSocketRef.current = webSocket;
    }

    webSocket.addEventListener("open", () => {
      console.log("client connected");
      const data = JSON.stringify({ type: "auth", token: token });
      webSocket.send(data);
    });

    webSocket.addEventListener("close", () => {
      console.log("client disconnect");
      dispatch(setStatus("offline"));
    });

    webSocket.addEventListener("message", (message) => {
      const data = JSON.parse(message.data);

      switch (data.type) {
        case "status": {
          dispatch(setStatus("online"));
          break;
        }
        case "updateUsers": {
          console.log("updateUsers:", data);
          dispatch(setUsers(data.data));
          break;
        }
        case "updateTodo": {
          console.log(data);
          break;
        }
        default:
          console.log("error");
      }
    });

    return () => {
      if (webSocket.readyState === WebSocket.OPEN) {
        webSocket.close();
      }
      dispatch(setStatus("offline"));
    };
  }, [dispatch]);

  return (
    <WebSocketContext.Provider value={{ webSocket: webSocketRef.current }}>
      {children}
    </WebSocketContext.Provider>
  );
};

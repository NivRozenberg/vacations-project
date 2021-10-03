import { io, Socket } from "socket.io-client";
import VacationModel from "../Models/VacationModel";

class LiveService {

    public socket: Socket;

    public connect(): void {
        this.socket = io("http://localhost:3001");
    }

    public disconnect(): void {
        this.socket.disconnect();
    }

    public send(msg: VacationModel): void {
        this.socket = io("http://localhost:3001");
        this.socket.emit("msg-from-client", msg);
    }

    public send2(id: number):void{
        this.socket = io("http://localhost:3001");
        this.socket.emit("msg-from-client-delete", id);
    }


}

export default LiveService;

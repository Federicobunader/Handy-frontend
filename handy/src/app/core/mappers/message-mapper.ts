import { Injectable } from "@angular/core";
import { UserMapper } from "./user-mapper";
import { Message } from "../models/message";

@Injectable({
  providedIn: 'root'
})
export class MessageMapper {
  userMapper = new UserMapper();

  dtoToMessage(message: any): Message {
    return {
      // variable del front: variable del back
      id: message?.id ? message.id : 0,
      text: message?.text ? message.text : 0,
      to: this.userMapper.dtoToUser(message.toDTO),
      from: this.userMapper.dtoToUser(message.fromDTO),
      timestamp: message?.timestamp ? message.timestamp : null,
    }
  };

  messateToDto(message: Message): any {
    return {
        // variable del front: variable del back
        id: message?.id ? message.id : 0,
        text: message?.text ? message.text : 0,
        toDTO: this.userMapper.userToDto(message.to),
        fromDTO: this.userMapper.userToDto(message.from),
        timestamp: message?.timestamp ? message.timestamp : null,
      }
  }
};

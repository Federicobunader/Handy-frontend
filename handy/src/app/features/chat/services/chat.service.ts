import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import { messageURL } from 'src/app/core/constants/constants';
import { MessageMapper } from 'src/app/core/mappers/message-mapper';
import { Message } from 'src/app/core/models/message';
import { UserService } from 'src/app/shared/services/user/user.service';
import SockJS from 'sockjs-client';
import { Observable, Subscription, map } from 'rxjs';
import { User } from 'src/app/core/models/user';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

    constructor(
      private userService: UserService,
      private http: HttpClient,
      private mapper: MessageMapper,
    )
    {
        this.mapper = new MessageMapper();
    }

    message: Message = this.emptyMessage();

    createMessage(message: Message): Observable<Message> {
      return this.http
        .post(
          messageURL,
          this.mapper.messateToDto(message)
        )
        .pipe(
          map((response) => {
            return this.mapper.dtoToMessage(response);
          })
        );
    }

    getMessages(fromID: number, toID: number): Observable<Message[]> {
      return this.http
        .get(messageURL + '/' + fromID + '/' + toID)
        .pipe(
          map((response) => {
            const res: any = response;
            return res.map((message: any) => {
               return this.mapper.dtoToMessage(message);
            });
          })
        );
    }

    getSendersFor(toID: number): Observable<User[]> {
      return this.http
        .get(messageURL + '/senders/' + toID)
        .pipe(
          map((response) => {
            const res: any = response;
            return res.map((sender: any) => {
               return this.userService.mapper.dtoToUser(sender);
            });
          })
        );
    }

    emptyMessage(): Message{
      return {
        id: 0,
        text: '',
        to: this.userService.emptyUser(),
        from: this.userService.emptyUser(),
        timestamp: new Date(),
      }
    }
}

import { Component, Input, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { SessiontokenService } from 'src/app/features/home/services/sessiontoken.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { User } from 'src/app/core/models/user';
import { FormControl, Validators } from '@angular/forms';
import { Message } from 'src/app/core/models/message';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, interval, map, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {
  toID : number = 0;
  messages: Message[] = [];
  messageControl = new FormControl('', [Validators.required]);
  private $_destroyed = new Subject();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private chatService: ChatService,
    private sessiontokenService: SessiontokenService,
    private userService: UserService,) {
      interval(10000)
      .pipe(map(async () => {
        this.receiveMessage(this.from.id, this.to.id);
        takeUntil(this.$_destroyed);
      }))
      .subscribe();
     }

  from: User = this.userService.emptyUser();
  to: User = this.userService.emptyUser();
  message : Message = this.chatService.emptyMessage();

  ngOnInit(): void {
    this.getFrom();
    this.getUserTo();
  }

  ngOnDestroy(): void {
    this.$_destroyed.next(this.$_destroyed);
    this.$_destroyed.complete();
  }

  getUserTo(): void{
    this.route.params.subscribe(params => {
      this.toID = params['toID'];
      this.userService.getUserByID(this.toID).subscribe(
        (response) => {
          this.to = response;
          this.receiveMessage(this.from.id, this.to.id);
        },
        takeUntil(this.$_destroyed),
      );
     });
  }

  sendMessage() {
    const messageContent = this.messageControl.value;
    if(messageContent) {
      this.message = {
        id: 0,
        text: this.messageControl.value ? this.messageControl.value : '',
        from: this.from,
        to: this.to,
        timestamp: new Date(),
      }
        this.chatService
        .createMessage(this.message)
        .pipe(takeUntil(this.$_destroyed))
        .subscribe(() =>
        {
          this.receiveMessage(this.message.from.id, this.message.to.id);
          this.messageControl.reset();
        });
    }
    };

  receiveMessage(fromID: number, toID:number) {
    this.chatService
    .getMessages(fromID, toID)
      .pipe(
        takeUntil(this.$_destroyed),
        map((response: Message[]) => (
          this.messages = response))
      )
    .subscribe();
  }


  getFrom(){
    const token = sessionStorage.getItem('token');

    if (token !== null) {
      this.sessiontokenService.getUser(token).subscribe(
        (response) => {
          this.from = response;
          this.receiveMessage(this.from.id, this.to.id);
        },
        (error) => {
          console.error('Error al obtener el usuario', error);
        }
      );
    } else {
      console.error('El token de sesión es nulo');
      this.router.navigateByUrl('/login');
    }
  }
}


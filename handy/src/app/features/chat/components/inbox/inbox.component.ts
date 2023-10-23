import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessiontokenService } from 'src/app/features/home/services/sessiontoken.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { ChatService } from '../../services/chat.service';
import { User } from 'src/app/core/models/user';
import { Subject, map, takeUntil } from 'rxjs';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent {

  senders: User [] = [];
  private $_destroyed = new Subject();

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
    private sessiontokenService: SessiontokenService,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getFrom();
  }

  from: User = this.userService.emptyUser();

  getFrom(){
    const token = sessionStorage.getItem('token');

    if (token !== null) {
      this.sessiontokenService.getUser(token).subscribe(
        (response) => {
          this.from = response;
          this.getSenderFor();
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

  getSenderFor() {
    this.chatService
    .getSendersFor(this.from.id)
      .pipe(
        takeUntil(this.$_destroyed),
        map((response: User[]) => (
          this.senders = response))
      )
    .subscribe();
  }

  sendTo(sender: User){
      this.router.navigate(['chat', sender.id]);
  }
}

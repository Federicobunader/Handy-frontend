import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeRoutingModule } from '../home/home-routing.module';
import { ChatComponent } from './components/chat/chat.component';
import { ChatRoutingModule } from './chat-routing.module';
import { InboxComponent } from './components/inbox/inbox.component';


@NgModule({
  declarations: [
    ChatComponent,
    InboxComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    ChatRoutingModule,
  ],
  exports: [
    InboxComponent,
  ]
})
export class ChatModule { }

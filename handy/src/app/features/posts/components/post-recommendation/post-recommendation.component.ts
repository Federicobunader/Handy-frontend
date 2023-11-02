import { Component } from '@angular/core';
import { ChatGPTService } from '../../services/chat-gpt-service/chat-gpt.service';
import { FormControl, Validators } from '@angular/forms';
import { Subject, map, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-post-recommendation',
  templateUrl: './post-recommendation.component.html',
  styleUrls: ['./post-recommendation.component.css']
})
export class PostRecommendationComponent {
  prompt = new FormControl('', [Validators.required]);
  private $_destroyed = new Subject();

  constructor(
    private chatGPTService: ChatGPTService
  ) {
  }

  getPostsByPrompt() {
    const prompt = this.prompt.value;
    if (prompt) {
      this.chatGPTService
        .getPostsByPrompt(prompt)
        .pipe(
          take(1),
          takeUntil(this.$_destroyed))
        .subscribe(() => {
          console.log("Fin");
        });
    }
  };
}
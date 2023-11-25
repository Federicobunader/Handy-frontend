import { Component, OnInit } from '@angular/core';
import { ChatGPTService } from '../../services/chat-gpt-service/chat-gpt.service';
import { FormControl, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { Recommendation } from 'src/app/core/models/recommendation';
import { Post } from 'src/app/core/models/post';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/shared/services/user/user.service';
import { SessiontokenService } from 'src/app/features/home/services/sessiontoken.service';
import { RecommendationResponse } from "../../../../core/models/recommendationResponse";

@Component({
  selector: 'app-post-recommendation',
  templateUrl: './post-recommendation.component.html',
  styleUrls: ['./post-recommendation.component.css']
})
export class PostRecommendationComponent implements OnInit {
  user: User = this.userService.emptyUser();
  emptyTask: Boolean = false;
  loading: Boolean = false;

  prompt = new FormControl('', [Validators.required]);
  recommendations: Recommendation[] = [];
  wasFound: Boolean = true;

  constructor(
    private chatGPTService: ChatGPTService,
    private router: Router,
    private sessiontokenService: SessiontokenService,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    const token = sessionStorage.getItem('token');

    if (token !== null) {
      this.sessiontokenService.getUser(token).subscribe(
        (response) => {
          this.user = response;
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

  getPostsByPrompt() {
    const prompt = this.prompt.value;
    if (prompt) {
      this.emptyTask = false;
      this.loading = true;
      this.chatGPTService
        .getPostsByPrompt(prompt)
        .pipe(take(1))
        .subscribe((response: RecommendationResponse) => {
          this.wasFound = response.wasFound;
          this.recommendations = response.recommendations;
          this.loading = false;
        });
    } else {
      this.emptyTask = true;
    }
  };

  sendTo(post: Post){
    this.router.navigate(['posts/view', post.id]);
  }
}

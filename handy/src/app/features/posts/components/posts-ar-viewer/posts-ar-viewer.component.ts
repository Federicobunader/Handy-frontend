import { Component } from '@angular/core';
import { PostsArService } from '../../services/posts-ar-service/posts-ar.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-posts-ar-viewer',
  templateUrl: './posts-ar-viewer.component.html',
  styleUrls: ['./posts-ar-viewer.component.css']
})
export class PostsArViewerComponent {

  modelUrl: string = "";

  constructor(
    private postsArService: PostsArService,
    public dialogRef: MatDialogRef<PostsArViewerComponent>
  ) { }

  ngOnInit() {
    const modelName = 'axe'; // Replace this with your logic to get the model name
    this.postsArService.getModel(modelName).subscribe(data => {
      console.log(data)
      this.modelUrl = URL.createObjectURL(data);
      console.log(this.modelUrl)
    },
      (error) => {
        // This block is executed if there was an error with the HTTP request
        console.error('Error fetching model:', error);
      });
  }

  loadModel(modelName: string) {
    /*
      this.postsArService.getModel(modelName).subscribe(data => {
          const url = URL.createObjectURL(data);
          this.loader.load(url, (object) => {
              this.scene.add(object);
          });
      });
      */
  }

  ngOnDestroy() {
    // Cleanup code here (remove event listeners, dispose of objects, etc.)
  }

  closeModal() {
    this.dialogRef.close();
  }
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { chatGPTURL } from 'src/app/core/constants/constants';

@Injectable({
    providedIn: 'root'
})
export class ChatGPTService {
    constructor(private http: HttpClient) { }

    getPostsByPrompt(prompt: string) {
        let params = new HttpParams();

        if (prompt && prompt.length) {
            params = params.set('prompt', prompt);
        }
        return this.http.get<any[]>(chatGPTURL + '/postsByPrompt', { params })
            .pipe(
                map((response) => {
                    const res: any = response;
                    console.log(res);
                })
            );
    }
}

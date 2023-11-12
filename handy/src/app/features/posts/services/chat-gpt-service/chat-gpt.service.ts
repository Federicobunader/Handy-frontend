import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { chatGPTURL } from 'src/app/core/constants/constants';
import { RecommendationMapper } from 'src/app/core/mappers/recommendation-mapper';
import { Recommendation } from 'src/app/core/models/recommendation';

@Injectable({
    providedIn: 'root'
})
export class ChatGPTService {
    constructor(
        private http: HttpClient,
        private mapper: RecommendationMapper
    ) {
        this.mapper = new RecommendationMapper();
    }

    getPostsByPrompt(prompt: string): Observable<Recommendation[]> {
        let params = new HttpParams();

        if (prompt && prompt.length) {
            params = params.set('prompt', prompt);
        }
        return this.http
            .get<any[]>(chatGPTURL + '/postsByPrompt', { params })
            .pipe(
                map((response) => {
                    const res: any = response;
                    return res.map((recommendationDTO: any) => {
                        return this.mapper.dtoToRecommendation(recommendationDTO);
                    });
                })
            );
    }
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { chatGPTURL } from 'src/app/core/constants/constants';
import { RecommendationResponse } from "../../../../core/models/recommendationResponse";
import { RecommendationResponseMapper } from "../../../../core/mappers/recommendation-response-mapper";

@Injectable({
    providedIn: 'root'
})
export class ChatGPTService {
    constructor(
        private http: HttpClient,
        private mapper: RecommendationResponseMapper
    ) {
        this.mapper = new RecommendationResponseMapper();
    }

    getPostsByPrompt(prompt: string, province: string): Observable<RecommendationResponse> {
        let params = new HttpParams();

        if (prompt && prompt.length) {
            params = params.set('prompt', prompt);
            params = params.set('province', province);
        }
        return this.http
            .get<any[]>(chatGPTURL + '/postsByPrompt', { params })
            .pipe(
                map((response) => {
                  return this.mapper.dtoToRecommendationResponse(response)
                })
            );
    }
}

import { Injectable } from '@angular/core';
import { Post } from '../models/post';
import { Recommendation } from '../models/recommendation';
import {RecommendationMapper} from "./recommendation-mapper";
import {RecommendationResponse} from "../models/recommendationResponse";

@Injectable({
  providedIn: 'root'
})
export class RecommendationResponseMapper {
  recommendationMapper = new RecommendationMapper();

  dtoToRecommendationResponse(recommendationResponseDTO: any): RecommendationResponse {
    return {
      wasFound: recommendationResponseDTO?.wasFound ? recommendationResponseDTO.wasFound : false,
      recommendations: recommendationResponseDTO?.recommendations ? recommendationResponseDTO.recommendations.map((recommendationDTO: any) => this.recommendationMapper.dtoToRecommendation(recommendationDTO)) : []
    };
  }

  recommendationResponseToDto(recommendationResponse: RecommendationResponse): any {
    return {
      wasFound: recommendationResponse?.wasFound ? recommendationResponse.wasFound : false,
      recommendations: recommendationResponse?.recommendations ? recommendationResponse.recommendations.map((recommendation: Recommendation) => this.recommendationMapper.recommendationToDto(recommendation)) : [],
    };
  }

}

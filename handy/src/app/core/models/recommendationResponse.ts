import {Recommendation} from "./recommendation";

export interface RecommendationResponse {
  wasFound: boolean;
  recommendations: Recommendation [];
}

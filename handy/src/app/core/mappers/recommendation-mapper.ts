import { Injectable } from '@angular/core';
import { Post } from '../models/post';
import { Recommendation } from '../models/recommendation';
import { PostMapper } from './post-mapper';

@Injectable({
    providedIn: 'root'
})
export class RecommendationMapper {
    postMapper = new PostMapper();

    dtoToRecommendation(recommendationDTO: any): Recommendation {
        return {
            tool: recommendationDTO?.tool ? recommendationDTO?.tool : '',
            posts: recommendationDTO.posts ? recommendationDTO.posts.map((postDTO: any) => this.postMapper.dtoToPost(postDTO)) : []
        };
    }

    recommendationToDto(recommendation: Recommendation): any {
        return {
            tool: recommendation?.tool ? recommendation.tool : '',
            posts: recommendation?.posts ? recommendation.posts.map((post: Post) => this.postMapper.postToDto(post)) : [],
        };
    }

}
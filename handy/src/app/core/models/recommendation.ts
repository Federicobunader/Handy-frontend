import { Post } from "./post";

export interface Recommendation {
  tool: string;
  posts: Post [];
}

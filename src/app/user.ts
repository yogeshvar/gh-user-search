export interface User {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  type: string;
  repos_url: string;
  gists_url: string;
  followers_url: string;
}

export interface SearchResults {
  total_count: number;
  incomplete_results: boolean;
  items: User[];
}

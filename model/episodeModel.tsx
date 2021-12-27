export interface ResponseData {
  results: EpisodeItem[];
  info: PageInfo;
}

export interface EpisodeItem {
  id: number;
  name: string;
  air_date: string;
  episode: string;
}

export interface PageInfo {
  count: number;
  pages: number;
}

export interface Feed {
  feedId: string;
  feedType: string;
  ownerId: string;
  ownerName: string;
  recordId: string;
  musicName: string;
  musicianName: string;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
  description: string;
}

export interface MainFeed {
  map(arg0: (data: any) => any): unknown;
  data: Feed[];
}

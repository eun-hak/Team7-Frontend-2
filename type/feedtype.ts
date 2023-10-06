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
  data: Feed[];
}

export interface MainFeed2 {
  map(arg0: (data: any) => any): unknown;
  data: MainFeed;
}

export interface SubmitData {
  data: {
    data: string;
  };
}

export interface DeleteData {
  data: {
    data: string;
  };
}

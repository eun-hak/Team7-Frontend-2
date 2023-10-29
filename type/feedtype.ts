export interface Feed_Data {
  feedId: string;
  feedType: string;
  ownerId: string;
  ownerName: string;
  recordId: string;
  recordRawData: string;
  musicName: string;
  musicianName: string;
  viewCount: number;
  interactionProps: {
    content: string;
    backgroundColor: string;
    border: string;
    fontSize : string;
  };
  interactionCount: number;
  createdAt: string;
  updatedAt: string;
  description: string;
}

export interface MainFeed {
  data: Feed_Data[];
}

export type MyClapFeed = Partial<Feed_Data>

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

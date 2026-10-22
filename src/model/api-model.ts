export type UserPreferences = {
  categories: string[];
  stores: string[];
};

export type UserDeltaResponse = {
  comparisonDate: Date;
  stores: DeltaStore[];
};

export type DeltaStore = {
  name: string;
  categories: DeltaCategory[];
};

export type DeltaCategory = {
  id: number;
  name: string;
  newGames: Game[];
  removedGames: Game[];
};

export type Game = {
  boxName: string;
  sellPrice: number;
  id: string;
  image: string;
};

export type StateMetadataResponse = {
  stateMetadata: StateMetadata[];
};

export type StateMetadata = {
  userId: number;
  stateId: number;
  date: Date;
};

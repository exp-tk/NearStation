export interface StationData {
  station: Station;
}

export interface StationByCoordsData {
  stationByCoords: Station;
}

export interface Station {
  groupId: number;
  name: string;
  address: string;
  lines: Line[];
  __typename: string;
}

export interface Line {
  id: string;
  lineColorC: null;
  name: string;
  __typename: string;
}

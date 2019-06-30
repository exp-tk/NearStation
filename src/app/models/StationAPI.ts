export interface StationAPIData {
  stationByCoords: Station;
}

export interface Station {
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

import { LineModel } from './line-model';

export class StationModel {
    add: string;
    close_ymd: string;
    gap: number;
    lat: number;
    lines: LineModel[];
    lon: number;
    open_ymd: number;
    post: string;
    station_name: string;
    success: boolean;
}

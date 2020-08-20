import {IMenuItem} from "./IMenuItem";

export interface IMenuChangeEvent {
    depth: number;
    item: IMenuItem;
}

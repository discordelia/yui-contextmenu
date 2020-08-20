import { IMenuItem } from "./IMenuItem";
import { EventEmitter } from "@angular/core";

export const TOGGLE_ICON = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgaGVpZ2h0PSIxMDAwIiB3aWR0aD0iMTAwMCIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgo8bWV0YWRhdGE+SWNvRm9udCBJY29uczwvbWV0YWRhdGE+Cjx0aXRsZT5jaGVjay1hbHQ8L3RpdGxlPgo8Z2x5cGggZ2x5cGgtbmFtZT0iY2hlY2stYWx0IiB1bmljb2RlPSImI3hlZWQ2OyIgaG9yaXotYWR2LXg9IjEwMDAiIC8+CjxwYXRoIGQ9Ik00MTQuNSA3MTUuOWMtNy42OTk5OTk5OTk5OTk5ODkgNy43MDAwMDAwMDAwMDAwNDU1LTE2LjM5OTk5OTk5OTk5OTk3NyAxMS42MDAwMDAwMDAwMDAwMjMtMjYuMTAwMDAwMDAwMDAwMDIzIDExLjYwMDAwMDAwMDAwMDAyMy05LjY5OTk5OTk5OTk5OTk4OSAwLTE4LjM5OTk5OTk5OTk5OTk3Ny0zLjg5OTk5OTk5OTk5OTk3NzMtMjYuMDk5OTk5OTk5OTk5OTY2LTExLjYwMDAwMDAwMDAwMDAyM2wtMTYyLjMtMTYyLjI5OTk5OTk5OTk5OTk1IDUyLjE5OTk5OTk5OTk5OTk5LTUyLjIwMDAwMDAwMDAwMDA0NSAxMzYuMiAxMzYuMjAwMDAwMDAwMDAwMDUgMzYyLjMwMDAwMDAwMDAwMDA3LTM2NS4yMDAwMDAwMDAwMDAwNSA0OS4yOTk5OTk5OTk5OTk5NTUgNTIuMjAwMDAwMDAwMDAwMDQ1LTM4NS41IDM5MS4yOTk5OTk5OTk5OTk5NXoiLz4KPC9zdmc+";

export interface IExtendedMenuItem extends IMenuItem {
    focused?: boolean;
    menuItemId: number;
    parentMenuItemId: number
    selectEmitter?: EventEmitter<IMenuItem>;
    toggleEmitter?: EventEmitter<boolean>;
}

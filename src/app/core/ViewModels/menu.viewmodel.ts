import { MenuDetail } from "../models/menuitems.model";

export interface MenuViewModel {
    menuHeaderCode: string;
    menuHeaderName: string;
    menuHeaderOrder: number;
    menuDetails: MenuDetail[];
  }
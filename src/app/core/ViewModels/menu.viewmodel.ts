export interface MenuViewModel {
    MenuHeaderCode: string;
    MenuHeaderName: string;
    MenuHeaderOrder: number;
    MenuDetails: MenuDetail[];
  }

  interface MenuDetail {
    MenuHeaderCode: string;
    MenuDetailsCode: string;
    MenuDetailsName: string;
    MenuDetailsDescription: string;
    MenuDetailsUrl: string;
    MenuDetailsOrder: number;
  }
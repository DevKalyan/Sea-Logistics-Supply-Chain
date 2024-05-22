export interface MenuViewModel {
    menuHeaderCode: string;
    menuHeaderName: string;
    menuHeaderOrder: number;
    menuDetails: MenuDetail[];
  }

  interface MenuDetail {
    menuHeaderCode: string;
    menuDetailsCode: string;
    menuDetailsName: string;
    menuDetailsDescription: string;
    menuDetailsUrl: string;
    menuDetailsOrder: number;
  }
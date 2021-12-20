export interface Params {
  name: string;
  description: string;
  author: any;
  repo: (info: any) => string;
  license: string | any;
  manager: string | any;
  template: "default" | any;
}

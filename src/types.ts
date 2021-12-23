export interface Params {
  name: string;
  description: string;
  author: any;
  repo: any;
  license: string | any;
  manager: string | any;
  template: "default" | any;
}

export interface Opts extends Params {
  templatePath?: string;
  skipPrompts?: boolean;
  git: boolean;
  shortName?: string;
  destinationPath?: string;
}

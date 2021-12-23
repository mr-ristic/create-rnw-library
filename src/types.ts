export interface Params {
  name: string;
  description: string;
  author: any;
  repo: any;
  license: string | any;
  manager: string | any;
  template: "default" | any;
}

export interface LibaryProps extends Params {
  templatePath?: string;
  skipPrompts?: boolean;
  git: boolean;
  shortName?: string;
  destinationPath?: string;
}

export interface templateOptions {
  file: string;
  source: string;
  destination: string;
  info: LibaryProps
}
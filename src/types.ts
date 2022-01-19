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

export interface initGitOptions {
  destination: string;
}
export interface installDependenciesOptions extends initGitOptions {
  info: LibaryProps;
}

export interface templateOptions extends installDependenciesOptions {
  file: string;
  source: string;
}

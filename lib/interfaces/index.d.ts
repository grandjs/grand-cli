export declare enum DependencyType {
    dev = "dev",
    normal = "normal"
}
export interface IDependency {
    type: DependencyType;
    name: string;
}
export interface IProject {
    name: string;
    description: string;
    dependencies: IDependency[];
}
export declare enum AppType {
    API = "API",
    Fullstack = "Fullstack"
}
export declare enum ProjectRepos {
    FullStack = "https://github.com/tareksalem/grandjs-todo",
    API = "https://github.com/tareksalem/grandjs-boilerplate"
}

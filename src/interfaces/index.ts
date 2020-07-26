export enum DependencyType{
    dev = "dev",
    normal = "normal"
}
export interface IDependency{
    type:DependencyType
    name:string
}
export interface IProject{
    name:string
    description:string
    dependencies: IDependency[]
}


export enum AppType{
    API = "API",
    Fullstack = "Fullstack"
}

export enum ProjectRepos{
    FullStack = "https://github.com/tareksalem/grandjs-todo",
    API = "https://github.com/tareksalem/grandjs-boilerplate"
}
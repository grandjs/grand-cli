"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectRepos = exports.AppType = exports.DependencyType = void 0;
var DependencyType;
(function (DependencyType) {
    DependencyType["dev"] = "dev";
    DependencyType["normal"] = "normal";
})(DependencyType = exports.DependencyType || (exports.DependencyType = {}));
var AppType;
(function (AppType) {
    AppType["API"] = "API";
    AppType["Fullstack"] = "Fullstack";
})(AppType = exports.AppType || (exports.AppType = {}));
var ProjectRepos;
(function (ProjectRepos) {
    ProjectRepos["FullStack"] = "https://github.com/tareksalem/grandjs-todo";
    ProjectRepos["API"] = "https://github.com/tareksalem/grandjs-boilerplate";
})(ProjectRepos = exports.ProjectRepos || (exports.ProjectRepos = {}));

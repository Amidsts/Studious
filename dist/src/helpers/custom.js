"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusENUM = exports.bookStatusENUM = void 0;
//books
var bookStatusENUM;
(function (bookStatusENUM) {
    bookStatusENUM["AVAILABLE"] = "available";
    bookStatusENUM["SOLD_OUT"] = "soldOut";
})(bookStatusENUM = exports.bookStatusENUM || (exports.bookStatusENUM = {}));
var statusENUM;
(function (statusENUM) {
    statusENUM["ACTIVE"] = "active";
    statusENUM["INACTIVE"] = "inactive";
    statusENUM["SUSPENDED"] = "suspended";
    statusENUM["DISABLED"] = "disabled";
})(statusENUM = exports.statusENUM || (exports.statusENUM = {}));
//admin
//ENUM
// export enum adminRoleENUM {
//     ACTIVE ="active",
//     INACTIVE = "inactive",
//     SUSPENDED = "suspended",
//     DISABLED = "disabled"
// } 
// UNION TYPES
// export type roleTYPES =  "author" | "swot"

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pagination = void 0;
const pagination = (req, res, next) => {
    //page: number of each page
    //limit : no of data returned per page
    //startIndex determines where to start returning documents from
    //endIndex determines where to return the documents to
    var _a, _b, _c;
    res.locals.paginate = {};
    const maxLimit = 10;
    //use optional 'chaining operator' ?. to prevent undefined
    let page = parseInt((_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.page.toString());
    let limit = parseInt((_c = (_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.limit) === null || _c === void 0 ? void 0 : _c.toString());
    if (!page || page <= 0)
        page = 1;
    if (!limit || limit > maxLimit)
        limit = maxLimit;
    res.locals.paginate.page = page;
    res.locals.paginate.limit = limit;
    res.locals.paginate.startIndex = (page - 1) * limit;
    res.locals.paginate.endIndex = page * limit;
    res.locals.paginate.next = {
        page: page + 1,
        limit: limit
    };
    res.locals.paginate.previous = {
        page: page - 1,
        limit: limit
    };
    // console.log(page)
    next();
};
exports.pagination = pagination;

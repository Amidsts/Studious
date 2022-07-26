import {NextFunction, Request, Response} from "express"


export const pagination = (req: Request, res: Response, next: NextFunction) => {
    
    //page: number of each page
    //limit : no of data returned per page
    //startIndex determines where to start returning documents from
    //endIndex determines where to return the documents to

    res.locals.paginate = {}

    const maxLimit = 10

    let page = parseInt( req?.query?.page?.toString() )
    let limit = parseInt( req?.query?.limit?.toString() )

    if( !page || page <= 0 ) page = 1

    if ( !limit || limit > maxLimit ) limit = maxLimit  

    res.locals.paginate.page = page
    res.locals.paginate.limit = limit
    res.locals.paginate.startIndex = (page - 1) * limit ;
    res.locals.paginate.endIndex = page * limit ;
    res.locals.paginate.next = {
        page: page + 1,
        limit : limit
    };
    res.locals.paginate.previous = {
        page: page - 1,
        limit : limit
    }

    
    // console.log(page)
    next()
}
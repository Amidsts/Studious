// import {Response} from "express"

 class baseError extends Error{
  protected success: boolean
  protected errorName: string;
  protected httpStatusCode: number;
  protected errMessage: {} | string;
  protected data: object;
 
}

export class authorizationError extends baseError {
  constructor ( err: string ) {
  super();
  this.success = false,
  this.errorName = "not_authourized",
  this.httpStatusCode = 401,
  this.errMessage = err,
  this.data = {}
  }
}

export class notFoundError extends baseError {
  constructor ( err: string ) {
  super();
  this.success = false,
  this.errorName = "not_Found",
  this.httpStatusCode = 404,
  this.errMessage = err,
  this.data = {}
  }
}

export class badRequestError extends baseError {
  constructor ( err?: {[key : string]: any} | string  ) {
  super();
  this.success = false,
  this.errorName = "bad_Request",
  this.httpStatusCode = 400,
  this.errMessage = err,
  this.data = {}
 
  }
}

export class conflictError extends baseError {
  constructor ( err?: {[key : string]: any} | string  ) {
  super();
  this.success = false,
  this.errorName = "conflict",
  this.httpStatusCode = 409,
  this.errMessage = err,
  this.data = {}
 
  }
}

export class requestTimeoutError extends baseError {
  constructor ( err?: {[key : string]: any} | string  ) {
  super();
  this.success = false,
  this.errorName = "conflict",
  this.httpStatusCode = 408,
  this.errMessage = err,
  this.data = {}
 
  }
}

export class expectationFailedError extends baseError {
  constructor ( err?: {[key : string]: any} | string  ) {
  super();
  this.success = false,
  this.errorName = "expectation Failed",
  this.httpStatusCode = 417,
  this.errMessage = err,
  this.data = {}
 
  }
}

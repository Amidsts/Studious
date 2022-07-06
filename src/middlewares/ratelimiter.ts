import { RateLimiterRedis, RateLimiterRes, IRateLimiterStoreOptions } from 'rate-limiter-flexible';
import * as redis from "redis"
// import Redis from "ioredis"
import {Request, Response} from "express"
import { createClient } from 'redis';
import passport from 'passport';

//connect to redis client
const redisClient = redis.createClient({})

const maxWrongAttemptsPerDay = 3;

export const consecutivefailedPassword = async (pwd: string) => {

    const opts:IRateLimiterStoreOptions = {
        storeClient: redisClient,
        points: maxWrongAttemptsPerDay, //  // maximum number of failed logins allowed. 1 fail = 1 point
    
        duration: 5, // (duration read in seconds, e.g 5 means 5seconds) the key is deleted after the value set here
        keyPrefix: "login_fail_per_day",
        // blockDuration: 60 * 60 * 24 // Block for 1 day, if 10 wrong attempts per day
        blockDuration: 60  //block for 60 sec
    }

    // console.log(typeof(opts))
    console.log( `the consecutiveFailedPassword output ${new RateLimiterRedis(opts)}` )

    // let c = new RateLimiterRedis(opts)

    let check = new RateLimiterRedis(opts)

    return check.get(pwd)

}

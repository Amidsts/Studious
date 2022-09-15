import Redis from "ioredis"

// import * as ENV from "../config/env"

const redis = new Redis();

export const connectRedis = async () => {

    try {
        await redis.on("connect", () => {
            console.log("'you are now connected to redis!")
        })
    } catch (err) {
        await redis.on("error", (err) => {
            console.log(`Redis error!  ${err}`)
        })
    }
   
}

//set redis key with timeout in seconds, once timeout the key is deleted
 export const SETEX = async (key: string, val: string | number) => {
     try {
        // console.log('redis key set success')
       const c = await redis.setex(key, 60*20, val)
       console.log(`see some works ${c}`)
        return c
     } catch (err) {
           
        console.log(`redis err here ${err}`)
    }  
}

 //get redis key
 export const GET = async (key: string) => {

    try {
        // console.log('redis key retrieved!')
        return await redis.get(key)
       
     } catch (err) {
    
        console.log(`redis key failed to set error here ${err}`)
    } 
 }

//delete redis key
export const DEL = async (key: string) => {
    try {
        // console.log('redis key retrieved!')
        const g = await redis.del(key)
        console.log(g)
       return g
     } catch (err) {
    
        console.log(`redis key has been deleted! ${err}`)
    } 
}

//check if key exist in redis
export const EXISTS = async(key: string) => {
    try {
        // console.log('redis key retrieved!')
        const g = await redis.exists(key)
        console.log(g)
       return g
     } catch (err) {
    
        console.log(`redis key has been deleted! ${err}`)
    } 
}

//
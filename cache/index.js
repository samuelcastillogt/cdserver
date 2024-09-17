import NodeCache from "node-cache";
import { DateTime } from "luxon";
class CacheServie {
    constructor(){
     this.myCache = new NodeCache();   
    }
    calculateExpiration(){
        const now = DateTime.now().toUTC()
        let expireTime = now.set({
            hour: 2,
            minute: 0,
            second: 0
        })
        if(now >= expireTime){
            expireTime = expireTime.plus({days: 1})
        }
        const finalCalc = expireTime.diff(now, "seconds").seconds
        return Math.round(finalCalc)
    }
    setCache(data){
        const limitDate = this.calculateExpiration()
        try {
            this.myCache.set(
                "business",
                {
                    data,
                    created_date: new Date() 
                },
                limitDate
            )
        } catch (error) {
            console.log(error)
        }   
    }
    getCache(){
        try {
            return this.myCache.get("business")
        } catch (error) {
            return null
        }
    }
    delCache(){
        try {
            this.myCache.del("business")
            return true
        } catch (error) {
            return false
        }
    }
}
export const cacheService = new CacheServie()

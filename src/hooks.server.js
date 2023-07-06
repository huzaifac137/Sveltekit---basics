import { redirect } from '@sveltejs/kit';
import { dataStore, getStore } from './Store/userStore';
import jwt from "jsonwebtoken";


export async function handle({ event, resolve }) {
    
    const sessionId = event.cookies.get("session_id");
    
    if(!sessionId || sessionId=="undefined")
    { 
        dataStore.set(null);
        console.log("IF SESSIONID DOESNT EXIST");
        const response = await resolve(event);
        return response;
        
    }
    
    if(sessionId!="undefined" && sessionId)
    {
          const extractedValues = jwt.verify(sessionId , process.env.JWT_KEY);
           
        dataStore.set(extractedValues);
           
        console.log("HOOK COOKIES : " , extractedValues);
    }

    const response = await resolve(event);
    return response;
}
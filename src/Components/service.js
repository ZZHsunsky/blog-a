import {URLMAP} from "./urlMap"
import axios from 'axios';

const serverIP = "http://39.108.133.245";
const port = "8900";

export function AjaxGetRequest(map,queryObj,succFunc,errFunc){
    var url = serverIP + ":" + port + ( URLMAP[map] || "404" );
    if(queryObj){
        url += "?";
        for(let key in queryObj){
            url += `${key}=${queryObj[key]}&`
        }
    }
    axios.get(url).then(succFunc).catch(errFunc);
}

export function AjaxPostRequest(map,queryObj,succFunc,errFunc){
    var url = URLMAP[map] || "404";
    axios.post(url).then(succFunc).catch(errFunc);
}


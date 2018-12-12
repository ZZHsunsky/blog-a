import {URLMAP} from "./urlMap"
import axios from 'axios';

const serverIP = "http://39.108.133.245";
//const serverIP = "http://127.0.0.1";
const port = "8900";

export const server = serverIP + ":" + port;

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
    var url = serverIP + ":" + port + ( URLMAP[map] || "404" );
    axios.post(url, queryObj).then(succFunc).catch(errFunc);
}

export function SetCookie(name, value){
    var exp = new Date();
    exp.setTime(exp.getTime() + 60 * 1000 * 120);  //过期时间 2小时
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

export function GetCookie(key){
    var arg = key + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;
    while (i < clen) {
        var j = i + alen;
        if (document.cookie.substring(i, j) === arg) return getCookieVal(j);
        i = document.cookie.indexOf(" ", i) + 1;
        if (i === 0) break;
    }
    return null;
}

function getCookieVal(offset){
    var endstr = document.cookie.indexOf(";", offset);
    if (endstr === -1) endstr = document.cookie.length;
    return unescape(document.cookie.substring(offset, endstr));
}
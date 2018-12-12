import {server} from "./service"

export function transformFileToDataUrl(file, callback){
    const imgFile = {
        type: file.type || "image/jpeg",
        size: file.size,
        name: file.name,
        lastModifiedDate: file.lastModifiedDate,
    };
    const reader = new FileReader();
    reader.addEventListener('load', () => processData(reader.result, imgFile, callback));
    reader.readAsDataURL(file)
}
/*
  * @dataURL : file 第一次转换成 dataURL 无压缩的
  * @imgFile : 图片文件
  * @shouldCompress: 是否压缩  默认压缩
  * @quality : 图片压缩后的质量 默认为0.2
*/
// 准备上传
function processData(dataUrl, imgFile, callback){
    const binaryString = window.atob(dataUrl.split(',')[1]);
    const arrayBuffer = new ArrayBuffer(binaryString.length);
    const intArray = new Uint8Array(arrayBuffer);
    
    for( let _ = 0, limit = binaryString.length; _ < limit; _++){
        intArray[_] = binaryString.charCodeAt(_);
    }

    const data = [intArray];
    let blob;

    try{
        blob = new Blob(data, {type: imgFile.type});
    }catch(error){
        // Toast.error("版本过低，不支持上传图片", 2000, undefined, false);
        throw new Error('版本过低，不支持上传图片');
    }

    const fileOfBlob = new File([blob],imgFile.name);
    const formData = new FormData();

    formData.append('type', imgFile.type || "image/jpeg");
    formData.append('size', fileOfBlob.size + "");
    formData.append('name', imgFile.name);
    formData.append('lastModifiedDate', imgFile.lastModifiedDate);
    formData.append('file', fileOfBlob);

    const xhr = new XMLHttpRequest();
    const call = callback;
    xhr.addEventListener('error', ()=>{console.error("上传失败！");}, false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const result = JSON.parse(xhr.responseText);
                call && result.fileName && call(result.fileName);
                console.info("上传成功");
            } else {
                console.log("上传失败");
            }
        }
    };
    xhr.open('POST', server + '/upload' , true);
    xhr.send(formData);
}

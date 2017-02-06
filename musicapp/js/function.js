/*马赛克*/
function msk(dataobj,num,x,y) {
    var width = dataobj.width, height = dataobj.height;
    var num = num;
    var w = width / num;
    var h = height / num;
    for (var i = 0; i < num; i++) {//行
        for (var j = 0; j < num; j++) {//列  x
            var dataObj = cobj.getImageData(j * w, i * h, w, h);

            var r = 0, g = 0, b = 0;
            for (var k = 0; k < dataObj.width * dataObj.height; k++) {
                r += dataObj.data[k * 4 + 0];
                g += dataObj.data[k * 4 + 1];
                b += dataObj.data[k * 4 + 2];
            }

            r = parseInt(r / (dataObj.width * dataObj.height));
            g = parseInt(g / (dataObj.width * dataObj.height));
            b = parseInt(b / (dataObj.width * dataObj.height));
            // console.log(r + "--" + g + "--" + b);

            for (var k = 0; k < dataObj.width * dataObj.height; k++) {
                dataObj.data[k * 4 + 0] = r;
                dataObj.data[k * 4 + 1] = g;
                dataObj.data[k * 4 + 2] = b;
            }


            cobj.putImageData(dataObj, x + j * w, y+i * h);

        }

    }

}
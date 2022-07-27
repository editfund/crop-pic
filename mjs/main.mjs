// import 'https://unpkg.com/cropperjs@1.5.12/dist/cropper.min.css';
//<link rel="stylesheet" href="https://unpkg.com/cropperjs@1.5.12/dist/cropper.min.css">
import Cropper from 'https://unpkg.com/cropperjs@1.5.12/dist/cropper.esm.js';

//输出图片的尺寸
export let outputWidth = 120;
export let outputHeight = 120;



document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    event.preventDefault();//取消默认的浏览器自带右键 很重要！！

    window.mdc.autoInit();

});

let image = document.getElementById('image');
let cropper = new Cropper(image, {
    aspectRatio: 1 / 1,

    crop(event) {
        console.log(event.detail.x);
        console.log(event.detail.y);
        console.log(event.detail.width);
        console.log(event.detail.height);
        console.log(event.detail.rotate);
        console.log(event.detail.scaleX);
        console.log(event.detail.scaleY);
        outputWidth = Math.floor(event.detail.width);
        outputHeight = Math.floor(event.detail.height);
        document.querySelector("#div-1-p1").innerHTML = '尺寸指示器：'+outputWidth;
    },
});

document.querySelector("#fab-2").addEventListener("click", () => {
    cropper.getCroppedCanvas({
        width: outputWidth,
        height: outputHeight,
        minWidth: 64,
        minHeight: 64,
        maxWidth: 4096,
        maxHeight: 4096,
        //fillColor: '#fff',
        imageSmoothingEnabled: false,
        imageSmoothingQuality: 'high',
    }).toBlob((blob) => {
        const timestamp = Date.now().toString();
        const a = document.createElement('a');
        document.body.append(a);
        a.download = `${timestamp}.png`;
        a.href = URL.createObjectURL(blob);
        a.click();
        a.remove();
    });
});

document.querySelector("#fab-1").addEventListener("click", () => {
    document.querySelector("#openFileDialog-Img").click();
});

document.querySelector("#openFileDialog-Img").onchange = function (e) {
    //console.log(this.files[0].size);
    console.log(this.files[0]);
    console.log(document.getElementById("openFileDialog-Img").files[0]);

    if (cropper) {
        cropper.destroy();
    }

    image.src = URL.createObjectURL(this.files[0]);
    cropper = new Cropper(image, {
        aspectRatio: 1 / 1,

        crop(event) {
            console.log(event.detail.x);
            console.log(event.detail.y);
            console.log(event.detail.width);
            console.log(event.detail.height);
            console.log(event.detail.rotate);
            console.log(event.detail.scaleX);
            console.log(event.detail.scaleY);
        },
    });

    e.target.value = '';//为了下次相同文件可用
};

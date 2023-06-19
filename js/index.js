var timer;
var big_box = document.querySelector('.big_box');
var ul = big_box.querySelector('ul');
var ol = big_box.querySelector('ol');
var lis_img = ul.querySelectorAll('li');
var left = document.querySelector('.left');
var right = document.querySelector('.right');
var num = 0;  

function animate(obj, target) {
    var timer1 = setInterval(function () {
        var current = obj.offsetLeft;
        var step = 10;
        step = current > target ? -step : step;
        if (Math.abs(current - target) <= Math.abs(step)) {
            clearInterval(timer1);
            obj.style.left = target + 'px';
        }
        else {
            obj.style.left = current + step + 'px';
        }
    }, 10)
}

//小圆圈样式改变
function circlechange(circles, circle) {
    if (circle == lis_img.length) {
        circle = 0;
    }
    for (var i = 0; i < circles.length; i++) {
        circles[i].className = "";
    }
    circles[circle].className = "current";
}

//在页面刚加载进来就执行代码
window.addEventListener('load', function () {
    for (var i = 0; i < lis_img.length; i++) {
        var li = document.createElement('li');
        ol.appendChild(li);
        // 给小圆圈添加自定义属性
        li.setAttribute('index', i);
        if (i == 0) {
            li.className = "current";
        }
        //给小圆圈添加点击处理事件
        li.addEventListener('click', function () {
            for (var j = 0; j < ol.children.length; j++) {
                ol.children[j].className = "";
            }
            this.className = "current";
            var index = this.getAttribute('index');
            animate(ul, -index * big_box.offsetWidth);
            circlechange(circles, index);
        })
    }
    var circles = ol.querySelectorAll('li');
    var li_img = ul.children[0].cloneNode(true);
    ul.appendChild(li_img);

    //点击右箭头向右滑动
    right.addEventListener('click', function () {
        //下面if代码是实现向右滑动的无缝衔接，不懂的建议自己手动模拟一遍
        if (num >= lis_img.length) {
            num = 0;
            ul.style.left = 0 + 'px';
        }
        num++;
        animate(ul, -num * big_box.offsetWidth);
        circlechange(circles, num);
    })
    //点击左箭头向左滑动
    left.addEventListener('click', function () {
        if (num <= 0) {
            num = lis_img.length;
            ul.style.left = -lis_img.length * big_box.offsetWidth + 'px';
        }
        num--;
        animate(ul, -num * big_box.offsetWidth);
        circlechange(circles, num);
    })

    //实现自动播放
    timer = setInterval(function () {
        right.click();
    }, 2000)

    //鼠标放到盒子上停止自动播放
    big_box.addEventListener('mouseover', function () {
        clearInterval(timer);
    })

    //鼠标离开自动播放
    big_box.addEventListener('mouseout', function () {
        clearInterval(timer);
        timer = setInterval(function () {
            right.click();
        }, 2000)
    })
})

    // 点击跳转
    function btn() {
    window.location.href='./html/product.html';
   }
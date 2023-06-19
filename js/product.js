    var img = document.querySelectorAll(".img");
    var left = document.querySelector(".left");
    var right = document.querySelector(".right");
    var buttons = document.querySelectorAll(".li");
    idArr = ["first", "second", "right", "last"];
    var index = 0;
    initialize();

    //设置一个定时器，让图片轮播
    var timer = setInterval(next, 2000);

    //给箭头绑定点击事件
    left.addEventListener("click", prev);
    //当鼠标放到箭头上时，让定时器停止
    left.addEventListener("mouseover", function() {
        clearInterval(timer);
        timer = null;
    });
    //当鼠标离开箭头时，让定时器重新开始
    left.addEventListener('mouseout', function(){
        timer = setInterval(next, 2000);
    });

    right.addEventListener("click", next);
    right.addEventListener("mouseover", function(){
        clearInterval(timer);
        timer = null;
    });
    right.addEventListener("mouseout",function() {
        timer = setInterval(next, 2000);
    });

    //给小方块添加点击事件
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("mousedown", function() {
            //在用户点击的时候关闭定时器
            clearInterval(timer);
            timer = null;
            if (index > i) {
                let x = index - i;
                while (x--) {
                    prev();
                }
            } else if (index < i) {
                let x = i - index;
                while (x--) {
                    next();
                }
            }
        });
        buttons[i].addEventListener("mousedown", function() {
            timer = setInterval(next, 2000);
        })
    }

    //创建切换图片的函数
    function prev() {
        idArr.push(idArr.shift());
        initialize();
        if (index === 0) {
            index = buttons.length - 1;
        } else {
            index--;
        }
        clearColor();
    }
    function next() {
        idArr.unshift(idArr.pop());
        initialize();
        if (index === buttons.length - 1) {
            index = 0;
        } else {
            index++;
        }
        clearColor();
    }

    //创建一个函数用来让小方块跟随图片运动
    function clearColor() {
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].style.backgroundColor = "silver";
        }
        //让当前的索引变色
        buttons[index].style.backgroundColor = "rgb(20, 134, 187)";
    }

    //创建一个函数用来初始化图片
    function initialize() {
        for (let i = 0; i < img.length; i++) {
            img[i].id = idArr[i];
        }
    }

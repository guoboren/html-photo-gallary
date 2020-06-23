var CUBE_COUNT = 36; // 长方体的子个数
var CUBE_SINGLE_WIDTH = 16; // 每个子长方体的宽度
var CUBE_ROLLING = false; // 是否正在旋转

$(function(){
    initCube();
    initPhotoGallary();
});

// 创建旋转长方体
function initCube()
{
    var centerX = ($('#cubeBox').position().left + $('#cubeBox').width())/2;
    var startX = centerX - CUBE_COUNT / 2 * CUBE_SINGLE_WIDTH;
    for (var i = 0; i < CUBE_COUNT; i++)
    {
        var $cube = $('<div class="cube">' +
                            '<div class="cube-child"></div>' +
                            '<div class="cube-child"></div>' +
                            // '<div class="cube-child"></div>' +
                            // '<div class="cube-child"></div>' +
                            '<div class="cube-child"></div>' +
                            '<div class="cube-child"></div>' +
                        '</div>');

        $cube.css({
            top:'50px',
            left:startX + i * CUBE_SINGLE_WIDTH + 'px',
        }).data('deg', 0);

        if (i + 1 <= CUBE_COUNT / 2)
            $cube.css({zIndex:i});
        else
            $cube.css({zIndex:10000-i});

        for (var j = 1; j <= 4; j++)
            $cube.find('div.cube-child').eq(j - 1).css({
                backgroundImage:'url("' + j + '.jpg")',
                backgroundPosition: -i * CUBE_SINGLE_WIDTH + "px 0px"
            });
        
        $('#cubeBox').append($cube);
    }

    

    $(window).click(function(){
        if (CUBE_ROLLING) // 避免并发旋转
            return;
        CUBE_ROLLING = true;
        $.each($('.cube'), function(i, el){
            var deg = $(el).data('deg') + 90;
            $(el).css({
                transform: "rotateX(" + deg + "deg)",
                transition: "transform 0.3s linear " + i * 0.02 + "s"
            });
            $(el).data('deg', deg == 360 ? 0 : deg);

        });
        setTimeout(function(){
            CUBE_ROLLING = false;
        }, 300 + (CUBE_COUNT - 1) * 20);
    });

    setInterval(function(){
        $(window).click()
    }, 1000);
}

var PHOTO_COUNT = 20;
var PHOTO_SINGLE_WIDTH = 100;
var PHOTO_SINGLE_HEIGHT = 130;

// 创建照片画廊
function initPhotoGallary()
{
    var centerX = ($('#gallary').position().left + $('#gallary').width())/2;
    var centerY = ($('#gallary').position().top + $('#gallary').height())/2;
    var startX = centerX - PHOTO_COUNT / 2 * PHOTO_SINGLE_WIDTH;
    for (var i = 0; i < PHOTO_COUNT; i++)
    {
        var $photo = $('<div class="photo"></div>');
        $photo.css({
            // left:startX + PHOTO_SINGLE_WIDTH * i + 'px',
            left: centerX - PHOTO_SINGLE_WIDTH/2 + 'px',
            top: centerY - PHOTO_SINGLE_HEIGHT/2 + 'px',
            backgroundImage: 'url("' + Math.floor(Math.random() * 3+1) + '.jpg")',
            // transform: 'rotateY(' + 360 / PHOTO_COUNT * i + 'deg) translateZ(300px)'
            transform: 'rotateX(90deg) translateZ(' + i + 'px)'
        });
        $('#gallary').append($photo);
    }
    setTimeout(function(){
        $.each($('.photo'), function(i, el){
            setTimeout(function(){
                $(el).css({
                    transform:'rotateY(' + 360 / PHOTO_COUNT * i + 'deg) translateZ(400px)',
                    transition: 'transform 2s',
                })
            }, i * 200);
        });
        $('#gallary').css({
            animation: 'rotate 4s ease-in-out infinite',
            // transform:'rotateX(90deg)',
            // transition: 'transform 2s',
        });
        // setTimeout(function(){
        //     $('.photo').css({
        //         
        //     })
        // }, $('.photo').length * 200);
    }, 1500);
}
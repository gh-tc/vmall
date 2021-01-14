


requirejs.config({
    paths : {
        'jquery' : '/lib/jquery-3.4.1.min'
    }
});


define(['jquery','/js/modules/banner.js','/api/server.js'],function( $ , initBanner , {banner2Data , detailData}){

    banner2Data().then((res)=>{
        if(res.code == 0){
            initBanner(res.banner_list);
        }
    });

    var type = location.href.match(/type=([^&]+)/)[1];
    var id = location.href.match(/id=([^&]+)/)[1];

    // console.log(type ,id);
    detailData(type,id).then((data)=>{
        // console.log(data);
        initDetail(data);
    });

    //渲染放大镜
    function initDetail(data){

        var $detail = $('#detail');
        var $detailGoods = $('#detailGoods');

        $detail.html(`
            <div class="detail_gallery l">
                <div class="detail_gallery_normal">
                    <img src="${data.photoNormal}" alt="">
                    <span></span>
                </div>
                <div class="detail_gallery_large">
                    <img src="${data.photoLarge}" alt="">
                </div>
            </div>
            
            <div class="detail_message l">
                <h2>${data.goodsName}</h2>
                <p>价 格 <span class="detail_message_price">¥${data.goodsPrice}</span></p>
                <p>选择颜色 ${
                    data.chooseColor.map((v,i)=>{
                        return `
                            <span class="detail_message_box">${v}</span>
                        `;
                    }).join('')
                }</p>
                <div class="detail_message_btn clearfix">
                    <div class="detail_message_num l">
                        <input type="text" value="1">
                        <span>+</span>
                        <span>-</span>
                    </div>
                    <div class="detail_message_cart l"><a href="#">加入购物车</a></div>
                    <div class="detail_message_computed l"><a href="#">立即下单</a></div>
                </div>
            </div>
        `);

        $detailGoods.html(`
            <h3>-- 商品详情 --</h3>
            ${
                data.goodsInfo.map((v,i)=>{
                    return `
                        <img src="${v}" alt="">
                    `;
                }).join('')
            }
        `);
        bindGallery();
        chooseInfo();
    }

    //放大镜交互
    function bindGallery(){
        var $detail_gallery_normal = $('.detail_gallery_normal');
        var $detail_gallery_normal_span = $detail_gallery_normal.find('span');
        var $detail_gallery_large = $('.detail_gallery_large');
        var $detail_gallery_large_img = $detail_gallery_large.find('img');

        console.log($detail_gallery_normal);
        console.log($detail_gallery_normal_span);

        $detail_gallery_normal.hover(function(){
            $detail_gallery_normal_span.show();
            $detail_gallery_large.show();
        },function(){
            $detail_gallery_normal_span.hide();
            $detail_gallery_large.hide();
        }).mousemove(function(ev){
            var L = ev.pageX - $(this).offset().left - $detail_gallery_normal_span.width()/2;
            var T = ev.pageY - $(this).offset().top - $detail_gallery_normal_span.height()/2;
            var maxX = $(this).width() - $detail_gallery_normal_span.width();
            var maxY = $(this).height() - $detail_gallery_normal_span.height();
            var scaleX = L / maxX;
            var scaleY = T / maxY;

            if(L < 0){
                L = 0;
            }
            else if(L > maxX){
                L = maxX;
            }
            if(T < 0){
                T = 0;
            }
            else if(T > maxY){
                T = maxY;
            }
            $detail_gallery_normal_span.css({
                left: L ,
                top : T
            });

            $detail_gallery_large_img.css({
                left: - scaleX * ($detail_gallery_large_img.width() - $detail_gallery_large.width()),
                top : - scaleY * ($detail_gallery_large_img.height() - $detail_gallery_large.height())
            });
        });
    }

    //右侧信息交互
    function chooseInfo(){
        var $detail_message_box = $('.detail_message_box');
        var $detail_message_num = $('.detail_message_num');
        var $span = $('.detail_message_num span');
        var $input = $('.detail_message_num input');

        $detail_message_box.click(function(){
            $(this).addClass('active').siblings().removeClass('active');
        });
        // + 
        $span.eq(0).click(function(){
            $input.val(Number($input.val()) + 1) ;
        })
        $span.eq(1).click(function(){
            if($input.val()>1){
                $input.val(Number($input.val()) - 1) ;
            }
        })
        $input.on('input',function(){
            if(isNaN(Number($(this).val()))){
                $(this).val(1);
            }
        })
        

    }


});
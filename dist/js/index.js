


requirejs.config({
    paths : {
        'jquery' : '/lib/jquery-3.4.1.min'
    }
});

//路径用绝对的话要把后缀名带上
//因为是在主页里，所以调取的数据应该是主页的，所以只获取 bannerData 方法的数据
define(['jquery','/js/modules/banner.js','/api/server.js'],function($,initBanner,{ bannerData , goodsData}){
   
    bannerData().then((res)=>{
        if(res.code == 0){
            //让数据跟功能结合
            initBanner(res.banner_list);
        }
    });

    // goods 手机商品列表的渲染
    goodsData('phone').then((res)=>{
        if(res.code == 0){
            //因为不知道添加的容器是什么，所以要指定一下 id ，传一下
            initGoods('#phone',res);
        }
        
    });

    // goods 笔记本商品列表的渲染
    goodsData('book').then((res)=>{
        if(res.code == 0){
            //因为不知道添加的容器是什么，所以要指定一下 id ，传一下
            initGoods('#book',res);
        }
        
    });

    // goods ipad商品列表的渲染
    goodsData('pad').then((res)=>{
        if(res.code == 0){
            //因为不知道添加的容器是什么，所以要指定一下 id ，传一下
            initGoods('#pad',res);
        }
        
    });

    

    function initGoods(id , res){

        var $con = $(id);

        $con.html(`
                <h2 class="goods_title">${res.title}</h2>
                <ul class="goods_list clearfix">
                            ${
                                res.goods_list.map((v,i)=>{
                                    return `
                                        <li>
                                            <a href='/view/detail.html?type=${res.type}&id=${v.goodsId}' target="_blank">
                                                <div><img src="${v.goodsImg}" alt=""></div>
                                                <h3>${v.goodsName}</h3>
                                                <p>￥${v.goodsPrice}</p>
                                            </a>
                                        </li> 
                                    `;
                                }).join('').repeat(3)
                            }
                </ul>
            `);
    }

});
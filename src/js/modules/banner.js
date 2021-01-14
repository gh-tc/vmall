


define(['jquery'], function($) {
    
    var $bannerList = $('.banner-list');
    
    //banner.js 提供了 initBanner 方法，data 是 mock 文件提供的数据，相结合传到前端进行数据渲染
    function initBanner(data){

        // console.log(data[0].imgLink);
        // console.log(data.imgLink);

        $bannerList.html(`
                <ul>
                    ${
                        data.map((v,i)=>{
                            return `
                                <li class="${i == 0 ? 'show':''}"><a href="${v.imgLink}"><img src="${v.imgUrl}" alt=""></a></li>
                            `;
                        }).join('')
                    }
                </ul>
                <ol>
                    ${
                        data.map((v,i)=>{
                            return `
                                <li class="${ i==0 ? 'active' : ''}"></li>
                            `;
                        }).join('')
                    }
                </ol>

            `);

            bindBanner();

    }

    function bindBanner(){

        // var $ulLis = $('ul li');
        //.find()//找指定后代的节点（包括孙子代及以下）
        //但是find()也可以只找子代，这样写
        //.find('>li')  
        var $ulLis = $bannerList.find('ul li');

        $bannerList.on('mouseover','ol li',function(){

            $(this).attr('class','active').siblings().attr('class','');
            $ulLis.eq( $(this).index() ).attr('class','show').siblings().attr('class','');
        })
    }
    
    //提供对外接口
    return initBanner;

});



//统一处理 vmall 中的所有数据接口

define(['jquery'],function($){

    //banner文件数据
    function bannerData(){
        //返回的是一个 promise 对象
        return $.ajax('/api/mock/banner.json');
    }

    //banner2文件数据
    function banner2Data(){
        //返回的是一个 promise 对象
        return $.ajax('/api/mock/banner2.json');
    }

    //phone文件数据
    function goodsData(type){

        return $.ajax(`/api/mock/${type}.json`);
    }

    //商品详情数据
    function detailData(type ,id){
        var promise = new Promise((resolve,reject)=>{
            $.ajax(`/api/mock/${type}.json`).then((res)=>{

                        if(res.code == 0){
                            for(var i=0;i<res.goods_list.length;i++){
                                if(res.goods_list[i].goodsId == id){
                                    resolve(res.goods_list[i]);
                                }
                            }
                        }

            });
        });
        return promise;

    }




    return{
        bannerData,
        banner2Data,
        goodsData,
        detailData
    }

});
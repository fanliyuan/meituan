var app=angular.module("myApp",['ionic']);
app.config(function($stateProvider,$urlRouterProvider,$ionicConfigProvider){
    $ionicConfigProvider.tabs.position("bottom");
    $stateProvider.state("start",{
        templateUrl:"tpl/start.html",
        url:"/start",
        controller:'startCtrl'
    }).state("order",{
        templateUrl:"tpl/order.html",
        url:"/order"
    }).state("my",{
        templateUrl:"tpl/my.html",
        url:"/my"
    }).state("list",{
        templateUrl:"tpl/list.html",
        url:"/list/:id",
        controller:"listCtrl"
    }).state("detail",{
        templateUrl:'tpl/detail.html',
        url:'/detail',
        params:{'sid':0,'did':0},
        controller:"detailCtrl"
    }).state('orderlist',{
        templateUrl:'tpl/orderlist.html',
        url:'/orderlist'
    }).state('cart',{
        templateUrl:'tpl/cart.html',
        url:'/cart',
        controller:"cartCtrl"
    });
    $urlRouterProvider.otherwise("/start");
})
app.controller("myCtrl",["$scope","$state","$ionicPopover","$interval",'$timeout',function($scope,$state,$ionicPopover,$interval,$timeout){
    $scope.jump=function(st){
        $state.go(st);
    }
    $scope.datas={};
    $scope.datas.isActives2=false;
    $scope.datas.isActives3=false;
    $scope.datas.isActives1=true;

    $scope.toggleClass1=function(st){
        $scope.datas.isActives2=false;
        $scope.datas.isActives3=false;
        $scope.datas.isActives1=true;
        $scope.jump(st);
    }
    $scope.toggleClass2=function(st){
        $scope.datas.isActives1=false;
        $scope.datas.isActives3=false;
        $scope.datas.isActives2=true;
        $scope.jump(st);
    }
    $scope.toggleClass3=function(st){
        $scope.datas.isActives2=false;
        $scope.datas.isActives1=false;
        $scope.datas.isActives3=true;
        $scope.jump(st);
    }

    $scope.data=[
        {name:'娃娃菜',intro:'我还只是个宝宝哪',count:1347,zan:43,price:2.7,img:'shop1.jpg'},
        {name:'鱼豆腐',intro:'其实我也是海鲜',count:1188,zan:43,price:2.7,img:'shop2.jpg'}
    ];
    $scope.order=[
        {count:0},
        {count:0}
    ];
    $scope.sumPrice=0;
    $scope.accounts=false;
    $scope.adds=function(i){
        $scope.focus=i;
        var timer=$timeout(function(){
            $scope.order[i].count+=1;
            $scope.focus='a';
            $timeout.cancel(timer);
        },220)
        $scope.sumPrice+=$scope.data[i].price;

        if($scope.sumPrice>=20){
            $scope.accounts=true;
        }
    }
    $scope.dec=function(i){
        if($scope.order[i].count<=0){
            $scope.order[i].count=0;
        }
        $scope.order[i].count-=1;
        $scope.sumPrice-=$scope.data[i].price;
        if($scope.sumPrice<=20){
            $scope.accounts=false;
        }
    }
    $scope.$watch('order',function(){
        $scope.sums=0;
        angular.forEach($scope.order,function(value,key){
            $scope.sums+= value.count;
        })
        if($scope.sums<=0){
            $scope.isOrder=false;
        }
        else
            $scope.isOrder=true;
    },true)
//点击购物车，弹出浮动框

    $scope.openPopover = function($event) {
        $ionicPopover.fromTemplateUrl('my_popover.html', {
            scope: $scope
        }).then(function(popover) {
            $scope.popover = popover;
            $scope.popover.show($event);
        });

    };

}])
app.controller('startCtrl',["$scope","$state","$ionicScrollDelegate","$http",function($scope,$state,$ionicScrollDelegate,$http){
    $scope.getScrollPosition=function(){
        if($ionicScrollDelegate.getScrollPosition().top<=170){
            $scope.isShow=false;
        }
        else{
            $scope.isShow=true;
    }
    }
    var i=0;
    $scope.imgData=['logo1.jpg','logo2.jpg','logo3.jpg'];
    $scope.load_more=function(){
        $scope.$broadcast("scroll.refreshComplete");
    }
    $http.get('data/get_shop.php').success(function(data){
        $scope.shopdata=data[0];
    })
    $scope.sort=function(){
        i++;
        $scope.expression='month_sell';
        if(i%2==0){
            $scope.reverse=true;
        }
        else{
            $scope.reverse=false;
        }
    }
}]);
app.controller("listCtrl",["$scope","$state",'$ionicPopover','$timeout','$stateParams','$http',function($scope,$state,$ionicPopover,$timeout,$stateParams,$http){
    $scope.sid=$stateParams.id;
    $scope.classifies=[];
    $http.get('data/get_bysid.php?sid='+$scope.sid).success(function(data){
        $scope.dishList=data['dish'][0];
        angular.forEach(data['dish'][0],function(value,key){
            $scope.classifies.push(value.classifies);
        });
        $scope.shops=data['shop'][0][0];
    })
    $scope.list_jump=function(sid,did){
        $state.go("detail",({sid:sid,did:did}));
    }
}]);

app.controller('detailCtrl',["$scope","$state","$stateParams","$http","$httpParamSerializerJQLike",function($scope,$state,$stateParams,$http,$httpParamSerializerJQLike){
    var out={sid:$stateParams.sid,did:$stateParams.did};
    out=$httpParamSerializerJQLike(out);
    $http.get("data/get_bysiddid.php?"+out).success(function(data){
        $scope.detaildata=data[0][0];
    })
}]);
app.controller("cartCtrl",["$scope","$state","$stateParams","$http",'$ionicPopup','$httpParamSerializerJQLike',function($scope,$state,$stateParams,$http,$ionicPopup,$httpParamsSerializerJQLike){
    $scope.isChecked=true;
    $scope.cartlist=[];
    $http.get("data/get_cart.php").success(function(data){
        $scope.cartlist=data[0];
        angular.forEach($scope.cartlist,function(value){
            value.state={};
        })
    });
    $scope.edit='编辑';
    $scope.cancels=false;
    $scope.clickEdit=function(){
        if($scope.edit=='编辑'){
            $scope.edit='取消';
            $scope.isChecked=false;
            $scope.cancels=true;
        }
        else
        {
            $scope.edit='编辑';
            $scope.isChecked=true;
            $scope.cancels=false;
        }
    }
    $scope.checkedData=[];
    $scope.delete=function(){
        var confirmPopup=$ionicPopup.confirm({
            title:'提示',
            template:"<p style='color:black;text-align:center'>是否删除所选商品</p>",
            cancelText:'取消',
            okText:"确认",
            okType:"button-clear button-energized"
        });
        confirmPopup.then(function(res){
            if(res){
                var c={};
                    angular.forEach($scope.cartlist,function(value,key){
                        if(value.state.data){
                            c.cid=value.cid;
                        }
                    })
                var cans=$httpParamsSerializerJQLike(c);
               $http.get("data/delete_cartlist.php?"+cans).success(function(data){
                    if(data==1){
                        $state.go('cart',null,{reload:true});
                    }
               })
            }
            else{
               console.log("弹出失败！")
            }
        })
    }
}]);
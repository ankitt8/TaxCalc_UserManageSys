taxCalApp
.filter('startFrom', function(){
    return function(data, start){
        if(!data){
            return data
        }
        return data.slice(start)
    }
})
.filter('percentage', ['$filter', function ($filter) {
    return function (input, decimals) {
        return $filter('number')(input * 100, decimals) + '%';
    };
}])
.filter('customEmail', function(){
    return function (input, emailFull){
        return emailFull? input: input.slice(0,3)+'*****'+input.slice(-4);
    }
});

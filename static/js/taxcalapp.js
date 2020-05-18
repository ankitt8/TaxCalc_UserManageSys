var taxCalApp = angular.module("taxCalApp", ["ngRoute",  'ui.bootstrap',  "angular.filter", "ui.select", "ngSanitize"]);

taxCalApp.run(['$rootScope', function($rootScope){

    $rootScope.$on("$routeChangeSuccess", function(event, current, previous){
        $rootScope.current=current;
        $rootScope.previous=previous;
        $rootScope.event=event;
    });
}])
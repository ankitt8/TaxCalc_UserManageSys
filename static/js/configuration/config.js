taxCalApp.config(function($routeProvider){
    $routeProvider
                .when("/taxcal",{
                    templateUrl:'static/partials/taxcal.html',
                    controller:'taxCalculatorController',
                    title: 'Tax Calculator',
                    stateTaxCal:'active'  //is used to set in ng-class 
                })
                .when("/", {

                    templateUrl:'static/partials/home.html',
                    title: 'Dashboard',
                    stateHome:'active' //is used to set in ng-class
                })
                .when("/usermanagementsystem", {
                    templateUrl:'static/partials/usermanagementsystem.html',
                    controller:'userManageSysController',
                    title:'User Management System',
                    stateUMS:'active' //is used to set in ng-class

                })
});
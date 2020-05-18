taxCalApp.
controller("userManageSysController", ['$scope', '$http', function($scope, $http){
   
    $scope.currentPage = 1;
    $scope.pageSize = 5;

    $scope.cities = [
        'Pune',
        'Bangalore',
        'Hyderabad',
        'Mumbai',
        'Noida',
        'Gurgaon',
        'Nasik',
        'Telangana',
        'Chennai',
        'Patna',
        'Kolkata',
        'Surat',
        'Ahemdabad',
        'Delhi',
        'Gorakhpur',
        'Varanasi',
        'Jaipur',
        'Kohima',
        'Bhopal',
        'Indore'
    ].sort();

    $scope.city = {
        selected:''
    }

    
    $scope.$watch('city.selected', function(newVal, oldVal){
        console.log($scope.city.selected)
        if(newVal != oldVal){
            // $scope.validatecity($scope.city.selected)
            $scope.ucitycheck = true;
        }
    })

    $scope.getCities = function(search){
        var newCities = $scope.cities.slice();
        if(search && newCities.indexOf(search) === -1){
            newCities.unshift(search);
        }
        return newCities
    }

    // var myStorage = window.localStorage; 
    // myStorage.clear()
    $scope.userRoles = [
        {name:'User'},
        {name:'Admin'}
    ]
    $scope.userType = $scope.userRoles[1];
    
    // $scope.totalItems = users.length
    $scope.validateuid = function(uid){
        if(uid == '' || isNaN(uid) ){
            $scope.uiderror = 'Please Enter Valid Uid';
            $scope.uidcheck = false;
        }else{
            $scope.uiderror = ''
            $scope.uidcheck = true;
        }

        //check if user id already exists
        if($scope.users){
            $scope.users.forEach(function(item){
                if(uid == item.id){
                    $scope.uiderror = 'User Id Already Exists';
                    $scope.uidcheck = false;
                }
            })
        }
        
    }
    
    $scope.validatename = function(name){
        // let pat = /^[A-Z|a-z][a-z]*$/
        let pat = /^[a-zA-Z ]+$/
        if(name == '' || name.match(pat) == null){
            $scope.unameerror = 'Please Enter Valid Name';
            $scope.unamecheck = false;
        }else{
            $scope.unameerror = '';
            $scope.unamecheck = true;
        }

    }

    $scope.validateemail =  function(email){
        let pat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        if(email == '' || email.match(pat) == null){
            $scope.uemailerror = 'Please Enter valid Email';
            $scope.uemailcheck = false;
        }else{
            $scope.uemailerror = ''
            $scope.uemailcheck = true;
        }
        $scope.uemailerror = ''
        $scope.uemailcheck = true;
        
    }
    
    $scope.validatephone = function(phone){
        let pat = /^[0-9]\d{9}$/
        // let pat = /^[0-9]\d{0}$/
        if(phone == '' || phone.match(pat) == null){
            $scope.uphoneerror = 'Please Enter Valid Mobile Number';
            $scope.uphonecheck = false;   
        }else{
            $scope.uphoneerror = '';
            $scope.uphonecheck = true;   
        }
    }
    $scope.validatecity = function(city){
        if(city == ''){
            $scope.ucityerror = 'Please Enter Valid City';
            $scope.ucitycheck = false
        }else{
            $scope.ucityerror = '';
            $scope.ucitycheck = true;
        }
    }

    $scope.validaterole = function(role){
        if(role == ''){
            $scope.uroleerror = 'Please Enter Valid Role'
            $scope.urolecheck = false
        }else{
            $scope.uroleerror = ''
            $scope.urolecheck = true;
        }
    }

    $scope.validatepassword = function(pass){
        if(pass == ''){
            $scope.upasserror = 'Please Enter Valid Password'
            $scope.upasscheck = false;
        }else{
            $scope.upasserror = ''
            $scope.upasscheck = true;
        }
    }

    $scope.check = function(){
        return !($scope.uidcheck && $scope.unamecheck && $scope.uemailcheck && $scope.uphonecheck && $scope.ucitycheck && $scope.urolecheck && $scope.upasscheck)
    }

    $scope.editCheck = function(){ 
        return !($scope.unamecheck && $scope.uemailcheck && $scope.uphonecheck && $scope.ucitycheck && $scope.urolecheck)
    }
    // myStorage.clear()
    // $scope.validatepassword(pass)
    $scope.addUser = function(){
            
        $scope.city.selected = ''
        $scope.newUser = {
            id:'',
            phone:'' ,
            name: '',
            email:'',
            city: '',
            password:'',
            role:'' 
        }
        $scope.uiderror = $scope.uemailerror = $scope.uphoneerror = $scope.ucityerror = $scope.unameerror = $scope.uroleerror = $scope.upasserror =  '' ;
        $scope.check()
       
    }
   
    
    $http({
        method: 'GET',
        url: '/fetch-users'
    }).then(function successCallBack(response){
        $scope.users = response.data.data        
    }, function errorCallBack(response){
        console.log(response)
    });

    $scope.submit = function(){      
        $scope.newUser.city = $scope.city.selected;
        if(!$scope.users){
            $scope.users = []
        }
        $scope.users.push($scope.newUser)
        let req = {
            method: 'POST',
            url: '/add-user',
            // headers: {
            //   'Content-Type': application/JSO
            // },
            data: { user: $scope.newUser}
        }
           
        $http(req).
        then(function successCallBack(response)
        {
            console.log(response)
        }, 
        function errorCallBack(response){
            console.log(response);
        })
       
        $('#addUser').modal('hide');
    }

    $scope.editUser = function(user){
        $scope.unamecheck = $scope.uemailcheck = $scope.uphonecheck = $scope.ucitycheck = $scope.urolecheck  = true;
        // $scope.changeUser = user;
        $scope.changeUser = {}
        $scope.changeUser.id = user.id
        $scope.changeUser.name = user.name
        $scope.changeUser.email = user.email
        $scope.changeUser.phone = user.phone
        $scope.changeUser.city = user.city
        $scope.changeUser.role = user.role
        
    }
    $scope.submitEdit = function(){
        $("#editUser").modal("hide");
        let req = {
            method: 'POST',
            url: '/edit-user',
            // headers: {
            //   'Content-Type': application/JSO
            // },
            data: { user: $scope.changeUser}
           }
           
        $http(req).
        then(function successCallBack(response)
        {
            console.log(response)
        }, 
        function errorCallBack(response){
            console.log(response);
        })

        //instead of calling again from sql alchemy and fetching the users i am doing the same in frontend
        $scope.users.forEach(myFunction);
        function myFunction(item, index){
            if(item.id === $scope.changeUser.id){
                // $scope.changeUser.city = $scope.city.selected
                $scope.users[index] = $scope.changeUser;
                // myStorage.setItem("users", JSON.stringify($scope.users))
            }
        }
    }
    $scope.deleteUser = function(user){
        $scope.confirmDeleteStatus = confirm("Are you sure you want to delete?");
        if($scope.confirmDeleteStatus){
            
            
            var req = {
                method: 'POST',
                url: '/delete-user',
                // headers: {
                //   'Content-Type': application/JSO
                // },
                data: { userid: user.id}
               }
               
            $http(req).
            then(function successCallBack(response)
            {
                console.log(response)
            }, 
            function errorCallBack(response){
                console.log(response);
            })
            let user_index = $scope.users.indexOf(user);
            console.log(user_index)
            $scope.users.splice(user_index, 1);
            // myStorage.setItem("users", JSON.stringify($scope.users))
            $scope.deleteEmpAlertVisibility = false;
        }
    }
    // $scope.emailFull = false; //to show shortened version or full version of email
   
}])

// .filter('startFrom', function(){
//     return function(data, start){
//         return data.slice(start)
//     }
// })
// .filter('percentage', ['$filter', function ($filter) {
//     return function (input, decimals) {
//         return $filter('number')(input * 100, decimals) + '%';
//     };
// }])
// .filter('customEmail', function(){
//     return function (input, emailFull){
//         return emailFull? input: input.slice(0,3)+'*****'+input.slice(-4);
//     }
// });



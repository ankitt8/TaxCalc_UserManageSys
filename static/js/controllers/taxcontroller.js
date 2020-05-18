taxCalApp.controller('taxCalculatorController', ['$scope', '$filter', function($scope, $filter) {
    
    // $rootScope.msg = 'Tax Calculator'
    $scope.form_details = {
        income : '',
        section_80_c:'',
        section_80_d:'',
        section_80_tta:'',
        gtaxincome:'',
        tax:''
        
    }
    const slabs = {
     
        slab1: {
            min_limit:0,
            max_limit:250000,
            tax_rate:0
        },
        slab2: {
            min_limit:250000,
            max_limit:500000,
            tax_rate:5
        },
        slab3: {
            min_limit:500000,
            max_limit:1000000,
            tax_rate:20
        },
        slab4 :{
            min_limit:1000000,
            max_limit:Infinity,
            tax_rate:30
        }        
    }
    var cess_rate = 3;
    var myChart = echarts.init(document.getElementById('echartbox'));
    var option;
    var tax = 0;
    var chartxAxisLabel = ['Up to 2.5L', 'Rs 2.5L to 5L', 'Rs 5L to 10L', 'More than 10L', 'Cess', 'Income Tax']

    function initializeTable(){

        $scope.description = { 
          
            desc1:{
                heading : 'Up to Rs 2,50,000',
                desc: 'Exemption from tax',
                value : 0
            },
            desc2:{
                heading : 'Rs 2,50,000 to Rs 5,00,000',
                desc : slabs.slab2.tax_rate + '% (nill)',
                value : 0
            },
            desc3:{
                heading : 'Rs 5,00,000 to Rs 10,00,000',
                desc : slabs.slab3.tax_rate + '% (nill)',
                value : 0
            },
            desc4:{
                heading: 'More than Rs 10,00,000',
                desc : slabs.slab4.tax_rate + '% (nill)',
                value : 0
            },
            desc5:{
                heading : 'Cess',
                desc : cess_rate + '% (nill)',
                value : 0
            },
            desc6:{
                heading : 'Total income Tax',
                desc: 'nill',
                value : 0
            }
        }
        // console.log(typeof $scope.description)
        
    
    }
    initializeTable() // will initialize the detailed description table when taxcal.html loads and echart
    
    






    var myChart = echarts.init(document.getElementById('echartbox'));
    function createChart(){
        
        var data_array = []
        Object.values($scope.description).forEach(function(temp){
            data_array.push(temp.value)
        })
         option = {
            xAxis: {
                type: 'category',
                data: chartxAxisLabel,
                axisLabel:{
                    //  interval:0,
                      rotate:10
                },

                min:0,
                name:'Tax Description',
                nameLocation:'middle',
                nameGap:30,
                nameTextStyle:{
                    align:'left',
                    fontSize:14
                }// ,
                // max: (tax + 100000)
            },
            yAxis: {
                type: 'value',
                name:'Tax Value',
                nameLocation:'middle',
                nameGap:60 ,
                nameTextStyle:{
                    align:'left',
                    fontSize:14
                }
            },
            grid:{
                left:'12%',
                right:'10%',
                bottom:'15%',
                top:'5%'
            },
            series: [{
                data: data_array, // denotes the income initializing with random value 0, 100000, 200000, 300000, 400000, 500000
                type: 'bar'
            }],
            tooltip:{
                show:true,
                formatter:'IncomeTax: {c}'
            },
            color:['#007bff']
        };
        myChart.setOption(option);
    }
    createChart();

    // $scope.flag = true;
    $scope.ierror = '';
    $scope.s80cerror = ''
    $scope.s80derror = ''
    $scope.s80ttaerror = ''
    var icheck = false;
    var s80ccheck= false;
    var s80dcheck = false;
    var s80ttacheck = false;


    $scope.validateincome = function(value){
        icheck = false;
        if(value >= 0 && value != ''){
            icheck = true;
            $scope.ierror = ''
        }else{
            $scope.ierror = 'Please Enter valid income'
        }

        $scope.form_details.gtaxincome = $scope.form_details.tax = 0
       
        // console.log(icheck)
    }
    $scope.validates80c = function(value){
        s80ccheck = false;
        if(value >= 0 && value != ''){
            s80ccheck = true;
            $scope.s80cerror = ''
        }else{
            $scope.s80cerror = 'Please Enter valid section 80c deduction'
        }
       
        if(value < 0){
            $scope.form_details.section_80_c = 0;
        }
        if(value >= 150000){
            $scope.form_details.section_80_c = 150000;
        }
        $scope.form_details.gtaxincome = $scope.form_details.tax = 0
       
        // console.log(s80ccheck)
    }
    $scope.validates80d = function(value){
        s80dcheck = false;
        if(value >= 0 && value != ''){
            s80dcheck= true;
            $scope.s80derror = ''
        }else{
            $scope.s80derror = 'Please enter valid Section 80d deduction'
        }
        if(value < 0){
            $scope.form_details.section_80_d = 0;
        }
        if(value >= 25000){
            $scope.form_details.section_80_d = 25000;
        }
        $scope.form_details.gtaxincome = $scope.form_details.tax = 0
       
        // console.log(s80dcheck)
    }
    $scope.validates80tta = function(value){
        s80ttacheck = false;
        if(value >= 0 && value != ''){
            s80ttacheck = true
            $scope.s80ttaerror = ''
        }else{
            $scope.s80ttaerror = 'Please enter valid section 80tta deduction'
        }

        if(value < 0){
            $scope.form_details.section_80_tta = 0;
        }
        if(value >= 10000){
            $scope.form_details.section_80_tta = 10000;
        }
        $scope.form_details.gtaxincome = $scope.form_details.tax = 0
       
        // console.log(s80ttacheck)
    }
    // console.log(icheck)
    // console.log(s80ccheck)
    // console.log(s80dcheck)
    // console.log(s80ttacheck)

    var s80c = 0
    var s80d = 0
    var s80tta = 0
    var int_income = 0
    var gtaxincome = 0


    $scope.validate = function(){

        s80c =  parseInt($scope.form_details.section_80_c, 10)
        s80d = parseInt($scope.form_details.section_80_d, 10)
        s80tta = parseInt($scope.form_details.section_80_tta, 10)
        int_income = parseInt($scope.form_details.income, 10)
        gtaxincome = int_income - (s80c + s80d + s80tta);
        let gtaxincome_check = (gtaxincome < 0 ? false:true )
        if(!gtaxincome_check){
            $scope.s80cerror = 'Total Deduction value cant be greater than income'
            $scope.s80derror = 'Total Deduction value cant be greater than income'
            $scope.s80ttaerror = 'Total Deduction value cant be greater than income'
        }else{
            $scope.s80cerror = ''
            $scope.s80derror = ''
            $scope.s80ttaerror = ''
        }
        return  !(icheck && s80ccheck && s80dcheck && s80ttacheck && gtaxincome_check)
    
    }
    $scope.submit = function(){
        
        initializeTable()
        
        
        // let tax = 0
        let temp = 0;
        let final_desc = ''
        // console.log(gtaxincome)
        $scope.form_details.gtaxincome = gtaxincome; 
        //  console.log(gtaxincome)
        //  console.log($scope.description.desc2.value)

        while(true){
            if(gtaxincome <= 500000){
                break;
            }
            if(gtaxincome <= slabs.slab1.max_limit){
                tax = 0;
                break;
            }
           
            if(gtaxincome <= slabs.slab2.max_limit){
                temp = ((gtaxincome - slabs.slab2.min_limit)*slabs.slab2.tax_rate)/100;
                temp = Math.round(temp * 100)/100
                tax += temp;
                $scope.description.desc2.value = temp;
                // console.log($scope.description.desc2.value)
                $scope.description['desc2'].desc = slabs.slab2.tax_rate+'% of '+gtaxincome+' less '+slabs.slab2.min_limit;
               
                break;
            }else{
                temp = ((slabs.slab2.max_limit - slabs.slab2.min_limit)*slabs.slab2.tax_rate)/100;
                temp = Math.round(temp * 100)/100
                
                tax += temp;
                $scope.description['desc2'].value = temp;
                $scope.description['desc2'].desc = slabs.slab2.tax_rate+'% of '+slabs.slab2.max_limit+' less '+slabs.slab2.min_limit;
               
            }

            if(gtaxincome <= slabs.slab3.max_limit){
                temp = ((gtaxincome - slabs.slab3.min_limit)*slabs.slab3.tax_rate)/100;
                temp = Math.round(temp * 100)/100
                
                tax += temp;
                $scope.description['desc3'].value = temp;
                $scope.description['desc3'].desc = slabs.slab3.tax_rate+'% of '+gtaxincome+' less '+slabs.slab3.min_limit;
                break;
            }else{
                temp = ((slabs.slab3.max_limit - slabs.slab3.min_limit)*slabs.slab3.tax_rate)/100;
                temp = Math.round(temp * 100)/100
               
                tax += temp;
                $scope.description['desc3'].value = temp;
                $scope.description['desc3'].desc = slabs.slab3.tax_rate+'% of '+slabs.slab3.max_limit+' less '+slabs.slab3.min_limit;
            }

            temp = ((gtaxincome - slabs.slab4.min_limit)*slabs.slab4.tax_rate)/100;
            temp = Math.round(temp * 100)/100
                
            tax += temp;
            $scope.description['desc4'].value = temp;
            $scope.description['desc4'].desc = slabs.slab4.tax_rate+'% of '+ gtaxincome +' less '+slabs.slab4.min_limit;
            break;

        }

       
        Object.values($scope.description).forEach(function(temp){

            if(temp.value > 0){
                final_desc += $filter('currency')(temp.value, 'Rs') + ' + ';
            }
        })
       
       
        

        $scope.description['desc5'].desc = cess_rate+' % of ('+ final_desc.slice(0,-1) +')'; //slice is used to remove the last '+'
                                                                                                //character
        temp = (tax * cess_rate)/100;
        temp = Math.round(temp * 100)/100
                
        $scope.description['desc5'].value = temp
        tax = tax + temp
        $scope.form_details.tax = tax
        $scope.description['desc6'].value = tax
        $scope.description['desc6'].desc = final_desc + $filter('currency')(temp, 'Rs') 
     
        
        
        
        
        // GRAPH CODE
        createChart()
        tax = 0


    }
}]);

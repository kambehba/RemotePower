(function () {
    'use strict';

    angular
      .module('app.remotePower')
      .controller('RemotePowerController', ['$scope', 'firebaseDataService', RemotePowerController]);

    function RemotePowerController($scope, firebaseDataService) {


        var vm = this;
        vm.output1Status = "";
        vm.output2Status = "";
        vm.output3Status = "";
        vm.outputs = [];
        vm.output1BtnStyle = "0";
        vm.output2BtnStyle = "0";
        vm.output3BtnStyle = "0";
       
        SetOutputs();



        ///***view model methods***///
        vm.toggoleOutput1 = function () {
           
        }

        vm.toggoleOutput2 = function () {

        }

        vm.toggoleOutput3 = function () {

        }
        


        ///***private methods***///
        function SetOutputs() {
         

            firebaseDataService.getOutputs().then(function (promise) {
                vm.outputs = promise;
                vm.output1BtnStyle = vm.outputs[1];
                vm.output2BtnStyle = vm.outputs[2];
                vm.output3BtnStyle = vm.outputs[3];
               

            });

           
        }
     


    }/*****end of ProjectController******/

})();

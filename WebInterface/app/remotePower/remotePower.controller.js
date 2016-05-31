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
            if (vm.output1BtnStyle == 0)
            {
                firebaseDataService.toggle(1, 1);
            }
            if (vm.output1BtnStyle == 1) {
                firebaseDataService.toggle(1, 0);
            }
            SetOutputs();
        }

        vm.toggoleOutput2 = function () {
            if (vm.output2BtnStyle == 0) {
                firebaseDataService.toggle(2, 1);
            }
            if (vm.output2BtnStyle == 1) {
                firebaseDataService.toggle(2, 0);
            }
            SetOutputs();
        }

        vm.toggoleOutput3 = function () {
            if (vm.output3BtnStyle == 0) {
                firebaseDataService.toggle(3, 1);
            }
            if (vm.output3BtnStyle == 1) {
                firebaseDataService.toggle(3, 0);
            }
            SetOutputs();
        }
        


        ///***private methods***///
        function SetOutputs() {
         

            firebaseDataService.getOutputs().then(function (promise) {
                vm.outputs = promise;
                vm.output1BtnStyle = vm.outputs[1].id;
                vm.output2BtnStyle = vm.outputs[2].id;
                vm.output3BtnStyle = vm.outputs[3].id;
               

            });

           
        }
     


    }/*****end of ProjectController******/

})();

(function () {
    'use strict';

    angular
      .module('app.core')
      .factory('firebaseDataService', ['$q', '$rootScope', '$location', '$timeout', 'FIREBASE_URL', firebaseDataService]);



    function firebaseDataService($q, $rootScope, $location, $timeout, FIREBASE_URL) {
        var dataRef = new Firebase(FIREBASE_URL);
        var quizes = [];
        var outputsResource = new Firebase('https://dazzling-torch-8270.firebaseio.com/RemotePower/Outputs');
        var quizId = 0;
        var selectedQuiz = { id: 0, name: "" };



        /*****service API******/
        return ({
            getOutputs: getOutputs,
            toggle: toggle
           
        });


        /*****public methods******/
        function getOutputs() {

            var promise = [];
            var deferred = $q.defer();
            outputsResource.once('value', function (snapshot) {
                promise = snapshot.val();
                deferred.resolve(promise);
            });
            return (deferred.promise);
        }

        function toggle(outputId,newValue) {

            var outputRef = new Firebase('https://dazzling-torch-8270.firebaseio.com/RemotePower/Outputs/' + outputId);
            outputRef.set({ id: newValue });
           
        }
       




        /*****private methods******/
        

    } /*****end of firebaseDataService******/

})();



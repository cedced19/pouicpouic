module.exports = ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {
        $rootScope.nav = 'webcam';
        if (!$rootScope.user) {
            $location.path('/login');
        }
        $scope.setImage = function () {
          $scope.imageUrl = '/api/photos/?' + new Date().getTime();
        };
        $scope.setImage();
}];

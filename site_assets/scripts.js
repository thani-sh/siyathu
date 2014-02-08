(function(){


    window.L = function () {
        if(window.L.enabled)
            console.log(arguments);
    }

    window.L.enabled = true;



    // Scripts to run when page is ready

    $(function(){
        L(':: [window] Page Loaded and Ready');
    })



    // Initialize Siyathu App

    window.siyathu = angular.module('siyathu', ['ngRoute']);



    // Initialzie Siyathu Routes

    window.siyathu.config(function ($routeProvider) {

        $routeProvider.when('/homepage', {
            templateUrl:'site_views/website/homepage.html'
            ,controller:'StaticController'
        });

        $routeProvider.when('/error/invalid-url', {
            templateUrl:'site_views/errors/invalid-url.html'
            ,controller:'StaticController'
        });

        $routeProvider.when('/error', {
            templateUrl:'site_views/errors/unknown.html'
            ,controller:'StaticController'
        });

        $routeProvider.when('/:channelId/', {
            templateUrl:'site_views/channel/viewer.html'
            ,controller:'ViewerController'
        });

        $routeProvider.when('/:channelId/editor', {
            templateUrl:'site_views/channel/editor.html'
            ,controller:'EditorController'
        });

        $routeProvider.when('/:channelId/publisher', {
            templateUrl:'site_views/channel/publisher.html'
            ,controller:'PublisherController'
        });

        $routeProvider.otherwise({
            redirectTo: '/homepage'
        });

    });



    // MainController
    // @TODO Description

    window.siyathu.controller('MainController', function ($scope, $route, $routeParams) {
        L(':: [controller] MainController');
        L(JSON.stringify($routeParams));
    });



    // StaticController
    // @TODO Description

    window.siyathu.controller('ViewerController', function ($scope, $routeParams) {
        L(':: [controller] ViewerController');
        L(JSON.stringify($routeParams));
    });



    // EditorController
    // @TODO Description

    window.siyathu.controller('EditorController', function ($scope, $routeParams) {
        L(':: [controller] EditorController');
        L(JSON.stringify($routeParams));
    });



    // PublisherController
    // @TODO Description

    window.siyathu.controller('PublisherController', function ($scope, $routeParams) {
        L(':: [controller] PublisherController');
        L(JSON.stringify($routeParams));
    });



    // StaticController
    // @TODO Description

    window.siyathu.controller('StaticController', function ($scope, $routeParams) {
        L(':: [controller] StaticController');
        L(JSON.stringify($routeParams));
    });



    // EOF

})();

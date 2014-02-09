(function(){


    var SIGNALLING_FIREBASE_NAME = 'ss14-team-140';


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
            redirectTo: '/error/invalid-url'
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
        var channel = ($routeParams.channelId || 'defaultChannel') + '::' + 'editor<->viewer';
        var meeting = new Meeting(channel);
        var remoteVids = document.getElementById('viewer-remote-videos');

        meeting.firebase = SIGNALLING_FIREBASE_NAME;

        meeting.onaddstream = function(e) {
            L('[stream] Added on E<->V Channel', e);
            if (e.type == 'local') {
                // No need to show local stream.
                // @TODO Stop local media stream
                e.stream.stop();
            } else if (e.type == 'remote') {
                remoteVids.innerHTML = '';
                remoteVids.appendChild(e.video);
            }
        };

        meeting.onuserleft = function(userid) {
            var video = document.getElementById(userid);
            if (video) video.parentNode.removeChild(video);
        };

        meeting.check();

        window.meeting_v = meeting;

    });



    // EditorController
    // @TODO Description

    window.siyathu.controller('EditorController', function ($scope, $routeParams) {
        L(':: [controller] EditorController');

        window.streams = {};
        window.currentStreamId = null;
        window.previewVideoElement = document.getElementById('editor-preview-video');
        window._temp_channel = ($routeParams.channelId || 'defaultChannel') + '::' + 'editor<->publisher';

		$("#publisher").val("http://ss14-team-140.divshot.io/siyathu#/"+($routeParams.channelId || 'defaultChannel')+"/publisher");

        (function(){

            var channel = ($routeParams.channelId || 'defaultChannel') + '::' + 'editor<->publisher';
            var meeting = new Meeting(channel);
            var remoteVids = document.getElementById('editor-remote-videos');

            meeting.firebase = SIGNALLING_FIREBASE_NAME;

            meeting.onaddstream = function(e) {
                if (e.type == 'local') {
                    // No need to show local stream.
                    // @TODO Stop local media stream
                    e.stream.stop();
                } else if (e.type == 'remote') {
                    e.video.classList.add('vid');
                    //remoteVids.insertBefore(e.video, remoteVids.firstChild);
                    $("#carousel1").data('owlCarousel').addItem(e.video);
                    e.video.play();
                    e.video.onclick = function () {
                        window.changeStream(e.video.id);
                    }
                    window.streams[e.video.id] = e.stream;
                    if (window.currentStreamId === null) {
                        forwardStream(e.stream);
                        window.currentStreamId = e.video.id;
                        window.previewVideoElement.src = e.video.src;
                        window.previewVideoElement.play();
                    }
                }
            };

            meeting.onuserleft = function(userid) {
                var video = document.getElementById(userid);
                if (video) video.parentNode.removeChild(video);
            };

            meeting.host(channel);

            window.meeting_e = meeting;

        })();

        function forwardStream (stream) {

            var channel = ($routeParams.channelId || 'defaultChannel') + '::' + 'editor<->viewer';
            var meeting = new Meeting(channel);

            meeting.firebase = SIGNALLING_FIREBASE_NAME;

            meeting.onaddstream = function(e) {
                L('[stream] Added on E<->V Channel', e);
                if (e.type == 'local') {
                    // No need to show local stream.
                    // @TODO Stop local media stream
                    // try using e.stream.stop()
                } else if (e.type == 'remote') {
                    //
                }
            };

            meeting.forward(channel, stream);

            window.meeting_ep = meeting;

        }

        window.changeStream = function (streamId) {
            var video = document.getElementById(streamId);
            window.previewVideoElement.src = video.src;
            window.previewVideoElement.play();
            forwardStream(window.streams[streamId]);
        }

        window.forwardStream = forwardStream;

        (function(){
            var channelRef = new Firebase('https://ss14-team-140.firebaseio.com/channels/' + $routeParams.channelId);
            channelRef.onDisconnect().remove();
            channelRef.set({ foo : 'bar' });
        })();

        (function(){
            $("#carousel1").owlCarousel({ pagination : false,items:3});
            $("#carousel2").owlCarousel({ pagination : false });
            $('.bootstrap-popover').popover({
            	 placement : 'top',
            	 trigger : 'hover',
            	 delay : {show : 10, hide: 10}
           	});
        })();


		$('#carousel1 .vid').click(function(){
			alert("change the video stream");
		});
		$('#carousel2 .vid').click(function(){
			alert("change the video stream");
		});
    });



    // PublisherController
    // @TODO Description

    window.siyathu.controller('PublisherController', function ($scope, $routeParams) {
        L(':: [controller] PublisherController');
        var channel = ($routeParams.channelId || 'defaultChannel') + '::' + 'editor<->publisher';
        var meeting = new Meeting(channel);
        var localVid = document.getElementById('editor-local-video');

        meeting.firebase = SIGNALLING_FIREBASE_NAME;

        meeting.onaddstream = function(e) {
            if (e.type == 'local') {
                localVid.insertBefore(e.video, localVid.firstChild);
            } else if (e.type == 'remote') {
                // @TODO No need for remote video preview
            }
        };

        meeting.onuserleft = function(userid) {
            var video = document.getElementById(userid);
            if (video) video.parentNode.removeChild(video);
        };

        // @TODO Many things can go wrong here.
        // Check if channel is available, re-connect option, and more are needed
        meeting.check();

        window.meeting_p = meeting;

    });



    // StaticController
    // @TODO Description

    window.siyathu.controller('StaticController', function ($scope, $routeParams) {
        L(':: [controller] StaticController');
        L(JSON.stringify($routeParams));
    });



    // EOF

})();

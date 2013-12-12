define(['plugins/router', 'durandal/app'], function (router, app) {
    return {
        router: router,
        search: function() {
            //It's really easy to show a message box.
            //You can add custom options too. Also, it returns a promise for the user's response.
            app.showMessage('Search not yet implemented...');
        },
        activate: function () {
            router.map([
                { route: '', title: 'Menu', moduleId: 'viewmodels/welcome', nav: true },
                { route: 'flickr', moduleId: 'viewmodels/flickr', nav: false },
                { route: 'scores', moduleId: 'viewmodels/scores', nav: true },
                { route: 'types', moduleId: 'viewmodels/types' },
                { route: 'game/:type', moduleId: 'viewmodels/game' }
            ]).buildNavigationModel();
            
            return router.activate();
        }
    };
});
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
                { route: 'scores', title: 'High Scores', moduleId: 'viewmodels/scores', nav: true },
                { route: 'types', title: 'Choose game', moduleId: 'viewmodels/types' },
                { route: 'numbers/:t', title: 'Choose number', moduleId: 'viewmodels/numbers' },
                { route: 'game/:n/:number', moduleId: 'viewmodels/game' }
            ]).buildNavigationModel();
            
            return router.activate();
        }
    };
});
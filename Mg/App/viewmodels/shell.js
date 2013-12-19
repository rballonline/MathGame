define(['plugins/router', 'durandal/app'], function (router, app) {
    return {
        router: router,
        activate: function () {
            router.map([
                { route: '', title: 'Menu', moduleId: 'viewmodels/welcome', nav: true },
                { route: 'scores', title: 'High Scores', moduleId: 'viewmodels/scores', nav: true },
                { route: 'types', title: 'Choose game', moduleId: 'viewmodels/types' },
                { route: 'numbers/:type', title: 'Choose number', moduleId: 'viewmodels/numbers' },
                { route: 'game/:type/:number', moduleId: 'viewmodels/game' }
            ]).buildNavigationModel();
            
            return router.activate();
        }
    };
});
define(['plugins/router','durandal/system','common/lib/Routes'], function (router,system,Routes) {
    system.log(router)
    return {
        router: router,
        activate: function () {
            return router.map(new Routes().routeMap()).buildNavigationModel()
                .mapUnknownRoutes('!plain-html-modules/home/vms/index', 'not-found')
                .activate();
        }
    };
});

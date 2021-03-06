var ClimbingApp;
(function (ClimbingApp) {
    var Views;
    (function (Views) {
        var Locations;
        (function (Locations) {
            var LocationsController = (function () {
                function LocationsController(LocationsService, RoutesService, UserService) {
                    this.LocationsService = LocationsService;
                    this.RoutesService = RoutesService;
                    this.UserService = UserService;
                    this.newRoute = new ClimbingApp.Models.Route;
                    this.locations = LocationsService.getAllLocations();
                    this.routes = RoutesService.getAllRoutes();
                }
                LocationsController.prototype.deleteRoute = function (id) {
                    this.RoutesService.deleteRoute(id);
                    var index = _.findIndex(this.routes, function (item) {
                        return item.id === id;
                    });
                    this.routes.splice(index, 1);
                };
                LocationsController.prototype.canEdit = function () {
                    return this.UserService.isLoggedIn;
                };
                LocationsController.prototype.sendIt = function (route) {
                    this.RoutesService.climbRoute(route);
                };
                LocationsController.prototype.canDelete = function () {
                    return this.UserService.isLoggedIn
                        && this.UserService.user.isAdmin;
                };
                LocationsController.prototype.saveRoute = function () {
                    var _this = this;
                    this.RoutesService.saveRoute(this.newRoute)
                        .then(function (route) {
                        _this.routes.push(route);
                    });
                    this.newRoute = new ClimbingApp.Models.Route();
                };
                return LocationsController;
            }());
            LocationsController.$inject = [
                'LocationsService',
                'RoutesService',
                'UserService'
            ];
            Locations.LocationsController = LocationsController;
        })(Locations = Views.Locations || (Views.Locations = {}));
    })(Views = ClimbingApp.Views || (ClimbingApp.Views = {}));
})(ClimbingApp || (ClimbingApp = {}));
//# sourceMappingURL=locations.controller.js.map
(function() {
  'use strict';

  var app = angular.module('NarrowItDownAp', []);
  app.controller('NarrowItDownController', NarrowItDownController)
  app.factory('MenuSearchFactory', MenuSearchFactory);

  NarrowItDownController.$inject = ['MenuSearchService']
  function NarrowItDownController(MenuSearchService) {
    var ctrl = this;

    ctrl.searchTerm = "";

    MenuSearchService = MenuSearchFactory();
    var searchTerm = ctrl.searchTerm;

    ctrl.getMatchedMenuItems = function(searchTerm) {
      return MenuSearchService.getMatchedMenuItems(searchTerm);
    };

  }


  MenuSearchService.$inject = ['$http'];
  function MenuSearchService($http) {
    var service = this;

    this.getMatchedMenuItems = function(searchTerm) {

      var response = $http({
        method: "GET",
        url: "https://davids-restaurant.herokuapp.com/menu_items.json"
      });

      return response
      .then(function(result) {

        console.log("Result: ", result.data);
        // process result and only keep items that match
        //var foundItems...

        // return processed items
        return foundItems;


      });


    };

  }


  function MenuSearchFactory() {
    var factory = function () {
      return new MenuSearchService();
    };

    return factory;
  }

})();

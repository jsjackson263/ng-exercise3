(function() {
  'use strict';

  var app = angular.module('NarrowItDownApp', []);
  app.controller('NarrowItDownController', NarrowItDownController);
  app.factory('MenuSearchFactory', MenuSearchFactory);

  NarrowItDownController.$inject = ['MenuSearchFactory'];
  function NarrowItDownController(MenuSearchFactory) {
    var ctrl = this;

    ctrl.searchTerm = "";

    var menuSearchService = MenuSearchFactory();
    var searchTerm = ctrl.searchTerm;

    ctrl.getMatchedMenuItems = function(searchTerm) {
      return menuSearchService.getMatchedMenuItems(searchTerm);
    };

  }


  MenuSearchService.$inject = ['$http', 'searchTerm'];
  function MenuSearchService($http, searchTerm) {
    var service = this;

    service.getMatchedMenuItems = function(searchTerm) {

      var response = $http({
        method: "GET",
        url: "https://davids-restaurant.herokuapp.com/menu_items.json"
      }).then(function(result) {
        // success
      });


      // .then(function(result) {
      //
      //   console.log("Result: ", result.data);
      //   // process result and only keep items that match
      //   //var foundItems...
      //
      //   // return processed items
      //   return foundItems;
      //
      //
      // });

       return response;

    };

  }


  function MenuSearchFactory() {
    var factory = function () {
      return new MenuSearchService();
    };

    return factory;
  }

})();

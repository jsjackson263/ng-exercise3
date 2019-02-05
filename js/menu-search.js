(function() {
  'use strict';

  var app = angular.module('NarrowItDownApp', []);
  app.controller('NarrowItDownController', NarrowItDownController);
  app.service('MenuSearchService', MenuSearchService)
  app.directive('foundItems', FoundItemsDirective);


  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'loader/items-loader-template.html',
      scope: {
        found: '<',
        onRemove: '&'
      },
      transclude: true
    };

    return ddo;
  }

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var ctrl = this;

    ctrl.searchTerm = "";
    var searchTerm = ctrl.searchTerm;

    ctrl.getMatchedMenuItems = function(searchTerm) {
      var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
      promise.then(function(response) {
        // console.log("response in promise: ", response);
        ctrl.items = response;

        if (response.length === 0) {
          ctrl.notFound = "Nothing found!";
        } else {
          ctrl.notFound = "";
        }

      }).catch(function(error) {
        console.log(error);
      });

    };

    ctrl.removeItem = function(itemIndex) {
      ctrl.items.splice(itemIndex, 1);
    };

  }


  MenuSearchService.$inject = ['$http'];
  function MenuSearchService($http) {
    var service = this;

    service.getMatchedMenuItems = function(searchTerm) {
      var foundItems = [];

      return $http({
        method: "GET",
        url: "https://davids-restaurant.herokuapp.com/menu_items.json"
      }).then(function(result) {

        if (searchTerm.length === 0) {
          return [];
        }

        //process result and only keep items that match
        var menuItems = result.data.menu_items;
        for (var i = 0; i < menuItems.length; i++) {
          var description = menuItems[i].description;
          if (description.toLowerCase().indexOf(searchTerm) !== -1) {
            foundItems.push(menuItems[i]);
          }
        }

        // return processed items
        return foundItems;

      }).catch(function(error) {
        console.log("Error: ", error);
      });
    };

  }

})();

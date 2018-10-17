/*   Copyright 2017 Agneta Network Applications, LLC.
 *
 *   Source file: theme/source/main/menu-side.module.js
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */

var app = angular.module('MainApp');
var menu;

app.run(function($rootScope) {
  Object.defineProperty($rootScope, 'hasMenu', {
    get: function() {
      return Boolean(menu);
    }
  });

  $rootScope.$on('$routeChangeSuccess', function() {
    $rootScope.menu = {};
  });

  $rootScope.menu = {};
});

app.directive('agMenuSide', function(
  $rootScope,
  $timeout,
  $route,
  $window,
  $mdMedia
) {
  return {
    scope: true,
    link: function(vm, elm, attrs) {
      if (!attrs.name) {
        console.error('Ag Menu needs a name on element:', elm);
        return;
      }
      var locked = false;
      var menu = (vm.menu = {
        isLocked: true
      });

      function lockUpdate() {
        if (attrs.name == 'main') {
          menu.isLocked = false;
          return;
        }
        $timeout(function() {
          var route = $route.current;
          locked = route && route.locals.data.menuLock;
          menu.isLocked = locked && $mdMedia('gt-sm');
          if (menu.isLocked) {
            menu.showing = true;
          }
        }, 300);
      }

      lockUpdate();

      angular.element($window).bind('resize', lockUpdate);

      vm.$watch('menu.showing', function(value) {
        var icon = value ? 'material/close' : 'material/menu';
        menu.icon = agneta.get_icon(icon);
      });

      menu.toggle = function() {
        if (menu.isLocked) {
          return;
        }
        return (menu.showing = !menu.showing);
      };

      menu.show = function() {
        return (menu.showing = true);
      };

      menu.hide = function() {
        if (menu.isLocked) {
          return;
        }
        return (menu.showing = false);
      };

      vm.close = function() {
        menu.hide();
      };

      $rootScope.menu[attrs.name] = vm.menu;
    }
  };
});

app.directive('mdMenu', function() {
  return {
    require: '^mdMenu',
    link: function(scope, elm, attr, ctrl) {
      // now I can expose what I need to the scope
      scope.$mdCloseMenu = ctrl.close;
    }
  };
});

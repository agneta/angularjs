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
});

app.directive('agMenuSide', function(
  $rootScope,
  $timeout,
  $route,
  $mdMedia,
  $log
) {
  return {
    link: function(vm) {
      var locked = false;
      var menu = ($rootScope.menu = {});

      function onRoute(event, current) {
        $timeout(function() {
          locked = current && current.locals.data.menuLock;
          //contentElement.empty();

          if ($mdMedia('gt-sm')) {
            if (locked) {
              menu.show();
            } else {
              remove();
            }
          }
        }, 10);
      }

      onRoute(null, $route.current);

      function remove() {
        menu.hide();
        $timeout(function() {
          vm.sidebarHTML = null;
        }, 1400);
      }

      vm.menuLock = function() {
        menu.isLocked = locked && $mdMedia('gt-sm');
        if (menu.isLocked) {
          menu.showing = true;
        }
        return menu.isLocked;
      };

      menu.toggle = function() {
        return (menu.showing = !menu.showing);
      };

      menu.show = function() {
        return (menu.showing = true);
      };

      menu.hide = function() {
        return (menu.showing = false);
      };

      vm.close = function() {
        menu.hide();
      };
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

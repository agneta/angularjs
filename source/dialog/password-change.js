/*   Copyright 2017 Agneta Network Applications, LLC.
 *
 *   Source file: theme/source/dialog/password-change.js
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
agneta.directive('AgPasswordChange', function($rootScope, $mdDialog, LoopBackAuth, Account, data) {

  var vm = this;

  agneta.extend(vm, 'AgDialogCtrl');

  vm.submitPassword = function() {
    console.log(data);
    vm.loading = true;
    vm.formPassFields[agneta.token] =  data.token;

    Account.passwordChange(vm.formPassFields)
      .$promise
      .then(function(res) {

        vm.loading = false;
        var credentials = {
          email: res.email,
          password: vm.formPassFields.password_new
        };
        $rootScope.signIn(credentials);

      });

  };

});

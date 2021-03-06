/*   Copyright 2017 Agneta Network Applications, LLC.
*
*   Source file: theme/source/main/account/recovery.js
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
agneta.directive('AgAccountRecover', function(Account, LoopBackAuth) {

  var vm = this;

  agneta.extend(vm, 'AgDialogCtrl');

  vm.submitPassword = function() {

    vm.loading = true;
    
    Account.recover(vm.formPassFields, function() {
      vm.loading = false;
    })
      .$promise
      .then(function() {
        LoopBackAuth.clearUser();
        LoopBackAuth.clearStorage();
      });

  };

});

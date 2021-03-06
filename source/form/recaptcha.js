/*   Copyright 2017 Agneta Network Applications, LLC.
 *
 *   Source file: theme/source/form/recaptcha.js
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
(function() {

  agneta.directive('AgRecaptchaCtrl', function($element, $attrs,$rootScope, $timeout, $parse, $ocLazyLoad) {

    var element = $element[0];
    var vm = this;

    window.onloadRecaptcha = function() {
      window.grecaptcha.render(element, {
        sitekey: agneta.keys.recaptcha,
        callback: function(response) {
          $timeout(function() {
            $parse($attrs.ngModel).assign(vm, response);
          }, 10);
        }
      });
    };

    if (window.grecaptcha) {
      window.onloadRecaptcha();
    }

    var lng = agneta.lang;
    switch (lng) {
      case 'gr':
        lng = 'el';
        break;
      default:

    }

    $ocLazyLoad.load({
      files: [
        `//www.google.com/recaptcha/api.js?onload=onloadRecaptcha&render=explicit&hl=${lng}`
      ]
    });

  });


})();

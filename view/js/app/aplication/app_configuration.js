import { user_class } from "../../class/user/user_class.js";
import { user_list } from "../../class/user/user_list.js";
import { controller_url_User } from "../../dictionary/dictionary_user.js"
import { empty_input, show_Modal , quit_Modal } from "../../functions/modal.js"
import { fetch_get_Data } from "../../server/server.js"

const App = angular.module('App', []);

App.controller('Controler', function($scope, $http) {

    $scope.init = function () {
        $('.loading').fadeOut();

        $http.get((controller_url_User('login_verify'))).then((res) => {
            const result = res.data;
            $scope.menu_status = localStorage.getItem('menu_status');
            $scope.body_status = localStorage.getItem('menu');

            console.log(result);
         
            if (result.logged !== true) {
                location.href = '../web/login.html'
            } else {
                $scope.list_user = new user_list();
                $scope.user_logged =  new user_class(result.user.id_user, result.user.gmail, result.user.NIF , result.user.foto, result.user.name , result.user.surname , result.user.password , result.user.admin , result.user.login_tries);
                $('body').removeClass('hidden');
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    $scope.logout = async function() {
        const result = await fetch_get_Data(controller_url_User('logout'));
        console.log(result);
        if (result.logout == true) {
            location.href='../web/login.html';
        } else {
            alert('error');
        }
    }

    $scope.delete_Image = async function() {
        const response = await $http.post((controller_url_User('delete_image')));
        const result = response.data;

        console.log(result);

        if (result.status == 'ok') {
            location.reload();
        } else {
            alert("error");
        }
    }

});
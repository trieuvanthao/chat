/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i);
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));

Vue.component('chat', require('./components/Chat.vue').default);
Vue.component('chat-composer', require('./components/ChatComposer.vue').default);
Vue.component('onlineuser', require('./components/OnlineUser.vue').default);

const app = new Vue({
    el: '#app',
    data: {
        chats: '',
        onlineUsers: ''
    },
    created() {
        const userId = $('meta[name="userId"]').attr('content');
        const friendId = $('meta[name="friendId"]').attr('content');

        if (friendId != undefined) {
            axios.post('/chat/getChat/' + friendId).then((response) => {
                this.chats = response.data;
            });

            Echo.private('Chat.' + friendId + '.' + userId)
                .listen('BroadcastChat', (e) => {
                    document.getElementById('ChatAudio').play();
                    this.chats.push(e.chat);
                });
        }

        if (userId != 'null') {
            Echo.join('Online')
                .here((users) => {
                    this.onlineUsers = users;
                })
                .joining((user) => {
                    this.onlineUsers.push(user);
                })
                .leaving((user) => {
                    this.onlineUsers = this.onlineUsers.filter((u) => {u != user});
                });
        }
    }
});

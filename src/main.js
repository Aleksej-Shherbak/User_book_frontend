import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import { ValidationProvider, extend } from 'vee-validate';
import { required, confirmed,email } from 'vee-validate/dist/rules';
import MultiSelect from 'vue-multiselect'

extend('required', {
    ...required,
    message: 'Это поле обязательно для ввода'
});

extend('email', {
    ...email,
    message: 'Некорректный email'
});

extend('confirmed', {
    ...confirmed,
    message: 'Поля не совпадают'
});

// Register the component globally.
Vue.component('validation-provider', ValidationProvider);
Vue.component('multiselect', MultiSelect);

Vue.config.productionTip = false;

new Vue({
    router,
    errors: [],
    render: h => h(App),
    components: {
        ValidationProvider
    },
}).$mount('#app');
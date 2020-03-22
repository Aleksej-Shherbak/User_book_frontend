<template>
    <div class="container-fluid mt-5">
        <div class="card">
            <div class="card-header">
                <h5 class="card-title">Редактирование пользователя {{ this.user.name }}</h5>
            </div>
            <div class="card-body">
                <ValidationObserver v-slot="{ handleSubmit }">
                    <form @submit.prevent="handleSubmit(submit)">
                        <div class="form-group">
                            <label for="name">Имя</label>
                            <validation-provider rules="required" v-slot="{ errors }">
                                <input type="text" class="form-control" id="name" v-model="user.name"
                                       placeholder="Введите имя" autocomplete="off">
                                <span class="text-danger">{{ errors[0] }}</span>
                            </validation-provider>
                        </div>

                        <div class="form-group">
                            <label for="email1">Email</label>
                            <validation-provider rules="required|email" v-slot="{ errors }">
                                <input type="email" class="form-control" id="email1" v-model="user.email"
                                       aria-describedby="emailHelp"
                                       placeholder="Введите email" autocomplete="off">
                                <span class="text-danger">{{ errors[0] }}</span>
                            </validation-provider>
                        </div>

                        <ValidationObserver>
                            <div class="form-group">
                                <label for="password">Пароль</label>
                                <validation-provider rules="confirmed:passwordConfirmation"
                                                     v-slot="{ errors }">
                                    <input type="password" class="form-control" id="password" v-model="user.password"
                                           placeholder="Пароль">
                                    <span class="text-danger">{{ errors[0] }}</span>
                                </validation-provider>
                            </div>

                            <div class="form-group">
                                <label for="confirmPassword">Подтверждение паролья</label>
                                <validation-provider name="confirm"  v-slot="{ errors }"
                                                     vid="passwordConfirmation">
                                    <input type="password" class="form-control" id="confirmPassword"
                                           v-model="passwordConfirmation"
                                           placeholder="Повторите пароль">
                                    <span class="text-danger">{{ errors[0] }}</span>
                                </validation-provider>
                            </div>
                        </ValidationObserver>

                        <div class="form-group">
                            <label class="typo__label">Роли пользователя</label>
                            <multiselect v-model="rolesSelected"
                                         :options="rolesOptions"
                                         :multiple="true"
                                         :close-on-select="true"
                                         :clear-on-select="false"
                                         :preserve-search="true"
                                         placeholder="Укажите роль"
                                         label="name"
                                         track-by="id">
                            </multiselect>
                        </div>

                        <button type="submit" class="btn btn-primary">Сохранить</button>
                    </form>
                </ValidationObserver>
            </div>
        </div>
    </div>
</template>

<script>
    import {ValidationObserver} from 'vee-validate'
    import server_urls from "@/infrastructure/server_urls";
    import axios from 'axios';

    export default {
        name: "Edit",
        components: {
            ValidationObserver
        },
        created: async function () {
            let userId = this.$route.params.id;
            let promises = [];
            let getRolesPromise = this.getRolesFormServer();
            let getUserPromise = this.getUserFromServer(userId);
            promises.push(getRolesPromise);
            promises.push(getUserPromise);

            await Promise.all(promises)
        },
        props: {
            userId: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                user: {
                    name: '',
                    email: '',
                    rolesIds: []
                },
                passwordConfirmation: '',
                rolesSelected: [],
                rolesOptions: []
            }
        },
        methods: {
            submit: async function () {
                try {
                    let url = server_urls.EDIT_USER_URL(this.$route.params.id);
                    await axios.patch(url, this.user);
                } catch (e) {
                    alert("Не удалось сохранить данные на сервер");
                    throw e;
                }

                await this.$router.push({name: "home"})
            },
            async getUserFromServer(id) {
                try {
                    let url = server_urls.GET_USER_URL(id);
                    let res = await axios.get(url);
                    this.user = res.data;
                    this.user.rolesIds = res.data.roles.map(x => x.id);
                    this.rolesSelected = res.data.roles;
                } catch (e) {
                    alert("Не удалось получить пользователя с сервера.");
                    throw e;
                }
            },
            async getRolesFormServer() {
                let url = server_urls.GET_ROLES();
                try {
                    let res = await axios.get(url);
                    this.rolesOptions = res.data;
                } catch (e) {
                    alert("Не удалось получить список ролей с сервера");
                    throw e;
                }
            }
        },
        watch: {
            rolesSelected: function (value) {
                this.user.rolesIds = value.map(x => x.id);
            }
        }
    }
</script>

<style scoped>

</style>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
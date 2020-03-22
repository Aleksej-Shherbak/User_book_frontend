<template>
    <div class="container-fluid mt-5">
        <div class="card">
            <div class="card-header">
                <h5 class="card-title">Пользователи</h5>
            </div>
            <div class="card-body">
                <router-link :to="{name: 'create'}" class="btn btn-outline-success my-2">
                    Создать пользователя
                </router-link>
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Логин</th>
                            <th scope="col">Имя</th>
                            <th scope="col">Email</th>
                            <th scope="col">Роли</th>
                            <th scope="col">Действия</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr :key="user.id" v-for="user in users">
                            <th scope="row">{{ user.id }}</th>
                            <td>{{ user.login }}</td>
                            <td>{{ user.name }}</td>
                            <td>{{ user.email }}</td>
                            <td>
                                роли:
                                <span :key="val.id" v-for="(val,key) of user.roles">{{ val.name}}<span
                                        v-if="key !== Object.keys(user.roles).length - 1">, </span>
                                </span>
                            </td>
                            <td>
                                <router-link
                                        :to="{name: 'edit', params: { id: user.id }}"
                                        class="btn btn-sm btn-outline-info mx-1">
                                    Редактировать
                                </router-link>
                                <button @click="deleteUser(user.id)" class="btn btn-sm btn-outline-danger mx-1">
                                    Удалить
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div class="mt-4 d-flex justify-content-center">
                    <div class="pagination-container" v-if="pageCount > 1">
                        <paginate
                                :page-count="pageCount"
                                :click-handler="paginationClick"
                                :prev-text="'<'"
                                :next-text="'>'"
                                :page-class="'page-item'"
                                :container-class="'pagination'"
                                :page-link-class="'page-link'"
                                :prev-link-class="'page-link'"
                                :next-link-class="'page-link'"
                                :first-last-button="true"
                                :first-button-text="'<<'"
                                :last-button-text="'>>'"
                                :hide-prev-next="true"
                        >
                        </paginate>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import paginate from 'vuejs-paginate'
    import server_urls from "@/infrastructure/server_urls";

    export default {
        name: "Home",
        components: {
            paginate
        },
        async mounted() {
            await this.getUsers();
        },
        data() {
            return {
                users: [],
                pageCount: 0,

            }
        },
        methods: {
            deleteUser: async function (id) {
                try {
                    let url = server_urls.DELETE_USER_URL(id);
                    await axios.delete(url);
                } catch (e) {
                    alert("Не удалось выполнить запрос");
                    throw e;
                }

                this.users = this.users.filter(x => {
                    return x.id !== id
                });
            },
            paginationClick: async function (index) {
                await this.getUsers(index);
            },
            getUsers: async function (page = 1) {
                let url = server_urls.GET_USERS_URL() + `?page=${page}`;
                let responseData = await axios.get(url);
                this.users = responseData.data.pagedList;
                this.pageCount = responseData.data.pageCount;
            }
        }
    }
</script>

<style scoped>

</style>
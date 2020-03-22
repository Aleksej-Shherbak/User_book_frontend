export default class BackendUrls {
    static SERVER_URL = () => "http://127.0.0.1:5000";
    static GET_USERS_URL = () => `${(this.SERVER_URL())}/users`;
    static CREATE_USER_URL = () => `${this.SERVER_URL()}/users/create`;
    static EDIT_USER_URL = (id) => `${this.SERVER_URL()}/users/edit/${id}`;
    static GET_USER_URL = (id) => `${this.SERVER_URL()}/users/get/${id}`;
    static DELETE_USER_URL = (id) => `${this.SERVER_URL()}/users/delete/${id}`;

    static GET_ROLES = () => `${(this.SERVER_URL())}/roles`;

}

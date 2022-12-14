<template>
    <div :class="`app-${$i18n.locale}`">
        <div class="setting">
            <Sidebar />
            <div class="side">
                <div class="container" style="gap: 0">
                    <div class="header">
                        <h3>{{ $t("permissions") }}</h3>
                        <router-link to="/settings">
                            <font-awesome-icon :icon="['fas', 'angle-left']" />
                            {{ $t("settings") }}
                        </router-link>
                    </div>
                    <form method="POST" @submit.prevent="addUser">
                        <div class="input-group">
                            <label for="fullname">{{ $t("full-name") }}</label>
                            <input
                                type="text"
                                id="fullname"
                                v-model="form.full_name"
                            />
                        </div>
                        <div class="input-group">
                            <label for="email">{{ $t("email") }}</label>
                            <input
                                type="email"
                                id="email"
                                v-model="form.email"
                            />
                        </div>
                        <div class="input-group">
                            <label for="password">{{ $t("password") }}</label>
                            <input
                                type="password"
                                id="password"
                                v-model="form.password"
                            />
                        </div>
                        <div class="input-group">
                            <label for="phone">{{ $t("phone") }}</label>
                            <vue-tel-input
                                v-model="form.phone"
                                mode="international"
                                :inputOptions="telInputOptions"
                                id="phone"
                            ></vue-tel-input>
                        </div>
                        <div class="input-group">
                            <label for="phone">{{ $t("branch") }}</label>
                            <select v-model="form.branch">
                                <option
                                    v-for="branch in branches"
                                    :key="branch.id"
                                    :value="branch.id"
                                >
                                    {{ branch.name }}
                                </option>
                            </select>
                        </div>
                        <div class="input-group">
                            <label for="role">{{ $t("role") }}</label>
                            <select id="role" v-model="form.role">
                                <option value="admin">{{ $t("admin") }}</option>
                                <option value="employee">
                                    {{ $t("employee") }}
                                </option>
                            </select>
                        </div>
                        <input
                            type="submit"
                            class="save"
                            :value="$t('add-user')"
                        />
                        <h4 v-if="users.length > 0">{{ $t("users") }}</h4>
                        <div class="users">
                            <div
                                class="item"
                                v-for="user of users"
                                :key="user.id"
                            >
                                <div class="name">
                                    <span style="display: block">
                                        {{ user.full_name }}
                                    </span>
                                    <span>{{ user.email }}</span>
                                </div>
                                <button
                                    class="delete"
                                    type="button"
                                    @click="deleteUser(user.id)"
                                >
                                    <img src="/icons/icons8-remove.svg" />
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <br />
            </div>
        </div>
    </div>
</template>
<script>
import Sidebar from "../components/Sidebar.vue";
import { VueTelInput } from "vue-tel-input";
import "vue-tel-input/dist/vue-tel-input.css";
import axios from "axios";
export default {
    components: {
        Sidebar,
        VueTelInput,
    },
    data() {
        return {
            user: JSON.parse(localStorage.getItem("wiresPOSUser")),
            branches: [],
            users: [],
            telInputOptions: {
                placeholder: this.$t("phone"),
            },
            form: {
                full_name: "",
                email: "",
                password: "",
                phone: "",
                branch: "",
                role: "",
            },
        };
    },
    async mounted() {
        await axios
            .post(
                "/api/get-branches",
                {},
                { headers: { token: this.user.token } }
            )
            .then((result) => {
                this.branches = result.data;
            })
            .catch((err) => {
                console.log(err);
            });
        await axios
            .post("/api/get-users", {}, { headers: { token: this.user.token } })
            .then((result) => {
                this.users = result.data;
            })
            .catch((err) => {
                console.log(err);
            });
    },
    methods: {
        addUser() {
            axios
                .post("/api/add-user", this.form, {
                    headers: { token: this.user.token },
                })
                .then((result) => {
                    alert(this.$t("user-added-successfully"));
                })
                .catch((err) => {
                    alert(this.$t("user-added-before"));
                });
        },
        deleteUser(id) {
            axios
                .post(
                    "/api/delete-user",
                    {
                        id: id,
                    },
                    {
                        headers: { token: this.user.token },
                    }
                )
                .then((result) => {
                    alert(this.$t("user-deleted-successfully")),
                        location.reload();
                })
                .catch((err) => {
                    alert(this.$t("something-went-wrong"));
                });
        },
    },
};
</script>

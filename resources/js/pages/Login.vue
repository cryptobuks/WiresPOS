<template>
    <div :class="`app-${$i18n.locale}`">
        <div class="login">
            <img
                src="/images/ill-bg-shade.svg"
                style="position: absolute; left: 0"
            />
            <div class="sides">
                <div class="side">
                    <div class="container">
                        <div class="header">
                            <div class="brand">
                                <img src="/images/WiresPOS.svg" />
                            </div>
                            <div class="lang-switcher">
                                <a @click="setLanguage('en')">
                                    <img
                                        src="https://img.icons8.com/color/30/000000/great-britain.png"
                                        v-if="$i18n.locale == 'ar'"
                                    />
                                </a>
                                <a @click="setLanguage('ar')">
                                    <img
                                        src="https://img.icons8.com/color/30/000000/saudi-arabia.png"
                                        v-if="$i18n.locale == 'en'"
                                    />
                                </a>
                            </div>
                        </div>
                        <div class="form">
                            <h2>{{ $t("sign-in-now") }}</h2>
                            <p>
                                {{ $t("sign-in-now-to-your-account") }}
                            </p>
                            <form @submit.prevent="login">
                                <div class="form-group">
                                    <label
                                        class="input-label"
                                        for="email-input"
                                    >
                                        {{ $t("email") }}
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email-input"
                                        v-model="form.email"
                                        required
                                    />
                                </div>
                                <div class="form-group">
                                    <label
                                        class="input-label"
                                        for="password-input"
                                        autocomplete="off"
                                    >
                                        {{ $t("password") }}
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password-input"
                                        v-model="form.password"
                                        required
                                    />
                                </div>
                                <a
                                    href="#"
                                    style="text-align: right; color: #3154aa"
                                >
                                    {{ $t("recovery-password") }}
                                </a>
                                <input
                                    type="submit"
                                    name="login"
                                    :value="$t('login')"
                                    class="login-btn"
                                />
                            </form>
                            <span
                                style="
                                    text-align: center;
                                    display: block;
                                    padding: 9px;
                                    font-size: 14px;
                                "
                            >
                                {{ $t("dont-have-an-account") }}
                                <router-link
                                    to="/register"
                                    style="
                                        color: #336699;
                                        text-decoration: underline;
                                    "
                                >
                                    {{ $t("register-now") }}
                                </router-link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <img
                src="/images/ill-bg-shade-bottom.svg"
                style="position: absolute; right: 0; bottom: 0"
            />
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import store from "../store/";
export default {
    components: {},

    data() {
        return {
            form: {
                email: "",
                password: "",
            },
        };
    },
    methods: {
        ...mapActions(["LogIn"]),
        async login() {
            const User = new FormData();
            User.append("email", this.form.email);
            User.append("password", this.form.password);
            try {
                await this.LogIn(User);
                this.$router.push("/");
            } catch (error) {
                console.log(error);
            }
        },

        setLanguage(item) {
            if (item == "en") {
                this.$i18n.locale = "en";
                store.commit("setAppLanguage", "en");
            } else if (item == "ar") {
                this.$i18n.locale = "ar";
                store.commit("setAppLanguage", "ar");
            }
        },
    },
};
</script>
<style scoped>
.app-ar .side {
    margin-right: 0 !important;
}
</style>

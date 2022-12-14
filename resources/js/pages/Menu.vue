<template>
    <div :class="`app-${$i18n.locale}`">
        <div class="menu">
            <Sidebar />
            <div class="menu-sides">
                <div class="menu-side">
                    <div class="heading">
                        <div class="title">
                            <h2>{{ $t("choose-category") }}</h2>
                        </div>
                        <div class="search">
                            <form @submit.prevent="postSearch">
                                <input
                                    type="text"
                                    :placeholder="$t('search-menu') + '...'"
                                    class="search-box"
                                    v-model="search"
                                />
                                <button
                                    type="submit"
                                    style="display: flex; align-items: center"
                                >
                                    <img
                                        src="icons/icons8-search.svg"
                                        style="width: 23px"
                                    />
                                </button>
                            </form>
                        </div>
                    </div>
                    <div v-if="searchRes.length > 0 && search !== ''">
                        <h2 style="font-weight: 600; margin-top: 3%">
                            {{ $t("search-results") }} ({{ searchRes.length }})
                        </h2>
                        <div class="products">
                            <div
                                class="product"
                                v-for="product in searchRes"
                                :key="product.id"
                                @click="addBill(product.id)"
                            >
                                <div class="info">
                                    <div class="image">
                                        <img
                                            :src="`/storage/store-${product.store_id}/products/${product.image}`"
                                        />
                                    </div>
                                    <div class="details">
                                        <span class="title">
                                            {{ product.product_name }}
                                        </span>
                                        <span class="desc">
                                            {{ product.product_details }}
                                        </span>
                                        <span class="price">
                                            <span class="currency">
                                                {{ systemSettings.currency }}
                                            </span>
                                            {{ product.price }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="search === ''">
                        <div class="categories" v-if="items.length > 0">
                            <div class="cards">
                                <Carousel
                                    :settings="settings"
                                    :breakpoints="breakpoints"
                                    dir="ltr"
                                >
                                    <Slide v-for="item in items" :key="item">
                                        <button
                                            @click="setCat(item.id)"
                                            style="height: 100%"
                                        >
                                            <div
                                                class="card"
                                                :class="{
                                                    active:
                                                        this.selectedCat ==
                                                        item.id,
                                                }"
                                            >
                                                <div class="icon">
                                                    <img
                                                        :src="`/storage/categories/${item.icon}`"
                                                    />
                                                </div>
                                                <div class="title">
                                                    {{ item.category_name }}
                                                </div>
                                            </div>
                                        </button>
                                    </Slide>
                                </Carousel>
                            </div>
                        </div>
                        <h2
                            style="font-weight: 600; margin-top: 3%"
                            v-if="items.length > 0"
                        >
                            {{
                                selectedCat
                                    ? items.find(
                                          (item) => item.id === selectedCat
                                      ).category_name + " "
                                    : ""
                            }}
                        </h2>
                        <div class="products" v-if="items.length > 0">
                            <div
                                class="product"
                                v-for="product in filterProducts"
                                :key="product.id"
                                @click="addBill(product.id)"
                            >
                                <div class="info">
                                    <div class="image">
                                        <img
                                            :src="`/storage/store-${product.store_id}/products/${product.image}`"
                                        />
                                    </div>
                                    <div class="details">
                                        <span class="title">
                                            {{ product.product_name }}
                                        </span>
                                        <span class="desc">
                                            {{ product.product_details }}
                                        </span>
                                        <span class="price">
                                            <span class="currency">
                                                {{ systemSettings.currency }}
                                            </span>
                                            {{ product.price }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Menu -->
                <div class="menu-side">
                    <div class="account">
                        <div style="display: flex; gap: 10px; width: 100%">
                            <div class="avatar">
                                <img
                                    :src="`/storage/users/${user.pic}`"
                                    v-if="user.pic !== '' && user.pic !== null"
                                />
                                <img :src="`/images/default.jpg`" v-else />
                            </div>
                            <div
                                style="
                                    display: flex;
                                    justify-content: space-between;
                                    width: 100%;
                                    align-items: center;
                                "
                            >
                                <div class="name">
                                    <span
                                        class="job-title"
                                        v-if="user.role == 'employee'"
                                    >
                                        {{ $t("im-a-cashier") }}
                                    </span>
                                    <span
                                        class="job-title"
                                        v-else-if="user.role == 'admin'"
                                    >
                                        {{ $t("im-a-manager") }}
                                    </span>
                                    <span class="fullname">
                                        {{ user.full_name }}
                                    </span>
                                </div>
                                <router-link
                                    class="calc"
                                    :title="$t('ingredients-calculator')"
                                    to="/calculator"
                                >
                                    <font-awesome-icon
                                        :icon="['fas', 'calculator']"
                                        style="font-size: 20px"
                                        color="#336699"
                                    />
                                </router-link>
                            </div>
                        </div>
                    </div>
                    <div class="bills">
                        <select
                            class="table"
                            v-if="store.business_type == '2'"
                            v-model="chosenTable"
                        >
                            <option selected hidden :value="null">
                                --{{ $t("select-table") }}--
                            </option>
                            <option
                                v-for="table in tables"
                                :key="table.id"
                                :value="table.table_number"
                            >
                                {{ $t("table") + ": " + table.table_number }}
                                ({{ table.seats_number + " " + $t("seats") }})
                            </option>
                        </select>
                        <h3>{{ $t("bills") }}</h3>
                        <div class="cards">
                            <div
                                class="card"
                                v-for="bill in filterBills"
                                :key="bill"
                            >
                                <div
                                    class="info"
                                    v-for="billInfo of bill"
                                    :key="billInfo"
                                >
                                    <div class="image">
                                        <img
                                            :src="`/storage/store-${billInfo.store_id}/products/${billInfo.image}`"
                                        />
                                    </div>
                                    <div style="width: 100%">
                                        <span class="title">
                                            {{ billInfo.product_name }}
                                            <button
                                                @click="deleteBill(billInfo.id)"
                                            >
                                                <img
                                                    src="/icons/icons8-remove.svg"
                                                    style="max-width: 20px"
                                                />
                                            </button>
                                        </span>
                                        <div class="quantity">
                                            <span
                                                class="number"
                                                style="
                                                    display: flex;
                                                    align-items: center;
                                                "
                                            >
                                                <button
                                                    type="button"
                                                    style="
                                                        color: #3154aa;
                                                        font-size: 22px;
                                                        font-weight: bold;
                                                    "
                                                    @click="
                                                        billInfo.quantity += 1
                                                    "
                                                >
                                                    +
                                                </button>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    v-model="billInfo.quantity"
                                                    style="
                                                        border: none;
                                                        padding: 3px;
                                                        outline: none;
                                                        max-width: 60px;
                                                        text-align: center;
                                                        -webkit-appearance: none;
                                                        background: white;
                                                    "
                                                    disabled
                                                />
                                                <button
                                                    style="
                                                        color: #3154aa;
                                                        font-size: 22px;
                                                        font-weight: bold;
                                                    "
                                                    @click="
                                                        billInfo.quantity -= 1
                                                    "
                                                >
                                                    -
                                                </button>
                                            </span>
                                            <span class="price">
                                                {{
                                                    billInfo.quantity !== null
                                                        ? billInfo.price *
                                                          billInfo.quantity
                                                        : billInfo.price
                                                }}
                                                <span
                                                    style="
                                                        text-transform: uppercase;
                                                    "
                                                >
                                                    {{
                                                        systemSettings.currency
                                                    }}
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            style="
                                display: flex;
                                flex-direction: column;
                                gap: 5px;
                            "
                        >
                            <div class="subtotal">
                                <span class="title">{{ $t("subtotal") }}</span>
                                <span class="price">
                                    {{ parseInt(subTotal) }}
                                    <span style="text-transform: uppercase">
                                        {{ systemSettings.currency }}
                                    </span>
                                </span>
                            </div>
                            <div class="tax">
                                <span class="title">
                                    {{ $t("tax") }}
                                    ({{ systemSettings.tax_rate }}%)
                                </span>
                                <span class="price">
                                    {{
                                        parseInt(
                                            (subTotal *
                                                systemSettings.tax_rate) /
                                                100
                                        )
                                    }}
                                    <span style="text-transform: uppercase">
                                        {{ systemSettings.currency }}
                                    </span>
                                </span>
                            </div>
                            <div class="tax">
                                <span class="title">
                                    {{ $t("service") }}
                                    ({{ systemSettings.service_rate }}%)
                                </span>
                                <span class="price">
                                    {{
                                        parseInt(
                                            (subTotal *
                                                systemSettings.service_rate) /
                                                100
                                        )
                                    }}
                                    <span style="text-transform: uppercase">
                                        {{ systemSettings.currency }}
                                    </span>
                                </span>
                            </div>
                            <div class="total">
                                <span class="title">
                                    {{ $t("discount") }}
                                    <span
                                        v-if="discountType == 'percent'"
                                        style="
                                            text-transform: uppercase;
                                            font-size: 14px;
                                        "
                                    >
                                        ({{ discount + "%" }})
                                    </span>
                                    <span
                                        v-else-if="discountType == 'currency'"
                                        style="
                                            text-transform: uppercase;
                                            font-size: 14px;
                                        "
                                    >
                                        ({{
                                            discount +
                                            " " +
                                            systemSettings.currency
                                        }})
                                    </span>
                                </span>
                                <span class="price">
                                    <button
                                        type="button"
                                        style="
                                            display: flex;
                                            background: #336699;
                                            padding: 6px 6px;
                                            border-radius: 50%;
                                        "
                                        @click="showModal"
                                    >
                                        <img
                                            src="/icons/icons8-plus-math.svg"
                                            style="max-width: 15px"
                                        />
                                    </button>
                                    <Modal
                                        v-show="isModalVisible"
                                        @close="closeModal"
                                    >
                                        <template v-slot:header>
                                            {{ $t("apply-discount") }}
                                        </template>

                                        <template v-slot:body>
                                            <input
                                                type="number"
                                                class="amount"
                                                step="0.001"
                                                v-model="discount"
                                            />
                                            <select v-model="discountType">
                                                <option value="percent">
                                                    %
                                                </option>
                                                <option
                                                    value="currency"
                                                    style="
                                                        text-transform: uppercase;
                                                    "
                                                >
                                                    {{
                                                        systemSettings.currency
                                                    }}
                                                </option>
                                            </select>
                                        </template>
                                        <template v-slot:action>
                                            <button
                                                type="button"
                                                class="btn-green"
                                                @click="close"
                                                aria-label="Close modal"
                                            >
                                                {{ $t("save-changes") }}
                                            </button>
                                        </template>
                                    </Modal>
                                </span>
                            </div>
                            <div class="total">
                                <span class="title">{{ $t("total") }}</span>
                                <span
                                    class="price"
                                    v-if="discountType == 'percent'"
                                >
                                    {{
                                        parseInt(
                                            total - (total * discount) / 100
                                        )
                                    }}
                                    <span style="text-transform: uppercase">
                                        {{ systemSettings.currency }}
                                    </span>
                                </span>
                                <span
                                    class="price"
                                    v-else-if="discountType == 'currency'"
                                >
                                    {{ parseInt(total - discount) }}
                                    <span style="text-transform: uppercase">
                                        {{ systemSettings.currency }}
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="payment">
                        <h3>{{ $t("payment-method") }}</h3>
                        <div class="cards">
                            <div
                                class="card"
                                @click="payment(1)"
                                v-bind:class="{ active: this.method == 1 }"
                            >
                                <div class="icon">
                                    <img src="icons/icons8-money.svg" />
                                </div>
                                <div class="title">{{ $t("cash") }}</div>
                            </div>
                            <div
                                class="card"
                                @click="payment(2)"
                                v-bind:class="{ active: this.method == 2 }"
                            >
                                <div class="icon">
                                    <img src="icons/icons8-debit-card.svg" />
                                </div>
                                <div class="title">{{ $t("credit-card") }}</div>
                            </div>
                            <div
                                class="card"
                                @click="payment(3)"
                                v-bind:class="{ active: this.method === 3 }"
                            >
                                <div class="icon">
                                    <img
                                        src="icons/icons8-business-card-scanner.svg"
                                    />
                                </div>
                                <div class="title">{{ $t("e-wallet") }}</div>
                            </div>
                        </div>
                    </div>
                    <button class="print-bill" @click.prevent="createInvoice">
                        {{ $t("print-bill") }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Sidebar from "../components/Sidebar.vue";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide } from "vue3-carousel";
import axios from "axios";
import Modal from "../components/Modal.vue";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
export default {
    name: "menu-page",
    components: {
        Sidebar,
        Carousel,
        Slide,
        Modal,
        FontAwesomeIcon,
    },
    data() {
        return {
            user: JSON.parse(localStorage.getItem("wiresPOSUser")),
            isModalVisible: false,
            method: null,
            selectedCat: null,
            search: "",
            searchRes: [],
            items: [],
            discount: 0,
            discountType: "percent",
            products: [],
            filterProducts: [],
            bill: null,
            filterBills: [],
            systemSettings: [],
            tables: [],
            store: [],
            chosenTable: null,
            settings: {
                itemsToShow: 1,
                snapAlign: "start",
            },
            breakpoints: {
                700: {
                    itemsToShow: 4,
                    snapAlign: "start",
                },
                1024: {
                    itemsToShow: 6,
                    snapAlign: "start",
                },
            },
        };
    },
    async mounted() {
        await axios
            .post(
                "/api/tables",
                {},
                {
                    headers: { token: this.user.token },
                }
            )
            .then((result) => {
                this.tables = result.data;
            })
            .catch((err) => console.log(err));
        await axios
            .post(
                "/api/get-store",
                {},
                {
                    headers: {
                        token: this.user.token,
                    },
                }
            )
            .then((result) => {
                this.store = result.data;
            })
            .catch((err) => console.log(err));
        await axios
            .get("/api/categories")
            .then((result) => (this.items = result.data))
            .catch((err) => console.log(err));
        await axios
            .post("/api/products", {}, { headers: { token: this.user.token } })
            .then((result) => (this.products = result.data))
            .catch((err) => console.log(err));
        await axios
            .post(
                "/api/get-settings",
                {},
                { headers: { token: this.user.token } }
            )
            .then((result) => (this.systemSettings = result.data))
            .catch((err) => console.log(err));
    },
    computed: {
        subTotal() {
            return this.filterBills.reduce(
                (accumulator, current) =>
                    accumulator + current[0].price * current[0].quantity,
                0
            );
        },
        total() {
            return (
                this.subTotal +
                (this.subTotal * this.systemSettings.tax_rate +
                    this.subTotal * this.systemSettings.service_rate) /
                    100
            );
        },
    },
    methods: {
        payment(id) {
            this.method = id;
            console.log(this.payment);
        },
        showModal() {
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
        },
        setCat(id) {
            this.selectedCat = id;
            if (id == 1) {
                this.filterProducts = this.products;
            } else {
                this.filterProducts = this.products.filter(
                    (p) => parseInt(p.category.id) === this.selectedCat
                );
            }
        },
        activeSize(event) {
            event.target.classList.toggle("active");
        },
        addBill(id) {
            this.bill = id;
            this.filterBills.push(
                this.products.filter((p) => p.id === this.bill)
            );
        },
        createInvoice() {
            axios
                .post(
                    "/api/create-invoice",
                    {
                        items: JSON.stringify(this.filterBills),
                        subtotal: this.subTotal,
                        discount: this.discount,
                        discount_type: this.discountType,
                        payment: this.method,
                        selected_table: this.chosenTable,
                    },
                    { headers: { token: this.user.token } }
                )
                .then((result) => {
                    this.$router.push(`/invoice/${result.data.id}`);
                })
                .catch((err) => {
                    if (err.response.data.alert == "rechead maximum invoices") {
                        const Toast = Swal.mixin({
                            toast: true,
                            position: "top-end",
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.addEventListener(
                                    "mouseenter",
                                    Swal.stopTimer
                                );
                                toast.addEventListener(
                                    "mouseleave",
                                    Swal.resumeTimer
                                );
                            },
                        });

                        Toast.fire({
                            icon: "error",
                            title: this.$t("you-have-reached-invoices-limit"),
                        });
                    } else {
                        const Toast = Swal.mixin({
                            toast: true,
                            position: "top-end",
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.addEventListener(
                                    "mouseenter",
                                    Swal.stopTimer
                                );
                                toast.addEventListener(
                                    "mouseleave",
                                    Swal.resumeTimer
                                );
                            },
                        });

                        Toast.fire({
                            icon: "error",
                            title: this.$t("something-went-wrong"),
                        });
                    }
                });
        },
        deleteBill(billId) {
            this.filterBills.map((item, index) => {
                if (item[0].id === billId) {
                    this.subTotal = this.subTotal - item[0].price;
                    this.filterBills.splice(index, 1);
                }
            });
        },
        postSearch() {
            axios
                .post(
                    "/api/search",
                    {
                        keyword: this.search,
                    },
                    {
                        headers: {
                            token: this.user.token,
                        },
                    }
                )
                .then((res) => {
                    this.searchRes = res.data;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
};
</script>
<style lang="scss" scoped>
.carousel {
    max-width: 750px;
    @media screen and (min-width: 1024px) {
        max-width: 100%;
        width: 100%;
    }
}
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
.cards::-webkit-scrollbar {
    width: 5px;
}
.cards::-webkit-scrollbar-track {
    background: #f1f1f1;
}
.cards::-webkit-scrollbar-thumb {
    background: #888;
}
.cards::-webkit-scrollbar-thumb:hover {
    background: #555;
}
</style>

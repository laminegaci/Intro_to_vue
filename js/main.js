Vue.component("product-details", {
    props: {
        details: {
            type: Array,
            required: true
        }
    },
    template: `
        <div>
        <ul>
        <li v-for="detail in details"> {{detail}} </li>
        </ul>
        </div>
    `
});

Vue.component("product", {
    props: {
        premium: {
            type: Boolean,
            required: true,
        },
    },
    template: `
        <div class="product">
            <div class="product-image">
                <img v-bind:src="image" alt="">
                <!-- shorthand :src -->
            </div>
            <div class="product-info">
                <h1>{{ title }}</h1>
                <p v-if="inStock">In Stock</p>
                <p v-else v-bind:class="{ lineThrough: !inStock }">Out of Stock</p>
                <p>User is shipping : {{ shipping }}</p>
                <p v-bind:class="{ lineRed: !variants }">{{ sale }}</p>

                <product-details :details="detailsArr"></product-details>
                
                <ul>
                    <li v-for="size in sizes"> {{size}} </li>
                </ul>

                <div v-for="(variant,index) in variants" 
                    :key="variant.variantColor"
                    class="color-box" 
                    v-bind:style="{backgroundColor: variant.variantColor, cursor: 'pointer'}"
                    v-on:click="updateProduct(index)">
                </div>
                <button v-on:click="addToCart" 
                    :disabled="!inStock" 
                    :class="{ disabledButton: !inStock }">Add to Cart</button>
                <button v-on:click="RmfromCart" 
                    :disabled="!inStock"
                    :class="{ disabledButton: !inStock }">Remove from Cart</button>
                <div class="cart">
                    <p>Cart ( {{cart}} )</p>
                </div>
                 
            </div>
        </div>
    `,
    data() {
        return {
            product: "T-shirt",
            brand: "Vue Mastery",
            selectedVariant: 0,
            inventory: 0,
            detailsArr: ["80% cotton", "20% polyster", "Gender-neutral"],
            variants: [
                {
                    variantId: 1,
                    variantColor: "green",
                    variantImage: "images/vmSocks-green-onWhite.jpg",
                    variantQuantity: 10,
                    variantOnSale: true,
                },
                {
                    variantId: 2,
                    variantColor: "blue",
                    variantImage: "images/vmSocks-blue-onWhite.jpg",
                    variantQuantity: 0,
                    variantOnSale: false,
                },
            ],
            sizes: ["S", "M", "L", "XL", "XXL"],
            cart: 0
        };
    },
    methods: {
        addToCart: function () {
            this.cart += 1;
        },
        RmfromCart: function () {
            this.cart -= 1;
        },
        updateProduct: function (index) {
            this.selectedVariant = index;
            console.log(index);
        },
    },
    computed: {
        title() {
            return this.brand + " " + this.product;
        },
        image() {
            return this.variants[this.selectedVariant].variantImage;
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity;
        },
        sale() {
            if (this.variants[this.selectedVariant].variantOnSale) {
                return this.brand + " " + this.product + " are on sale!";
            }
            return this.brand + " " + this.product + " are not on sale";
        },
        shipping() {
            if (this.premium) {
                return "free";
            }
            return "2.99";
        },
    },
});

var app = new Vue({
    el: "#app",
    data: {
        premium: true,
    },
});

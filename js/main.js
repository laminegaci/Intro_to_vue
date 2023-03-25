Vue.component('product-review', {
    template: `
    <form class="review-form" @submit.prevent="onSubmit">

    <p v-if="errors.length">
    <b>Please correct the following error(s):</b>
    <ul v-for="error in  errors">
      <li>{{ error }}</li>
    </ul>
  </p>

    <p>
      <label for="name">Name:</label>
      <input id="name" v-model="name">
    </p>
    
    <p>
      <label for="review">Review:</label>      
      <textarea id="review" v-model="review"></textarea>
    </p>
    
    <p>
      <label for="rating">Rating:</label>
      <select id="rating" v-model.number="rating">
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
      </select>
    </p>
        
    <p>
      <input type="submit" value="Submit">  
    </p>    
  
  </form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            errors: []
        }
    },
    methods: {
        onSubmit() {
            if (this.name && this.review && this.rating) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating
                }
                this.$emit('review-submitted', productReview)
                this.name = null
                this.review = null
                this.rating = null
            }
            else {
                if (!this.name) this.errors.push('name required.')
                if (!this.review) this.errors.push('review required.')
                if (!this.rating) this.errors.push('rating required.')
            }

        }
    }
});

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
                <button v-on:click="removeFromCart" 
                    :disabled="!inStock" 
                    :class="{ disabledButton: !inStock }">Remove from Cart</button>  
            </div>

            <div>
        <h2>Reviews</h2>
        <p v-if="!reviews.length">There are no reviews yet.</p>
        <ul>
            <li v-for="review in reviews"> 
             <p> {{ review.name }}  </p>
             <p> {{ review.rating }}  </p>
             <p> {{ review.review }}  </p>
            </li>
        </ul>
       </div>

            <product-review @review-submitted="addReview"></product-review>
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
            reviews: []

        };
    },
    methods: {
        addToCart: function () {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
        },
        removeFromCart: function () {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId)
        },
        updateProduct: function (index) {
            this.selectedVariant = index;
            console.log(index);
        },
        addReview(productReview) {
            this.reviews.push(productReview)
        }
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
        cart: [],
        goodmessage : 'hollo vue js'
    },
    methods: {
        reverseMessage : function () {
            this.goodmessage = this.goodmessage.split('').reverse().join('');
        },
        updateCart: function (id) {
            this.cart.push(id)
        },
        removeItem: function (id) {
            for (var i = this.cart.length - 1; i >= 0; i--) {
                if (this.cart[i] === id) {
                    this.cart.splice(i, 1);
                }
            }
        }
    }
});

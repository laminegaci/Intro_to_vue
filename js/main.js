var app = new Vue({
    el: '#app',
    data: { 
        product: 'T-shirt',
        brand: 'Vue Mastery',
        selectedVariant: 0,
        inventory: 0,
        details: ["80% cotton", "20% polyster", "Gender-neutral"],
        variants: [
            {
                'variantId': 1,
                'variantColor': "green",
                'variantImage': "images/vmSocks-green-onWhite.jpg",
                'variantQuantity': 10,
                'variantOnSale': true
            },
            {
                'variantId': 2,
                'variantColor': "blue",
                'variantImage': "images/vmSocks-blue-onWhite.jpg",
                'variantQuantity': 0,
                'variantOnSale': false
            }
        ],
        sizes: ['S','M','L','XL','XXL'],
        cart: 0 
    },
    methods: {
        addToCart: function () {
            this.cart += 1
        },
        RmfromCart: function () {
            this.cart -= 1 
        },
        updateProduct: function (index) {
            this.selectedVariant = index
            console.log(index) 
        }
    },
    computed: {
        title() {
            return this.brand + ' ' +  this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        sale() {
            if (this.variants[this.selectedVariant].variantOnSale) {
              return this.brand + ' ' + this.product + ' are on sale!'
            } 
              return  this.brand + ' ' + this.product + ' are not on sale'
          }
    }
})
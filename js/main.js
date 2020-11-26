var app = new Vue({
    el: '#app',
    data: { 
        product: 'T-shirt',
        image: 'images/vmSocks-green-onWhite.jpg',
        inStock: false,
        inventory: 0,
        details: ["80% cotton", "20% polyster", "Gender-neutral"],
        variants: [
            {
                'varintId': 1,
                'variantColor': "green",
                'variantImage': "images/vmSocks-green-onWhite.jpg"
            },
            {
                'varintId': 2,
                'variantColor': "blue",
                'variantImage': "images/vmSocks-blue-onWhite.jpg"
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
        updateProduct: function (variantImage) {
            this.image = variantImage 
        }
    }
})
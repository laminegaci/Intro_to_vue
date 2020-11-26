var app = new Vue({
    el: '#app',
    data: { 
        product: 'T-shirt',
        image: 'images/vmSocks-green-onWhite.jpg',
        inStock: true,
        inventory: 10,
        details: ["80% cotton", "20% polyster", "Gender-neutral"],
        variants: [
            {
                'varintId': 1,
                'variantColor': "green"
            },
            {
                'varintId': 2,
                'variantColor': "blue"
            }
        ],
        sizes: ['S','M','L','XL','XXL']
    }
})
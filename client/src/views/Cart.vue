<template>
  <div class="container">
    <h2>Cart <font-awesome-icon icon="shopping-cart" /></h2>
    <template v-if="cartItems.length > 0">
      <template v-if="!paymentIntent">
        <ul class="list-group">
          <li
              class="list-group-item"
              v-for="(item, key) in cartItems"
              :key="key"
          >
            {{ item.title }} - {{ item.price }}$
          </li>
        </ul>
        <div class="panel text-right">
          Кол-во: {{ cartCount }}
          <br />
          Итого: {{ cartTotalPrice }}$
          <hr />
        </div>
      </template>

      <template v-if="!paymentIntent">
        <UserForm @onFormSubmit="handleGetPaymentIntent" />
      </template>

      <template v-if="paymentIntent">
        <card
            ref="card"
            class="stripe-card"
            :class="{ complete }"
            stripe="pk_test_51M2EE3IZUtEt1JbFH1NQTYMb55ZVnWtj0pLrG9Y1VlnMaGsTwRgXbhtWxyP3o6RMjlcfnnlZXRoMmMQFkFiE3Bwe005FcFwrEs"
            :options="stripeOptions"
            @change="complete = $event.complete"
        />
        <button class="btn btn-success" @click="pay" :disabled="!complete">
          Pay with credit card
        </button>
      </template>
    </template>

    <template v-else>
      <img
          class="empty-image"
          src="https://images.unsplash.com/photo-1577741314755-048d8525d31e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Z2FtZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60"
      />
      <hr />
      Your cart is empty please add items to it
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import { Card, handleCardPayment } from 'vue-stripe-elements-plus';
import UserForm from '@/components/UserForm'

export default {
  name: 'Cart',
  components: {
    Card,
    UserForm
  },
  data: () => ({
    complete: false,
    stripeOptions: {

    },
    paymentIntent: null
  }),
  computed: {
    ...mapGetters({
      cartItems: 'cartItems',
      cartTotalPrice: 'cartTotalPrice',
      cartCount: 'cartCount'
    })
  },
  methods: {
    ...mapActions({
      handleBuy: 'handleBuy',
    }),
    ...mapMutations({
      clearCart: 'clearCart',
    }),
    async handleGetPaymentIntent(form) {
      try {
        const intent = await this.handleBuy({
          ...form,
          products: this.cartItems,
        })
        console.log(intent);
        console.log(intent.paymentIntent);
        this.paymentIntent = intent.paymentIntent.client_secret
      } catch (err) {
        console.log(err)
      }
    },
    async pay() {
      try {
        await handleCardPayment(this.paymentIntent)
        this.clearCart()
      } catch (e) {
        console.log(e)
      }
    },
  },
};
</script>

<style>
.empty-image {
  width: 400px;
}
.__PrivateStripeElement {
  padding: 10px !important;
  margin-bottom: 10px !important;
}
</style>
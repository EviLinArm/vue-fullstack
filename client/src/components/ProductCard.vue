<template>
  <div class="card h-100">
    <a href="#"><img class="card-img-top" :src="imageUrl" alt=""/></a>
    <div class="card-body">
      <h4 class="card-title">
        <a href="#">{{ title }}</a>
      </h4>
      <h5>{{ price }}$</h5>
      <p class="card-text">{{ description.slice(0, 100) }}...</p>
    </div>
    <div class="card-footer">
      <button class="btn btn-dark" @click="$emit('add-to-cart')" v-if="!inCart">
        Добавить в корзину
      </button>
      <button class="btn btn-danger" @click="$emit('add-to-cart')" v-else>
        Убрать из корзины
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    title: {
      type: String,
      default: '',
    },
    price: {
      type: Number,
      default: 0,
    },
    imageUrl: {
      type: String,
      default: '',
    },
    inCart: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      default: '',
    },
  }
}
</script>
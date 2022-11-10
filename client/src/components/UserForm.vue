<template>
  <form @submit.prevent="handleSubmit">
    <div class="form-group">
      <label for="name">Ваше имя</label>
      <input
          type="text"
          class="form-control"
          id="name"
          v-model="userForm.fullname"
          placeholder="Имя"
      />
    </div>
    <div class="form-group">
      <label for="address">Ваш адрес</label>
      <input
          type="text"
          class="form-control"
          id="address"
          v-model="userForm.address"
          placeholder="Адрес"
      />
    </div>

    <div class="form-group">
      <label for="phone">Ваш номер телефона</label>
      <input
          type="text"
          class="form-control"
          id="phone"
          v-model="userForm.phone"
          placeholder="Номер телефона"
      />
    </div>

    <div class="form-group">
      <label for="email">Ваш электронный адрес</label>
      <input
          type="text"
          class="form-control"
          id="email"
          v-model="userForm.email"
          placeholder="Электронный адрес"
      />
    </div>

    <button style="margin-top: 10px" class="btn btn-success" type="submit">Купить</button>
  </form>
</template>

<script>
export default {
  name: 'UserForm',
  data: () => ({
    userForm: {
      fullname: '',
      phone: '',
      email: '',
      address: '',
    },
  }),
  methods: {
    handleSubmit() {
      this.$emit('onFormSubmit', this.userForm)
    },
  },
}
</script>

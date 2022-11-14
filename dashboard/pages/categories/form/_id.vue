<template>
  <Page>
    <div class="row">
      <div class="col-md-9">
        <card>
          <CrudForm
            v-if="model"
            :form-schema="schema"
            :form-model="model"
            :title="config.formTitle"
            @on-submit="onFormSubmit"
          />
          <p class="text-danger">
            {{ error }}
          </p>
        </card>
      </div>
      <div class="col-md-3"></div>
    </div>
  </Page>
</template>

<script>
// State
import { mapActions, mapGetters } from 'vuex'

// Setups
import { schema, defaultForm } from './fields'
import { config } from '../setup'

// Mixins
import { relationsMixin } from '@/mixins/relation.mixin'
import login from "~/pages/login";

export default {
  name: config.formName,
  mixins: [relationsMixin],
  components: {
    CrudForm: () => import('@/components/CrudForm'),
    Card: () => import('@/components/Card'),
    Page: () => import('@/components/Page'),
  },
  computed: {
    ...mapGetters({
      item: `${config.crudName}/item`,
      error: `${config.crudName}/itemError`,
      products: 'products/items',
    }),
    isUpdating: ({
      $route: {
        params: { id },
      },
    }) => id !== undefined,
  },
  data: () => ({
    model: {},
    schema,
    config,
  }),
  async mounted() {
    await this.fetchProducts()
    this.setFields({ fieldKey: 'products', values: this.products })

    if (this.isUpdating) {
      await this.fetchItem(this.$route.params.id)
      // мы получим объект с апи


      console.log(this.item.products)
      console.log(this.item.products.some(id => id === "636e5627acd8d38da07891e2"), '123')
      if (this.item.products) {
        let category = this.products.filter((product) => this.item.products.some(id => id === product._id))
        this.model = { ...this.item, products: category }
        return
      }

      this.model = { ...this.item }
      return
    }

    this.setModel()
  },
  methods: {
    ...mapActions({
      // generic
      createItem: `${config.crudName}/create`,
      fetchItem: `${config.crudName}/fetchOne`,
      updateItem: `${config.crudName}/update`,

      // bl
      fetchProducts: 'products/fetchAll',
    }),
    setModel() {
      this.model = {
        ...defaultForm,
      }
    },
    async onItemUpdate() {
      const updatedModel = {
        ...this.model,
        products: this.model.products.map((product) => product._id),
      }
      await this.updateItem({
        id: this.$route.params.id,
        payload: updatedModel,
      })
      this.$router.back()
    },
    async onItemCreate() {
      await this.createItem(this.model)
      this.$router.back()
    },
    async onFormSubmit() {
      if (this.isUpdating) {
        await this.onItemUpdate()
        return
      }
      await this.onItemCreate()
    },
  },
}
</script>

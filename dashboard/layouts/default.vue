<template>
  <div class="flex h-screen bg-gray-200">
    <icwt-nav :menu="menu" />
    <div class="flex-1 flex flex-col overflow-hidden">
      <icwt-header @onLogout="handleLogout" />
      <main class="flex-1 overflow-x-hidden overlow-y-auto bg-gray-200">
        <Nuxt />
      </main>
      <!-- <icwt-footer /> -->
    </div>
    <icon-registry />
  </div>
</template>

<script>
import menu from './setup'

export default {
  name: 'DefaultLayout',
  data: () => ({
    menu,
  }),
  components: {
    IcwtFooter: () => import('@/components/layouts/Footer'),
    IcwtHeader: () => import('@/components/layouts/Header'),
    IcwtNav: () => import('@/components/layouts/Navigation/Nav'),
    IconRegistry: () => import('@/components/icon/icon-registry'),
  },
  methods: {
    async handleLogout() {
      localStorage.clear()
      this.$router.push('/login')
    },
  },
}
</script>

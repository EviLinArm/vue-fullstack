import { getCategory, getCategories } from "@/services/categories.service";

const mutations = {
    setCategory(state, category) {
        state.category = category
    },
    setCategories(state, categories) {
        state.categories = categories
    },
    setCategoryError(state, error) {
        state.categoryError = error
    },
}

const actions =  {
    async fetchCategory({ commit }, id) {
        try {
            const category = await getCategory(id)
            commit('setCategory', category)
        } catch (e) {
            commit('setCategoryError', e)
        }
    },
    async fetchCategories({ commit }) {
        try {
            const categories = await getCategories()
            commit('setCategories', categories)
        } catch (e) {
            commit('setCategoryError', e)
        }
    }
}

const getters = {
    category: ({ category }) => category,
    categories: ({ categories }) => categories,
    categoryError: ({ categoryError }) => categoryError
}

const state = () => ({
    category: {},
    categories: [],
    categoryError: null
})

export default {
    mutations,
    getters,
    actions,
    state
}

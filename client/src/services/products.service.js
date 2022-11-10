import { request } from "@/services/generic.services";

const getProduct = (id) => request({url: `products/${id}`, method: 'get'});

const getProducts = () => request({url: `products`, method: 'get'});

export { getProduct, getProducts };
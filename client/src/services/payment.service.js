import { request } from "@/services/generic.services";

const getPaymentIntent = (data) => request({url: `payment`, method: 'post', data});

export { getPaymentIntent };
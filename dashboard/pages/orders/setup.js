export const config = {
  name: 'Заказы',
  crudName: 'orders',
  singleName: 'Заказ',
  pageName: 'OrderPage',
}

export const columns = [
  { key: 'fullname', name: 'Имя покупателя' },
  { key: 'email', name: 'Почта' },
  { key: 'phone', name: 'Номер Телефона' },
]

export const actions = [
  {
    bg: 'yellow',
    color: 'white',
    label: 'Изменить',
    emit: 'onEdit',
    actionKey: '_id',
  },
  {
    bg: 'red',
    color: 'white',
    emit: 'onDelete',
    actionKey: '_id',
    icon: 'icwt-delete',
  },
]

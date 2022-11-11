export const config = {
  name: 'Продукты',
  crudName: 'products',
  singleName: 'Продукт',
  pageName: 'ProductPage',
  formName: 'ProductForm',
  formTitle: 'Форма Продукта',
  formDescription: 'Укажите все необходимое для вашего продукта',
}

export const columns = [
  { key: 'title', name: 'Название продукта' },
  { key: 'amount', name: 'Доступное Кол-во' },
  { key: 'price', name: 'Цена' },
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

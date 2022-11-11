export const config = {
  name: 'Категории',
  crudName: 'categories',
  singleName: 'Категорию',
  pageName: 'CategoryPage',
  formName: 'CategoryForm',
  formTitle: 'Форма Категории',
}

export const columns = [{ key: 'title', name: 'Название Категории' }]

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

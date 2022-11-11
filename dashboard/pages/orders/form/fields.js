export const schema = {
  fields: [
    {
      type: 'input',
      label: 'Название категории',
      model: 'title',
      placeholder: 'Введите название Категории',
      inputType: 'text',
      styleClasses: 'col-md-6',
    },
    {
      type: 'textArea',
      label: 'Описание категории',
      model: 'description',
      placeholder: 'Введи описание категории',
      hint: 'Max 500 characters',

      rows: 10,
      styleClasses: 'col-md-12',
    },
  ],
}

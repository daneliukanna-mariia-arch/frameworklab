const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

// Лічильники
let itemCount = 0
let uncheckedCount = 0

// Функція оновлення лічильників
function updateCounters() {
  $(itemCountSpan).text(itemCount)
  $(uncheckedCountSpan).text(uncheckedCount)
}

// Функція створення нового TODO з використанням jQuery
function newTodo() {
  const todoText = prompt('Введіть назву нового завдання:')
  
  if (!todoText || todoText.trim() === '') {
    return
  }

  itemCount++
  uncheckedCount++
  updateCounters()

  // Створюємо елементи за допомогою jQuery
  const $li = $('<li>').addClass(classNames.TODO_ITEM)
  
  const $checkbox = $('<input>')
    .attr('type', 'checkbox')
    .addClass(classNames.TODO_CHECKBOX)
    .on('change', function() {
      if (this.checked) {
        uncheckedCount--
      } else {
        uncheckedCount++
      }
      updateCounters()
    })

  const $span = $('<span>')
    .addClass(classNames.TODO_TEXT)
    .text(todoText)

  const $deleteBtn = $('<button>')
    .addClass(classNames.TODO_DELETE)
    .text('Видалити')
    .on('click', function() {
      if (!$checkbox.prop('checked')) {
        uncheckedCount--
      }
      itemCount--
      updateCounters()
      $li.remove() // Видаляємо елемент через jQuery
    })

  // Додаємо всередину контейнера та виводимо у список
  $li.append($checkbox, $span, $deleteBtn)
  $(list).append($li)
}

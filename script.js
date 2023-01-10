const Item_Container = document.getElementById('items');
const Item_Template = document.getElementById('itemTemplate');
const Add_Button = document.getElementById('add');


// gets the to do items when page loads stores in array 
const getTodos = () => {
  const values = localStorage.getItem('todo') || '[]';
  console.log('these are the current values', values)

  return JSON.parse(values)

}

let items = getTodos(); 


// sets the todo items into local storage 
const setTodos = (items) => {

  const itemsJson = JSON.stringify(items);

  localStorage.setItem('todo', itemsJson);
};

// adds an item in kocal storage
const addItem = () => {

  items.unshift({
    description: '',
    completed: false
  });

  setTodos(items);
  refreshToDos();
};


const updateItem = (item, key, value) => {

  item[key] = value;

  setTodos(items);
  refreshToDos();

}


const refreshToDos = () => {


  items.sort((a, b) => {

    if (a.completed){
      return 1
    }

    if (b.completed){
      -1
    }

    return a.desc < b.desc ? -1 : 1;

   })

   
  Item_Container.innerHTML = '';

  for ( const item of items) {
    const todoElement = Item_Template.content.cloneNode(true);
    const desc = todoElement.querySelector('.item-description');
    const comp = todoElement.querySelector('.item-completed');

    desc.value = item.description
    comp.checked = item.completed

    desc.addEventListener('change', () => {
      updateItem(item, 'description', desc.value)
    });
    comp.addEventListener('change', () => {
      updateItem(item, 'completed', comp.checked)
    });

    Item_Container.appendChild(todoElement)
  }
}


Add_Button.addEventListener('click', () => {

  addItem()
})


refreshToDos()
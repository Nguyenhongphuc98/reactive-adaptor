
import TodoList from './UI/TodoList';

const st = {
  display: 'flex',
  gap: '30px',
  margin: '50px'
}

function App() {
  return (
    <div style={st}>
      {/* <TodoList type='all' /> */}
      <TodoList type='all' />
      <TodoList type='complete' />
    </div>
  );
}

export default App;

import { createStore, createEvent, sample } from 'effector';
// import { nanoid } from 'nanoid';

function createTodoListApi(
  initial: { id: string; value: string; completed: boolean }[] = []
) {
  const insert = createEvent<string>();
  const remove = createEvent<string>();
  const change = createEvent<string>();
  const complete = createEvent<{ id: string; completed: boolean }>();
  const reset = createEvent<void>();

  const $input = createStore<string>('')
    .on(change, (_, value) => value)
    .reset(reset, insert);

  const $todos = createStore<
    { id: string; value: string; completed: boolean }[]
  >(initial)
    .on(insert, (todos, newTodo) => [
      ...todos,
      { id: Date.now().toString(), value: newTodo, completed: false },
    ])
    .on(remove, (todos, id) => todos.filter((todo) => todo.id !== id))
    .on(complete, (todos, { id, completed }) =>
      todos.map((todo) => (todo.id === id ? { ...todo, completed } : todo))
    );

  const submit = createEvent<React.SyntheticEvent>();
  submit.watch((event) => event.preventDefault());

  sample({
    clock: submit,
    source: $input,
    target: insert,
  });

  return {
    submit,
    remove,
    change,
    reset,
    complete,
    $todos,
    $input,
  };
}

export const model = createTodoListApi([]);

class TodoItem {
  id: string;
  what: string;
  completed: boolean;

  constructor(what: string) {
    this.what = what;
    this.completed = false;
    this.id = crypto.randomUUID();
  }
}

interface Props {
  title: string;
  completed: boolean;
}

const Todo = function ({ title, completed }: Props) {
  return (
    <li>
      <label>
        <input type="checkbox" checked={completed} />
        {title}
      </label>
      <button className="btn btn-danger">Delete</button>
    </li>
  );
};

export { TodoItem };
export default Todo;

import { MouseEvent } from "react";

interface Props {
  content: string;
  update: (arg0: string) => void;
  itemAdd: (arg0: MouseEvent) => void;
}

const TodoForm = ({ content, update, itemAdd }: Props) => {
  return (
    <form className="new-item-form">
      <div className="form-container">
        <label htmlFor="item">New Item</label>
        <input
          type="text"
          id="item"
          value={content}
          onChange={(e) => update(e.target.value)}
        />
      </div>
      <button className="form-btn" onClick={(e) => itemAdd(e)}>
        Add
      </button>
    </form>
  );
};

export default TodoForm;

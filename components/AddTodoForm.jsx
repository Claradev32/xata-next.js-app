import { useState } from "react";
import styles from "../styles/Home.module.css";

export const AddTodoForm = () => {
  const [label, setLabel] = useState("");

  const submit = () => {
    if (label !== "") { // check that label is not empty
      fetch("/api/add-todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          label,
        }),
      }).then(() => window.location.reload());
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
        setLabel('');
      }}
      className={styles.label}
      style={{padding: '0 0 0 40px', margin: '40px 0 0'}}
    >
      <label>
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Write some code?"
          className={styles.input}
        />
      </label>
      <button className={styles.btn}>Save</button>
    </form>
  );
};

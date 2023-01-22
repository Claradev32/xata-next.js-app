import Head from "next/head";
import { AddTodoForm } from "../components/AddTodoForm";
import { authorize } from "../src/authorize";
import { getXataClient } from "../src/xata";
// import { xata } from "../src/xataClient";
import styles from "../styles/Home.module.css";

export default function Home({ todos }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Task Manager App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.content}>
          <h1 className={styles.title}>My Task Manager</h1>
          <ul className={styles.list}>
            {todos.map((todo) => (
              <li className={styles.listItem} key={todo.id}>
                <label className={styles.label}>
                  <input
                    type="checkbox"
                    defaultChecked={todo.is_done}
                    onClick={() => {
                      fetch("/api/toggle-todo", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          id: todo.id,
                          is_done: !todo.is_done,
                        }),
                      }).then(() => {
                        window.location.reload();
                      });
                    }}
                  />
                  <span className={styles.labelText}>{todo.label}</span>
                  <button
                    className={styles.delete}
                    onClick={() => {
                      fetch("/api/delete-todo", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ id: todo.id }),
                      }).then(() => {
                        window.location.reload();
                      });
                    }}
                  >
                    Delete
                  </button>
                </label>
              </li>
            ))}
          </ul>
          <AddTodoForm />
        </div>
      </main>
    </div>
  );
}

export const getServerSideProps = async ({req, res}) => {
  const { isAuthenticated, username } = await authorize(req);

  if (isAuthenticated) {
    const xata = getXataClient();
    const todos = await xata.db.items
      .filter("user.username", username) // to-do items are now filtered to the current authenticated user
      .getMany();

    return {
      props: {
        todos,
      },
    };
  } else {
    res.writeHead(401, {
      "WWW-Authenticate": "Basic realm='This is a private to-do list'",
    });

    res.end();
    return {};
  }
};

import logo from "./logo.svg";
import styles from "./App.module.css";
import Input from "./Input";
import Button from "./components/Button";
import { createEffect, createSignal, lazy } from "solid-js";
import { createStore } from "solid-js/store";
import { Router, useRoutes, A } from "@solidjs/router";

const routes = [
  {
    path: "/login",
    component: lazy(() => import("./pages/Login/Login")),
  },
  {
    path: "/products",
    component: lazy(() => import("./pages/Products/Products")),
  },
];

function App() {
  const Routes = useRoutes(routes);
  return (
    <div class={styles.App}>
      <Routes />
    </div>
  );
}

export default App;

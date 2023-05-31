import { useLocation } from "@solidjs/router";
import { createMemo, Show } from "solid-js";
import { useInfo } from "../store/InfoProvider";

export default function Header() {
  const { getInfo } = useInfo();
  const location = useLocation();
  const pathname = createMemo(() => location.pathname);
  console.log(pathname());

  return (
    <nav class="flex items-center justify-between flex-wrap bg-teal-500 p-6">
      <div class="block lg:hidden">
        <button class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
          <svg
            class="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div class="text-sm lg:flex-grow">
          <a
            href="/products"
            class={`block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4 active:text-white`}
            style={{
              color: `${pathname() === "/products" ? "white" : ""}`,
            }}
          >
            Products
          </a>
          <a
            href="#responsive-header"
            class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          >
            Examples
          </a>
          <a
            href="#responsive-header"
            class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
          >
            Blog
          </a>
        </div>
        <Show
          when={getInfo() && localStorage.getItem("user")?.length}
          fallback={
            <div>
              <a
                href="/login"
                class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
              >
                Login
              </a>
            </div>
          }
        >
          <div>
            <a
              // href="#"
              class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
            >
              {getInfo()}
            </a>
          </div>
        </Show>
      </div>
    </nav>
  );
}

import {
  createEffect,
  createSignal,
  For,
  Index,
  onMount,
  Show,
} from "solid-js";
import Header from "../../components/Header";
import { useInfo } from "../../store/InfoProvider";

export default function Home() {
  const [products, setProducts] = createSignal([
    {
      category: "",
      description: "",
      id: null,
      image: "",
      price: 0,
      rating: { rate: 0, count: 0 },
      title: "",
    },
  ]);

  const [isLoading, setLoading] = createSignal(false);

  const [count, setCount] = createSignal(0);
  onMount(async () => {
    setLoading((c) => (c = true));
    const res = await fetch(`https://fakestoreapi.com/products`);
    const result = await res.json();
    setLoading((c) => (c = false));
    setProducts(result);
  });

  // createEffect(async () => {
  //   console.log('vao day', count())
  //   if(count()) {
  //     const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${count()}`);
  //     setProducts(await res.json());
  //   } else {
  //     const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  //     setProducts(await res.json());
  //   }

  // }, count());
  return (
    <>
      <Header />
      <div class="flex flex-wrap mx-auto mt-5 justify-center">
        <Show
          when={!isLoading() && products()[0].id !== null}
          fallback={<div>Loading...</div>}
        >
          {/* <For each={products()}>
          {(product, i) => (
            <div class="flex flex-col items-center w-1/5 h-[250px] relative mb-4 border rounded-md border-gray-200 shadow-md py-3 px-2 ml-3">
              <div class="block w-1/4">
                <img src={product.image} />
              </div>
              <p class="text-sm my-1">{product.title}</p>
              <div class="absolute bottom-2 flex flex-row items-center">
                <button class="border outline-none rounded-md p-1 border-gray-400 text-xs mt-1 ml-0">
                  {product.category}
                </button>
                <button class="text-xs mx-3 border border-gray-400 rounded-full p-1 text-yellow-600">
                  {product.rating.rate} *
                </button>
                <button
                  class="text-xs border border-gray-400 rounded-full p-1 "
                  style={{
                    color: `${product.rating.count >= 300 ? "red" : ""}`,
                  }}
                >
                  {product.rating.count}
                </button>
              </div>
            </div>
          )}
        </For> */}
          {
            <Index each={products()}>
              {(product, i) => (
                <div class="flex flex-col items-center w-1/5 h-[250px] relative mb-4 border rounded-md border-gray-200 shadow-md py-3 px-2 ml-3">
                  <div class="block w-1/4">
                    <img src={product().image} />
                  </div>
                  <p class="text-sm my-1">{product().title}</p>
                  <div class="absolute bottom-2 flex flex-row items-center">
                    <button class="border outline-none rounded-md p-1 border-gray-400 text-xs mt-1 ml-0">
                      {product().category}
                    </button>
                    <button class="text-xs mx-3 border border-gray-400 rounded-full p-1 text-yellow-600">
                      {product().rating.rate} *
                    </button>
                    <button
                      class="text-xs border border-gray-400 rounded-full p-1 "
                      style={{
                        color: `${product().rating.count >= 300 ? "red" : ""}`,
                      }}
                    >
                      {product().rating.count}
                    </button>
                  </div>
                </div>
              )}
            </Index>
          }
        </Show>

        {/* <button onClick={() => setCount(c => c + 1)}>Click {count()}</button> */}
      </div>
    </>
  );
}

import { useNavigate } from "@solidjs/router";
import { createEffect, createSignal } from "solid-js";
import Button from "../../components/Button";
import { FORM_LOGIN } from "../../constants";
import { useInfo } from "../../store/InfoProvider";

const regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.* ).{8,}$/;
export default function Login() {
  const { infoUser, saveInfo, clearInfo } = useInfo();
  const navigate = useNavigate();
  const [userName, setUserName] = createSignal({
    value: "",

    isError: false,
    messageError: "",
  });

  const [password, setPassWord] = createSignal({
    value: "",

    isError: false,
    messageError: "",
  });

  const onSubmit = (
    e: Event & {
      submitter: HTMLElement;
    } & {
      currentTarget: HTMLFormElement;
      target: Element;
    }
  ) => {
    e.preventDefault();
    if (!userName().value.length) {
      setUserName((preState) => ({
        ...preState,
        value: "",
        isError: true,
        messageError: FORM_LOGIN.ERROR_EMPTY_FIELD,
      }));
    }
    if (!password().value.length) {
      setPassWord((preState) => ({
        ...preState,
        value: "",
        isError: true,
        messageError: FORM_LOGIN.ERROR_EMPTY_FIELD,
      }));
    }

    if (!userName().isError && !password().isError) {
      saveInfo(userName().value);
      localStorage.setItem("user", userName().value);
      navigate("/products", { replace: true });
    }
  };

  const handleChangeInput = (
    e: Event & {
      currentTarget: HTMLInputElement;
      target: HTMLInputElement;
    },
    keyWord: string
  ) => {
    const value = e.target.value;
    if (keyWord === FORM_LOGIN.USER_NAME) {
      setUserName((preState) => ({
        ...preState,
        value: value,
        isError: false,
        messageError: "",
      }));
    } else {
      console.log(value.match(regex));
      if (value.match(regex)) {
        setPassWord((preState) => ({
          ...preState,
          value: value,
          isError: false,
          messageError: "",
        }));
      } else {
        setPassWord((preState) => ({
          ...preState,
          value: value,
          isError: true,
          messageError: FORM_LOGIN.ERROR_WRONG_REQUIRED(FORM_LOGIN.PASS_WORD),
        }));
      }
    }
  };

  return (
    <div class="flex flex-col justify-center mt-[10%]">
      <form
        class={`w-[500px] h-[350px] flex flex-col justify-center m-auto border rounded shadow-2xl border-gray-200 px-4`}
        onSubmit={onSubmit}
      >
        <h1 class="font-bold mb-5 text-2xl">Login</h1>
        <div class="mb-3 flex flex-col items-start">
          <input
            class="p-2 border rounded-md border-gray-400 outline-none w-full"
            placeholder={FORM_LOGIN.USER_NAME}
            // required={true}
            value={userName().value}
            onChange={(e) => handleChangeInput(e, FORM_LOGIN.USER_NAME)}
          />
          {userName().isError && (
            <i class="text-xs text-center mt-1 text-red-500">
              {userName().messageError}
            </i>
          )}
        </div>

        <div class="mt-3 flex flex-col items-start">
          <input
            class="p-2 border rounded-md border-gray-400 outline-none w-full"
            placeholder={FORM_LOGIN.PASS_WORD}
            maxLength={8}
            // required={true}
            value={password().value}
            onChange={(e) => handleChangeInput(e, FORM_LOGIN.PASS_WORD)}
          />
          {password().isError && (
            <i class="text-xs text-center mt-1 text-red-500">
              {password().messageError}
            </i>
          )}
        </div>

        <Button title="Submit" />
      </form>
    </div>
  );
}

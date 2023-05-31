import { createContext, createSignal, useContext } from "solid-js";

const InfoContext = createContext({
  infoUser: "",
  getInfo: () => '' as string,
  saveInfo: function(newName = '') {},
  clearInfo: function() {},
});

export interface InfoUserProps {
  username: string;
  children: Element;
}


export default function InfoProvider(props: InfoUserProps) {
  const [infoUser, setInfoUser] = createSignal(props.username || localStorage.getItem('user')?.toString() || ""),
    info = {
      infoUser: infoUser(),
      getInfo: infoUser,
      saveInfo(newName = '') {
        setInfoUser((preState) => (preState = newName));
      },
      clearInfo() {
       setInfoUser((preState) => (preState = ""));
      },
    };

  return (
    <InfoContext.Provider value={info}>{props.children}</InfoContext.Provider>
  );
}

export function useInfo() {
  return useContext(InfoContext);
}

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { baseUrl } from "../config";

interface User {
  id: string;
  identifier: string;
  fio: string;
  job_title?: string;
  is_del?: string;
  mail: string;
  med_org?: string;
  role?: string;
  user_id: string;
  username?: string;
}

interface Call {
  call_id: string;
  create_time: number;
  creator: string;
  datatime: string;
  files: string[];
  link: string;
  participants: string[];
  record: string;
  text: string;
}

interface AppContextProps {
  listOfUsers: User[];
  listOfCalls: Call[];
  isLoading: boolean;
  isFetch: boolean;
  user_id: string;
  key: string;
  id: string;
  setIsLoading: (isLoading: boolean) => void;
  setIsFetch: (isFetch: boolean) => void;
  setUserId: (id: string) => void;
  setKey: (key: string) => void;
  setId: (id: string) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [listOfUsers, setListOfUsers] = useState<User[]>([]);
  const [listOfCalls, setListOfCalls] = useState<Call[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetch, setIsFetch] = useState(true);

  const [user_id, setUserId] = useState(localStorage.getItem("user_id") ?? "");
  const [key, setKey] = useState(localStorage.getItem("key") ?? "");
  const [id, setId] = useState(localStorage.getItem("id") ?? "");

  //  Контролируем  localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setUserId(localStorage.getItem("user_id") ?? "");
      setKey(localStorage.getItem("key") ?? "");
      setId(localStorage.getItem("id") ?? "");
      setIsFetch(true); // Обновляем данные
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // получем с бекенда список пользователей
  const fetchUsers = useCallback(async () => {
    if (!user_id || !key) return;

    setIsLoading(true);
    try {
      const res = await fetch(
        `${baseUrl}/shema?dict_name=users&user_id=${user_id}&key=${key}`
      );
      const data = await res.json();
      if (Array.isArray(data?.dicts)) {
        setListOfUsers(data.dicts);
        localStorage.setItem("listOfUsers", JSON.stringify(data.dicts));
      }
    } catch (err) {
      console.error("Ошибка загрузки пользователей:", err);
    } finally {
      setIsLoading(false);
    }
  }, [user_id, key]);

  //получаем список звонков
  const fetchCalls = useCallback(async () => {
    if (!user_id || !key) return;

    setIsLoading(true);
    try {
      const res = await fetch(
        `${baseUrl}/shema?dict_name=calls_dict&user_id=${user_id}&key=${key}`
      );
      const data = await res.json();
      if (data?.dicts && typeof data.dicts === "object") {
        const callsArray: Call[] = Object.values(data.dicts);
        callsArray.sort((a, b) => {
          const da = Number(a.datatime);
          const db = Number(b.datatime);
          return da - db; // ранняя дата -> первая
        });
        setListOfCalls(callsArray);
        localStorage.setItem("listOfCalls", JSON.stringify(callsArray));
      }
    } catch (err) {
      console.error("Ошибка загрузки звонков:", err);
    } finally {
      setIsLoading(false);
    }
  }, [user_id, key]);

  // при первом запуске либо обращаемся к бекенду либо тянем из кеша
  useEffect(() => {
    if (!user_id || !key) return;

    const cachedUsers = localStorage.getItem("listOfUsers");
    const cachedCalls = localStorage.getItem("listOfCalls");

    if (cachedUsers) setListOfUsers(JSON.parse(cachedUsers));
    else fetchUsers();

    if (cachedCalls) setListOfCalls(JSON.parse(cachedCalls));
    else fetchCalls();
    if (isFetch) {
      fetchCalls();
      setIsFetch(false);
    }
  }, [fetchUsers, fetchCalls, isFetch, user_id, key]);

  return (
    <AppContext.Provider
      value={{
        listOfUsers,
        listOfCalls,
        isLoading,
        isFetch,
        user_id,
        key,
        id,
        setIsLoading,
        setIsFetch,
        setUserId,
        setKey,
        setId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// хук для доступа к контексту
export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return ctx;
};

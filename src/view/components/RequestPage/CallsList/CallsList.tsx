import { useEffect, useState, useMemo } from "react";
import s from "./index.module.scss";
import { baseUrl } from "../../../../common/config";
import { InputText } from "../../../ui/InputText";
import { useNavigate } from "react-router-dom";

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

interface User {
  id: string;
  fio: string;
  job_title?: string;
}

export const CallsList = () => {
  const [calls, setCalls] = useState<Call[]>([]);
  const [filter, setFilter] = useState("");
  const [listOfUsers, setListOfUsers] = useState<User[]>([]);

  const [user_id] = useState(localStorage.getItem("user_id") ?? "");
  const [key] = useState(localStorage.getItem("key") ?? "");

  const navigate = useNavigate();

  // получаем список пользователей из локалсторидж

  useEffect(() => {
    const raw = localStorage.getItem("listOfUsers");
    if (raw) {
      try {
        setListOfUsers(JSON.parse(raw));
      } catch (e) {
        console.error("Ошибка listOfUsers:", e);
      }
    }
  }, []);

  // загрузка списка звонков
  useEffect(() => {
    const fetchCalls = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/shema?dict_name=calls_dict&user_id=${user_id}&key=${key}`
        );
        if (!response.ok) throw new Error("Помилка при завантаженні дзвінків");

        const data = await response.json();
        if (data?.dicts && typeof data.dicts === "object") {
          const callsArray: Call[] = Object.values(data.dicts);
          setCalls(callsArray);
        }
      } catch (err) {
        console.error("Помилка:", err);
      }
    };

    if (user_id && key) fetchCalls();
  }, [user_id, key]);

  // форматирование  timestamp
  const formatDate = (ts: string | number) => {
    const num = typeof ts === "string" ? parseInt(ts, 10) : ts;
    if (!num) return "-";
    const d = new Date(num * 1000);
    return d.toLocaleString("ru-RU", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // подбор ФИО
  const resolveParticipants = (ids: string[]) => {
    return ids
      .map((id) => {
        const user = listOfUsers.find((u) => u.id === id);
        return user
          ? `${user.fio}${user.job_title ? " - " + user.job_title : ""}`
          : id;
      })
      .join(", ");
  };

  // фильтрация по любому полю
  // const filteredCalls = useMemo(() => {
  //   if (!filter.trim()) return calls;
  //   const lower = filter.toLowerCase();
  //   return calls.filter((c) =>
  //     Object.values(c).some((val) => String(val).toLowerCase().includes(lower))
  //   );
  // }, [calls, filter]);

  // id -> для  participants
  const usersById = useMemo(
    () => Object.fromEntries(listOfUsers.map((u) => [u.id, u])),
    [listOfUsers]
  );

  // генерируем текстовые токени по timestamp (дата, время, день, ISO)
  const tokensFromTs = (ts: string | number) => {
    const n = typeof ts === "string" ? parseInt(ts, 10) : Math.floor(ts);
    if (!Number.isFinite(n)) return [];
    const d = new Date(n * 1000);

    const dateRu = d.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }); // 10.09.2025
    const timeRu = d.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    }); // 10:00
    const weekdayFull = d.toLocaleDateString("ru-RU", { weekday: "long" }); // среда
    const weekdayShort = d.toLocaleDateString("ru-RU", { weekday: "short" }); // ср
    const iso = d.toISOString().slice(0, 10); // 2025-09-10

    return [dateRu, timeRu, weekdayFull, weekdayShort, iso];
  };

  // создаем «поисковый индекс» для каждого звонка
  const buildIndex = (c: Call) => {
    const participantsNames =
      c.participants?.map((id) => usersById[id]?.fio || id).join(", ") || "";

    return [
      c.call_id,
      c.text,
      c.creator,
      c.link,
      c.record,
      participantsNames,
      ...(c.files || []),
      ...tokensFromTs(c.datatime),
      ...tokensFromTs(c.create_time),
    ]
      .filter(Boolean)
      .join(" | ")
      .toLowerCase();
  };

  // тут фильтруем
  const filteredCalls = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return calls;
    return calls.filter((c) => buildIndex(c).includes(q));
  }, [calls, filter, usersById]);

  return (
    <div className={s.CallsList}>
      <h3>Список звонков</h3>

      <InputText
        placeholder="Фильтр по дате, теме или участникам..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className={s.filterInput}
      />

      <ul className={s.callsContainer}>
        {filteredCalls.length === 0 && <li>Нет сохранённых звонков</li>}
        {filteredCalls.map((call) => (
          <li key={call.call_id} className={s.callItem}>
            <div>
              <strong>ID:</strong> {call.call_id}
            </div>
            <div>
              <strong>Создано:</strong> {formatDate(call.create_time)}
            </div>
            <div>
              <strong>Дата звонка:</strong> {formatDate(call.datatime)}
            </div>
            <div>
              <strong>Создатель:</strong> {call.creator}
            </div>
            <div>
              <strong>Тема:</strong> {call.text}
            </div>
            <div>
              <strong>Ссылка:</strong>{" "}
              <a href={call.link} target="_blank" rel="noreferrer">
                {call.link}
              </a>
            </div>
            <div>
              <strong>Файлы:</strong>{" "}
              {call.files.length ? call.files.join(", ") : "—"}
            </div>
            <div>
              <strong>Запись:</strong> {call.record || "—"}
            </div>
            <div>
              <strong>Участники:</strong>{" "}
              {resolveParticipants(call.participants)}
            </div>
            <button
              onClick={() => navigate(`/request/${call.call_id}`)}
              className=""
            >
              Подробнее
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

import { useState, useMemo, useCallback } from "react";
import s from "./index.module.scss";
import { InputText } from "../../../ui/InputText";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../../common/helpers/AppContext";
import { baseUrl } from "../../../../common/config";
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

export const CallsList = () => {
  const { listOfCalls, listOfUsers, isLoading, user_id, key } = useAppContext();
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  // форматирование timestamp
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
  const resolveParticipants = useCallback(
    (ids: string[]) =>
      ids.map((id) => {
        const user = listOfUsers.find((u) => u.user_id === id);
        return user ? (
          <p>
            {user.fio}
            {user.job_title ? " - " + user.job_title : ""}
          </p>
        ) : (
          <p>{id}</p>
        );
      }),
    [listOfUsers]
  );

  // id -> user
  const usersById = useMemo(
    () => Object.fromEntries(listOfUsers.map((u) => [u.user_id, u])),
    [listOfUsers]
  );

  // генерация токенов по timestamp (для поиска)
  const tokensFromTs = (ts: string | number) => {
    const n = typeof ts === "string" ? parseInt(ts, 10) : Math.floor(ts);
    if (!Number.isFinite(n)) return [];
    const d = new Date(n * 1000);

    const dateRu = d.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const timeRu = d.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const weekdayFull = d.toLocaleDateString("ru-RU", { weekday: "long" });
    const weekdayShort = d.toLocaleDateString("ru-RU", { weekday: "short" });
    const iso = d.toISOString().slice(0, 10);

    return [dateRu, timeRu, weekdayFull, weekdayShort, iso];
  };

  // функция построения индекса для поиска
  const buildIndex = useCallback(
    (c: Call) => {
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
    },
    [usersById]
  );

  // фильтрация звонков
  const filteredCalls = useMemo(() => {
    const q = filter.trim().toLowerCase();
    const sorted = listOfCalls
      .slice()
      .sort((a, b) => b.create_time - a.create_time);
    if (!q) return sorted;
    return sorted.filter((c) => buildIndex(c).includes(q));
  }, [filter, listOfCalls, buildIndex]);

  if (isLoading) {
    return <div className={s.CallsList}>Загрузка...</div>;
  }

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
            {/* <div>
              <strong>ID:</strong> {call.call_id}
            </div> */}
            <div>
              <strong>Дата звонка:</strong> {formatDate(call.datatime)}
            </div>
            <div>
              <strong>Создатель:</strong>{" "}
              {call.creator
                ? listOfUsers.find((it) => it.user_id === call.creator)?.fio
                : call.creator}
            </div>
            <div>
              <strong>Тема:</strong> {call.text}
            </div>

            <div>
              <strong>Участники:</strong>{" "}
              {resolveParticipants(call.participants)}
            </div>

            <div>
              <strong>Файлы:</strong>{" "}
              {call.files.length ? (
                <ul>
                  {call.files.map((file) => (
                    <li key={file}>
                      <a
                        href={`${baseUrl}/download/${file}?user_id=${user_id}&key=${key}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {file}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                "—"
              )}
            </div>

            <div>
              <strong>Создано:</strong> {formatDate(call.create_time)}
            </div>

            <div className={s.buttonsRow}>
              <button
                type="button"
                onClick={() => navigate(`/request/${call.call_id}`)}
                className={s.detailsBtn}
              >
                Подробнее
              </button>
              {call.record ? (
                <a
                  title="add to meeting"
                  href={call.record}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className={s.detailsBtn}>Запись</div>
                </a>
              ) : (
                <a
                  title="add to meeting"
                  href={call.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className={s.detailsBtn}>Присоединиться</div>
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

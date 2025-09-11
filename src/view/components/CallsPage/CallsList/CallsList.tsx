import { useState, useMemo, useCallback } from "react";
import s from "./index.module.scss";
import { InputText } from "../../../ui/InputText";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../../common/helpers/AppContext";
import { baseUrl } from "../../../../common/config";

export const CallsList = () => {
  const { listOfCalls, listOfUsers, isLoading, user_id, key } = useAppContext();
  const navigate = useNavigate();
  // --- дата ---
  const toISODate = (ts: string | number) => {
    const num = typeof ts === "string" ? parseInt(ts, 10) : ts;
    if (!num) return "";
    return new Date(num * 1000).toISOString().slice(0, 10);
  };
  // --- фильтры ---
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [filterCreator, setFilterCreator] = useState("");
  const [filterParticipant, setFilterParticipant] = useState("");
  const [filterHasFile, setFilterHasFile] = useState<"all" | "true" | "false">(
    "all"
  );
  const [filterHasRecord, setFilterHasRecord] = useState<
    "all" | "true" | "false"
  >("all");
  const [filterDate, setFilterDate] = useState("");

  // --- пагинация ---
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const formatDate = (ts: string | number) => {
    const num = typeof ts === "string" ? parseInt(ts, 10) : ts;
    if (!num) return "-";
    const d = new Date(num * 1000);
    return d.toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const resolveParticipants = useCallback(
    (ids: string[]) =>
      ids.map((id, ind) => {
        const user = listOfUsers.find((u) => u.user_id === id);
        return (
          <p key={ind}>
            {`${user?.med_org ?? ""}, ${user?.job_title ?? ""} - ${
              user?.fio ?? id
            }`}
          </p>
        );
      }),
    [listOfUsers]
  );

  // --- применяем фильтры ---
  const filteredCalls = useMemo(() => {
    return listOfCalls
      .slice()
      .sort((a, b) => Number(a.datatime) - Number(b.datatime))
      .filter((c) =>
        filterText
          ? c.text.toLowerCase().includes(filterText.toLowerCase())
          : true
      )
      .filter((c) =>
        filterCreator
          ? listOfUsers
              .find((u) => u.user_id === c.creator)
              ?.fio?.toLowerCase()
              .includes(filterCreator.toLowerCase())
          : true
      )
      .filter((c) =>
        filterParticipant
          ? c.participants.some((pid) =>
              listOfUsers
                .find((u) => u.user_id === pid)
                ?.fio?.toLowerCase()
                .includes(filterParticipant.toLowerCase())
            )
          : true
      )
      .filter((c) => (filterDate ? toISODate(c.datatime) === filterDate : true))
      .filter((c) =>
        filterHasFile === "all"
          ? true
          : filterHasFile === "true"
          ? c.files.length > 0
          : c.files.length === 0
      )
      .filter((c) =>
        filterHasRecord === "all"
          ? true
          : filterHasRecord === "true"
          ? Boolean(c.record)
          : !c.record
      );
  }, [
    listOfCalls,
    listOfUsers,
    filterText,
    filterCreator,
    filterParticipant,
    filterDate,
    filterHasFile,
    filterHasRecord,
  ]);

  // пагинация
  const totalPages = Math.ceil(filteredCalls.length / pageSize);
  const paginatedCalls = filteredCalls.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const resetFilters = () => {
    setFilterText("");
    setFilterCreator("");
    setFilterParticipant("");
    setFilterDate("");
    setFilterHasFile("all");
    setFilterHasRecord("all");
    setPage(1);
  };

  if (isLoading) {
    return <div className={s.CallsList}>Загрузка...</div>;
  }

  return (
    <div className={s.CallsList}>
      <div className={s.headerRow}>
        <h3>Список звонков</h3>
        <button
          type="button"
          className={s.toggleFiltersBtn}
          onClick={() => setFiltersVisible((p) => !p)}
        >
          {filtersVisible ? "Скрыть фильтры" : "Показать фильтры"}
        </button>
      </div>

      {filtersVisible && (
        <div className={s.filtersPanel}>
          <InputText
            placeholder="По теме"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
          <InputText
            placeholder="По создателю"
            value={filterCreator}
            onChange={(e) => setFilterCreator(e.target.value)}
          />
          <InputText
            placeholder="По участникам"
            value={filterParticipant}
            onChange={(e) => setFilterParticipant(e.target.value)}
          />
          <input
            type="date"
            name="filterDate"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className={s.dateInput}
            placeholder="По дате"
          />
          <select
            title="filterHasFile"
            name="filterHasFile"
            value={filterHasFile}
            onChange={(e) => setFilterHasFile(e.target.value as any)}
          >
            <option value="all">Файлы: все</option>
            <option value="true">С файлами</option>
            <option value="false">Без файлов</option>
          </select>
          <select
            title="filterHasRecord"
            name="filterHasRecord"
            value={filterHasRecord}
            onChange={(e) => setFilterHasRecord(e.target.value as any)}
          >
            <option value="all">Запись: все</option>
            <option value="true">С записью</option>
            <option value="false">Без записи</option>
          </select>

          <button type="button" onClick={resetFilters} className={s.resetBtn}>
            Сбросить фильтры
          </button>
        </div>
      )}

      <ul className={s.callsContainer}>
        {paginatedCalls.length === 0 && <li>Нет сохранённых звонков</li>}
        {paginatedCalls.map((call) => (
          <li key={call.call_id} className={s.callItem}>
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
            <div className={s.participants}>
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
                        href={`${baseUrl}/download/${encodeURIComponent(
                          file
                        )}?user_id=${user_id}&key=${key}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {file}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                "отсутствуют"
              )}
            </div>
            <div>
              <strong>Создано:</strong> {formatDate(call.create_time)}
            </div>
            <div className={s.buttonsRow}>
              <button
                type="button"
                onClick={() => navigate(`/calls/${call.call_id}`)}
                className={s.detailsBtn}
              >
                Подробнее
              </button>
              {call.record ? (
                <a
                  href={`${baseUrl}/download/${encodeURIComponent(
                    call.record
                  )}?user_id=${user_id}&key=${key}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className={s.detailsBtn}>Запись</div>
                </a>
              ) : (
                <a href={call.link} target="_blank" rel="noreferrer">
                  <div className={s.detailsBtn}>Присоединиться</div>
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* пагинация */}
      {totalPages > 1 && (
        <div className={s.pagination}>
          <button
            type="button"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            ◀
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              type="button"
              key={i}
              onClick={() => setPage(i + 1)}
              className={page === i + 1 ? s.activePage : ""}
            >
              {i + 1}
            </button>
          ))}
          <button
            type="button"
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            ▶
          </button>
        </div>
      )}
    </div>
  );
};

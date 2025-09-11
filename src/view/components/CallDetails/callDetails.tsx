import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { InputDate } from "../../ui/InputDate";
import { InputTime } from "../../ui/InputTime";
import { Textarea } from "../../ui/Textarea";
import { CheckBox } from "../../ui/CheckBox";
import { Button } from "../../ui/Button";
import s from "./index.module.scss";
import { baseUrl } from "../../../common/config";
import { useAppContext } from "../../../common/helpers/AppContext";

interface CallData {
  call_id: string;
  datatime: string;
  text: string;
  participants: string[];
  files: string[];
  link?: string;
  record?: string;
  creator?: string;
}

export const CallDetails = () => {
  const { listOfUsers, user_id, key } = useAppContext();
  const { callId } = useParams<{ callId: string }>();
  const navigate = useNavigate();

  const [call, setCall] = useState<CallData | null>(null);

  const [meetingDate, setMeetingDate] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [topic, setTopic] = useState("");
  const [users, setUsers] = useState<string[]>([]);
  const [, setFiles] = useState<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  const [showAvailableUsers, setShowAvailableUsers] = useState(false);

  // показать сообщение
  const showMessage = (msg: string) => {
    setMessage(msg);
    alert(msg);
    setTimeout(() => setMessage(null), 3000);
  };

  // запрос на бек
  const fetchCall = useCallback(async () => {
    try {
      const res = await fetch(
        `${baseUrl}/shema?dict_name=calls_dict&user_id=${user_id}&key=${key}`
      );
      const data = await res.json();
      if (data?.dicts && typeof data.dicts === "object") {
        const callsArray: CallData[] = Object.values(data.dicts);
        const found = callsArray.find((c) => c.call_id === callId);

        if (found) {
          setCall(found);
          setTopic(found.text || "");
          setUsers(found.participants || []);
          setUploadedFiles(found.files || []);

          const d = new Date(Number(found.datatime) * 1000);
          setMeetingDate(d.toISOString().slice(0, 10)); // YYYY-MM-DD
          setMeetingTime(d.toISOString().slice(11, 16)); // HH:mm
        }
      }
    } catch (err) {
      console.error("Ошибка загрузки звонка:", err);
    }
  }, [callId, user_id, key]);

  useEffect(() => {
    if (user_id && key) {
      fetchCall();
    }
  }, [fetchCall, user_id, key]);

  const chosenUsers = (user_id: string) => {
    setUsers((prev) =>
      prev.includes(user_id)
        ? prev.filter((u) => u !== user_id)
        : [...prev, user_id]
    );
  };

  // сохранение изменений
  const saveChanges = async () => {
    try {
      const datetime = Math.floor(
        new Date(`${meetingDate}T${meetingTime}:00`).getTime() / 1000
      );
      // вернуть проверку даты после тесирования
      // if (datetime < Date.now() / 1000) {
      //   alert("Дата и время должны быть в будущем");
      //   return;
      // }

      const url = `${baseUrl}/edit_call?key=${key}&user_id=${user_id}&call_id=${callId}&datatime=${datetime}&text=${encodeURIComponent(
        topic
      )}&participants=${users.join(";")}`;

      const res = await fetch(url, { method: "POST" });

      if (!res.ok) throw new Error("Ошибка сохранения");

      showMessage("Изменения сохранены успешно ✅");
      await fetchCall();
    } catch (err) {
      console.error(err);
      showMessage("Не удалось сохранить изменения ❌");
    }
  };

  // загрузка файлов
  const handleUpload = useCallback(
    async (newFiles: FileList | File[]) => {
      const arr = Array.from(newFiles);
      setFiles((prev) => [...prev, ...arr]);

      for (const file of arr) {
        const formData = new FormData();
        formData.append("file", file);

        try {
          const res = await fetch(
            `${baseUrl}/upload?user_id=${user_id}&key=${key}&call_id=${callId}`,
            {
              method: "POST",
              body: formData,
            }
          );
          if (!res.ok) throw new Error("Ошибка загрузки файла");

          const data = await res.json();
          setUploadedFiles((prev) => [...prev, ...(data?.files || [])]);

          showMessage(`Файл "${file.name}" успешно добавлен ✅`);
          await fetchCall();
        } catch (err) {
          console.error("Ошибка загрузки файла:", err);
          showMessage(`Не удалось загрузить файл "${file.name}" ❌`);
        }
      }
    },
    [user_id, key, callId, fetchCall]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      handleUpload(e.dataTransfer.files);
    },
    [handleUpload]
  );

  if (!call) return <div>Загрузка...</div>;

  // участники
  const participantUsers = listOfUsers.filter((u) => users.includes(u.user_id));
  const availableUsers = listOfUsers.filter((u) => !users.includes(u.user_id));

  return (
    <div className={s.CallDetails}>
      {/* Кнопка Назад */}
      <Button classname={s.btnSmall} onClick={() => navigate(-1)}>
        Назад
      </Button>

      <h2>Редактировать вызов</h2>

      <div className={s.meetingDataContainer}>
        <span>Дата:</span>
        <InputDate
          className={s.meetingDate}
          valueDate={meetingDate}
          id="meetingDate"
          onChangeDate={(e) => setMeetingDate(e.target.value)}
        />
      </div>

      <div className={s.meetingDataContainer}>
        <span>Время:</span>
        <InputTime
          className={s.meetingDate}
          valueTime={meetingTime}
          id="meetingTime"
          onChangeTime={(e) => setMeetingTime(e.target.value)}
        />
      </div>

      <div className={s.meetingDataContainer}>
        <span>Тема звонка:</span>
        <Textarea
          className={s.meetingTopic}
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
      </div>

      {/* Участники */}
      <div className={s.meetingDataCont}>
        <h3>Участники встречи:</h3>
        <ul className={s.usersContainer}>
          {participantUsers.map((it) => (
            <li key={it.identifier}>
              <CheckBox
                id={it.user_id}
                checked={users.includes(it.user_id)}
                onChange={() => chosenUsers(it.user_id)}
              >
                {`${it.fio} - ${it?.job_title ?? ""}`}
              </CheckBox>
            </li>
          ))}
        </ul>

        <Button
          classname={s.btnSmall}
          onClick={() => setShowAvailableUsers((prev) => !prev)}
        >
          {showAvailableUsers
            ? "Скрыть доступных участников"
            : "Добавить участников"}
        </Button>

        {showAvailableUsers && (
          <ul className={s.usersContainer}>
            {availableUsers.map((it) => (
              <li key={it.identifier}>
                <CheckBox
                  id={it.user_id}
                  checked={users.includes(it.user_id)}
                  onChange={() => chosenUsers(it.user_id)}
                >
                  {`${it.fio} - ${it?.job_title ?? ""}`}
                </CheckBox>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Присоединиться к встрече */}
      {!call.record && call.link && (
        <Button
          classname={s.btnSmall}
          onClick={() => window.open(call.link, "_blank")}
        >
          Присоединиться к встрече
        </Button>
      )}
      {call.record && (
        <a
          className={s.btnSmall}
          href={`${baseUrl}/download/${encodeURIComponent(
            call.record
          )}?user_id=${user_id}&key=${key}`}
          target="_blank"
          rel="noreferrer"
        >
          Прослушать запись встречи
        </a>
      )}

      {message && <div className={s.message}>{message}</div>}

      {/* Файлы */}
      <div className={s.filesBlock}>
        <h3>Файлы</h3>

        <div
          className={s.dropZone}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <label>
            Перетащите файлы сюда или выберите вручную
            <input
              type="file"
              multiple
              onChange={(e) => e.target.files && handleUpload(e.target.files)}
            />
          </label>
        </div>

        <ul className={s.filesList}>
          {uploadedFiles.map((file, idx) => {
            const ext = file.split(".").pop();
            const name = file.split("/").pop();
            return (
              <li key={idx} className={s.fileItem}>
                <span className={s.fileIcon}>{ext?.toUpperCase()}</span>
                <a
                  href={`${baseUrl}/download/${encodeURIComponent(
                    file
                  )}?user_id=${user_id}&key=${key}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {name}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
      {/* Сохранить изменения */}
      <Button
        disabled={!meetingDate || !meetingTime || !topic || users.length === 0}
        onClick={saveChanges}
        classname={s.saveBt}
      >
        Сохранить изменения
      </Button>
    </div>
  );
};

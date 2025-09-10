import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { InputDate } from "../../ui/InputDate";
import { InputTime } from "../../ui/InputTime";
import { Textarea } from "../../ui/Textarea";
import { CheckBox } from "../../ui/CheckBox";
import { Button } from "../../ui/Button";
import s from "./index.module.scss";
import { baseUrl } from "../../../common/config";

interface User {
  id?: string;
  fio: string;
  job_title?: string;
  identifier: string;
}

interface CallData {
  call_id: string;
  datatime: string;
  text: string;
  participants: string[];
  files: string[];
  link?: string;
  creator?: string;
}

export const CallDetails = () => {
  const { callId } = useParams<{ callId: string }>();
  const [call, setCall] = useState<any | null>(null);
  const [listOfUsers, setListOfUsers] = useState<User[]>([]);

  const [meetingDate, setMeetingDate] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [topic, setTopic] = useState("");
  const [users, setUsers] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const user_id = localStorage.getItem("user_id") ?? "";
  const key = localStorage.getItem("key") ?? "";
  const id = localStorage.getItem("id") ?? "";

  // загрузка данных звонка

  useEffect(() => {
    const fetchCall = async () => {
      try {
        const res = await fetch(
          `${baseUrl}/shema?dict_name=calls_dict&user_id=${user_id}&key=${key}`
        );
        const data = await res.json();
        if (data?.dicts && typeof data.dicts === "object") {
          const callsArray: CallData[] = Object.values(data.dicts);
          const found = callsArray.find((c: any) => c.call_id === callId);

          if (found) {
            setCall(found);
            setTopic(found.text || "");
            setUsers(found.participants || []);
            setUploadedFiles(found.files || []);

            // timestamp → дата/час
            const d = new Date(Number(found.datatime) * 1000);
            setMeetingDate(d.toISOString().slice(0, 10)); // YYYY-MM-DD
            setMeetingTime(d.toISOString().slice(11, 16)); // HH:mm
          }
        }
      } catch (err) {
        console.error("Ошибка загрузки звонка:", err);
      }
    };

    const fetchUsers = async () => {
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
      }
    };

    if (user_id && key) {
      fetchCall();
      fetchUsers();
    }
  }, [callId, user_id, key]);

  const chosenUsers = (id: string) => {
    setUsers((prev) =>
      prev.includes(id) ? prev.filter((u) => u !== id) : [...prev, id]
    );
  };

  // сохранение изменений
  const saveChanges = async () => {
    try {
      const datetime = Math.floor(
        new Date(`${meetingDate}T${meetingTime}:00`).getTime() / 1000
      );

      const url = `${baseUrl}/edit_call?key=${key}&user_id=${user_id}&call_id=${callId}`;
      const body = {
        datatime: datetime,
        text: topic,
        participants: users,
      };

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Ошибка сохранения");
      alert("Изменения сохранены!");
    } catch (err) {
      console.error(err);
      alert("Не удалось сохранить изменения");
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
        } catch (err) {
          console.error("Ошибка загрузки файла:", err);
        }
      }
    },
    [baseUrl, user_id, key, callId]
  );

  // drag & drop
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      handleUpload(e.dataTransfer.files);
    },
    [handleUpload]
  );

  if (!call) return <div>Загрузка...</div>;

  return (
    <div className={s.CallDetails}>
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

      <div className={s.meetingDataCont}>
        <h3>Участники:</h3>
        <ul className={s.usersContainer}>
          {listOfUsers.map((it) => (
            <li key={it.identifier}>
              <CheckBox
                id={it.identifier}
                title={it.fio}
                checked={users.includes(it.identifier)}
                onChange={() => chosenUsers(it.identifier)}
              >
                {`${it.fio} - ${it?.job_title ?? ""}`}
              </CheckBox>
            </li>
          ))}
        </ul>
      </div>

      <Button
        disabled={!meetingDate || !meetingTime || !topic || users.length === 0}
        onClick={saveChanges}
        classname={s.saveBt}
      >
        Сохранить изменения
      </Button>

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
                <a href={file} target="_blank" rel="noreferrer">
                  {name}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

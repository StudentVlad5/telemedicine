import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { baseUrl } from "../../../common/config";
import s from "./index.module.scss";

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

export const CallDetails = () => {
  const { callId } = useParams<{ callId: string }>();
  const [call, setCall] = useState<any | null>(null);
  const user_id = localStorage.getItem("user_id") ?? "";
  const key = localStorage.getItem("key") ?? "";

  // загрузка деталей звонка
  useEffect(() => {
    async function fetchCall() {
      const res = await fetch(
        `${baseUrl}/shema?dict_name=calls_dict&user_id=${user_id}&key=${key}`
      );
      const data = await res.json();
      if (data?.dicts && typeof data.dicts === "object") {
        const callsArray: Call[] = Object.values(data.dicts);
        const found = callsArray.find((c: any) => c.call_id === callId);
        setCall(found);
      }
    }
    fetchCall();
  }, [callId, key, user_id]);

  const handleChange = (field: string, value: string) => {
    setCall((prev: any) => ({ ...prev, [field]: value }));
  };

  // сохранение изменений
  const saveChanges = async () => {
    await fetch(
      `${baseUrl}/edit_call?key=${key}&user_id=${user_id}&call_id=${callId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(call),
      }
    );
    alert("Изменения сохранены");
  };

  // загрузка файла
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    await fetch(
      `${baseUrl}/upload?user_id=${user_id}&key=${key}&call_id=${callId}`,
      {
        method: "POST",
        body: formData,
      }
    );
    alert("Файл загружен");
  };

  if (!call) return <div>Загрузка...</div>;

  return (
    <div className={s.CallDetails}>
      <h2>Звонок {call.call_id}</h2>

      <label>
        Тема:
        <textarea
          value={call.text}
          onChange={(e) => handleChange("text", e.target.value)}
          className=""
        />
      </label>

      <label>
        Дата/время:
        <input
          type="text"
          value={call.datatime}
          onChange={(e) => handleChange("datatime", e.target.value)}
          className=""
        />
      </label>

      <label>
        Ссылка:
        <input
          type="text"
          value={call.link}
          onChange={(e) => handleChange("link", e.target.value)}
          className=""
        />
      </label>

      <button onClick={saveChanges} className="">
        Сохранить изменения
      </button>

      <div className="">
        <h3>Файлы</h3>
        <label>
          File
          <input type="file" onChange={handleUpload} />
        </label>
        {call.files && call.files.length > 0 && (
          <ul>
            {call.files.map((f: string, i: number) => (
              <li key={i}>
                <a href={f} target="_blank" rel="noreferrer">
                  {f}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

import { useCallback, useState } from "react";
import { InputDate } from "../../../ui/InputDate";
import { InputTime } from "../../../ui/InputTime";
import { Textarea } from "../../../ui/Textarea";
import { baseUrl } from "../../../../common/config";
import { CheckBox } from "../../../ui/CheckBox";
import { Button } from "../../../ui/Button";
import s from "./index.module.scss";
import { useAppContext } from "../../../../common/helpers/AppContext";

export const CreateCall = () => {
  const { listOfUsers, user_id, key, setIsFetch } = useAppContext();
  const [meetingDate, setMeetingDate] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [timeError, setTimeError] = useState("");
  const [topic, setTopic] = useState("");
  const [users, setUsers] = useState<string[]>([user_id ? user_id : ""]);

  const chosenUsers = useCallback((user_id: string) => {
    setUsers((prev) =>
      prev.includes(user_id)
        ? prev.filter((u) => u !== user_id)
        : [...prev, user_id]
    );
  }, []);

  const SaveCallMeeting = useCallback(async () => {
    try {
      const datetime = Math.floor(
        new Date(`${meetingDate}T${meetingTime}:00`).getTime() / 1000
      );

      if (datetime < Date.now() / 1000) {
        alert("Дата и время должны быть в будущем");
        return;
      }

      const url = `${baseUrl}/create_call?key=${key}&user_id=${user_id}&datatime=${datetime}&text=${encodeURIComponent(
        topic
      )}&participants=${users.join(";")}`;

      const response = await fetch(url, { method: "POST" });
      if (!response.ok) throw new Error("Ошибка отправки данных");

      const result = await response.json();
      console.log("Встреча сохранена:", result);

      setMeetingDate("");
      setMeetingTime("");
      setTopic("");
      setUsers(user_id ? [user_id] : []);
      setIsFetch(true);

      alert("Встреча успешно создана!");
    } catch (err) {
      console.error(err);
      alert("Ошибка при сохранении встречи");
    }
  }, [key, meetingDate, meetingTime, setIsFetch, topic, user_id, users]);

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value; // "HH:MM"
    if (!value) return;

    const [h, m] = value.split(":").map(Number);
    const minutes = h * 60 + m;

    const min = 6 * 60; // 06:00
    const max = 20 * 60; // 20:00

    if (minutes < min || minutes > max) {
      setTimeError("Время должно быть между 06:00 и 20:00");
      return;
    }

    setTimeError("");
    setMeetingTime(value);
  };

  return (
    <div className={s.CreateCall}>
      <h2>Создание звонка</h2>

      <div className={s.fieldGroup}>
        <div>
          <label>Дата:</label>
          <InputDate
            className={s.input}
            min={new Date().toISOString().split("T")[0]}
            valueDate={meetingDate}
            id="meetingDate"
            onChangeDate={(e) => setMeetingDate(e.target.value)}
          />
        </div>
        <div>
          <label>Время:</label>
          <InputTime
            className={s.input}
            valueTime={meetingTime}
            maxTime="20:00"
            minTime="06:00"
            id="meetingTime"
            onChangeTime={handleTimeChange}
          />
          {timeError && <span className={s.error}>{timeError}</span>}
        </div>
      </div>

      <div className={s.fieldGroup}>
        <label>Тема звонка:</label>
        <Textarea
          className={s.textarea}
          value={topic}
          subtitle="Например: консультация пациента"
          onChange={(e) => setTopic(e.target.value)}
        />
      </div>

      <div className={s.fieldGroup}>
        <h3>Участники:</h3>
        <ul className={s.usersGrid}>
          {listOfUsers
            .filter((u) => u.user_id !== user_id)
            .map((it) => (
              <li key={it.user_id}>
                <CheckBox
                  id={it.user_id}
                  title={it.fio}
                  checked={users.includes(it.user_id)}
                  onChange={() => chosenUsers(it.user_id)}
                >
                  {`${it.fio} - ${it?.job_title ?? ""}`}
                </CheckBox>
              </li>
            ))}
        </ul>
      </div>

      <Button
        disabled={!meetingDate || !meetingTime || !topic || users.length === 0}
        onClick={SaveCallMeeting}
        classname={s.saveBt}
      >
        Создать вызов и уведомить участников
      </Button>
    </div>
  );
};

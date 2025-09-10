import { useEffect, useState } from "react";
import { InputDate } from "../../../ui/InputDate";
import s from "./index.module.scss";
import { useOnBlurHandler } from "../../../../common/helpers/useOnBlurHandler";
import { useThunks } from "../../../../common/helpers/reduxHook";
import { QuizThunks } from "../../../../store/thunks/quiz.thunks";
import { InputTime } from "../../../ui/InputTime";
import { Textarea } from "../../../ui/Textarea";
import { baseUrl } from "../../../../common/config";
import { CheckBox } from "../../../ui/CheckBox";
import { Button } from "../../../ui/Button";

interface User {
  id?: string;
  fio: string;
  job_title?: string;
  identifier: string;
}

export const CreateCall = () => {
  const { addQuizAnswerThunk } = useThunks(QuizThunks);
  const { onBlurHandler } = useOnBlurHandler({ addQuizAnswerThunk });

  const [meetingDate, setMeetingDate] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [topic, setTopic] = useState("");
  const [users, setUsers] = useState<string[]>([]);

  const [listOfUsers, setListOfUsers] = useState<User[]>([]);
  const [user_id] = useState(localStorage.getItem("user_id") ?? "");
  const [key] = useState(localStorage.getItem("key") ?? "");
  const [id] = useState(localStorage.getItem("id") ?? "");

  // получаем список пользователей
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/shema?dict_name=users&user_id=${user_id}&key=${key}`
        );
        if (!response.ok) throw new Error("Response was not ok");

        const newData = await response.json();
        if (Array.isArray(newData?.dicts)) {
          setListOfUsers(newData.dicts);
          localStorage.setItem("listOfUsers", JSON.stringify(newData.dicts));
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (user_id && key) {
      getData();
    }

    if (id) {
      setUsers((prev) => (prev.includes(id) ? prev : [...prev, id]));
    }
  }, [user_id, key, id]);

  const chosenUsers = (id: string) => {
    setUsers((prev) =>
      prev.includes(id) ? prev.filter((user) => user !== id) : [...prev, id]
    );
  };

  // сохранение встречи
  const SaveCallMeeting = async () => {
    try {
      const datetime = Math.floor(
        new Date(`${meetingDate}T${meetingTime}:00`).getTime() / 1000
      ); // timestamp

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
      setUsers(id ? [id] : []);
      alert("Встреча сохранена успешно!");
    } catch (err) {
      console.error(err);
      alert("Получена ошибка при сохранении встречи");
    }
  };

  return (
    <div className={s.CreateCall}>
      <h3>Создать новый вызов</h3>

      <div className={s.meetingDataContainer}>
        <span>Дата: </span>
        <InputDate
          className={s.meetingDate}
          valueDate={meetingDate}
          id="meetingDate"
          onChangeDate={(e) => setMeetingDate(e.target.value)}
        />
      </div>

      <div className={s.meetingDataContainer}>
        <span>Время: </span>
        <InputTime
          className={s.meetingDate}
          valueTime={meetingTime}
          maxTime="20:00"
          minTime="06:00"
          id="meetingTime"
          onChangeTime={(e) => setMeetingTime(e.target.value)}
        />
      </div>

      <div className={s.meetingDataContainer}>
        <span>Тема звонка: </span>
        <Textarea
          className={s.meetingTopic}
          value={topic}
          subtitle="Заполнить тему, пациента"
          onChange={(e) => setTopic(e.target.value)}
        />
      </div>

      <div className={s.meetingDataCont}>
        <h3>Участники:</h3>
        <ul className={s.usersContainer}>
          {listOfUsers
            .filter((u) => u.identifier !== id)
            .map((it) => (
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
        onClick={SaveCallMeeting}
        classname={s.saveBt}
      >
        Создать вызов и уведомить участников о дате и времени
      </Button>
    </div>
  );
};

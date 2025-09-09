import { useEffect, useRef, useState } from "react";
import { baseFormUrl } from "../../../common/config";
import s from "./index.module.scss";
import { Button } from "../../ui/Button";
import { InputTextByList } from "../../ui/InputTextByList";
import {
  useLocalStorage,
  saveToLocalStorage,
} from "../../../common/helpers/useLocalStorageHook";
import { InputNumber } from "../../ui/InputNumber";
import MapSelector from "../../ui/MapSelector";
import sendFormData from "../../../common/helpers/formApi";
import { useSelector } from "react-redux";

const FormDataForHospital = () => {
  const [transmitted, setTransmitted] = useLocalStorage("transmitted", false);
  const [car, setCar] = useLocalStorage("car", "");
  const [cars, setCars] = useLocalStorage("cars", []);
  const [form_id, setForm_id] = useLocalStorage("form_id", "");
  const [latitude, setLatitude] = useLocalStorage("latitude", "");
  const [longitude, setLongitude] = useLocalStorage("longitude", "");
  const [organization, setOrganization] = useLocalStorage("organization", "");
  const [organizations, setOrganizations] = useLocalStorage(
    "organizations",
    []
  );
  const [travel_time, setTravel_time] = useLocalStorage("travel_time", 0);
  const [status, setStatus] = useLocalStorage("status", "");
  const [pauseFetchCar, setPauseFetchCar] = useState(false);
  const [pauseFetchOrganisation, setPauseFetchOrganisation] = useState(false);
  const [pauseFetchCoordinate, setPauseFetchCoordinate] = useState(false);
  const identifier = useSelector(
    (state) => state.QuizReducer.quizList.identifier
  );

  const userLocation = useSelector(
    (state) => state.QuizReducer.quizList.userLocation
  );

  useEffect(() => {
    if (userLocation) {
      const [lat, lng] = userLocation.split(",");

      if (lat && latitude === "") setLatitude(lat);
      if (lng && longitude === "") setLongitude(lng);
    }
  }, [userLocation]);

  useEffect(() => {
    async function getFormData() {
      try {
        const response = await fetch(`${baseFormUrl}/show_form`);
        if (!response.ok) throw new Error("Response was not ok");
        const newData = await response.json();

        if (newData?.normal) {
          const {
            form_id,
            car,
            cars,
            latitude,
            longitude,
            organization,
            organizations,
            transmitted,
            travel_time,
          } = newData.normal;

          if (form_id) {
            setForm_id(form_id);
            saveToLocalStorage("form_id", form_id);
          }
          if (typeof transmitted !== "undefined" && transmitted !== null) {
            setTransmitted(transmitted);
            saveToLocalStorage("transmitted", transmitted);
          }
          if (car) {
            setCar(car);
            saveToLocalStorage("car", car);
          }
          if (cars) {
            setCars(cars);
            saveToLocalStorage("cars", cars);
          }
          if (latitude) {
            setLatitude(latitude);
            saveToLocalStorage("latitude", latitude);
          }
          if (longitude) {
            setLongitude(longitude);
            saveToLocalStorage("longitude", longitude);
          }
          if (organization) {
            setOrganization(organization);
            saveToLocalStorage("organization", organization);
          }
          if (organizations) {
            setOrganizations(organizations);
            saveToLocalStorage("organizations", organizations);
          }
          if (travel_time !== undefined) {
            travel_time === "" || !isNaN(Number(travel_time))
              ? setTravel_time(0)
              : setTravel_time(Number(travel_time));
            travel_time === "" || !isNaN(Number(travel_time))
              ? saveToLocalStorage("travel_time", 0)
              : saveToLocalStorage("travel_time", travel_time);
          }
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    if (!form_id) getFormData();
  }, []);

  useEffect(() => {
    async function getFormData() {
      try {
        const response = await fetch(`${baseFormUrl}/show_form`, {
          method: "POST",
          body: JSON.stringify({ form_id }),
        });
        if (!response.ok) throw new Error("Response was not ok");
        const newData = await response.json();

        if (newData?.normal) {
          if (
            newData?.normal?.form_id &&
            newData?.normal?.form_id !== form_id
          ) {
            setForm_id(newData.normal.form_id);
            saveToLocalStorage("form_id", newData.normal.form_id);
          }
          if (
            typeof newData?.normal?.transmitted !== "undefined" &&
            newData?.normal?.transmitted !== null
          ) {
            setTransmitted(newData.normal.transmitted);
            saveToLocalStorage("transmitted", newData.normal.transmitted);
          }
          if (newData?.normal?.car && newData?.normal?.car !== car) {
            setCar(newData.normal.car);
            saveToLocalStorage("car", newData.normal.car);
          }
          if (
            newData?.normal?.cars &&
            JSON.stringify(newData?.normal?.cars) !== JSON.stringify(cars)
          ) {
            setCars(newData.normal.cars);
            saveToLocalStorage("cars", newData.normal.cars);
          }
          if (
            newData?.normal?.latitude &&
            newData?.normal?.latitude !== latitude
          ) {
            setLatitude(newData.normal.latitude);
            saveToLocalStorage("latitude", newData.normal.latitude);
          }
          if (
            newData?.normal?.longitude &&
            newData?.normal?.longitude !== longitude
          ) {
            setLongitude(newData.normal.longitude);
            saveToLocalStorage("longitude", newData.normal.longitude);
          }
          if (
            newData?.normal?.organization &&
            newData?.normal?.organization !== organization
          ) {
            setOrganization(newData.normal.organization);
            saveToLocalStorage("organization", newData.normal.organization);
          }
          if (
            newData?.normal?.organizations &&
            JSON.stringify(newData?.normal?.organizations) !==
              JSON.stringify(organizations)
          ) {
            setOrganizations(newData.normal.organizations);
            saveToLocalStorage("organizations", newData.normal.organizations);
          }
          if (
            newData?.normal?.travel_time !== undefined &&
            newData?.normal?.travel_time !== Number(travel_time)
          ) {
            const newTravelTime =
              newData.normal.travel_time === ""
                ? 0
                : Number(newData.normal.travel_time);
            setTravel_time(newTravelTime);
            saveToLocalStorage("travel_time", newTravelTime);
          }
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
    let intervalId;
    intervalId = setInterval(() => {
      getFormData();
    }, 15000);
    return () => clearInterval(intervalId);
  }, [form_id]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const didMount = useRef(false);

  useEffect(() => {
    didMount.current = true;
  }, []);

  // Для transmitted
  useEffect(() => {
    if (!didMount.current || !form_id) return;
    sendFormData(form_id, { transmitted, identifier });
    saveToLocalStorage("transmitted", transmitted);
  }, [transmitted]);

  // Для car
  useEffect(() => {
    if (!didMount.current || !transmitted || !pauseFetchCar || !form_id) return;
    sendFormData(form_id, { car, identifier });
    saveToLocalStorage("car", car);
    setPauseFetchCar(false);
  }, [pauseFetchCar, transmitted]);

  // Для organization
  useEffect(() => {
    if (
      !didMount.current ||
      !transmitted ||
      !pauseFetchOrganisation ||
      !form_id
    )
      return;
    sendFormData(form_id, { organization, identifier });
    saveToLocalStorage("organization", organization);
    setPauseFetchOrganisation(false);
  }, [pauseFetchOrganisation, transmitted]);

  useEffect(() => {
    if (!didMount.current || !transmitted || !form_id) return;

    const timeoutId = setTimeout(() => {
      sendFormData(form_id, { travel_time, identifier });
      saveToLocalStorage("travel_time", travel_time);
    }, 3000); // 3 seconds delay

    return () => clearTimeout(timeoutId);
  }, [travel_time, transmitted]);

  // Для координат
  useEffect(() => {
    if (!didMount.current || !transmitted || !pauseFetchCoordinate || !form_id)
      return;
    sendFormData(form_id, {
      latitude,
      longitude,
      identifier,
    });
    saveToLocalStorage("latitude", latitude);
    saveToLocalStorage("longitude", longitude);
    setPauseFetchCoordinate(false);
  }, [pauseFetchCoordinate, transmitted]);

  const handleTravelTime = (item) => {
    const newValue = parseInt(item, 10);
    if (!isNaN(newValue)) {
      setTravel_time(newValue);
      saveToLocalStorage("travel_time", newValue);
    } else {
      setTravel_time(0);
      saveToLocalStorage("travel_time", 0);
    }
  };

  const handleSubmitForm = async (status) => {
    status ? setStatus("Данные отправлены") : setStatus("Данные отозваны");
    status ? setTransmitted(true) : setTransmitted(false);
    status
      ? saveToLocalStorage("status", "Данные отправлены")
      : saveToLocalStorage("status", "Данные отозваны");
    const checkData = await sendFormData(form_id, {
      latitude,
      longitude,
      transmitted: status,
      car,
      travel_time,
      organization,
      identifier,
    });
    if (!checkData || checkData == null) {
      setStatus("Збой передачи данных");
      saveToLocalStorage("status", "Збой передачи данных");
    }
  };

  return (
    <div>
      <div className={s.wraperSwich}>
        <div>Передача данных</div>
        <div
          className={
            transmitted
              ? s.subtlyRed + " " + s.subtly
              : s.subtlyGreen + " " + s.subtly
          }
        >
          {transmitted ? "ПЕРЕДАЕТСЯ" : "НЕ ПЕРЕДАЕТСЯ"}
        </div>
      </div>
      <Button
        classname={
          transmitted ? s.sendDataBtn : s.sendDataBtn + " " + s.sendDataBtnRed
        }
        onClick={() => {
          setTransmitted((prev) => !prev);
          saveToLocalStorage("transmitted", !transmitted);
        }}
      >
        {transmitted ? "Остановить передачу" : "Начать передачу"}
      </Button>
      <form className={s.form}>
        <MapSelector
          latitude={latitude}
          longitude={longitude}
          setLatitude={setLatitude}
          setLongitude={setLongitude}
          setPauseFetchCoordinate={setPauseFetchCoordinate}
        />
        <InputTextByList
          listValue={cars}
          value={car}
          setValue={setCar}
          onSubmit={setPauseFetchCar}
          title={"Номер машины"}
          className={s.correctStyle}
        />
        <InputTextByList
          listValue={organizations}
          value={organization}
          setValue={setOrganization}
          onSubmit={setPauseFetchOrganisation}
          title={"Больница назначения"}
          className={s.correctStyle}
        />
        <div className={s.timeContainer}>
          <Button
            classname={s.addBtn}
            children="-"
            onClick={() => handleTravelTime(+travel_time - 5)}
            disabled={+travel_time <= 4}
          />
          <InputNumber
            name="arrive time"
            title={"Время в пути"}
            subtitle="минут"
            value={travel_time}
            inputMode={"numeric"}
            onChange={(e) => {
              handleTravelTime(e.target.value);
            }}
            maxLength={4}
            minLength={1}
            min="0"
          />
          <Button
            classname={s.addBtn}
            children="+"
            onClick={() => handleTravelTime(+travel_time + 5)}
          />
        </div>
        <div className={s.operationContainer}>
          <Button
            classname={s.operationBtn}
            children="Отменить"
            onClick={() => handleSubmitForm(false)}
          />
          <Button
            classname={s.operationBtn}
            children="Уведомить"
            onClick={() => handleSubmitForm(true)}
          />
        </div>
        <p>{status}</p>
      </form>
    </div>
  );
};

export default FormDataForHospital;

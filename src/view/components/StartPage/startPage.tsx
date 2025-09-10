import { useEffect, useMemo, useState } from "react";
import { Button } from "../../ui/Button";
import Skeleton from "../../ui/Skeleton";
import { useNavigate } from "react-router-dom";
import s from "./index.module.scss";
import Identification from "../Identification/identification";
import { baseUrl } from "../../../common/config";

export const StartPage = () => {
  const navigate = useNavigate();

  const [id, setId] = useState<string>(localStorage.getItem("id") ?? "");
  const [invalidMessage, setInvalidMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        await fetch(`${baseUrl}/input_identifier?identifier=${id}`, {
          method: "POST",
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Response was not ok");
            }
            return response.json();
          })
          .then((newData) => {
            if (
              newData &&
              newData?.identifiers &&
              newData?.identifiers?.key &&
              newData?.identifiers?.user_id
            ) {
              localStorage.setItem("key", newData.identifiers.key);
              localStorage.setItem("user_id", newData.identifiers.user_id);
              navigate(`/request`);
            }
            if (newData && newData?.description) {
              setErrorMessage(newData.description);
            }
          });
      } catch (error) {
        console.error("Error:", error);
      }
    }
    if (id && id.length > 6) {
      getData();
    }
  }, []);

  useMemo(() => {
    if (id && id.length !== 7) setInvalidMessage("Введите 7 символов");
    else setInvalidMessage("");
  }, [id]);

  const onSubmitFormHandler = async () => {
    localStorage.setItem("id", id);
    try {
      setIsLoading(true);
      await fetch(`${baseUrl}/input_identifier?identifier=${id}`, {
        method: "POST",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Response was not ok");
          }
          return response.json();
        })
        .then((newData) => {
          if (
            newData &&
            newData?.identifiers &&
            newData?.identifiers?.key &&
            newData?.identifiers?.user_id
          ) {
            localStorage.setItem("key", newData.identifiers.key);
            localStorage.setItem("user_id", newData.identifiers.user_id);
            navigate(`/request`);
          }
        });
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={s.StartPage}>
      {isLoading && <Skeleton />}
      <div className={s.pointsContainer}>
        <Identification id={id} setId={setId} invalidMessage={invalidMessage} />
      </div>
      {errorMessage && <p>{errorMessage}</p>}
      <Button
        disabled={!id || isLoading || !!invalidMessage}
        onClick={onSubmitFormHandler}
      >
        Sign In
      </Button>
    </div>
  );
};

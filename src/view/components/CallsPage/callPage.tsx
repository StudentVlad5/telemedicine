import s from "./index.module.scss";
import { CreateCall } from "./CreateCall/createCall";
import { CallsList } from "./CallsList/CallsList";

export const CallsPage = () => {
  return (
    <div className={s.CallsPage}>
      <div className={s.container}>
        <CreateCall />
        <CallsList />
      </div>
    </div>
  );
};

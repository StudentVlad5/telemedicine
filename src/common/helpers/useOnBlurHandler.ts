import { useCallback } from "react";

type UseOnBlurHandlerProps = {
  addQuizAnswerThunk: (data: { params: Record<string, any> }) => void;
};

export const useOnBlurHandler = ({
  addQuizAnswerThunk,
}: UseOnBlurHandlerProps) => {
  const onBlurHandler = useCallback(
    (name: string, value: any) => {
      addQuizAnswerThunk({
        params: {
          [name]: value,
        },
      });
    },
    [addQuizAnswerThunk]
  );

  return { onBlurHandler };
};

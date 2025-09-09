import React, { useEffect, useState, useRef } from "react";
import s from "./index.module.scss";
import classNames from "classnames";
import { InputHTMLAttributes } from "react";

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange" | "onSubmit"
>;

interface InputTextByListProps extends HTMLInputProps {
  className?: string;
  title?: string;
  subtitle?: string;
  value?: string;
  setValue?: (value: string) => void;
  listValue: string[];
  onSubmit?: (value: boolean) => void;
}

export const InputTextByList = ({
  className,
  title,
  subtitle,
  value,
  setValue,
  listValue = [],
  onSubmit,
  ...otherProps
}: InputTextByListProps) => {
  const [filteredLists, setFilteredList] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue && setValue(newValue);
    setFilteredList(
      listValue.filter((it) =>
        it.toLowerCase().includes(newValue.toLowerCase())
      )
    );
  };

  const toggleDropdown = () => {
    if (showDropdown) {
      setShowDropdown(false);
      setFilteredList([]);
    } else {
      setFilteredList(listValue);
      setShowDropdown(true);
    }
  };

  const handleSelect = (item: string) => {
    setValue && setValue(item);
    setFilteredList([]);
    setShowDropdown(false);
  };

  // Debounce submission
  useEffect(() => {
    if (!value) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (onSubmit) {
        onSubmit(true);
      }
    }, 4000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, onSubmit]);

  return (
    <div className={classNames(s.inputText, className)}>
      <div className={s.inner}>
        {title && <span className={s.title}>{title}</span>}
        {subtitle && <span className={s.subtitle}>{subtitle}</span>}
      </div>
      <div className={s.inputContainer}>
        <input
          className={s.input}
          type="text"
          value={value}
          name={title}
          onChange={handleChange}
          {...otherProps}
        />
        <button
          type="button"
          className={s.iconButton}
          onClick={toggleDropdown}
          aria-label="Toggle list"
        >
          {showDropdown ? "▲" : "▼"}
        </button>
      </div>
      {(showDropdown || filteredLists.length > 0) && (
        <ul className={s.dropdown}>
          {filteredLists.map((it, index) => (
            <li key={index} onClick={() => handleSelect(it)}>
              {it}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

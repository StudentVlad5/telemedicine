import React from "react";
import { X } from "lucide-react";
import { QuizThunks } from "../../../../store/thunks/quiz.thunks";
import { useThunks } from "../../../../common/helpers/reduxHook";
import "./bodyModal.css";
import { useOnBlurHandler } from "../../../../common/helpers/useOnBlurHandler";

interface BodyModalProps {
  isOpen: boolean;
  selectedZones: string[];
  setSelectedZones: React.Dispatch<React.SetStateAction<string[]>>;
  onClose: () => void;
}

const zones = [
  { id: "A", top: "7%", left: "47%" },
  { id: "13", top: "25%", left: "47%" },
  { id: "1", top: "11%", left: "20%" },
  { id: "1½", top: "35%", left: "78%" },
  { id: "2", top: "11%", left: "73%" },
  { id: "2½", top: "64%", left: "72%" },
  { id: "B", top: "64%", left: "47%" },
  { id: "C", top: "80%", left: "47%" },
];

const BodyModal: React.FC<BodyModalProps> = ({
  isOpen,
  selectedZones,
  setSelectedZones,
  onClose,
}) => {
  const { addQuizAnswerThunk } = useThunks(QuizThunks);
  const { onBlurHandler } = useOnBlurHandler({ addQuizAnswerThunk });
  if (!isOpen) return null;

  const toggleZone = (zone: string) => {
    setSelectedZones((prev) =>
      prev.includes(zone) ? prev.filter((z) => z !== zone) : [...prev, zone]
    );
  };

  const handleSave = () => {
    onBlurHandler("selectedZones", selectedZones);
    onClose();
  };

  const handleReset = () => {
    setSelectedZones([]);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {/* Закрити */}
        <button
          type="button"
          title="button"
          className="close-btn"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        <h2 className="modal-title">Выберите пораженные области</h2>

        <div className="image-wrapper">
          <img src="/doctor_burn.jpg" alt="Body zones" className="body-img" />

          {zones.map((zone) => (
            <button
              type="button"
              title="button"
              key={zone.id}
              className={`zone-btn ${
                selectedZones.includes(zone.id) ? "selected" : ""
              }`}
              style={{ top: zone.top, left: zone.left }}
              onClick={() => toggleZone(zone.id)}
            >
              {zone.id}
            </button>
          ))}
        </div>

        <div className="actions">
          <button
            type="button"
            title="button"
            className="save-btn"
            onClick={handleSave}
          >
            Сохранить
          </button>
          <button
            type="button"
            title="button"
            className="reset-btn"
            onClick={handleReset}
          >
            Очистить все
          </button>
        </div>
      </div>
    </div>
  );
};

export default BodyModal;

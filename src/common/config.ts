export const baseUrl = "https://geoback.medsystem.online";
export const baseFormUrl = "https://location.medsystem.online";

export const listOfPoints = [
  { case: "Аллерго код", color: "#710bff", id: "alergoCod", maxPage: 9 },
  { case: "Инсульт", color: "#2f5597", id: "stroke", maxPage: 6 },
  { case: "Поли травма", color: "#ffda07", id: "polyOfTrauma", maxPage: 4 },
  { case: "Ожоги", color: "#ff7a00", id: "burns", maxPage: 4 },
  { case: "Беременность", color: "#0fb13c", id: "pregnancy", maxPage: 6 },
  { case: "Ножевые ранения", color: "#896008", id: "knifeWounds", maxPage: 4 },
  { case: "Код Кардио", color: "#f15a5a", id: "codeCardio", maxPage: 6 },
  {
    case: "Желудочно-кишечные кровотечения",
    color: "#0b8dff",
    id: "gastrointestinalBleeding",
    maxPage: 4,
  },
];

export const listOfHospitals = [
  {
    case: "Актюбинская областная многопрофильная больница",
    color: "#972f2f",
    id: "aktyubinskaya",
  },
  {
    case: "Многопрофильная областная детская больница",
    color: "#922f97",
    id: "children's hospital",
  },
  {
    case: "Каргалинская районная больница",
    color: "#2f972f",
    id: "kargalinskaya",
  },
];

// ожоги
export const CONSCIOUSNESS_STATES = [
  { id: "1_1", label: "Ясное", name: "isClearConsciousness" },
  { id: "1_2", label: "Оглушение", name: "isStunning" },
  { id: "1_3", label: "Сопор", name: "isSopor" },
  { id: "1_4", label: "Кома", name: "isComa" },
];

export const BURN_TYPES = [
  { id: "2_1", label: "Термический", name: "isThermalBurn" },
  { id: "2_2", label: "Химический", name: "isChemicalBurn" },
  { id: "2_3", label: "Ингаляционный", name: "isInhalationBurn" },
  { id: "2_4", label: "Электрический", name: "isElectricBurn" },
];

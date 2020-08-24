import { Medication } from "./types";
import medicationsJson from "./medications.json";

const medications: Medication[] = medicationsJson;

const getMedications = () => {
  return medications;
};

const updateMedication = (
  parent: null,
  args: { medication: Medication },
  context,
  info
) => {
  const index = medications.findIndex((m) => m.id == args.medication.id);

  medications[index] = args.medication;

  return args.medication;
};

export const queries = {
  medications: getMedications,
};

export const mutations = {
  updateMedication,
};

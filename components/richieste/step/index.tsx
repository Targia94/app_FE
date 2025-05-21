import React from "react";
import { Steps } from "antd";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  NoSymbolIcon,
  PauseCircleIcon,
  QuestionMarkCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

// Nuova mappatura degli stati numerici
const statoMapping = {
  Creazione: 1,
  Annullato: 100,
  Rifiutato_L1: 15,
  Rifiutato_L2: 25,
  Accettato: 90,
  Necessarie_Informazioni_L1: 11,
  Necessarie_Informazioni_L2: 21,
  Informazioni_Fornite_L1: 13,
  Informazioni_Fornite_L2: 23,
  Approvato_L1: 19,
  Approvato_L2: 29,
  Richiesta_RDA_in_SAP: 50,
  Inserita_RDA_in_SAP: 55,
};

// Step definiti
const stepTitles = ["Creazione", "L1", "L2", "Procurement"];

// Stato icone e stati Ant Design
const statusMapping: Record<
  number,
  { icon: React.ReactNode; status: "wait" | "finish" | "process" | "error" }
> = {
  [statoMapping.Accettato]: { icon: <CheckCircleIcon width={30} color="green" />, status: "finish" },
  [statoMapping.Creazione]: { icon: <CheckCircleIcon width={30} color="green" />, status: "finish" },
  [statoMapping.Approvato_L1]: { icon: <CheckCircleIcon width={30} color="green" />, status: "finish" },
  [statoMapping.Approvato_L2]: { icon: <CheckCircleIcon width={30} color="green" />, status: "finish" },
  [statoMapping.Rifiutato_L1]: { icon: <XCircleIcon width={30} color="red" />, status: "error" },
  [statoMapping.Rifiutato_L2]: { icon: <XCircleIcon width={30} color="red" />, status: "error" },
  [statoMapping.Annullato]: { icon: <NoSymbolIcon width={30} color="red" />, status: "error" },
  [statoMapping.Necessarie_Informazioni_L1]: {
    icon: <QuestionMarkCircleIcon width={30} color="orange" />,
    status: "process",
  },
  [statoMapping.Necessarie_Informazioni_L2]: {
    icon: <QuestionMarkCircleIcon width={30} color="orange" />,
    status: "process",
  },
  [statoMapping.Richiesta_RDA_in_SAP]: {
    icon: <QuestionMarkCircleIcon width={30} color="orange" />,
    status: "process",
  },
  [statoMapping.Informazioni_Fornite_L1]: {
    icon: <ExclamationCircleIcon width={30} color="orange" />,
    status: "process",
  },
  [statoMapping.Inserita_RDA_in_SAP]: {
    icon: <ExclamationCircleIcon width={30} color="orange" />,
    status: "process",
  },
  [statoMapping.Informazioni_Fornite_L2]: {
    icon: <ExclamationCircleIcon width={30} color="orange" />,
    status: "process",
  }
};

// Stati di default per "process" e "wait"
const processState: { icon: React.ReactNode; status: "process" } = {
  icon: <PauseCircleIcon color="gold" width={30} />,
  status: "process",
};

const waitState: { icon: React.ReactNode; status: "wait" } = {
  icon: null,
  status: "wait",
};

// Mappa stato attuale allo step corretto
const mapStateToStepIndex = (state: number): number => {
  switch (state) {
    case statoMapping.Creazione:
      return 0;
    case statoMapping.Approvato_L1:
    case statoMapping.Rifiutato_L1:
    case statoMapping.Necessarie_Informazioni_L1:
    case statoMapping.Informazioni_Fornite_L1:
      return 1;
    case statoMapping.Approvato_L2:
    case statoMapping.Rifiutato_L2:
    case statoMapping.Necessarie_Informazioni_L2:
    case statoMapping.Informazioni_Fornite_L2:
      return 2;
    case statoMapping.Accettato:
    case statoMapping.Richiesta_RDA_in_SAP:
    case statoMapping.Inserita_RDA_in_SAP:
      return 3;
    default:
      return stepTitles.length; // Default all'ultimo step
  }
};

// Formatta la data
const formatDate = (date?: string): string => {
  if (!date) return "";
  const parsedDate = new Date(date);
  return parsedDate.toLocaleDateString("it-IT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

// Determina la descrizione per ogni step
const determineDescription = (
  index: number,
  currentStepIndex: number,
  currentState: number,
  currentDate?: string,
  currentFullName?: string,
  richiedente?: string,
  l1?: string,
  l2?: string,
): string => {
  const formattedDate = formatDate(currentDate);

  if (index === currentStepIndex) {
    switch (currentState) {
      case statoMapping.Creazione:
        return `Creata da ${richiedente} il ${formattedDate}`;
      case statoMapping.Approvato_L1:
      case statoMapping.Approvato_L2:
        return `Autorizzata da ${currentFullName} il ${formattedDate}`;
      case statoMapping.Accettato:
        return `Accettata il ${formattedDate}`;
      case statoMapping.Rifiutato_L1:
      case statoMapping.Rifiutato_L2:
        return `Rifiutata da ${currentFullName} il ${formattedDate}`;
      case statoMapping.Necessarie_Informazioni_L1:
      case statoMapping.Necessarie_Informazioni_L2:
        return `Info richieste da ${currentFullName} il ${formattedDate}`;
      case statoMapping.Informazioni_Fornite_L1:
      case statoMapping.Informazioni_Fornite_L2:
        return `Info fornite da ${currentFullName} il ${formattedDate}`;
      case statoMapping.Annullato:
        return `Annullata da ${currentFullName} il ${formattedDate}`;
      case statoMapping.Richiesta_RDA_in_SAP:
        return `Richiesta di inserimento in SAP da ${currentFullName} il ${formattedDate}`;
      case statoMapping.Inserita_RDA_in_SAP:
        return `Rda inserita in SAP da ${currentFullName} il ${formattedDate}`;
      default:
        return "";
    }
  }
  const isWaitingState =
  currentState === statoMapping.Creazione ||
  currentState === statoMapping.Approvato_L1 ||
  currentState === statoMapping.Approvato_L2;
  // Se il prossimo step è con icona PauseCircle, mostra "In attesa di gestione"
  if (index === currentStepIndex + 1 && isWaitingState) {
    if (index === 1) {
      return `In attesa che ${l1} gestisca la RDA`;
    } else if (index === 2) {
      return `In attesa che ${l2} gestisca la RDA`;
    }
  }

  return "";
};

// Determina lo stato dello step con la nuova logica
const determineStepStatus = (
  index: number,
  currentStepIndex: number,
  currentState: number
): { icon: React.ReactNode; status: "wait" | "finish" | "process" | "error" } => {

  if (currentState === statoMapping.Annullato) {
    return index === 0 ? statusMapping[statoMapping.Annullato] : waitState;
  }

  if (index < currentStepIndex) {
    return statusMapping[statoMapping.Accettato]; // Step completati
  }

  if (index === currentStepIndex) {
    return statusMapping[currentState] || processState; // Stato attuale
  }

  // Se lo stato attuale è "Necessarie Informazioni", il prossimo step sarà "wait"
  if (
    (currentState === statoMapping.Necessarie_Informazioni_L1
      || currentState === statoMapping.Necessarie_Informazioni_L2
      || currentState === statoMapping.Informazioni_Fornite_L1
      || currentState === statoMapping.Informazioni_Fornite_L2
    ) &&
    index === currentStepIndex + 1
  ) {
    return waitState;
  }

  // Se lo stato attuale è "Approvato" o "Creazione", il prossimo step sarà "process"
  if (
    (currentState === statoMapping.Approvato_L1 ||
      currentState === statoMapping.Approvato_L2 ||
      currentState === statoMapping.Creazione) &&
    index === currentStepIndex + 1
  ) {
    return processState;
  }

  return waitState; // Tutti gli altri futuri in "wait"
};

// **Componente principale DynamicSteps**
interface DynamicStepsProps {
  currentState: number; // Stato numerico attuale
  currentDate?: string;
  currentFullName?: string; // Data associata
  richiedente?: string;
  po?: string;
  l1?: string;
  l2?: string;
}

const DynamicSteps: React.FC<DynamicStepsProps> = ({ currentState, currentDate, currentFullName, richiedente, po, l1, l2 }) => {
  const currentStepIndex = mapStateToStepIndex(currentState);

  let adjustedStepTitles = [...stepTitles];

  if (currentState === statoMapping.Annullato) {
    adjustedStepTitles[0] = "Annullato";
  }

  // Aggiunta dinamica dello step se lo stato è Accettato
  if (currentState === statoMapping.Accettato && po) {
    adjustedStepTitles.push(po);
  }

  const steps = adjustedStepTitles.map((title, index) => {
    let { icon, status } = determineStepStatus(index, currentStepIndex, currentState);
    const description = determineDescription(index, currentStepIndex, currentState, currentDate, currentFullName, richiedente, l1, l2);

    // Se è lo step dinamico PO, assegna stato e icona come gli stati Approvato
    if (po && title === po) {
      icon = <CheckCircleIcon width={30} color="green" />;
      status = "finish";
    }

    return { title, description, icon, status };
  });

  const currentStep = steps.findIndex((step) => step.status === "process");

  return (
    <Steps
      type="default"
      current={currentStep === -1 ? steps.length : currentStep}
      items={steps}
    />
  );
};

export default DynamicSteps;


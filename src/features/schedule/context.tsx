import { createContext, useContext, useState } from "react";

type ScheduleContext = {
  selectedDate: Date | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
};

const ScheduleContext = createContext<ScheduleContext | null>(null);

const ScheduleProvider = ({ children }: React.PropsWithChildren) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <ScheduleContext.Provider value={{ selectedDate, setSelectedDate }}>
      {children}
    </ScheduleContext.Provider>
  );
};

const useScheduleContext = () => {
  const context = useContext(ScheduleContext);

  if (!context) {
    throw new Error(
      "useScheduleContext must be used within a ScheduleProvider",
    );
  }

  return context;
};

export { ScheduleProvider, useScheduleContext };

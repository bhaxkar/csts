import { useState, useEffect, createContext, useContext } from "react";
import { Notification } from "../utils/Notification";
import type { Ticket, TicketStatus } from "../Model";

interface TicketContextType {
  ticketData: Ticket[];
  setTicketData: React.Dispatch<React.SetStateAction<Ticket[]>>;
  addTicket: (values: Ticket) => void;
  deleteTicket: (ticketId: string | undefined) => void;
  updateTicket: (
    ticketId: string | undefined,
    updatedStatus: TicketStatus,
    Note: string
  ) => void;
  deleteNote: (ticketId: string | undefined, noteId: string ) => void
}
export const TicketContext = createContext<TicketContextType | undefined>(
  undefined
);

interface TicketContextProviderProps {
  children: React.ReactNode;
}
const fetchTicketDataFromLocalStorage = (): Ticket[] => {
  const savedTickets = localStorage.getItem("tickets");
  if (!savedTickets) {
    return [];
  } else {
    return JSON.parse(savedTickets);
  }
};

export const TicketContextProvider: React.FC<TicketContextProviderProps> = ({
  children,
}: TicketContextProviderProps) => {
  const tickets = fetchTicketDataFromLocalStorage();
  const [ticketData, setTicketData] = useState<Ticket[]>(tickets);

  useEffect(() => {
    localStorage.setItem("tickets", JSON.stringify(ticketData));
  }, [ticketData]);

  const addTicket = (values: Ticket) => {
    const newTicket = {
      ...values,
      ticketId: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    };
    setTicketData((prevTickets) => [...prevTickets, newTicket]);
  };

  const deleteTicket = (ticketId: string | undefined) => {
    if (!ticketId) return;
    const updatedTicketData = ticketData.filter(
      (item) => item.ticketId != ticketId
    );
    setTicketData(updatedTicketData);
    Notification(`Ticket successfully deleted`);
  };

  const updateTicket = (
    ticketId: string | undefined,
    updatedStatus: TicketStatus,
    noteTitle: string
  ): void => {
    setTicketData((prev: Ticket[]) =>
      prev.map((item: Ticket) =>
        item.ticketId === ticketId
          ? {
              ...item,
              status: updatedStatus,
              isTicketUpdated: true,
              notes: [
                ...(item.notes || []),
                {
                  NoteId: Date.now().toString(),
                  NoteTitle: noteTitle,
                  NoteCreatedDate: new Date().toISOString().split("T")[0],
                },
              ],
              updatedDate: new Date().toISOString().split("T")[0],
            }
          : item
      )
    );
    Notification(`Ticket updated successfully`);
  };

  const deleteNote = (ticketId: string | undefined, noteId: string): void => {
    if (!ticketId) return;
    setTicketData((prev: Ticket[]) =>
      prev.map((item: Ticket) =>
        item.ticketId === ticketId
          ? {
              ...item,
              notes: item.notes?.filter((note) => note.NoteId !== noteId) || [],
            }
          : item
      )
    );
    Notification(`Note deleted successfully`);
  };

  return (
    <TicketContext.Provider
      value={{
        ticketData,
        setTicketData,
        addTicket,
        deleteTicket,
        updateTicket,
        deleteNote,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};

export const useTicket = () => {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error("useTicket must be used within a TicketContextProvider");
  }
  return context;
};

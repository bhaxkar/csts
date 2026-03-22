import { useTicket } from "../Context/TicketContext";

interface TicketAnalytics {
  totalNoOfTicket: number;
  noOfTicketWithLowPriority: number;
  noOfticketWithMediumPriority: number;
  noOfticketWithHighPriority: number;
  noOfTicketWithOpenStatus: number;
  noOfTicketWithResolvedStatus: number;
  noOfTicketWithInProgressStatus: number;
}

export const useTicketAnalytics = (): TicketAnalytics => {
  const { ticketData } = useTicket();
  const totalNoOfTicket = ticketData.length;

  const getNoOfTicketBasedOnPriority = (priority: string): number => {
    return ticketData.filter((item) => item.priority === priority).length;
  };
  const noOfTicketWithLowPriority = getNoOfTicketBasedOnPriority("Low");
  const noOfticketWithMediumPriority = getNoOfTicketBasedOnPriority("Medium");
  const noOfticketWithHighPriority = getNoOfTicketBasedOnPriority("High");

  const getNoOfTicketBasedOnStatus = (status: string): number => {
    return ticketData.filter((item) => item.status === status).length;
  };

  const noOfTicketWithOpenStatus = getNoOfTicketBasedOnStatus("Open");
  const noOfTicketWithResolvedStatus = getNoOfTicketBasedOnStatus("Resolved");
  const noOfTicketWithInProgressStatus =
    getNoOfTicketBasedOnStatus("In Progress");

  return {
    totalNoOfTicket,
    noOfTicketWithLowPriority,
    noOfticketWithMediumPriority,
    noOfticketWithHighPriority,
    noOfTicketWithOpenStatus,
    noOfTicketWithResolvedStatus,
    noOfTicketWithInProgressStatus,
  };
};

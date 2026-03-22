import type { Ticket } from "../Model.ts";

const TicketCard: React.FC<Ticket> = ({
  ticketId,
  date,
  time,
  title,
  description,
  priority,
  status,
}: Ticket) => {
  return (
    <div className="w-full min-h-48 h-full flex flex-col justify-between bg-surface border-1 border-secondary-border rounded-md shadow-sm">
      <div className="flex flex-col">
        <p className="text-sm border-b-1 text-secondary-text border-primary-border font-mono px-3 py-1">
          Ticket ID : {ticketId}
        </p>
        <div className="border-b-1 border-primary-border text-secondary-text flex justify-between gap-6">
          <p className="text-sm font-figtree px-3 py-1">Date : {date}</p>
          <p className="text-sm font-figtree px-3 py-1">Time : {time}</p>
        </div>
      </div>
      <div>
        <p className="text-base text-secondary-text font-figtree px-3 pt-3">
          {title}
        </p>
        <p className="text-xs p-3 text-tertiary-text font-figtree leading-4">
          {description}
        </p>
      </div>
      <div className="flex justify-between px-3 py-3">
        <span
          className={`px-2 md:px-4 lg:px-6 py-0.5 rounded-full text-[#ffffff] text-sm font-mono ${
            status === "Open"
              ? "bg-red-500"
              : status === "In Progress"
              ? "bg-orange-600"
              : "bg-green-500"
          }`}
        >
          {status}
        </span>

        <span
          className={`px-2 md:px-4 lg:px-6 py-0.5 rounded-full text-[#ffffff] text-sm font-mono ${
            priority === "High"
              ? "bg-red-600"
              : priority === "Medium"
              ? "bg-orange-400"
              : "bg-green-600"
          }`}
        >
          {priority}
        </span>
      </div>
    </div>
  );
};

export default TicketCard;

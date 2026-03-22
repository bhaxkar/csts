import { useState } from "react";
import type { TicketStatus } from "../Model";
import type { Ticket } from "../Model";
import Button from "./Common/Button";
import Dropdown from "./Common/Dropdown";
import { useTicket } from "../Context/TicketContext";
import { FaPaperPlane } from "react-icons/fa6";

interface TicketUpdateProps {
  ticket: Ticket;
  setIsUpdateModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TicketUpdate = ({ ticket, setIsUpdateModelOpen }: TicketUpdateProps) => {

  const { updateTicket } = useTicket();
  const [addNote, setaddNote] = useState<string>("");
  const [updatedStatus, setUpdatedStatus] = useState<TicketStatus>(
    ticket.status
  );

  return (
    <div className="w-full max-w-2xl mx-auto bg-model shadow-md rounded-2xl border border-secondary-border py-2 my-1">
      <div className="px-6">
        <div>
          <p className="text-sm text-tertiary-text font-mono py-1">
            <span className="font-medium text-secondary-text">Ticket Id:</span>{" "}
            {ticket.ticketId}
          </p>
          <p className="text-sm text-tertiary-text font-mono py-1">
            <span className="font-medium text-secondary-text">Created At:</span>{" "}
            {ticket.date}
          </p>
          <p className="text-sm text-tertiary-text font-mono py-1">
            <span className="font-medium text-secondary-text">Updated At:</span>{" "}
            {ticket.isTicketUpdated ? (
              ticket.updatedDate
            ) : (
              <span className="italic text-red-400">Not Updated Yet</span>
            )}
          </p>
          <p className="text-sm text-tertiary-text font-mono py-1">
            <span className="font-medium text-secondary-text">Priority:</span>{" "}
            <span
              className={`px-2 md:px-4 lg:px-6 py-0.5 rounded-full text-[#ffffff] text-sm ${
                ticket.priority === "High"
                  ? "bg-red-500"
                  : ticket.priority === "Medium"
                  ? "bg-orange-400"
                  : "bg-green-600"
              }`}
            >
              {ticket.priority}
            </span>
          </p>
        </div>

        <div className="py-2">
          <p className="text-base font-figtree text-secondary-text">
            {ticket.title}
          </p>
          <p className="text-sm font-figtree text-tertiary-text py-1">{ticket.description}</p>
        </div>

        <div className="py-1">
          <Dropdown
            label={"Select Status"}
            name="status"
            val={updatedStatus}
            onChange={(e) => setUpdatedStatus(e.target.value as TicketStatus)}
            option1_label="Open"
            option1_value="Open"
            option2_label="In Progress"
            option2_value="In Progress"
            option3_label="Resolved"
            option3_value="Resolved"
          />
        </div>

        <div className="py-2">
          <label
            htmlFor="note"
            className="block text-sm text-primary-text px-2 mb-2"
          >
            Add a Note:
          </label>
          <textarea
            name="note"
            id="note"
            value={addNote}
            onChange={(e) => setaddNote(e.target.value)}
            rows={4}
            className="w-full  text-secondary-text placeholder:text-secondary-text border border-primary-border px-4 py-2 rounded-lg resize-none outline-none"
            placeholder="Write your note here..."
          ></textarea>
        </div>
      </div>

      <div className="flex justify-center px-6">
        <Button
          type="submit"
          label="Submit"
          icon={<FaPaperPlane />}
          onPress={() => (
            updateTicket(ticket.ticketId, updatedStatus, addNote),
            setIsUpdateModelOpen(false)
          )}
        ></Button>
      </div>
    </div>
  );
};

export default TicketUpdate;

import { useState } from "react";
import type { Ticket } from "../Model";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTicket } from "../Context/TicketContext.tsx";
import Header from "../Components/Common/Header.tsx";
import Model from "../Components/Common/Model.tsx";
import Button from "../Components/Common/Button.tsx";
import TicketUpdate from "../Components/TicketUpdate.tsx";
import { IoTicketSharp } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { MdUpdate, MdDeleteForever } from "react-icons/md";

const TicketDetails: React.FC = () => {
  const { ticketId } = useParams<string>();
  const { ticketData, deleteTicket, deleteNote } = useTicket();
  const [isUpdateModelOpen, setIsUpdateModelOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const ticket = ticketData.find((item: Ticket) => {
    return item.ticketId == ticketId;
  });

  return (
    <div>
      <Header
        pageName={`/ticket/${ticketId}`}
        button={{
          btntype: "button",
          btnLabel: "Go to Dashboard",
          btnIcon: <MdOutlineDashboardCustomize />,
          onPress: () => navigate("/dashboard"),
        }}
      ></Header>

      {ticket ? (
        <>
          <Model
            title={`/ticket/update-ticket`}
            isOpen={isUpdateModelOpen}
            onClose={() => setIsUpdateModelOpen(false)}
          >
            <TicketUpdate
              ticket={ticket}
              setIsUpdateModelOpen={setIsUpdateModelOpen}
            />
          </Model>

          <div className="w-full px-1 sm:px-3 mb-4">
            <div className="max-w-xl mx-auto w-full bg-surface rounded-md shadow-md py-4 px-2 sm:px-4">
              <div>
                <div className="flex flex-col">
                  <p className="text-sm border-b-1 text-secondary-text border-primary-border font-mono px-2 sm:px-3 py-2 flex items-center gap-2">
                    <span className="text-lg sm:text-xl">
                      <IoTicketSharp />
                    </span>{" "}
                    Ticket ID : {ticket.ticketId}
                  </p>
                  <div className="border-b-1 border-primary-border text-secondary-text flex justify-between gap-6">
                    <p className="text-sm font-mono px-3 py-1">
                      Date : {ticket.date}
                    </p>
                    <p className="text-sm font-mono px-3 py-1">
                      Time : {ticket.time}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between px-3 py-3">
                  <span
                    className={`px-2 md:px-4 lg:px-6 py-0.5 rounded-full text-[#ffffff] text-sm font-mono ${
                      ticket.status === "Open"
                        ? "bg-red-500"
                        : ticket.status === "In Progress"
                        ? "bg-orange-400"
                        : "bg-green-600"
                    }`}
                  >
                    {ticket.status}
                  </span>

                  <span
                    className={`px-2 md:px-4 lg:px-6 py-0.5 rounded-full text-[#ffffff] text-sm font-mono ${
                      ticket.priority === "High"
                        ? "bg-red-500"
                        : ticket.priority === "Medium"
                        ? "bg-orange-400"
                        : "bg-green-600"
                    }`}
                  >
                    {ticket.priority}
                  </span>
                </div>

                <div>
                  <p className="text-base text-secondary-text font-figtree px-3 pt-3">
                    {ticket.title}
                  </p>
                  <p className="text-sm p-3 text-tertiary-text font-figtree leading-4">
                    {ticket.description}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-tertiary-text font-mono px-3 py-3">
                    <span className="font-medium text-secondary-text">
                      Updated At:
                    </span>{" "}
                    {ticket.isTicketUpdated ? (
                      ticket.updatedDate
                    ) : (
                      <span className="italic text-red-400">
                        Not Updated Yet
                      </span>
                    )}
                  </p>
                </div>

                {ticket.notes?.length ? (
                  <>
                    <p className="font-medium font-mono text-secondary-text px-3 py-2">
                      Notes :
                    </p>

                    <div className="flex flex-col gap-3 px-3">
                      {ticket?.notes.map((item) => {
                        return item.NoteTitle ? (
                          <div
                            key={item.NoteId}
                            className="bg-card-primary py-2 px-2 sm:px-4 flex flex-col gap-3 rounded-md shadow-md"
                          >
                            <p className="text-sm font-mono  py-1 border-b-1 border-primary-border text-secondary-text">
                              Date : {item.NoteCreatedDate}
                            </p>

                            <div className="flex gap-4 justify-between items-center">
                              <p className="text-tertiary-text text-sm font-figtree">
                                {item.NoteTitle}
                              </p>
                              <span
                                className="text-2xl text-primary-text cursor-pointer"
                                onClick={() =>
                                  deleteNote(ticket.ticketId, item.NoteId)
                                }
                              >
                                <MdDeleteForever />
                              </span>
                            </div>
                          </div>
                        ) : (
                          <p className="text-red-400 text-xs italic">
                            No Notes avilable
                          </p>
                        );
                      })}
                    </div>
                  </>
                ) : null}
              </div>

              <div className="flex flex-row gap-3 justify-center md:justify-end pt-6">
                <Button
                  type="button"
                  label="Update"
                  icon={<MdUpdate />}
                  onPress={() => setIsUpdateModelOpen(true)}
                ></Button>

                <Button
                  type="button"
                  label="Delete"
                  icon={<MdDeleteForever />}
                  onPress={() => deleteTicket(ticketId)}
                ></Button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="px-6 flex flex-col items-center">
          <p className="w-full rounded-md shadow-lg bg-surface my-10 py-3 text-base sm:text-lg md:text-2xl text-center text-primary-text font-mono">
            Ticket does not exist
          </p>

          <Link
            to="/"
            className="bg-btn-bg hover:bg-btn-hover-bg px-6 py-2 rounded-md shadow-md cursor-pointer text-sm font-medium text-btn-text font-mono flex gap-4 items-center"
          >
            <IoHomeOutline className="text-xl" /> Go to Home Page
          </Link>
        </div>
      )}
    </div>
  );
};

export default TicketDetails;

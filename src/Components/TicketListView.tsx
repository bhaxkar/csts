import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CSVLink } from "react-csv";
import { FaFileCsv } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import { IoMdRefreshCircle } from "react-icons/io";
import Pagination from "./Common/Pagination.tsx";
import type { Ticket, TicketStatus, TicketPriority } from "../Model.ts";
import { FaEye, FaSortAmountDown, FaSortAmountDownAlt } from "react-icons/fa";
import { useTicket } from "../Context/TicketContext.tsx";

const TicketListItem: React.FC = () => {
  const { ticketData, deleteTicket } = useTicket();
  const [callback, setCallBack] = useState<(a: Ticket, b: Ticket) => number>(() => () => 0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isPrioritySorted, setIsPrioritySorted] = useState(false);
  const [isStatusSorted, setIsStatusSorted] = useState(false);

  const priorityOrder: Record<TicketPriority, number> = {
    Low: 1,
    Medium: 2,
    High: 3,
  };
  const sortByPriorityInAsc = () => {
    setCallBack(
      () => (a: Ticket, b: Ticket) =>
        priorityOrder[a.priority] - priorityOrder[b.priority]
    );
    setIsPrioritySorted(!isPrioritySorted);
  };
  const sortByPriorityInDsc = () => {
    setCallBack(
      () => (a: Ticket, b: Ticket) =>
        priorityOrder[b.priority] - priorityOrder[a.priority]
    );
    setIsPrioritySorted(!isPrioritySorted);
  };

  const statusOrder: Record<TicketStatus, number> = {
    Open: 1,
    "In Progress": 2,
    Resolved: 3,
  };
  const sortByStatusInAsc = () => {
    setCallBack(
      () => (a: Ticket, b: Ticket) =>
        statusOrder[a.status] - statusOrder[b.status]
    );
    setIsStatusSorted(!isStatusSorted);
  };
  const sortByStatusInDsc = () => {
    setCallBack(
      () => (a: Ticket, b: Ticket) =>
        statusOrder[b.status] - statusOrder[a.status]
    );
    setIsStatusSorted(!isStatusSorted);
  };

  const resetTableData = () => {
    setCallBack(() => () => 0);
    setIsStatusSorted(false);
    setIsPrioritySorted(false);
    setCurrentPage(1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [ticketData]);

  const itemsPerPage = 15;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const sortedTickets = [...ticketData].sort(callback);
  const currentItems = sortedTickets.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="hidden sm:block mt-6 mx-2">
      {!ticketData.length ? (
        <div>
          <p className="w-full rounded-md shadow-lg bg-surface py-3 my-10 text-center text-base sm:text-lg md:text-2xl text-primary-text font-mono">
            No Ticket Found
          </p>
        </div>
      ) : (
        <div>
          <div className="bg-surface border-1 border-primary-border rounded-t-md text-primary-text flex justify-between items-center py-2">
            <p className="text-xl px-2 font-mono">All Tickets List</p>
            <div>
              <CSVLink data={ticketData}>
                {" "}
                <p className="text-3xl px-2 cursor-pointer inline-block">
                  <FaFileCsv />
                </p>
              </CSVLink>
              <p
                className="text-4xl px-2 cursor-pointer inline-block"
                onClick={() => resetTableData()}
              >
                <IoMdRefreshCircle />
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-[640px] w-full border border-primary-border text-left text-sm">
              <thead className="bg-surface">
                <tr>
                  <th className="px-4 py-2 text-primary-text font-semibold border border-primary-border">
                    Ticket ID
                  </th>
                  <th className="min-w-[21ch] md:min-w-[28ch] px-4 py-2 text-primary-text font-semibold border border-primary-border">
                    Title
                  </th>

                  <th
                    className="px-2 py-2 text-primary-text border border-primary-border 
                font-semibold text-sm md:text-base"
                  >
                    <span className="flex items-center justify-between gap-6">
                      Status
                      {!isStatusSorted ? (
                        <FaSortAmountDown
                          onClick={() => sortByStatusInDsc()}
                          className="text-primary-text text-lg"
                        />
                      ) : (
                        <FaSortAmountDownAlt
                          onClick={() => sortByStatusInAsc()}
                          className="text-primary-text text-lg"
                        />
                      )}
                    </span>
                  </th>

                  <th
                    className="px-2 py-2 text-primary-text border border-primary-border 
                font-semibold text-sm md:text-base"
                  >
                    <span className="flex items-center justify-between gap-6">
                      Priority
                      {!isPrioritySorted ? (
                        <FaSortAmountDown
                          onClick={() => sortByPriorityInDsc()}
                          className="text-primary-text text-lg"
                        />
                      ) : (
                        <FaSortAmountDownAlt
                          onClick={() => sortByPriorityInAsc()}
                          className="text-primary-text text-lg"
                        />
                      )}
                    </span>
                  </th>

                  <th className="px-4 py-2 text-primary-text border border-primary-border">
                    Date
                  </th>
                  <th className="px-4 py-2 text-primary-text border border-primary-border">
                    View Details
                  </th>
                  <th className="px-4 py-2 text-primary-text border border-primary-border">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.sort(callback).map((item: Ticket) => (
                  <tr
                    key={item.ticketId}
                    className="odd:bg-model even:bg-surface"
                  >
                    <td className="px-4 py-2 border-1 text-secondary-text border-primary-border">
                      {item.ticketId}
                    </td>
                    <td className="px-4 py-2 border-1 text-secondary-text border-primary-border">
                      {item.title}
                    </td>
                    <td className="px-4 py-2 border-1 text-secondary-text border-primary-border">
                      {item.status}
                    </td>
                    <td className="px-4 py-2 border-1 text-secondary-text border-primary-border">
                      {item.priority}
                    </td>
                    <td className="px-4 py-2 border-1 text-secondary-text border-primary-border">
                      {item.date}
                    </td>
                    <td className="px-12 py-2 border-1 border-primary-border text-xl text-btn-bg hover:text-btn-hover-bg">
                      <Link
                        className="cursor-pointer"
                        to={`/ticket/${item.ticketId}`}
                      >
                        <FaEye />
                      </Link>
                    </td>
                    <td className="px-8 py-2 border border-primary-border text-xl text-btn-bg hover:text-btn-hover-bg">
                      <button
                        className="cursor-pointer"
                        onClick={() => deleteTicket(item.ticketId)}
                      >
                        <MdDeleteForever />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {ticketData.length > itemsPerPage && (
            <Pagination
              totalItem={ticketData.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            ></Pagination>
          )}
        </div>
      )}
    </div>
  );
};

export default TicketListItem;

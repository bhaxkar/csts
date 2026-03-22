import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import type { Ticket } from "../Model";
import { IoAddCircle } from "react-icons/io5";
import { useTicket } from "../Context/TicketContext";
import Modal from "../Components/Common/Model";
import TicketForm from "../Components/TicketForm";
import TicketCard from "../Components/TicketCard";
import SearchTicket from "../Components/SearchTicket";
import FilterTicket from "../Components/FilterTicket";
import TicketStatistics from "../Components/TicketStatistics";
import Header from "../Components/Common/Header";
import Pagination from "../Components/Common/Pagination";

const Dashboard: React.FC = () => {
  const { ticketData } = useTicket();
  const [filteredTicketData, setFilteredTicketData] = useState<Ticket[]>(ticketData);
  const [isDashboardModalOpen, setIsDashboardModalOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    setFilteredTicketData(ticketData);
    setCurrentPage(1);
  }, [ticketData]);

  const itemsPerPage = 9;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredTicketData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // const searchTicketBasedOnPriorityAndStatus = (
  //   priority: string,
  //   status: string
  // ) => {
  //   const result = ticketData.filter((item) => {
  //     const priorityMatch = priority === "All" || item.priority === priority;
  //     const statusMatch = status === "All" || item.status === status;
  //     return priorityMatch && statusMatch;
  //   });

  //   setFilteredTicketData(result);
  // };

  return (
    <div>
      <Modal
        title={`/dashboard/raise-ticket`}
        isOpen={isDashboardModalOpen}
        onClose={() => setIsDashboardModalOpen(false)}
      >
        <TicketForm />
      </Modal>

      <div>
        <Header
          pageName="/dashboard"
          message="Welcome, Bhaskar!"
          button={{
            btntype: "button",
            btnLabel: "Raise a ticket",
            btnIcon: <IoAddCircle />,
            onPress: () => setIsDashboardModalOpen(true),
          }}
        ></Header>

        <SearchTicket setFilteredTicketData={setFilteredTicketData} />
        <TicketStatistics />
        <FilterTicket setFilteredTicketData={setFilteredTicketData} setCurrentPage={setCurrentPage} />

        <div>
          {!filteredTicketData.length ? (
            <div>
              <p className="w-full rounded-md shadow-lg bg-surface py-3 my-10 text-center text-base sm:text-lg md:text-2xl text-primary-text font-mono">
                No Ticket Found
              </p>
            </div>
          ) : (
            <div className="grid place-self-center md:place-self-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-1 sm:px-2 py-4">
              {" "}
              {currentItems.map((item: Ticket) => {
                return (
                  <Link
                    key={item.ticketId}
                    className="w-full"
                    to={`/ticket/${item.ticketId}`}
                  >
                    <TicketCard
                      ticketId={item.ticketId}
                      date={item.date}
                      time={item.time}
                      title={item.title}
                      description={item.description}
                      status={item.status}
                      priority={item.priority}
                      isTicketUpdated={item.isTicketUpdated}
                    />
                  </Link>
                );
              })}{" "}
            </div>
          )}

          {filteredTicketData.length > itemsPerPage && (
            <Pagination
              totalItem={filteredTicketData.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            ></Pagination>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

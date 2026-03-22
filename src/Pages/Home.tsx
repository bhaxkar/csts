import { useState } from "react";
import { IoAddCircle } from "react-icons/io5";
import Modal from "../Components/Common/Model";
import Header from "../Components/Common/Header";
import TicketForm from "../Components/TicketForm";
import TicketListView from "../Components/TicketListView";
import TicketStatistics from "../Components/TicketStatistics";
import TicketAnalytics from "../Components/TicketAnalytics";

const Home: React.FC = () => {
  const [isHomePageModalOpen, setIsHomePageModalOpen] =
    useState<boolean>(false);
  return (
    <div>
      <Modal
        title={`/home/raise-ticket`}
        isOpen={isHomePageModalOpen}
        onClose={() => setIsHomePageModalOpen(false)}
      >
        <TicketForm />
      </Modal>
      <div>
        <Header
          pageName="/home"
          message="Welcome, Bhaskar!"
          button={{
            btntype: "button",
            btnLabel: "Raise a ticket",
            btnIcon: <IoAddCircle />,
            onPress: () => setIsHomePageModalOpen(true),
          }}
        ></Header>
        <div className="block md:hidden">
          <TicketStatistics />
        </div>
        <TicketAnalytics />
        <TicketListView />
      </div>
    </div>
  );
};

export default Home;

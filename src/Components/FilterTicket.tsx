import { useState } from "react";
import type { Ticket } from "../Model";
import Dropdown from "./Common/Dropdown";
import Button from "./Common/Button";
import { IoFilter } from "react-icons/io5";
import { useTicket } from "../Context/TicketContext";

interface FilterTicketProps {
  setFilteredTicketData: React.Dispatch<React.SetStateAction<Ticket[]>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const FilterTicket: React.FC<FilterTicketProps> = ({
  setFilteredTicketData, setCurrentPage
}: FilterTicketProps) => {
  const [priority, setPriority] = useState<string>("All");
  const [status, setStatus] = useState<string>("All");
  const { ticketData } = useTicket();

  const searchTicketBasedOnPriorityAndStatus = (
    priority: string = "All",
    status: string = "All"
  ) => {
    if (priority === "All" && status === "All") {
      setFilteredTicketData(ticketData);
    } else if (status === "All") {
      const result = ticketData.filter((item) => item.priority == priority);
      setFilteredTicketData(result);
    } else if (priority === "All") {
      const result = ticketData.filter((item) => item.status == status);
      setFilteredTicketData(result);
    } else {
      const result = ticketData.filter(
        (item) => item.priority == priority && item.status == status
      );
      setFilteredTicketData(result);
    }
    setCurrentPage(1);
  };

  return (
    <div className="w-full flex flex-col md:flex-row items-center md:justify-end md:gap-2 my-4 md:pr-2 lg:pr-4">
      <div className="flex gap-4 md:gap-2 ">
        <Dropdown
          label={"Select Priority"}
          name="priority"
          val={priority}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setPriority(e.target.value)
          }
          option1_label="All"
          option1_value="All"
          option2_label="Low"
          option2_value="Low"
          option3_label="Medium"
          option3_value="Medium"
          option4_label="High"
          option4_value="High"
        ></Dropdown>

        <Dropdown
          label={"Select Status"}
          name="status"
          val={status}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setStatus(e.target.value)
          }
          option1_label="All"
          option1_value="All"
          option2_label="Open"
          option2_value="Open"
          option3_label="In Progress"
          option3_value="In Progress"
          option4_label="Resolved"
          option4_value="Resolved"
        ></Dropdown>
      </div>

      <div className="mt-2 md:mt-6">
        <Button
          type="button"
          label="Apply Filter"
          icon={<IoFilter />}
          onPress={() => searchTicketBasedOnPriorityAndStatus(priority, status)}
        ></Button>
      </div>
    </div>
  );
};

export default FilterTicket;

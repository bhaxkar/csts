import { TbWorldQuestion } from "react-icons/tb";
import { GiProgression } from "react-icons/gi";
import { GoIssueClosed } from "react-icons/go";
import { AiOutlineIssuesClose } from "react-icons/ai";
import { useTicketAnalytics } from "../utils/useTicketAnalytics";

const TicketStatistics: React.FC = () => {
  const {
    totalNoOfTicket,
    noOfTicketWithOpenStatus,
    noOfTicketWithResolvedStatus,
    noOfTicketWithInProgressStatus,
  } = useTicketAnalytics();

  return (
    <div className="bg-card-primary rounded-md shadow-md px-2 sm:px-4 md:px-6 py-4 mx-1 sm:mx-2">
      <p className="text-xl md:text-2xl font-semibold text-primary-text font-figtree pb-4">
        Ticket Statistics
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
        <div className="bg-card-secondary border-1 border-secondary-border text-tertiary-text rounded-lg shadow-md px-2 md:px-4 lg:px-6 py-2">
          <div className="w-full flex justify-between items-center gap-2">
            <p className="font-inter font-medium text-sm md:text-base">
              All Issues
            </p>
            <TbWorldQuestion className="text-xl md:text-2xl" />
          </div>

          <p className="pt-7 font-medium">{totalNoOfTicket}</p>
        </div>

        <div className="bg-card-secondary border-1 border-secondary-border text-tertiary-text rounded-lg shadow-md px-2 md:px-4 lg:px-6 py-2">
          <div className="w-full flex justify-between items-center gap-2">
            <p className="font-inter font-medium text-sm md:text-base">Open</p>
            <AiOutlineIssuesClose className="text-xl sm:text-2xl" />
          </div>
          <p className="pt-7 font-medium">{noOfTicketWithOpenStatus}</p>
        </div>

        <div className="bg-card-secondary border-1 border-secondary-border text-tertiary-text rounded-lg shadow-md px-2 md:px-4 lg:px-6 py-2">
          <div className="w-full flex justify-between items-center gap-2">
            <p className="font-inter font-medium text-sm md:text-base">
              In Progress
            </p>
            <GiProgression className="text-xl sm:text-2xl" />
          </div>
          <p className="pt-7 font-medium">{noOfTicketWithInProgressStatus}</p>
        </div>

        <div className="bg-card-secondary border-1 border-secondary-border text-tertiary-text rounded-lg shadow-md px-2 md:px-4 lg:px-6 py-2">
          <div className="w-full flex justify-between items-center gap-2">
            <p className="font-inter font-medium text-sm md:text-base">
              Resolved
            </p>
            <GoIssueClosed className="text-xl sm:text-2xl" />
          </div>
          <p className="pt-7  font-medium">{noOfTicketWithResolvedStatus}</p>
        </div>
      </div>
    </div>
  );
};

export default TicketStatistics;

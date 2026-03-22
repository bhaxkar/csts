import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import { useTicketAnalytics } from "../utils/useTicketAnalytics";
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const TicketAnalytics = () => {
  const {
    totalNoOfTicket,
    noOfTicketWithLowPriority,
    noOfticketWithMediumPriority,
    noOfticketWithHighPriority,
    noOfTicketWithOpenStatus,
    noOfTicketWithResolvedStatus,
    noOfTicketWithInProgressStatus,
  } = useTicketAnalytics();

  const PriorityDataForPieChart = {
    labels: ["Low", "Medium", "High"],
    datasets: [
      {
        label: `No of Tickets`,
        data: [
          noOfTicketWithLowPriority,
          noOfticketWithMediumPriority,
          noOfticketWithHighPriority,
        ],
        backgroundColor: ["#1E90FF", "#28A745", "#FFC107"],
        hoverOffset: 4,
      },
    ],
  };

  const PriorityDataForBarGraph = {
    labels: ["All", "Low", "Medium", "High"],
    datasets: [
      {
        label: "No of Tickets",
        data: [
          totalNoOfTicket,
          noOfTicketWithLowPriority,
          noOfticketWithMediumPriority,
          noOfticketWithHighPriority,
        ],
        backgroundColor: "#FFC300",
      },
    ],
  };

  const StatusDataForPieChart = {
    labels: ["Open", "Resolved", "In Progress"],
    datasets: [
      {
        label: `No of Tickets`,
        data: [
          noOfTicketWithOpenStatus,
          noOfTicketWithResolvedStatus,
          noOfTicketWithInProgressStatus,
        ],
        backgroundColor: ["#20C997", "#6F42C1", "#FD7E14"],
        hoverOffset: 4,
      },
    ],
  };

  const StatusDataForBarGraph = {
    labels: ["All", "Open", "Resolved", "In Progress"],
    datasets: [
      {
        label: "No of Tickets",
        data: [
          totalNoOfTicket,
          noOfTicketWithOpenStatus,
          noOfTicketWithResolvedStatus,
          noOfTicketWithInProgressStatus,
        ],
        backgroundColor: "#E63946",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        labels: {
          color: "#0565ff",
          font: {
            size: 12,
            family: "monospace",
          },
        },
      },
    },
  };

  return (
    <div className="md:bg-card-primary md:rounded-lg md:shadow-lg px-2 sm:px-4 py-2 sm:mx-2">
      <p className="text-xl md:text-2xl font-semibold text-primary-text font-figtree pb-4">
        Ticket Analytics
      </p>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="w-full bg-card-secondary rounded-md shadow-md relative h-64 p-2">
          <Pie data={PriorityDataForPieChart} options={chartOptions} />
        </div>

        <div className="w-full bg-card-secondary rounded-md shadow-md relative h-64 p-2">
          <Pie data={StatusDataForPieChart} options={chartOptions} />
        </div>

        <div className="w-full bg-card-secondary rounded-md shadow-md relative h-64 p-2">
          <Bar data={PriorityDataForBarGraph} options={chartOptions} />
        </div>

        <div className="w-full bg-card-secondary rounded-md shadow-md relative h-64 p-2">
          <Bar data={StatusDataForBarGraph} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default TicketAnalytics;

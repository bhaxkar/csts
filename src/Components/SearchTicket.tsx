import { useState } from "react";
import type { Ticket } from "../Model";
import { FaSearch } from "react-icons/fa";
import { useTicket } from "../Context/TicketContext";

interface SearchTicketProps {
  setFilteredTicketData: React.Dispatch<React.SetStateAction<Ticket[]>>;
}

const SearchTicket: React.FC<SearchTicketProps> = ({
  setFilteredTicketData,
}: SearchTicketProps) => {
  const { ticketData } = useTicket();
  const [searchText, setSearchText] = useState<string>("");

  const searchTicketBasedOnTitle = (searchText: string) => {
    if (!searchText.trim()) {
      setFilteredTicketData(ticketData);
      return;
    }
    const result = ticketData.filter(
      // (item) => item.title.toLowerCase().trim() === searchText.toLowerCase().trim()
      (item) => item.title.toLowerCase().includes(searchText.toLowerCase().trim())
    );
    setFilteredTicketData(result);
    setSearchText("");
  };

  return (
    <form
      className="w-full flex justify-center px-2 md:px-0 pb-4"
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        searchTicketBasedOnTitle(searchText);
      }}
    >
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Serach Ticket By Title"
        className="max-w-lg w-full border-2 border-primary-border rounded-l-xl outline-none px-2 md:px-4 py-1 placeholder:font-figtree placeholder:text-sm md:placeholder:text-base text-primary-text placeholder:text-primary-text"
      />

      <button
        type="submit"
        className=" text-btn-text bg-btn-bg hover:bg-btn-hover-bg cursor-pointer p-3 border-r-0 rounded-r-xl flex items-center"
      >
        <span className="h-full text-2xl font-bold inline-block">
          <FaSearch />
        </span>
      </button>
    </form>
  );
};

export default SearchTicket;

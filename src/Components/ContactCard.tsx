import { GoIssueClosed } from "react-icons/go";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";

const ContactCard: React.FC = () => {
  return (
    <div className="max-w-xl w-full mx-auto font-figtree bg-surface text-secondary-text rounded-lg shadow-md px-3 md:px-6">
      <div className="w-full h-full flex flex-col justify-around">
        <div className="w-full">
          <p className="text-2xl md:text-3xl font-sans font-medium pt-3">
            Have an issue ?
          </p>
          <p className="text-xl md:text-2xl font-sans font-medium py-1">
            Let's Talk
          </p>
        </div>

        <div className="w-full py-3">
          <p className="text-xs md:text-sm py-2 ">
            <GoIssueClosed className="inline-block" /> Fast, focused, and
            friendly support.
          </p>
          <p className="text-xs md:text-sm">
            <GoIssueClosed className="inline-block" /> We'll respond in 24 hours
            fast & focused
          </p>
          <p className="text-xs md:text-sm py-2">
            <GoIssueClosed className="inline-block" /> Real people, real support
            — no bots.
          </p>
        </div>

        <div className="w-full flex gap-3 py-4">
          <FaLinkedin className="text-2xl" />
          <FaSquareInstagram className="text-2xl" />
          <FaSquareXTwitter className="text-2xl" />
        </div>
      </div>
    </div>
  );
};

export default ContactCard;

import { Formik, Form, Field, type FormikHelpers } from "formik";
import * as Yup from "yup";
import type { Ticket } from "../Model";
import Button from "./Common/Button";
import { FaPaperPlane } from "react-icons/fa";
import { useTicket } from "../Context/TicketContext";
import { Notification } from "../utils/Notification";

const initialValues: Ticket = {
  ticketId: "",
  title: "",
  description: "",
  priority: "Low",
  status: "Open",
  date: "",
  time: "",
  isTicketUpdated: false,
};

const validationSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must not exceed 100 characters"),

  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must not exceed 1000 characters"),

  priority: Yup.mixed<"Low" | "Medium" | "High">()
    .oneOf(["Low", "Medium", "High"], "Priority must be Low, Medium, or High")
    .required("Priority is required"),

  status: Yup.mixed<"Open" | "In Progress" | "Resolved">()
    .oneOf(
      ["Open", "In Progress", "Resolved"],
      "Status must be Open, In Progress, or Resolved"
    )
    .required("Status is required"),
});

const TicketForm: React.FC = () => {
  const { addTicket } = useTicket();

  const handleSubmit = (
    values: Ticket,
    actions: FormikHelpers<Ticket>
  ): void => {
    addTicket(values);
    Notification("Ticket Raised Successfully");
    actions.resetForm();
  };

  return (
    <Formik<Ticket>
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ touched, errors, isSubmitting }) => (
        <Form className="w-full bg-model flex flex-col gap-1 md:gap-3 md:px-6 my-2 md:my-5 p-2">
          <p className="text-xl text-primary-text font-mono">
            Raise a Ticket
          </p>
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-3">
            <div className="w-full">
              <label className="block font-mono font-medium py-1 text-primary-text">
                Enter Title
              </label>
              <Field
                type="text"
                name="title"
                placeholder="Enter Title"
                className="w-full text-tertiary-text placeholder:text-tertiary-text border border-primary-border rounded-lg px-4 py-2 focus:outline-none"
              />
              {touched.title && errors.title && (
                <div className="text-red-500 text-sm">{errors.title}</div>
              )}
            </div>

            <div className="w-full">
              <label className="block font-medium py-1 font-mono  text-primary-text">
                {" "}
                Select Status
              </label>
              <Field
                as="select"
                name="status"
                className="w-full bg-model text-tertiary-text placeholder:text-tertiary-text border border-primary-border rounded-lg px-4 py-2 focus:outline-none"
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </Field>
              {errors.status && touched.status && (
                <div className="text-red-500 text-sm">{errors.status}</div>
              )}
            </div>

            <div className="w-full">
              <label className="block font-mono font-medium py-1  text-primary-text">
                Select Priority
              </label>
              <Field
                as="select"
                name="priority"
                className="w-full bg-model text-tertiary-text placeholder:text-tertiary-text border border-primary-border rounded-lg px-4 py-2 focus:outline-none"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </Field>
              {errors.priority && touched.priority && (
                <div className="text-red-500 text-sm">{errors.priority}</div>
              )}
            </div>
          </div>

          <div className="w-full">
            <label className="block font-medium py-1 font-mono text-primary-text">
              Enter Description
            </label>
            <Field
              as="textarea"
              name="description"
              placeholder="Enter Description"
              className="w-full text-tertiary-text placeholder:text-tertiary-text border border-primary-border rounded-lg px-4 py-2 focus:outline-none"
            />
            {touched.description && errors.description && (
              <div className="text-red-500 text-sm">{errors.description}</div>
            )}
          </div>


         <div className="w-fit mx-auto">
          <Button label={isSubmitting ? "Saving..." : "Submit"} icon={<FaPaperPlane/>} disabled={isSubmitting} type="submit"></Button>
         </div>
        </Form>
      )}
    </Formik>
  );
};

export default TicketForm;

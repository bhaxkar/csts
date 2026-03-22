import * as Yup from "yup";
import { Formik, Form, Field, type FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { FaPaperPlane } from "react-icons/fa";
import Header from "../Components/Common/Header";
import Button from "../Components/Common/Button";
import ContactCard from "../Components/ContactCard";
import { Notification } from "../utils/Notification";
import { MdOutlineDashboardCustomize } from "react-icons/md";

type ContactFormData = Record<"email" | "name" | "message", string>;

const initialValues: ContactFormData = {
  email: "",
  name: "",
  message: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(30, "Name must not exceed 30 characters"),
  message: Yup.string()
    .required("Message is required")
    .min(10, "Message must be at least 10 characters")
    .max(250, "Message must not exceed 1000 characters"),
});

const Contact: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (
    values: ContactFormData,
    actions: FormikHelpers<ContactFormData>
  ): void => {
    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        values,
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        }
      )
      .then(
        () => {
          Notification("Message sent successfully");
          actions.resetForm();
        },
        (error) => {
          console.log("FAILED...", error.text);
          Notification("Something went wrong");
        }
      );
  };
  return (
    <div>
      <div>
        <Header
          pageName="/contact"
          button={{
            btntype: "button",
            btnLabel: "Go to Dashboard",
            btnIcon: <MdOutlineDashboardCustomize />,
            onPress: () => navigate("/dashboard"),
          }}
        ></Header>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-2 px-2 sm:px-4 pb-4">
          <ContactCard />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ touched, errors, isSubmitting }) => (
              <Form className="max-w-xl w-full mx-auto bg-surface font-figtree px-2 md:px-4 py-6 rounded-lg shadow-md flex flex-col gap-4">
                <div>
                  <Field
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    className="w-full text-tertiary-text placeholder:text-tertiary-text border border-primary-border rounded-lg px-4 py-2 focus:outline-none"
                  />
                  {touched.name && errors.name && (
                    <div className="text-red-500 text-xs px-3">
                      {errors.name}
                    </div>
                  )}
                </div>

                <div>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="w-full text-tertiary-text placeholder:text-tertiary-text border border-primary-border rounded-lg px-4 py-2 focus:outline-none"
                  />
                  {touched.email && errors.email && (
                    <div className="text-red-500 text-xs px-3">
                      {errors.email}
                    </div>
                  )}
                </div>

                <div>
                  <Field
                    as="textarea"
                    name="message"
                    cols="50"
                    placeholder="Enter message"
                    className="w-full text-tertiary-text placeholder:text-tertiary-text border border-primary-border rounded-lg px-4 py-2 focus:outline-none resize-none"
                  />
                  {touched.message && errors.message && (
                    <div className="text-red-500 text-xs px-3">
                      {errors.message}
                    </div>
                  )}
                </div>

                <Button
                  label={isSubmitting ? "Sending..." : "Send Message"}
                  icon={<FaPaperPlane />}
                  disabled={isSubmitting}
                  type="submit"
                ></Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Contact;

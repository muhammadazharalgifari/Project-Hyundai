"use client";

import { useState, useEffect } from "react";
import { useActionState } from "react";
import { ContactMessage } from "@/lib/actions";
import { Send, User, Mail, Tag, MessageSquare } from "lucide-react";

type UserProps = {
  id?: string;
  name?: string | null;
  email?: string | null;
} | null;

const ContactForm = ({ user }: { user: UserProps }) => {
  const [state, formAction] = useActionState(ContactMessage, null);
  const [formValues, setFormValues] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
    subject: "",
    message: "",
  });

  const [showMessage, setShowMessage] = useState(false);

  const isFormValid =
    formValues.name.trim() !== "" &&
    formValues.email.trim() !== "" &&
    formValues.subject.trim() !== "" &&
    formValues.message.trim() !== "";

  useEffect(() => {
    if (state?.message || state?.error?.general) {
      setShowMessage(true);
      const timer = setTimeout(() => setShowMessage(false), 5000);

      if (state?.message) {
        setFormValues({
          name: user?.name ?? "",
          email: user?.email ?? "",
          subject: "",
          message: "",
        });
      }

      return () => clearTimeout(timer);
    }
  }, [state?.message, state?.error?.general, user?.name, user?.email]);

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-lg">
      {showMessage && state?.error?.general && (
        <div
          className="p-4 mb-4 text-sm text-red-700 rounded-lg bg-red-100"
          role="alert"
        >
          <div className="font-medium">{state.error.general}</div>
        </div>
      )}
      {showMessage && state?.message && (
        <div
          className="p-4 mb-4 text-sm text-green-700 rounded-lg bg-green-100"
          role="alert"
        >
          <div className="font-medium">{state.message}</div>
        </div>
      )}
      
      <form action={formAction}>
        <div className="text-center mb-6 space-y-2">
          <h1 className="text-5xl md:text-4xl font-bold text-gray-900">
            Get In{" "}
            <span className="bg-gradient-to-r from-indigo-500 to-indigo-800 bg-clip-text text-transparent">
              Touch.
            </span>
          </h1>
          <p className="text-gray-500 text-sm">
            If you have any criticism or suggestions, Please contact us.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-7">
          {/* Fullname */}
          <div>
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3">
              <User className="text-gray-400 w-5 h-5 mr-2" />
              <input
                type="text"
                name="name"
                value={formValues.name}
                onChange={(e) =>
                  setFormValues({ ...formValues, name: e.target.value })
                }
                className="bg-transparent p-3 w-full font-light focus:outline-none"
                placeholder="Fullname*"
              />
            </div>
            <div aria-live="polite" aria-atomic="true">
              <p className="text-sm text-red-500 mt-2">{state?.error?.name}</p>
            </div>
          </div>

          {/* Email */}
          <div>
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3">
              <Mail className="text-gray-400 w-5 h-5 mr-2" />
              <input
                type="email"
                name="email"
                value={formValues.email}
                onChange={(e) =>
                  setFormValues({ ...formValues, email: e.target.value })
                }
                className="bg-transparent p-3 w-full font-light focus:outline-none"
                placeholder="Example@gmail.com*"
              />
            </div>
            <div aria-live="polite" aria-atomic="true">
              <p className="text-sm text-red-500 mt-2">{state?.error?.email}</p>
            </div>
          </div>

          {/* Subject */}
          <div className="md:col-span-2">
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3">
              <Tag className="text-gray-400 w-5 h-5 mr-2" />
              <input
                type="text"
                name="subject"
                value={formValues.subject}
                onChange={(e) =>
                  setFormValues({ ...formValues, subject: e.target.value })
                }
                className="bg-transparent p-3 w-full font-light focus:outline-none"
                placeholder="Subject*"
              />
            </div>
            <div aria-live="polite" aria-atomic="true">
              <p className="text-sm text-red-500 mt-2">
                {state?.error?.subject}
              </p>
            </div>
          </div>

          {/* Message */}
          <div className="md:col-span-2">
            <div className="flex items-start bg-gray-50 border border-gray-200 rounded-lg px-3">
              <MessageSquare className="text-gray-400 w-5 h-5 mt-3 mr-2" />
              <textarea
                rows={5}
                name="message"
                value={formValues.message}
                onChange={(e) =>
                  setFormValues({ ...formValues, message: e.target.value })
                }
                className="bg-transparent p-3 w-full font-light focus:outline-none"
                placeholder="Write Your Message*"
              ></textarea>
            </div>
            <div aria-live="polite" aria-atomic="true">
              <p className="text-sm text-red-500 mt-2">
                {state?.error?.message}
              </p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isFormValid}
          className={`px-10 py-4 font-semibold text-white w-full mt-6 rounded-lg flex items-center justify-center gap-2 transition-colors duration-300 ${
            isFormValid
              ? "bg-gradient-to-r from-indigo-500 to-indigo-800 hover:from-indigo-600 hover:to-indigo-900 cursor-pointer"
              : "bg-gray-500 cursor-not-allowed"
          }`}
        >
          <Send className="size-6" />
          {user ? "Send Message" : "Sign in to send message"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;

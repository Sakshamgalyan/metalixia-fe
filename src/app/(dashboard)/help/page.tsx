"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  HelpCircle,
  ChevronDown,
  MessageCircle,
} from "lucide-react";
import Typography from "@/components/UI/Typography";
import Button from "@/components/UI/Button";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How do I add a new employee?",
    answer:
      "Navigate to the 'Employees' page from the sidebar. Click on the 'Add Employee' button at the top right corner. Fill in the required details such as Name, Email, Role, and Post, then click 'Create Employee'.",
  },
  {
    question: "How do I approve new user registrations?",
    answer:
      "Go to the 'Approvals' page. You will see a list of users pending approval. Click the green checkmark icon to approve a user and promote them to an 'Employee' role. To reject/delete a user, click the red trash icon.",
  },
  {
    question: "How do I upload my monthly report?",
    answer:
      "Navigate to the 'Report Upload' page. Enter a name for your report (e.g., 'October 2023 Performance'), drag and drop your files into the upload area, and click 'Submit Report'. You can view your submission history on the same page.",
  },
  {
    question: "What file formats are supported for uploads?",
    answer:
      "We currently support PDF, Word documents (DOC/DOCX), Excel spreadsheets (XLS/XLSX), PowerPoint presentations, and basic text files. The maximum file size per file is 25MB.",
  },
  {
    question: "Who should I contact for technical issues?",
    answer:
      "For any technical issues or bugs, please contact the development team using the email or phone number provided in the 'Contact Developer' section on this page.",
  },
];

const FAQAccordion = ({ item }: { item: FAQItem }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden bg-white mb-3 shadow-sm hover:shadow-md transition-shadow">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-slate-50 transition-colors"
      >
        <Typography variant="p" className="font-medium text-slate-800">
          {item.question}
        </Typography>
        <ChevronDown
          className={`text-slate-400 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          size={20}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-4 pt-0 border-t border-slate-100/50 bg-slate-50/50">
              <Typography
                variant="p"
                className="text-slate-600 text-sm leading-relaxed"
              >
                {item.answer}
              </Typography>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ContactUsPage = () => {
  return (
    <div className="px-6 py-10 max-w-[90%] mx-auto">
      <div className="flex flex-col gap-1 mb-10">
        <Typography variant="h2">Help & Support</Typography>
        <Typography variant="p" className="text-slate-500">
          Find answers to common questions or get in touch with our team
        </Typography>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Section */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-[#707FDD]/10 rounded-lg text-[#707FDD]">
                <MessageCircle size={24} />
              </div>
              <Typography variant="h4">Contact Developer</Typography>
            </div>

            <Typography variant="p" className="text-slate-600 mb-6 text-sm">
              Need immediate assistance or found a bug? Reach out to our
              development team directly.
            </Typography>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="text-slate-400 mt-1" size={18} />
                <div>
                  <Typography
                    variant="p"
                    className="text-sm font-medium text-slate-900"
                  >
                    Email Us
                  </Typography>
                  <a
                    href="mailto:saksham4503@gmail.com"
                    className="text-sm text-[#707FDD] hover:underline"
                  >
                    saksham4503@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="text-slate-400 mt-1" size={18} />
                <div>
                  <Typography
                    variant="p"
                    className="text-sm font-medium text-slate-900"
                  >
                    Call Us
                  </Typography>
                  <a
                    href="tel:+918053800541"
                    className="text-sm text-[#707FDD] hover:underline"
                  >
                    +91 8053800541
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <Button
                fullWidth
                variant="primary"
                onClick={() =>
                  (window.location.href = "mailto:saksham4503@gmail.com")
                }
              >
                Contact Support
              </Button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle className="text-slate-400" size={20} />
            <Typography variant="h4">Dashboard Guide</Typography>
          </div>

          <div className="space-y-2">
            {faqs.map((faq, index) => (
              <FAQAccordion key={index} item={faq} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;

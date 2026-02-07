"use client";

import { useEffect, useState } from "react";
import { Send, AlignLeft, FileText as FileIcon } from "lucide-react";
import { toast } from "sonner";
import Typography from "@/components/UI/Typography";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import FileUpload from "@/components/UI/FileUpload";
import TextArea from "@/components/UI/TextArea";
import {
  EmailProvider,
  useEmailDispatch,
  useEmailState,
} from "@/context/Email";
import {
  getEmailHistoryApi,
  getTemplatesApi,
  sendEmailApi,
} from "@/context/Email/api";
import EmailHistoryList from "./EmailHistoryList";
import EmailTemplateList from "./EmailTemplateList";
import { useAppSelector } from "@/store/hooks";

const SendEmailContent = () => {
  const dispatch = useEmailDispatch();
  const { history, historyLoading, templates, templatesLoading, sendLoading } =
    useEmailState();
  const { user } = useAppSelector((state) => state.auth);
  const employeeId = user?.employeeId;

  const [emailData, setEmailData] = useState({
    to: "",
    subject: "",
    message: "",
  });
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    if (employeeId) {
      getEmailHistoryApi(dispatch, employeeId);
      getTemplatesApi(dispatch);
    }
  }, [dispatch, employeeId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setEmailData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTemplateSelect = (template: any) => {
    setEmailData((prev) => ({
      ...prev,
      subject: template.subject,
      message: template.body,
    }));
  };

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!employeeId) {
      toast.error("Employee ID is missing");
      return;
    }

    if (!emailData.to || !validateEmail(emailData.to)) {
      toast.error("Please enter a valid recipient email");
      return;
    }
    if (!emailData.subject.trim()) {
      toast.error("Please enter a subject");
      return;
    }
    if (!emailData.message.trim()) {
      toast.error("Please enter a message");
      return;
    }

    const formData = new FormData();
    formData.append("to", emailData.to);
    formData.append("subject", emailData.subject);
    formData.append("message", emailData.message);
    formData.append("employeeId", employeeId);

    files.forEach((file) => {
      formData.append("attachments", file);
    });

    const success = await sendEmailApi(dispatch, formData);

    if (success) {
      setEmailData({ to: "", subject: "", message: "" });
      setFiles([]);
      getEmailHistoryApi(dispatch, employeeId);
    }
  };

  return (
    <div className="px-3 py-4 max-w-[95%] mx-auto">
      <div className="flex flex-col gap-1 mb-5">
        <Typography variant="h2">Send Email</Typography>
        <Typography variant="p" className="text-slate-500">
          Compose and send valid emails to employees or clients
        </Typography>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side: Compose Email */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex gap-4">
                <Input
                  name="to"
                  value={emailData.to}
                  onChange={handleChange}
                  placeholder="recipient@example.com"
                  required
                  label="To"
                  fullWidth
                />
                <Input
                  name="subject"
                  value={emailData.subject}
                  onChange={handleChange}
                  placeholder="Email Subject"
                  required
                  label="Subject"
                  fullWidth
                />
              </div>

              <TextArea
                name="message"
                value={emailData.message}
                onChange={handleChange}
                rows={6}
                label={
                  <div className="flex items-center gap-2">
                    <AlignLeft size={16} /> Message
                  </div>
                }
                placeholder="Write your message here..."
                required
              />

              <FileUpload
                value={files}
                onChange={setFiles}
                maxSize={10}
                label={
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                    <FileIcon size={16} /> Attachments
                  </div>
                }
              />

              <div className="flex justify-end pt-2">
                <Button
                  type="submit"
                  isLoading={sendLoading}
                  loadingText="Sending..."
                  leftIcon={<Send size={18} />}
                  className="min-w-[150px]"
                >
                  Send Email
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Side: History & Templates */}
        <div className="lg:col-span-1 space-y-6">
          {/* Templates Section */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <EmailTemplateList
              templates={templates}
              isLoading={templatesLoading}
              onSelect={handleTemplateSelect}
            />
          </div>

          {/* History Section */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <EmailHistoryList
              history={history.data}
              isLoading={historyLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const SendEmailView = () => (
  <EmailProvider>
    <SendEmailContent />
  </EmailProvider>
);

export default SendEmailView;

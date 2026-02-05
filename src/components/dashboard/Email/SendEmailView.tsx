"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Send,
  Mail,
  Type,
  AlignLeft,
  FileText as FileIcon,
} from "lucide-react";
import Typography from "@/components/UI/Typography";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import FileUpload from "@/components/UI/FileUpload";

const SendEmailView = () => {
  const [emailData, setEmailData] = useState({
    to: "",
    subject: "",
    message: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [sending, setSending] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setEmailData((prev) => ({ ...prev, [name]: value }));
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

    setSending(true);
    // Mock API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success("Email sent successfully!");
    setEmailData({ to: "", subject: "", message: "" });
    setFiles([]);
    setSending(false);
  };

  return (
    <div className="px-6 py-10 max-w-[90%] mx-auto">
      <div className="flex flex-col gap-1 mb-8">
        <Typography variant="h2">Send Email</Typography>
        <Typography variant="p" className="text-slate-500">
          Compose and send valid emails to employees or clients
        </Typography>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex  gap-4">
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

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <AlignLeft size={16} /> Message
            </label>
            <textarea
              name="message"
              value={emailData.message}
              onChange={handleChange}
              rows={8}
              className="w-full px-4 py-3 text-sm text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#707FDD]/20 focus:border-[#707FDD] transition-all"
              placeholder="Write your message here..."
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <FileIcon size={16} /> Attachments
            </label>
            <FileUpload
              value={files}
              onChange={setFiles}
              maxSize={10}
            />
          </div>

          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              isLoading={sending}
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
  );
};

export default SendEmailView;

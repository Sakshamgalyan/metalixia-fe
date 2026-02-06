"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Typography from "@/components/UI/Typography";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";

const ContactView = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Mock API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success("Message sent! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
    setSending(false);
  };

  return (
    <div className="px-6 py-10 max-w-6xl mx-auto">
      <div className="flex flex-col gap-1 mb-10 text-center">
        <Typography variant="h2">Get in Touch</Typography>
        <Typography variant="p" className="text-slate-500">
          We'd love to hear from you. Please fill out this form.
        </Typography>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#1a1f37] text-white p-8 rounded-2xl h-full flex flex-col justify-between">
            <div>
              <Typography variant="h4" className="mb-6 text-white">
                Contact Information
              </Typography>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Phone className="text-[#707FDD]" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-slate-400 text-sm">+91 8053800541</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="text-[#707FDD]" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-slate-400 text-sm">
                      saksham4503@gmail.com
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="text-[#707FDD]" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-slate-400 text-sm">
                      1st Floor, Sector 4, Gurugram, Haryana, India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-10">
              <div className="w-32 h-32 bg-[#707FDD]/20 rounded-full blur-3xl absolute bottom-0 left-0 pointer-events-none"></div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
              />
              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
              />
            </div>

            <Input
              label="Subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="How can we help?"
              required
            />

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-3 text-sm text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#707FDD]/20 focus:border-[#707FDD] transition-all resize-none"
                placeholder="Tell us more about your inquiry..."
                required
              />
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                isLoading={sending}
                loadingText="Sending..."
                rightIcon={<Send size={18} />}
                className="min-w-[150px]"
              >
                Send Message
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactView;

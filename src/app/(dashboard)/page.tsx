"use client";

import Typography from "@/components/UI/Typography";
import { Construction, Rocket } from "lucide-react";

const Home = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
      <div className="relative mb-8">
        <div className="absolute -inset-4 bg-indigo-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="bg-white p-6 rounded-full shadow-lg relative z-10">
          <Rocket className="w-12 h-12 text-[#707FDD]" />
        </div>
      </div>

      <Typography variant="h1" margin="sm" className="bg-gradient-to-r from-[#707FDD] to-[#a3adf3] bg-clip-text text-transparent">
        Coming Soon
      </Typography>

      <Typography variant="h5" textColor="#64748b" className="max-w-md mx-auto">
        We're working hard to bring you something amazing. Stay tuned for updates!
      </Typography>

      <div className="mt-12 flex gap-4">
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-lg text-slate-600 text-sm font-medium">
          <Construction className="w-4 h-4" />
          <span>Under Development</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
"use client";

import { useState, useEffect } from "react";
import {
  Maximize2,
  Mic,
  MicOff,
  MoreVertical,
  Radio,
  RotateCw,
  ZoomIn,
  ZoomOut,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Typography from "@/components/UI/Typography";
import Button from "@/components/UI/Button";
import Chips from "@/components/UI/Chips";
import Dropdown from "@/components/UI/DropDown";

const mockCameras = [
  {
    id: 1,
    name: "Production Line A",
    status: "Live",
    location: "Factory Floor 1",
  },
  { id: 2, name: "Loading Dock B", status: "Live", location: "Warehouse Ext" },
  {
    id: 3,
    name: "Assembly Unit 4",
    status: "Maintenance",
    location: "Factory Floor 2",
  },
  { id: 4, name: "Main Entrance", status: "Live", location: "Gate 1" },
];

const CameraFeedView = () => {
  const [selectedLayout, setSelectedLayout] = useState("Grid 2x2");
  const [selectedCam, setSelectedCam] = useState<number | null>(null);

  const layouts = [
    { label: "Grid 2x2", value: "Grid 2x2" },
    { label: "Split 1+3", value: "Split 1+3" },
    { label: "Full Screen", value: "Full Screen" },
  ];

  // Mock live indicator blink
  const [blink, setBlink] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => setBlink((b) => !b), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col p-6 max-w-[1600px] mx-auto gap-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <Typography variant="h2" className="flex items-center gap-3">
            Security Monitor
            <span
              className={`w-3 h-3 rounded-full ${blink ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]" : "bg-red-900"} transition-colors duration-300`}
            />
          </Typography>
          <p className="text-slate-500 text-sm mt-1">
            System Status: Optimal • 4/4 Cameras Online
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Dropdown
            options={layouts}
            value={selectedLayout}
            onChange={(val) => setSelectedLayout(val as string)}
            placeholder="Layout"
            className="w-40"
          />
          <Button variant="outline" leftIcon={<RotateCw size={16} />}>
            Cycle Views
          </Button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
        {/* Camera Grid */}
        <div className="col-span-12 lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-4 h-full auto-rows-fr">
          {mockCameras.map((cam) => (
            <div
              key={cam.id}
              className={`
                                relative bg-black rounded-xl overflow-hidden group border-2 transition-all
                                ${selectedCam === cam.id ? "border-[#707FDD]" : "border-transparent"}
                            `}
              onClick={() => setSelectedCam(cam.id)}
            >
              {/* Mock Video Feed Background */}
              <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
                {/* Simulated Noise/Feed content */}
                <div className="text-slate-700 font-mono text-6xl opacity-20 select-none">
                  CAM {cam.id}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"></div>
              </div>

              {/* Overlay UI */}
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-red-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                  <div
                    className={`w-1.5 h-1.5 rounded-full bg-white ${blink ? "opacity-100" : "opacity-50"}`}
                  ></div>
                  REC
                </span>
                <span className="bg-black/60 text-white text-xs px-2 py-0.5 rounded backdrop-blur-sm font-mono">
                  {new Date().toLocaleTimeString()}
                </span>
              </div>

              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                <button className="p-1.5 bg-black/50 text-white rounded hover:bg-black/70">
                  <MicOff size={16} />
                </button>
                <button className="p-1.5 bg-black/50 text-white rounded hover:bg-black/70">
                  <Maximize2 size={16} />
                </button>
                <button className="p-1.5 bg-black/50 text-white rounded hover:bg-black/70">
                  <MoreVertical size={16} />
                </button>
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <div>
                  <h3 className="text-white font-medium text-sm drop-shadow-md">
                    {cam.name}
                  </h3>
                  <p className="text-slate-300 text-xs drop-shadow-md">
                    {cam.location}
                  </p>
                </div>
                <Chips
                  label={cam.status}
                  colorScheme={cam.status === "Live" ? "success" : "warning"}
                  size="sm"
                  className="!bg-black/60 !backdrop-blur border-none !text-white"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Controls */}
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-6 h-full overflow-y-auto">
          {/* PTZ Controls */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <Typography variant="h5" className="mb-4 flex items-center gap-2">
              <Radio size={18} className="text-[#707FDD]" />
              PTZ Controls
            </Typography>

            <div className="bg-slate-50 rounded-lg p-6 flex flex-col items-center gap-4 relative">
              {/* D-Pad */}
              <div className="grid grid-cols-3 gap-2 w-32">
                <div></div>
                <button className="bg-white p-2 rounded shadow-sm hover:bg-slate-100 active:bg-slate-200 flex justify-center border border-slate-200">
                  <ChevronUp size={20} />
                </button>
                <div></div>

                <button className="bg-white p-2 rounded shadow-sm hover:bg-slate-100 active:bg-slate-200 flex justify-center border border-slate-200">
                  <ChevronLeft size={20} />
                </button>
                <button className="bg-[#707FDD] text-white p-2 rounded shadow-sm active:scale-95 flex justify-center items-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </button>
                <button className="bg-white p-2 rounded shadow-sm hover:bg-slate-100 active:bg-slate-200 flex justify-center border border-slate-200">
                  <ChevronRight size={20} />
                </button>

                <div></div>
                <button className="bg-white p-2 rounded shadow-sm hover:bg-slate-100 active:bg-slate-200 flex justify-center border border-slate-200">
                  <ChevronDown size={20} />
                </button>
                <div></div>
              </div>

              <div className="flex gap-4 w-full justify-center mt-2">
                <button className="flex-1 bg-white py-2 rounded shadow-sm border border-slate-200 text-xs font-medium flex flex-col items-center gap-1 hover:bg-slate-50">
                  <ZoomIn size={16} /> Zoom In
                </button>
                <button className="flex-1 bg-white py-2 rounded shadow-sm border border-slate-200 text-xs font-medium flex flex-col items-center gap-1 hover:bg-slate-50">
                  <ZoomOut size={16} /> Zoom Out
                </button>
              </div>
            </div>
          </div>

          {/* Camera List */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex-1">
            <Typography variant="h5" className="mb-4">
              Details
            </Typography>
            <div className="space-y-3">
              {mockCameras.map((cam) => (
                <div
                  key={cam.id}
                  className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-100"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-2 h-2 rounded-full ${cam.status === "Live" ? "bg-green-500" : "bg-orange-500"}`}
                    ></div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-slate-700">
                        {cam.name}
                      </span>
                      <span className="text-xs text-slate-500">
                        IP: 192.168.1.10{cam.id}
                      </span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="h-8 text-xs">
                    Config
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CameraFeedView;

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
  Settings,
} from "lucide-react";
import Typography from "@/components/UI/Typography";
import Button from "@/components/UI/Button";
import Chips from "@/components/UI/Chips";
import Dropdown from "@/components/UI/DropDown";
import Modal from "@/components/UI/Modal";
import Input from "@/components/UI/Input";

interface Camera {
  id: number;
  name: string;
  status: string;
  location: string;
  streamUrl?: string; // e.g. http://192.168.1.64/ISAPI/Streaming/channels/102/httpPreview
  ptzUrl?: string; // e.g. http://192.168.1.64/ISAPI/PTZCtrl/channels/1/continuous
  username?: string;
  password?: string;
}

const initialCameras: Camera[] = [
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
  const [cameras, setCameras] = useState<Camera[]>(initialCameras);

  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [editingCamId, setEditingCamId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<Camera>>({});

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

  const openConfig = (cam: Camera) => {
    setEditingCamId(cam.id);
    setEditForm(cam);
    setIsConfigOpen(true);
  };

  const handleSaveConfig = () => {
    setCameras((prev) =>
      prev.map((c) => (c.id === editingCamId ? { ...c, ...editForm } as Camera : c))
    );
    setIsConfigOpen(false);
  };

  const handlePTZ = async (action: string) => {
    if (!selectedCam) return;
    const cam = cameras.find((c) => c.id === selectedCam);
    if (!cam || !cam.ptzUrl) {
      console.log(`Simulated PTZ ${action} for camera ${selectedCam}`);
      return;
    }

    // Example Hikvision PTZ payload
    // Note: Due to CORS, this might fail in browser without a proxy backend
    let xmlPayload = "";
    if (["up", "down", "left", "right"].includes(action)) {
      const pan = action === "left" ? "-60" : action === "right" ? "60" : "0";
      const tilt = action === "up" ? "60" : action === "down" ? "-60" : "0";
      xmlPayload = `<?xml version="1.0" encoding="UTF-8"?><PTZData><pan>${pan}</pan><tilt>${tilt}</tilt></PTZData>`;
    } else if (["zoomin", "zoomout"].includes(action)) {
      const zoom = action === "zoomin" ? "60" : "-60";
      xmlPayload = `<?xml version="1.0" encoding="UTF-8"?><PTZData><zoom>${zoom}</zoom></PTZData>`;
    }

    try {
      const headers = new Headers();
      if (cam.username && cam.password) {
        headers.set('Authorization', 'Basic ' + btoa(cam.username + ":" + cam.password));
      }

      await fetch(cam.ptzUrl, {
        method: "PUT",
        headers,
        body: xmlPayload,
      });
    } catch (err) {
      console.error("PTZ Command failed", err);
    }
  };

  const getGridClass = () => {
    if (selectedLayout === "Full Screen") return "grid-cols-1";
    if (selectedLayout === "Split 1+3") return "grid-cols-2 lg:grid-cols-3";
    return "grid-cols-1 md:grid-cols-2";
  };

  const getCameraClass = (index: number) => {
    if (selectedLayout === "Full Screen") {
      return index === 0 ? "col-span-1 h-[600px]" : "hidden";
    }
    if (selectedLayout === "Split 1+3") {
      return index === 0
        ? "col-span-2 row-span-2 h-[400px] lg:h-full"
        : "col-span-1 h-[200px] lg:h-[calc(33.33%-0.66rem)]";
    }
    return "h-[300px] md:h-auto min-h-[250px]";
  };

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col p-6 max-w-[1600px] mx-auto gap-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-4">
        <div>
          <Typography variant="h2" className="flex items-center gap-3">
            Security Monitor
            <span
              className={`w-3 h-3 rounded-full ${blink ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]" : "bg-red-900"} transition-colors duration-300`}
            />
          </Typography>
          <p className="text-slate-500 text-sm mt-1">
            System Status: Optimal • {cameras.filter(c => c.status === "Live").length}/{cameras.length} Cameras Online
          </p>
        </div>

        <div className="flex items-center gap-3 z-10 relative">
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
        <div className={`col-span-12 lg:col-span-9 grid gap-4 h-[600px] lg:h-full auto-rows-fr ${getGridClass()}`}>
          {cameras.map((cam, index) => (
            <div
              key={cam.id}
              className={`
                                relative bg-black rounded-xl overflow-hidden group border-2 transition-all cursor-pointer shadow-md
                                ${selectedCam === cam.id ? "border-[#707FDD]" : "border-transparent"}
                                ${getCameraClass(index)}
                            `}
              onClick={() => setSelectedCam(cam.id)}
            >
              {/* Video Feed Content */}
              <div className="absolute inset-0 bg-slate-900 flex items-center justify-center overflow-hidden">
                {cam.streamUrl ? (
                  <img src={cam.streamUrl} alt={cam.name} className="w-full h-full object-contain bg-black" />
                ) : (
                  <>
                    <div className="text-slate-700 md:text-6xl text-4xl font-mono opacity-20 select-none">
                      CAM {cam.id}
                    </div>
                  </>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none"></div>
              </div>

              {/* Overlay UI */}
              <div className="absolute top-4 left-4 flex gap-2 pointer-events-none z-10">
                <span className="bg-red-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 shadow-sm">
                  <div
                    className={`w-1.5 h-1.5 rounded-full bg-white ${blink ? "opacity-100" : "opacity-50"}`}
                  ></div>
                  REC
                </span>
                <span className="bg-black/60 text-white text-xs px-2 py-0.5 rounded backdrop-blur-sm font-mono tracking-wider shadow-sm">
                  {new Date().toLocaleTimeString()}
                </span>
              </div>

              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2 z-20">
                <button className="p-2 bg-black/50 text-white rounded hover:bg-black/70 backdrop-blur" title="Mute">
                  <MicOff size={16} />
                </button>
                <button className="p-2 bg-black/50 text-white rounded hover:bg-black/70 backdrop-blur" title="Fullscreen">
                  <Maximize2 size={16} />
                </button>
                <button
                  className="p-2 bg-black/50 text-white rounded hover:bg-black/70 backdrop-blur"
                  onClick={(e) => { e.stopPropagation(); openConfig(cam); }}
                  title="Configure"
                >
                  <Settings size={16} />
                </button>
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end pointer-events-none z-10">
                <div>
                  <h3 className="text-white font-medium text-sm drop-shadow-md">
                    {cam.name}
                  </h3>
                  <p className="text-slate-300 text-xs drop-shadow-md">
                    {cam.location} {cam.streamUrl && "• Custom Stream"}
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
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-6 h-full overflow-y-auto pr-2 pb-6">
          {/* PTZ Controls */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm sticky top-0">
            <Typography variant="h5" className="mb-4 flex items-center gap-2">
              <Radio size={18} className="text-[#707FDD]" />
              PTZ Controls
            </Typography>

            <div className="bg-slate-50 rounded-lg p-4 flex flex-col items-center gap-4 relative">
              <div className="text-xs text-slate-500 text-center font-medium bg-white px-3 py-1 rounded shadow-sm">
                {selectedCam ? cameras.find(c => c.id === selectedCam)?.name : "Select a camera to control"}
              </div>
              {/* D-Pad */}
              <div className="grid grid-cols-3 gap-2 w-32 mt-2">
                <div></div>
                <button
                  onMouseDown={() => handlePTZ("up")}
                  onMouseUp={() => handlePTZ("stop")}
                  disabled={!selectedCam}
                  className="bg-white p-2.5 rounded-lg shadow-sm hover:bg-slate-100 active:bg-slate-200 flex justify-center border border-slate-200 disabled:opacity-50 transition-colors"
                >
                  <ChevronUp size={20} />
                </button>
                <div></div>

                <button
                  onMouseDown={() => handlePTZ("left")}
                  onMouseUp={() => handlePTZ("stop")}
                  disabled={!selectedCam}
                  className="bg-white p-2.5 rounded-lg shadow-sm hover:bg-slate-100 active:bg-slate-200 flex justify-center border border-slate-200 disabled:opacity-50 transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  disabled={!selectedCam}
                  className="bg-[#707FDD] text-white p-2.5 rounded-lg shadow-md active:scale-95 flex justify-center items-center disabled:opacity-50 transition-transform"
                >
                  <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                </button>
                <button
                  onMouseDown={() => handlePTZ("right")}
                  onMouseUp={() => handlePTZ("stop")}
                  disabled={!selectedCam}
                  className="bg-white p-2.5 rounded-lg shadow-sm hover:bg-slate-100 active:bg-slate-200 flex justify-center border border-slate-200 disabled:opacity-50 transition-colors"
                >
                  <ChevronRight size={20} />
                </button>

                <div></div>
                <button
                  onMouseDown={() => handlePTZ("down")}
                  onMouseUp={() => handlePTZ("stop")}
                  disabled={!selectedCam}
                  className="bg-white p-2.5 rounded-lg shadow-sm hover:bg-slate-100 active:bg-slate-200 flex justify-center border border-slate-200 disabled:opacity-50 transition-colors"
                >
                  <ChevronDown size={20} />
                </button>
                <div></div>
              </div>

              <div className="flex gap-3 w-full justify-center mt-3">
                <button
                  onMouseDown={() => handlePTZ("zoomin")}
                  onMouseUp={() => handlePTZ("stop")}
                  disabled={!selectedCam}
                  className="flex-1 bg-white py-2 rounded-lg shadow-sm border border-slate-200 text-xs font-medium flex flex-col items-center gap-1 hover:bg-slate-50 disabled:opacity-50 transition-colors"
                >
                  <ZoomIn size={16} className="text-slate-600" /> Zoom In
                </button>
                <button
                  onMouseDown={() => handlePTZ("zoomout")}
                  onMouseUp={() => handlePTZ("stop")}
                  disabled={!selectedCam}
                  className="flex-1 bg-white py-2 rounded-lg shadow-sm border border-slate-200 text-xs font-medium flex flex-col items-center gap-1 hover:bg-slate-50 disabled:opacity-50 transition-colors"
                >
                  <ZoomOut size={16} className="text-slate-600" /> Zoom Out
                </button>
              </div>
            </div>
          </div>

          {/* Camera List */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex-1">
            <Typography variant="h5" className="mb-4">
              Camera List
            </Typography>
            <div className="space-y-3">
              {cameras.map((cam) => (
                <div
                  key={cam.id}
                  className={`flex justify-between items-center p-3 rounded-lg border cursor-pointer transition-colors ${selectedCam === cam.id ? "bg-slate-50 border-[#707FDD] shadow-sm ring-1 ring-[#707FDD]/20" : "bg-white border-slate-100 hover:bg-slate-50"}`}
                  onClick={() => setSelectedCam(cam.id)}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`min-w-2.5 min-h-2.5 w-2.5 h-2.5 rounded-full ${cam.status === "Live" ? "bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]" : "bg-orange-500"}`}
                    ></div>
                    <div className="flex flex-col truncate max-w-[120px] lg:max-w-full xl:max-w-[140px]">
                      <span className="text-sm font-medium text-slate-700 truncate">
                        {cam.name}
                      </span>
                      <span className="text-xs text-slate-500 truncate mt-0.5">
                        {cam.streamUrl ? "Custom Stream" : `IP: 192.168.1.10${cam.id}`}
                      </span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 text-xs shrink-0 select-none"
                    onClick={(e) => {
                      e.stopPropagation();
                      openConfig(cam);
                    }}
                  >
                    <Settings size={14} className="mr-1 inline" /> Config
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Config Modal */}
      <Modal
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
        title="Camera Configuration"
        width="lg"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsConfigOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveConfig} className="bg-[#707FDD] hover:bg-[#5b6ac0]">Save Changes</Button>
          </>
        }
      >
        <div className="flex flex-col gap-5 py-2">
          <Input
            label="Camera Name"
            value={editForm.name || ""}
            onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
            placeholder="e.g. Production Line A"
          />
          <Input
            label="Location"
            value={editForm.location || ""}
            onChange={(e) => setEditForm(prev => ({ ...prev, location: e.target.value }))}
            placeholder="e.g. Factory Floor 1"
          />
          <div className="border-t border-slate-200 pt-5 mt-2">
            <Typography variant="h6" className="mb-4 text-slate-800 flex items-center gap-2">
              <Radio size={18} className="text-[#707FDD]" /> Stream Settings
            </Typography>
            <div className="mb-4">
              <Input
                label="Stream URL (MJPEG)"
                value={editForm.streamUrl || ""}
                onChange={(e) => setEditForm(prev => ({ ...prev, streamUrl: e.target.value }))}
                placeholder="http://[ip]/ISAPI/Streaming/channels/102/httpPreview"
                className="mb-1"
              />
              <p className="text-xs relative -top-1 px-1 text-slate-500">For Hikvision cameras, use the HTTP ISAPI preview stream which directly renders in browser grids.</p>
            </div>

            <Input
              label="PTZ Control URL (Optional)"
              value={editForm.ptzUrl || ""}
              onChange={(e) => setEditForm(prev => ({ ...prev, ptzUrl: e.target.value }))}
              placeholder="http://[ip]/ISAPI/PTZCtrl/channels/1/continuous"
            />
            <div className="grid grid-cols-2 gap-4 mt-5">
              <Input
                label="Username (HTTP Basic Auth)"
                value={editForm.username || ""}
                onChange={(e) => setEditForm(prev => ({ ...prev, username: e.target.value }))}
                placeholder="admin"
              />
              <Input
                label="Password"
                type="password"
                value={editForm.password || ""}
                onChange={(e) => setEditForm(prev => ({ ...prev, password: e.target.value }))}
                placeholder="****"
              />
            </div>
            <p className="text-xs text-slate-400 mt-2">Credentials will be encoded and passed as Basic Authorization headers for authorized PTZ queries from the browser.</p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CameraFeedView;

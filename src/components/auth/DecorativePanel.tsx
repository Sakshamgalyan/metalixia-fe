import { motion } from "framer-motion";
import { Factory, Shield, Gauge, Activity } from "lucide-react";
import Typography from "../UI/Typography";

const DecorativePanel = ({ side }: { side: "login" | "signup" }) => {
    return (
        <motion.div
            key={side}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="relative h-full w-full flex items-center justify-center p-2 sm:p-4 md:p-4 lg:p-12 overflow-hidden bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50"
        >
            {/* Grid pattern background */}
            <div className="absolute inset-0 opacity-[0.03]">
                <div className="absolute inset-0" style={{
                    backgroundImage: `linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)`,
                    backgroundSize: '50px 50px'
                }} />
            </div>

            {/* Subtle gradient orbs */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-10 sm:top-20 left-10 sm:left-20 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-gradient-to-br from-blue-400 to-cyan-300 rounded-full blur-3xl" />
                <div className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-gradient-to-br from-slate-400 to-gray-300 rounded-full blur-3xl" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-[90%] w-full">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8 sm:mb-10 md:mb-12"
                >
                    {/* Logo and Brand */}
                    <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                        <div className="p-2 sm:p-3 bg-gradient-to-br from-[#707FDD] to-[#5a67c4] rounded-xl sm:rounded-2xl shadow-lg">
                            <Factory className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
                        </div>
                        <div>
                            <Typography variant="h3" weight="medium">
                                Metalixia
                            </Typography>
                            <Typography variant="p" weight="normal" textColor="#5a67ba" className="text-sm">
                                {side === "login"
                                    ? "Electronic Metal Refining Works Factory"
                                    : "Create secure admin credentials for system access"}
                            </Typography>
                        </div>
                    </div>

                </motion.div>

                {/* Feature cards */}
                <div className="space-y-2 sm:space-y-3">
                    {[
                        {
                            icon: Shield,
                            title: "Secure Access Control",
                            desc: "Enterprise-grade authentication and authorization",
                        },
                        {
                            icon: Gauge,
                            title: "Real-Time Monitoring",
                            desc: "Live factory operations and process tracking",
                        },
                        {
                            icon: Activity,
                            title: "Production Analytics",
                            desc: "Comprehensive refining metrics and reporting",
                        },
                    ].map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3 + idx * 0.1 }}
                            className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-white/80 backdrop-blur-sm border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="p-1.5 sm:p-2 rounded-md sm:rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-300 flex-shrink-0">
                                <feature.icon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
                            </div>
                            <div className="min-w-0">
                                <Typography variant="p" weight="semibold" textColor="#707FDD" className="text-sm">
                                    {feature.title}
                                </Typography>
                                <Typography variant="p" weight="normal" className="text-xs text-slate-600">
                                    {feature.desc}
                                </Typography>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default DecorativePanel;


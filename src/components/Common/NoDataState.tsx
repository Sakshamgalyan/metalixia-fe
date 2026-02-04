import Typography from "../UI/Typography";
import { Inbox } from "lucide-react";
import React from "react";

interface NoDataStateProps {
    title?: string;
    message?: string;
    icon?: React.ReactNode;
    className?: string;
    children?: React.ReactNode;
}

const NoDataState: React.FC<NoDataStateProps> = ({
    title = "No data found",
    message = "It seems there is no data to show at the moment.",
    icon,
    className = "",
    children
}) => {
    return (
        <div className={`flex flex-col items-center justify-center py-12 px-4 ${className}`}>
            <div className="bg-slate-50 p-4 rounded-full mb-4">
                {icon || <Inbox className="w-8 h-8 text-slate-400" />}
            </div>

            <Typography variant="h4" className="mb-2 text-slate-800" align="center">
                {title}
            </Typography>

            <Typography variant="p" className="text-slate-500 max-w-sm mb-6" align="center">
                {message}
            </Typography>

            {children && (
                <div className="mt-2">
                    {children}
                </div>
            )}
        </div>
    );
};

export default NoDataState;
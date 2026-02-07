import { EmailTemplateItem } from "@/context/Email/types";
import Typography from "@/components/UI/Typography";
import Card from "@/components/UI/Card";
import { Loader2 } from "lucide-react";

interface EmailTemplateListProps {
  templates: EmailTemplateItem[];
  isLoading: boolean;
  onSelect: (template: EmailTemplateItem) => void;
}

const EmailTemplateList = ({
  templates,
  isLoading,
  onSelect,
}: EmailTemplateListProps) => {
  if (isLoading && templates.length === 0) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="animate-spin text-slate-400" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Typography variant="h4">Templates</Typography>
      <div className="grid grid-cols-1 gap-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
        {templates.length > 0 ? (
          templates.map((template) => (
            <Card
              key={template._id}
              className="cursor-pointer hover:border-[#707FDD] transition-colors group"
              padding="sm"
              onClick={() => onSelect(template)}
            >
              <div className="space-y-1">
                <Typography
                  variant="p"
                  className="font-medium text-slate-800 group-hover:text-[#707FDD]"
                >
                  {template.name}
                </Typography>
                <Typography
                  variant="span"
                  className="text-xs text-slate-500 block truncate"
                >
                  {template.subject}
                </Typography>
              </div>
            </Card>
          ))
        ) : (
          <div className="text-center py-6 text-slate-400 text-sm bg-slate-50 rounded-lg">
            No templates available
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailTemplateList;

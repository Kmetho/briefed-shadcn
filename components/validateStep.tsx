import { toast } from "sonner";
import { type BriefFormData } from "@/components/BriefForm";

export function validateStep(
  currentStep: number,
  formData: BriefFormData,
): boolean {
  switch (currentStep) {
    case 1:
      if (!formData.client_name.trim()) {
        toast.error("Please enter a client name.");
        return false;
      }
      if (!formData.project_name.trim()) {
        toast.error("Please enter a project name.");
        return false;
      }
      if (!formData.project_type) {
        toast.error("Please select a project type.");
        return false;
      }
      return true;

    case 2:
      if (!formData.goals.trim()) {
        toast.error("Please describe your project goals.");
        return false;
      }
      return true;

    case 3:
      return true;
    default:
      return true;
  }
}

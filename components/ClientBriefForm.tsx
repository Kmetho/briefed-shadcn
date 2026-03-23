"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createPublicClient } from "@/lib/supabase/client";
import { markInviteUsed } from "@/lib/supabase/briefs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { validateStep } from "./validateStep";
import { useUploadThing } from "@/lib/uploadthing";

const STEPS = [
  { id: 1, label: "Client" },
  { id: 2, label: "Goals" },
  { id: 3, label: "Budget" },
  { id: 4, label: "Moodboard" },
];

type FormData = {
  project_name: string;
  client_name: string;
  client_email: string;
  project_type: string;
  goals: string;
  target_audience: string;
  timeline: string;
  budget: string;
  additional_notes: string;
  moodboard_urls: string[];
  submitted_by: "client" | "freelancer";
};

type ClientBriefFormProps = {
  inviteToken: string;
  userId: string;
  // clientName: string | null;
  // projectName: string | null;
};

export default function ClientBriefForm({
  inviteToken,
  userId,
  // clientName,
  // projectName,
}: ClientBriefFormProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [mounted, setMounted] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onUploadProgress: (progress) => setUploadProgress(progress),
    onUploadError: (error) => {
      console.error("Upload error:", error);
      toast.error("Failed to upload files. Please try again.");
    },
  });

  const [formData, setFormData] = useState<FormData>({
    project_name: "",
    client_name: "",
    client_email: "",
    project_type: "",
    goals: "",
    target_audience: "",
    timeline: "",
    budget: "",
    additional_notes: "",
    moodboard_urls: [],
    submitted_by: "client",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-muted-foreground">Loading form...</p>
      </div>
    );
  }

  function updateField(field: string, value: any) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let moodboardUrls = formData.moodboard_urls;

      const uploadResult = await startUpload(files);
      if (uploadResult) {
        const newUrls = uploadResult.map((file) => file.ufsUrl);
        moodboardUrls = [...moodboardUrls, ...newUrls];
      }

      const supabase = createPublicClient();
      const { error } = await supabase.from("briefs").insert({
        user_id: userId,
        project_name: formData.project_name,
        client_name: formData.client_name,
        client_email: formData.client_email,
        project_type: formData.project_type,
        goals: formData.goals,
        target_audience: formData.target_audience,
        timeline: formData.timeline,
        budget: formData.budget,
        additional_notes: formData.additional_notes,
        moodboard_urls: moodboardUrls,
        submitted_by: "client",
      });

      if (error) throw error;

      // mark invite as used so link can't be reused
      await markInviteUsed(inviteToken);

      // show success page
      router.push("/fill/success");
    } catch (error) {
      console.error("Error submitting brief:", error);
      toast.error("Failed to submit brief. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-lg mx-auto py-6 sm:py-10 px-4">
      {/* Step indicator */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2 flex-1">
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "h-6 w-6 rounded-full flex items-center justify-center text-[11px] font-medium border-2 transition-colors",
                    step > s.id
                      ? "bg-primary border-primary text-primary-foreground"
                      : step === s.id
                        ? "bg-primary border-primary text-primary-foreground"
                        : "bg-background border-border text-muted-foreground",
                  )}
                >
                  {step > s.id ? "✓" : s.id}
                </div>
                <span
                  className={cn(
                    "text-xs hidden sm:inline",
                    step === s.id
                      ? "font-medium text-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={cn(
                    "flex-1 h-px ml-1",
                    step > s.id ? "bg-primary" : "bg-border",
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <Card className="border-border/60">
        <form onSubmit={handleSubmit}>
          {/* STEP 1 */}
          {step === 1 && (
            <>
              <CardHeader>
                <CardTitle>Your Information</CardTitle>
                <CardDescription>Who is this brief for?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="client_name">
                    Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="client_name"
                    required
                    value={formData.client_name}
                    onChange={(e) => updateField("client_name", e.target.value)}
                    placeholder="e.g. Acme Studios"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="client_email">Email</Label>
                  <Input
                    id="client_email"
                    type="email"
                    value={formData.client_email}
                    onChange={(e) =>
                      updateField("client_email", e.target.value)
                    }
                    placeholder="client@email.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="project_name">
                    Project Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="project_name"
                    required
                    value={formData.project_name}
                    onChange={(e) =>
                      updateField("project_name", e.target.value)
                    }
                    placeholder="e.g. Brand Refresh 2025"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="project_type">
                    Project Type <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    required
                    value={formData.project_type}
                    onValueChange={(v) => updateField("project_type", v)}
                  >
                    <SelectTrigger id="project_type" className="min-w-45">
                      <SelectValue placeholder="Select a project type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="branding">Branding</SelectItem>
                      <SelectItem value="logo">Logo Design</SelectItem>
                      <SelectItem value="packaging">Packaging</SelectItem>
                      <SelectItem value="web design">Web Design</SelectItem>
                      <SelectItem value="web development">
                        Web Development
                      </SelectItem>
                      <SelectItem value="social">Social Media</SelectItem>
                      <SelectItem value="photography">Photography</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="button"
                  className="w-full"
                  onClick={() => {
                    if (validateStep(1, formData)) setStep(2);
                  }}
                >
                  Continue
                </Button>
              </CardContent>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <CardHeader>
                <CardTitle>Project Goals</CardTitle>
                <CardDescription>
                  Define what you want to accomplish with this project.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="goals">
                    What do you want to achieve?{" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="goals"
                    required
                    value={formData.goals}
                    onChange={(e) => updateField("goals", e.target.value)}
                    placeholder="Describe your project goals..."
                    rows={5}
                    className="resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="target_audience">Target Audience</Label>
                  <Input
                    id="target_audience"
                    value={formData.target_audience}
                    onChange={(e) =>
                      updateField("target_audience", e.target.value)
                    }
                    placeholder="e.g. Women 25–40, tech professionals"
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    className="flex-1"
                    onClick={() => {
                      if (validateStep(2, formData)) setStep(3);
                    }}
                  >
                    Continue
                  </Button>
                </div>
              </CardContent>
            </>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <>
              <CardHeader>
                <CardTitle>Timeline & Budget</CardTitle>
                <CardDescription>
                  Set a realistic timeline and budget for your project.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="timeline">Timeline</Label>
                  <Input
                    id="timeline"
                    value={formData.timeline}
                    onChange={(e) => updateField("timeline", e.target.value)}
                    placeholder="e.g. 2–3 weeks"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget">Budget</Label>
                  <Input
                    id="budget"
                    value={formData.budget}
                    onChange={(e) => updateField("budget", e.target.value)}
                    placeholder="e.g. $2,000 – $5,000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additional_notes">Additional Notes</Label>
                  <Textarea
                    id="additional_notes"
                    value={formData.additional_notes}
                    onChange={(e) =>
                      updateField("additional_notes", e.target.value)
                    }
                    placeholder="Any other important details?"
                    rows={4}
                    className="resize-none"
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setStep(2)}
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    className="flex-1"
                    onClick={() => {
                      if (validateStep(3, formData)) setStep(4);
                    }}
                  >
                    Continue
                  </Button>
                </div>
              </CardContent>
            </>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <>
              <CardHeader>
                <CardTitle>Moodboard</CardTitle>
                <CardDescription>
                  Optional — upload inspiration images.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="moodboard">Upload Images (max 10)</Label>
                  <Input
                    id="moodboard"
                    type="file"
                    accept="image/*"
                    multiple
                    className="cursor-pointer file:cursor-pointer file:px-4 file:py-1 text-transparent w-35"
                    onChange={(e) => {
                      const selected = Array.from(e.target.files || []);
                      setFiles((prev) => [...prev, ...selected].slice(0, 10));
                      e.target.value = "";
                    }}
                  />

                  {files.length > 0 && (
                    <p className="text-sm text-muted-foreground">
                      {files.length} image(s) selected
                    </p>
                  )}

                  {files.length > 0 && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">
                        New images — click to remove
                      </p>
                      <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                        {files.map((file, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => {
                              setFiles(files.filter((_, idx) => idx !== i));
                            }}
                            className="group relative aspect-square rounded-md overflow-hidden border border-border hover:border-destructive transition-colors"
                          >
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`New image ${i + 1}`}
                              className="w-full h-full object-cover group-hover:opacity-50 transition-opacity"
                            />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <X className="h-5 w-5 text-destructive" />
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setStep(3)}
                    disabled={isSubmitting}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creating..." : "Create Brief"}
                  </Button>
                </div>
              </CardContent>
            </>
          )}
        </form>
      </Card>
    </div>
  );
}

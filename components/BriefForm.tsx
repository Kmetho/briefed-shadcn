"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { cn } from "@/lib/utils";

type FormData = {
  clientName: string;
  clientEmail: string;
  projectName: string;
  projectType: string;
  goals: string;
  targetAudience: string;
  timeline: string;
  budget: string;
  description: string;
  moodboardFiles: File[];
};

const STEPS = [
  { id: 1, label: "Client" },
  { id: 2, label: "Goals" },
  { id: 3, label: "Budget" },
  { id: 4, label: "Moodboard" },
];

export default function BriefForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    clientName: "",
    clientEmail: "",
    projectName: "",
    projectType: "branding",
    goals: "",
    targetAudience: "",
    timeline: "",
    budget: "",
    description: "",
    moodboardFiles: [],
  });

  function updateField(field: keyof FormData, value: any) {
    setFormData({ ...formData, [field]: value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const briefs = JSON.parse(localStorage.getItem("briefs") || "[]");
      const newBrief = {
        id: Date.now().toString(),
        ...formData,
        moodboardFiles: undefined,
        moodboardUrls: [],
        status: "completed",
        createdAt: new Date().toISOString(),
      };
      briefs.push(newBrief);
      localStorage.setItem("briefs", JSON.stringify(briefs));
      router.push("/dashboard?success=true");
    } catch (error) {
      console.error("Error creating brief:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      {/* Step indicator */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2 flex-1">
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "h-7 w-7 rounded-full flex items-center justify-center text-xs font-medium border-2 transition-colors",
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
                    "text-sm hidden sm:inline",
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
        <p className="text-sm text-muted-foreground">
          Step {step} of {STEPS.length}
        </p>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          {/* STEP 1 */}
          {step === 1 && (
            <>
              <CardHeader>
                <CardTitle>Client Information</CardTitle>
                <CardDescription>Who is this brief for?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="clientName">
                    Client Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="clientName"
                    required
                    value={formData.clientName}
                    onChange={(e) => updateField("clientName", e.target.value)}
                    placeholder="e.g. Acme Studios"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="clientEmail">Client Email</Label>
                  <Input
                    id="clientEmail"
                    type="email"
                    value={formData.clientEmail}
                    onChange={(e) => updateField("clientEmail", e.target.value)}
                    placeholder="client@email.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="projectName">
                    Project Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="projectName"
                    required
                    value={formData.projectName}
                    onChange={(e) => updateField("projectName", e.target.value)}
                    placeholder="e.g. Brand Refresh 2025"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="projectType">
                    Project Type <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.projectType}
                    onValueChange={(v) => updateField("projectType", v)}
                  >
                    <SelectTrigger id="projectType">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="branding">Branding</SelectItem>
                      <SelectItem value="web">Web Design</SelectItem>
                      <SelectItem value="social">Social Media</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="button"
                  className="w-full"
                  onClick={() => setStep(2)}
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
                <CardDescription>What does success look like?</CardDescription>
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
                  <Label htmlFor="targetAudience">Target Audience</Label>
                  <Input
                    id="targetAudience"
                    value={formData.targetAudience}
                    onChange={(e) =>
                      updateField("targetAudience", e.target.value)
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
                    onClick={() => setStep(3)}
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
                <CardDescription>Set expectations early.</CardDescription>
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
                  <Label htmlFor="description">Additional Notes</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => updateField("description", e.target.value)}
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
                    onClick={() => setStep(4)}
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
                    className="cursor-pointer"
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      updateField("moodboardFiles", files.slice(0, 10));
                    }}
                  />
                  {formData.moodboardFiles.length > 0 && (
                    <p className="text-sm text-muted-foreground">
                      {formData.moodboardFiles.length} file(s) selected
                    </p>
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

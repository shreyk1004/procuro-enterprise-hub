import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export const EarlyAccessForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    jobTitle: "",
    workEmail: "",
    companyName: "",
    useCase: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-20">
      <div className="max-w-2xl w-full mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 
            className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: "Garamond, serif", fontWeight: 300 }}
          >
            Early Access
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Two Column Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                FIRST NAME *
              </Label>
              <Input
                id="firstName"
                type="text"
                value={formData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                className="border-0 border-b border-gray-300 rounded-none px-0 py-2 text-gray-600 focus:border-gray-900 focus:ring-0"
                placeholder="Shrey"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                LAST NAME *
              </Label>
              <Input
                id="lastName"
                type="text"
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                className="border-0 border-b border-gray-300 rounded-none px-0 py-2 text-gray-600 focus:border-gray-900 focus:ring-0"
                placeholder="Kakkar"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobTitle" className="text-sm font-medium text-gray-700">
                JOB TITLE *
              </Label>
              <Input
                id="jobTitle"
                type="text"
                value={formData.jobTitle}
                onChange={(e) => handleChange("jobTitle", e.target.value)}
                className="border-0 border-b border-gray-300 rounded-none px-0 py-2 text-gray-600 focus:border-gray-900 focus:ring-0"
                placeholder="Chief Fisherman"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyName" className="text-sm font-medium text-gray-700">
                COMPANY NAME *
              </Label>
              <Input
                id="companyName"
                type="text"
                value={formData.companyName}
                onChange={(e) => handleChange("companyName", e.target.value)}
                className="border-0 border-b border-gray-300 rounded-none px-0 py-2 text-gray-600 focus:border-gray-900 focus:ring-0"
                placeholder="Bubba Gump"
                required
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="workEmail" className="text-sm font-medium text-gray-700">
                WORK EMAIL *
              </Label>
              <Input
                id="workEmail"
                type="email"
                value={formData.workEmail}
                onChange={(e) => handleChange("workEmail", e.target.value)}
                className="border-0 border-b border-gray-300 rounded-none px-0 py-2 text-gray-600 focus:border-gray-900 focus:ring-0"
                placeholder="shrey@bubbagump.com"
                required
              />
            </div>
          </div>

          {/* Single Column Field */}
          <div className="space-y-2">
            <Label htmlFor="useCase" className="text-sm font-medium text-gray-700">
              USE CASE
            </Label>
            <Textarea
              id="useCase"
              value={formData.useCase}
              onChange={(e) => handleChange("useCase", e.target.value)}
              className="border-0 border-b border-gray-300 rounded-none px-0 py-2 text-gray-600 focus:border-gray-900 focus:ring-0 resize-none"
              placeholder="Can you help with finding new shrimp customers, and reaching out to them?"
              rows={3}
            />
          </div>

          {/* Submit Button */}
          <div className="pt-8">
            <Button
              type="submit"
              className="w-full bg-white border border-gray-900 text-gray-900 hover:bg-gray-50 py-4 text-lg font-medium rounded-md"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Join Waitlist
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}; 
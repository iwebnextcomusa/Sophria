import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, AlertCircle, Sparkles, Send, X, ArrowRight, Loader2 } from "lucide-react";
import { SERVICE_AREAS } from "../data";

interface LeadFormProps {
  onSuccess?: () => void;
  closeModal?: () => void;
  inline?: boolean;
}

export default function LeadForm({ onSuccess, closeModal, inline = false }: LeadFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    serviceType: "hardwood",
    sqft: "",
    location: "Hamilton",
    notes: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [quoteId, setQuoteId] = useState("");

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Full Name is required";
    
    // Simple phone regex
    const phoneClean = formData.phone.replace(/\D/g, "");
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone Number is required";
    } else if (phoneClean.length < 10) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    // Email regex
    if (!formData.email.trim()) {
      newErrors.email = "Email Address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (formData.sqft && isNaN(Number(formData.sqft))) {
      newErrors.sqft = "Must be a valid number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for that field
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate server side submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      const generatedId = `SOPH-${Math.floor(100000 + Math.random() * 900000)}`;
      setQuoteId(generatedId);
      if (onSuccess) onSuccess();
    }, 1500);
  };

  return (
    <div className={`w-full ${inline ? "" : "bg-wood-charcoal/90 p-6 md:p-8 rounded-3xl border border-luxury-gold/15 shadow-2xl relative"}`}>
      {submitSuccess ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8 space-y-4"
        >
          <div className="w-16 h-16 bg-luxury-gold/10 rounded-full flex items-center justify-center mx-auto border border-luxury-gold">
            <CheckCircle2 className="w-10 h-10 text-luxury-gold" />
          </div>
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-luxury-gold uppercase block">
              Reference: {quoteId}
            </span>
            <h4 className="text-xl font-bold text-white font-display">
              Estimate Request Received!
            </h4>
            <p className="text-xs text-gray-400 max-w-sm mx-auto leading-relaxed">
              Thank you, <strong>{formData.name}</strong>. Mansoor or one of our senior estimators will review your specs and contact you at <strong>{formData.phone}</strong> or <strong>{formData.email}</strong> within 4 business hours to coordinate details.
            </p>
          </div>

          <div className="bg-wood-dark/70 p-4 rounded-2xl border border-luxury-gold/5 max-w-sm mx-auto text-left space-y-1 text-[11px] text-gray-300 font-mono">
            <div><span className="text-luxury-gold">Project:</span> {formData.serviceType.toUpperCase()}</div>
            <div><span className="text-luxury-gold">Location:</span> {formData.location}</div>
            {formData.sqft && <div><span className="text-luxury-gold">Square Footage:</span> {formData.sqft} sq. ft.</div>}
            <div><span className="text-luxury-gold">Status:</span> Reviewing Layout Specifications</div>
          </div>

          <div className="pt-4 flex gap-3 justify-center">
            {closeModal && (
              <button
                onClick={closeModal}
                className="px-6 py-2 bg-luxury-gold hover:bg-gold-400 text-wood-dark text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer"
              >
                Done
              </button>
            )}
            <button
              onClick={() => {
                setSubmitSuccess(false);
                setFormData({
                  name: "",
                  phone: "",
                  email: "",
                  serviceType: "hardwood",
                  sqft: "",
                  location: "Hamilton",
                  notes: ""
                });
              }}
              className="px-4 py-2 border border-luxury-gold/20 hover:border-luxury-gold text-gray-400 hover:text-white text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer"
            >
              Submit Another
            </button>
          </div>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-between items-center mb-2">
            <div>
              <div className="flex items-center gap-1.5 text-luxury-gold mb-0.5">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span className="text-[9px] font-mono uppercase tracking-widest font-semibold">Free On-Site Estimate</span>
              </div>
              <h4 className="text-lg font-bold text-white font-display">Let's Craft Your Floors</h4>
            </div>
            {closeModal && (
              <button
                type="button"
                onClick={closeModal}
                className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1 font-sans">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., John Doe"
              className={`w-full bg-wood-dark border ${
                errors.name ? "border-red-500" : "border-luxury-gold/15 focus:border-luxury-gold/60"
              } rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none transition-colors font-sans`}
            />
            {errors.name && (
              <span className="text-[10px] text-red-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.name}
              </span>
            )}
          </div>

          {/* Contact coordinates - Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1 font-sans">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g., (437) 605-4750"
                className={`w-full bg-wood-dark border ${
                  errors.phone ? "border-red-500" : "border-luxury-gold/15 focus:border-luxury-gold/60"
                } rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none transition-colors font-sans`}
              />
              {errors.phone && (
                <span className="text-[10px] text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.phone}
                </span>
              )}
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1 font-sans">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g., customer@sophria.ca"
                className={`w-full bg-wood-dark border ${
                  errors.email ? "border-red-500" : "border-luxury-gold/15 focus:border-luxury-gold/60"
                } rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none transition-colors font-sans`}
              />
              {errors.email && (
                <span className="text-[10px] text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.email}
                </span>
              )}
            </div>
          </div>

          {/* Slabs dropdown selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1 font-sans">
                Flooring Service
              </label>
              <select
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                className="w-full bg-wood-dark border border-luxury-gold/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-luxury-gold/60 cursor-pointer font-sans"
              >
                <option value="hardwood">Hardwood Flooring</option>
                <option value="lvp">Luxury Vinyl Plank (LVP)</option>
                <option value="laminate">Laminate Flooring</option>
                <option value="engineered">Engineered Hardwood</option>
                <option value="tile">Tile Installation</option>
                <option value="stairs">Stair Refinishing</option>
                <option value="repair">Floor Repair / Restoration</option>
                <option value="commercial">Commercial Flooring</option>
                <option value="custom">Custom Pattern / Borders</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1 font-sans">
                Est. Sq. Footage (Optional)
              </label>
              <input
                type="text"
                name="sqft"
                value={formData.sqft}
                onChange={handleChange}
                placeholder="e.g., 850"
                className={`w-full bg-wood-dark border ${
                  errors.sqft ? "border-red-500" : "border-luxury-gold/15 focus:border-luxury-gold/60"
                } rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none transition-colors font-sans`}
              />
              {errors.sqft && (
                <span className="text-[10px] text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.sqft}
                </span>
              )}
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1 font-sans">
                Service Area Location
              </label>
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full bg-wood-dark border border-luxury-gold/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-luxury-gold/60 cursor-pointer font-sans"
              >
                {SERVICE_AREAS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}, ON
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Project details notes */}
          <div>
            <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1 font-sans">
              Describe Your Project Goals (Optional)
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              placeholder="Tell us about subfloors, existing carpets, stair matching, trim requirements, etc."
              className="w-full bg-wood-dark border border-luxury-gold/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-luxury-gold/60 font-sans resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-6 rounded-xl bg-luxury-gold hover:bg-gold-400 text-wood-dark font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-xl shadow-luxury-gold/10 hover:shadow-luxury-gold/25 flex items-center justify-center gap-2 cursor-pointer disabled:bg-gold-800 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Transmitting Project Specs...</span>
              </>
            ) : (
              <>
                <span>Secure Free On-Site Quote</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}

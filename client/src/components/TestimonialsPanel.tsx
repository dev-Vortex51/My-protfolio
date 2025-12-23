import { Testimonial } from "@/lib/types";
import React from "react";

interface Props {
  testimonials: Testimonial[];
  editingTestimonial: Testimonial | null;
  onAddTestimonial: () => void;
  onSaveTestimonial: (testimonial: Testimonial) => void;
  onDeleteTestimonial: (id: string) => void;
  setEditingTestimonial: (testimonial: Testimonial | null) => void;
}

const TestimonialsPanel: React.FC<Props> = ({
  testimonials,
  editingTestimonial,
  onAddTestimonial,
  onSaveTestimonial,
  onDeleteTestimonial,
  setEditingTestimonial,
}) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="text-xs md:text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-widest">
          Client Testimonials
        </h3>
        <button
          onClick={onAddTestimonial}
          className="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-widest rounded"
        >
          Add Testimonial
        </button>
      </div>

      {editingTestimonial && (
        <div className="bg-zinc-50 dark:bg-[#0c0c0e] border border-indigo-500/50 rounded-lg p-6 space-y-6">
          <h4 className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">
            {editingTestimonial.id.startsWith("temp")
              ? "New Testimonial"
              : `Editing: ${editingTestimonial.name}`}
          </h4>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              value={editingTestimonial.name}
              onChange={(e) =>
                setEditingTestimonial({
                  ...editingTestimonial,
                  name: e.target.value,
                })
              }
              className="bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded px-4 py-2 text-zinc-900 dark:text-white text-sm"
              placeholder="Full Name"
            />
            <input
              type="text"
              value={editingTestimonial.role}
              onChange={(e) =>
                setEditingTestimonial({
                  ...editingTestimonial,
                  role: e.target.value,
                })
              }
              className="bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded px-4 py-2 text-zinc-900 dark:text-white text-sm"
              placeholder="Role/Position"
            />
          </div>

          <input
            type="text"
            value={editingTestimonial.company}
            onChange={(e) =>
              setEditingTestimonial({
                ...editingTestimonial,
                company: e.target.value,
              })
            }
            className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded px-4 py-2 text-zinc-900 dark:text-white text-sm"
            placeholder="Company Name"
          />

          <textarea
            value={editingTestimonial.content}
            onChange={(e) =>
              setEditingTestimonial({
                ...editingTestimonial,
                content: e.target.value,
              })
            }
            className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded px-4 py-2 text-zinc-900 dark:text-white text-sm resize-none"
            rows={5}
            placeholder="Testimonial content..."
          />

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="verified"
              checked={editingTestimonial.verified}
              onChange={(e) =>
                setEditingTestimonial({
                  ...editingTestimonial,
                  verified: e.target.checked,
                })
              }
              className="w-4 h-4 text-indigo-600"
            />
            <label
              htmlFor="verified"
              className="text-sm text-zinc-700 dark:text-zinc-300"
            >
              Verified Testimonial
            </label>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => onSaveTestimonial(editingTestimonial)}
              className="px-6 py-2 bg-emerald-600 text-white text-[10px] font-bold uppercase rounded hover:bg-emerald-500"
            >
              <i className="fa-solid fa-check mr-2"></i>
              Commit Record
            </button>
            <button
              onClick={() => setEditingTestimonial(null)}
              className="px-6 py-2 bg-zinc-800 text-white text-[10px] font-bold uppercase rounded hover:bg-zinc-700"
            >
              <i className="fa-solid fa-xmark mr-2"></i>
              Abort
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {testimonials.length === 0 ? (
          <div className="p-12 text-center text-zinc-600 font-mono text-xs border border-dashed border-zinc-200 dark:border-zinc-800 rounded">
            No testimonials yet. Add your first one!
          </div>
        ) : (
          testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-zinc-50 dark:bg-[#0c0c0e] border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 space-y-4"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-white">
                      {testimonial.name}
                    </h4>
                    {testimonial.verified && (
                      <i className="fa-solid fa-circle-check text-indigo-500 text-xs"></i>
                    )}
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">
                    {testimonial.role} @ {testimonial.company}
                  </p>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => setEditingTestimonial(testimonial)}
                    className="text-zinc-400 hover:text-indigo-600"
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button
                    onClick={() => onDeleteTestimonial(testimonial.id)}
                    className="text-zinc-400 hover:text-red-500"
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </div>
              </div>
              <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                "{testimonial.content}"
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TestimonialsPanel;

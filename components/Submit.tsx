"use client";
import { useFormStatus } from "react-dom";

function Submit() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="bg-Secondary hover:bg-Accent transition-colors rounded-xs p-2 sm:col-span-2"
      aria-disabled={pending}
      disabled={pending}
    >
      {pending ? "Submitting..." : "Submit"}
      
    </button>
  );
}

export default Submit;

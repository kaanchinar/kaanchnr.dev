"use client";

import { createMessage } from "@/libs/actions";
import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import Submit from "./Submit";
import { toast, ToastContainer } from "react-toastify";

function Form() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, formAction] = useFormState(createMessage, null);


  useEffect(() => {
    if (formState) {
      if (formState.success) {
        toast.success(formState.message);
      } else {
        toast.error(formState.message);
      }
    }
  }, [formState])

  const handleAction = async (form: FormData) => {
    formAction(form);
    formRef.current?.reset();
    
    
  };

  return (
    <>
      <form
        action={handleAction}
        ref={formRef}
        className="grid min-w-80 gap-2 sm:grid-cols-2"
      >
        <div className="flex flex-col">
          <label htmlFor="name" className="text-sm">
            Name:
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter your name"
            required
            className="p-2 rounded-xs"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm">
            Email:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your mail"
            required
            className="p-2 rounded-xs"
          />
        </div>
        <div className="flex flex-col sm:col-span-2">
          <label htmlFor="message" className="text-sm">
            Message:
          </label>
          <textarea
            name="message"
            id="message"
            placeholder="Put your message"
            className="p-2 rounded-xs resize-none min-h-40 required:before:"
            required
          />
        </div>
        <Submit />

        {/* // TODO: Form logic ve server action tamamlanacak. */}
      </form>
      
    </>
  );
}

export default Form;

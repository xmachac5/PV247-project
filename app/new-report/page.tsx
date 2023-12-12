"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FieldError, UseFormReturn, useForm } from "react-hook-form";
import { useState } from "react";
import {
  Report,
  PersonalData,
  personalDataSchema,
  reportSchema,
} from "../model/report";
import { z } from "zod";
import { useRouter } from "next/navigation";

const reportFormSchema = reportSchema
  .extend({
    repeatedPassword: z.string().min(4),
  })
  .omit({
    personalData: true,
  });

type ReportForm = z.infer<typeof reportFormSchema>;

const PersonalDataForm = ({
  formHook,
}: {
  formHook: UseFormReturn<PersonalData, PersonalData, any>;
}) => {
  const {
    register,
    formState: { errors },
  } = formHook;

  return (
    <div className="mb-8 space-y-3">
      <div className="flex flex-col sm:flex-row">
        <div>
          <label className="mx-3 block flex-grow">
            Name:
            <input className="text-box block" id="name" {...register("name")} />
            <ErrMsg error={errors.name} />
          </label>

          <label className="mx-3 block flex-grow">
            Date Born:
            <input
              className="text-box block w-[100%]"
              type="date"
              {...register("dateBorn")}
            />
            <ErrMsg error={errors.dateBorn} />
          </label>
        </div>
        <label className="mx-3 block flex-grow">
          Surname:
          <input
            className="box text-box"
            id="surname"
            {...register("surname")}
          />
          <ErrMsg error={errors.surname} />
        </label>
      </div>

      <label className="mx-3 block">
        Address (street name and street number):
        <input className="text-box block w-[100%]" {...register("address")} />
        <ErrMsg error={errors.address} />
      </label>

      <div className="flex flex-col sm:flex-row">
        <label className="mx-3 block flex-grow">
          Email:
          <input className="text-box block" {...register("email")} />
          <ErrMsg error={errors.email} />
        </label>

        <label className="mx-3 block flex-grow">
          Phone number:
          <input className="text-box block" {...register("phone")} />
          <ErrMsg error={errors.phone} />
        </label>
      </div>
    </div>
  );
};

const ErrMsg = ({ error }: { error: FieldError | undefined }) => {
  return error?.message !== undefined ? (
    <p className="flex-sh break-words font-bold text-red-700 sm:max-w-[19rem]">
      {error?.message}
    </p>
  ) : (
    <></>
  );
};

const LawyerPage = () => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<ReportForm>({
    resolver: zodResolver(reportFormSchema),
  });

  const personalDataFormHook = useForm<PersonalData>({
    resolver: zodResolver(personalDataSchema),
  });

  const [anonymous, setAnonymous] = useState(false);
  const router = useRouter();

  const customChecks = (report: ReportForm) => {
    let ok = true;
    if (report.password !== report.repeatedPassword) {
      setError("repeatedPassword", {
        type: "custom",
        message: "Passwords does not match",
      });
      ok = false;
    }

    return ok;
  };

  const onSubmit = async (report: ReportForm) => {
    let personalData = undefined;

    if (!anonymous) {
      console.log("not anonymous");

      let ok = await personalDataFormHook.trigger();
      if (!ok) {
        console.log("error when getting personal data");
        return;
      } else {
        personalData = personalDataFormHook.getValues();
      }
    } else {
      console.log("anonymous");
    }

    if (customChecks(report)) {
      let data = { ...report, personalData: personalData };

      const response = await fetch("/api/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const parsed_response = await response.json();
      router.replace("/report-created/"+parsed_response.id);
    }
  };

  return (
    <div
      className="flex animate-fade-up flex-col"
      style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
    >
      <div className="flex flex-row">
        <input
          className="mx-3 rounded-md text-lg scale-150 ring-cyan-600"
          style={{color: "#0891b2"}}
          type="checkbox"
          checked={anonymous}
          onChange={() => setAnonymous(!anonymous)}
        />
        <label>Stay anonymous</label>
      </div>
      {!anonymous && <PersonalDataForm formHook={personalDataFormHook} />}

      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col sm:flex-row">
          <label className="block mx-3 flex-grow">
            Password:
            <input
              type="password"
              className="text-box block w-[100%]"
              {...register("password")}
            />
            <ErrMsg error={errors.password} />
          </label>

          <label className="block mx-3 flex-grow">
            Repeat password:
            <input
              type="password"
              className="text-box block w-[100%]"
              {...register("repeatedPassword")}
            />
            <ErrMsg error={errors.repeatedPassword} />
          </label>
        </div>

        <label className="block m-3">
          Title of the report:
          <input className="text-box block w-[100%]" {...register("title")} />
          <ErrMsg error={errors.title} />
        </label>
        
        <label className="block m-3">
          Reason of the report:
          <textarea
            className="text-box block w-[100%]"
            {...register("reason")}
          />
          <ErrMsg error={errors.reason} />
        </label>
       
        <label className="block m-3">
          When did the incident occur?
          <input
            type="datetime-local"
            className="text-box block w-[100%]"
            {...register("datetime")}
          />
          <ErrMsg error={errors.datetime} />
        </label>
       
        <label className="block m-3">
          Detailed description of the unlawfull action(s):
          <textarea
            className="text-box block w-[100%]"
            {...register("description")}
          />
          <ErrMsg error={errors.description} />
        </label>

        <div className="flex justify-center m-3">
          <input
            type="submit"
            className="btn-primary"
            value="Send Report"
            onClick={(_) => personalDataFormHook.trigger()}
          />
        </div>
      </form>
    </div>
  );
};

export default LawyerPage;

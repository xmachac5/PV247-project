"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldError, UseFormReturn, useForm } from "react-hook-form";
import { useState } from "react";

type PersonalData = {
  name: string;
  surname: string;
  dateBorn: string;
  address: string;
  email: string;
  phone: string;
};

// TODO: proper validation
const personalDataSchema: z.ZodType<PersonalData> = z.object({
  name: z.string().min(1).max(50),
  surname: z.string().min(1).max(50),
  dateBorn: z.string(),
  address: z.string().min(1).max(120),
  email: z.string().min(1).max(120),
  phone: z.string().min(1).max(120),
});

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
      <div className="flex space-x-3">
        <div>
          <label className="block" htmlFor="name">
            Name:{" "}
          </label>
          <input className="text-box block" id="name" {...register("name")} />
          <ErrMsg error={errors.name} />

          <label className="block">
            Date Born:
            <input
              className="text-box block w-[100%]"
              type="date"
              {...register("dateBorn")}
            />
            <ErrMsg error={errors.dateBorn} />
          </label>
        </div>
        <div>
          <label className="block" htmlFor="surname">
            Surname:{" "}
          </label>
          <input
            className="box text-box"
            id="surname"
            {...register("surname")}
          />
          <ErrMsg error={errors.surname} />
        </div>
      </div>

      <label className="block">
        Address (street name and street number):
        <input className="text-box block w-[100%]" {...register("address")} />
      </label>
      <ErrMsg error={errors.address} />

      <div className="flex space-x-3">
        <label className="block">
          Email:
          <input className="text-box block" {...register("email")} />
        </label>
        <ErrMsg error={errors.email} />

        <label className="block">
          Phone number:
          <input className="text-box block" {...register("phone")} />
        </label>
        <ErrMsg error={errors.phone} />
      </div>
    </div>
  );
};

type Report = {
  title: string;
  reason: string;
  description: string;
  password: string;
  repeatedPassword: string;
  datetime: string;
};

const reportSchema: z.ZodType<Report> = z.object({
  title: z.string(),
  reason: z.string(),
  description: z.string(),
  password: z.string().min(4).max(30),
  repeatedPassword: z.string().min(4).max(30),
  datetime: z.string(),
});

const ErrMsg = ({ error }: { error: FieldError | undefined }) => {
  return error?.message !== undefined ? (
    <p className="max-w-prose break-words font-bold text-red-700">
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
  } = useForm<Report>({
    resolver: zodResolver(reportSchema),
  });

  const personalDataFormHook = useForm<PersonalData>({
    resolver: zodResolver(personalDataSchema),
  });

  const [anonymous, setAnonymous] = useState(false);

  const customChecks = (report: Report) => {
    let ok = true;
    if (report.password !== report.repeatedPassword) {
      setError("repeatedPassword", {
        type: "custom",
        message: "Passwords does not match",
      });
      ok = false;
    }

    return ok;
  }

  const onSubmit = async (report: Report) => {
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
      let data = {...report, personalData: personalData};
      
      await fetch('/api/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

    }
  };

  return (
    <div
      className="animate-fade-up"
      style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
    >
      <div>
        <input
          className="mr-3"
          type="checkbox"
          checked={anonymous}
          onChange={() => setAnonymous(!anonymous)}
        />
        <label>Stay anonymous</label>
      </div>
      {!anonymous && <PersonalDataForm formHook={personalDataFormHook} />}

      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex space-x-3">
          <div>
            <label>
              Password:
              <input
                type="password"
                className="text-box block w-[100%]"
                {...register("password")}
              />
            </label>
            <ErrMsg error={errors.password} />
          </div>

          <label>
            Repeat password:
            <input
              type="password"
              className="text-box block w-[100%]"
              {...register("repeatedPassword")}
            />
            <ErrMsg error={errors.repeatedPassword} />
          </label>
        </div>

        <label className="mt-3">
          Title of the report:
          <input className="text-box block w-[100%]" {...register("title")} />
        </label>
        <ErrMsg error={errors.title} />

        <label className="mt-3">
          Reason of the report:
          <textarea
            className="text-box block w-[100%]"
            {...register("reason")}
          />
        </label>
        <ErrMsg error={errors.reason} />

        <label className="mt-3">
          When did the incident occur?
          <input
            type="datetime-local"
            className="text-box block w-[100%]"
            {...register("datetime")}
          />
        </label>
        <ErrMsg error={errors.datetime} />

        <label className="mt-3">
          Detailed description of the unlawfull action(s):
          <textarea
            className="text-box block w-[100%]"
            {...register("description")}
          />
        </label>
        <ErrMsg error={errors.description} />

        <div className="flex justify-end">
          <input type="submit" className="btn-primary" value="Send Report" />
        </div>
      </form>
    </div>
  );
};

export default LawyerPage;

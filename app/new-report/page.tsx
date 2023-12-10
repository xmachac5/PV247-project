"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";

type PersonalData = {
  name: string;
  surname: string;
  dateBorn: Date;
  email: string;
  phone: string;
};

// TODO: proper validation
export const personalDataSchema: z.ZodType<PersonalData> = z.object({
  name: z.string().min(1).max(50),
  surname: z.string().min(1).max(50),
  dateBorn: z.date(),
  address: z.string().min(1).max(120),
  email: z.string().min(1).max(120),
  phone: z.string().min(1).max(120),
});

const PersonalDataForm = () => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PersonalData>({
    resolver: zodResolver(personalDataSchema),
  });

  return (
    <div className="mb-8 space-y-3">
      <div className="flex space-x-3">
        <div>
          <label className="block" htmlFor="name">
            Name:{" "}
          </label>
          <input className="text-box block" id="name" {...register("name")} />
          {errors.name?.message && <p>{errors.name?.message}</p>}

          <label className="block">
            Date Born:
            <input
              className="text-box block w-[100%]"
              type="date"
              {...register("dateBorn")}
            />
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
          {errors.surname?.message && <p>{errors.surname?.message}</p>}
        </div>
      </div>

      <label className="block">
        Address (street name and street number):
        <input className="text-box block w-[100%]" {...register("address")} />
      </label>

      <div className="flex space-x-3">
        <label className="block">
          Email:
          <input className="text-box block" {...register("email")} />
        </label>

        <label className="block">
          Phone number:
          <input className="text-box block" {...register("email")} />
        </label>
      </div>
    </div>
  );
};

type Report = {
  description: string;
};

export const reportSchema: z.ZodType<Report> = z.object({
  description: z.string().min(1).max(500),
});

const LawyerPage = () => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Report>({
    resolver: zodResolver(reportSchema),
  });

  const [anonymous, setAnonymous] = useState(false);

  const onSubmit = () => {};

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
        <label>Zostat v anonymite</label>
      </div>
      {!anonymous && <PersonalDataForm />}

      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="description"> Description: </label>
        <textarea
          id="description"
          className="text-box"
          {...register("description")}
        />
        {errors.description?.message && <p>{errors.description?.message}</p>}
      </form>
    </div>
  );
};

export default LawyerPage;

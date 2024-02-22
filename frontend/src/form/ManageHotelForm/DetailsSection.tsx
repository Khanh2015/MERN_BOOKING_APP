import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold mb-3">Add Hotel</h1>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Name
        <input
          {...register("name", { required: "This field is required" })}
          className="border rounded w-full py-2 px-4 font-normal"
          type="text"
        />
        {errors.name && (
          <span className="text-red-500 text-sm font-medium">
            {errors.name.message}
          </span>
        )}
      </label>

      <div className="flex gap-4">
        <label className="text-gray-700 text-sm font-bold flex-1">
          City
          <input
            {...register("city", { required: "This field is required" })}
            className="border rounded w-full py-2 px-4 font-normal"
            type="text"
          />
          {errors.city && (
            <span className="text-red-500 text-sm font-medium">
              {errors.city.message}
            </span>
          )}
        </label>

        <label className="text-gray-700 text-sm font-bold flex-1">
          Country
          <input
            {...register("country", { required: "This field is required" })}
            className="border rounded w-full py-2 px-4 font-normal"
            type="text"
          />
          {errors.country && (
            <span className="text-red-500 text-sm font-medium">
              {errors.country.message}
            </span>
          )}
        </label>
      </div>

      <label className="text-gray-700 text-sm font-bold flex-1">
        Description
        <textarea
          rows={10}
          {...register("description", { required: "This field is required" })}
          className="border rounded w-full py-2 px-4 font-normal"
        ></textarea>
        {errors.description && (
          <span className="text-red-500 text-sm font-medium">
            {errors.description.message}
          </span>
        )}
      </label>

      <label className="text-gray-700 text-sm font-bold max-w-[50%]">
        Price Per Night
        <input
          {...register("pricePerNight", { required: "This field is required" })}
          className="border rounded w-full py-2 px-4 font-normal"
          type="number"
        />
        {errors.pricePerNight && (
          <span className="text-red-500 text-sm font-medium">
            {errors.pricePerNight.message}
          </span>
        )}
      </label>

      <label className="text-gray-700 text-sm font-bold max-w-[50%]">
        Star Rating
        <select
          {...register("starRating", {
            required: "This field is required",
          })}
          className="border rounded-sm w-full p-2 text-gray-700 font-normal"
        >
          <option value="" className="text-sm font-bold">
            Select as Rating
          </option>
          {[1, 2, 3, 4, 5].map((number) => (
            <option key={number} value={number}>
              {number}
            </option>
          ))}
        </select>
        {errors.starRating && (
          <span className="text-red-500 text-sm font-medium">
            {errors.starRating.message}
          </span>
        )}
      </label>
    </div>
  );
};

export default DetailsSection;

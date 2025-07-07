"use client";

import { SORT_OPTIONS } from "@/constants";
import QueryParamController from "@/components/shared/QueryParamController";

import { Input } from "@/components/ui/form/input";
import { SelectWrapper } from "@/components/ui/form/select";

const SearchBots: React.FC = () => {
  return (
    <div className="flex items-center gap-5 max-lg:flex-col max-lg:items-start">
      <div className="flex-1 basis-7/12 max-lg:w-full max-lg:basis-full">
        <QueryParamController<string>
          paramKey="search"
          transform={{
            decode: (value: string | string[]) =>
              Array.isArray(value) ? value[0] || "" : value || "",
            encode: (value) => value,
          }}
        >
          {({ value, onChange }) => (
            <Input
              type="text"
              placeholder="Search bots...."
              value={value !== undefined ? value : ""}
              onChange={(event) => onChange(event.target.value)}
            />
          )}
        </QueryParamController>
      </div>

      <div className="flex-1 basis-1/12 max-lg:w-full max-lg:basis-full">
        <QueryParamController<string>
          paramKey="sort"
          transform={{
            decode: (value: string | string[]) =>
              Array.isArray(value) ? value[0] || "" : value || "",
            encode: (value) => value,
          }}
        >
          {({ value, onChange }) => (
            <SelectWrapper
              className="w-full"
              value={value}
              onChange={onChange}
              placeholder="Sort bots by"
              groups={[
                {
                  label: "Sort bots",
                  options: SORT_OPTIONS,
                },
              ]}
            />
          )}
        </QueryParamController>
      </div>
    </div>
  );
};

export default SearchBots;

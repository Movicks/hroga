// CoreValues.tsx

import { coreValuesDummy } from "./datas/coreValuesData";

export default function CoreValues() {
  return (
    <section className="flex w-full justify-center py-16 px-4 lg:px-[6rem] xl:px-[12.5rem]">
      <div className="flex w-full flex-wrap items-start justify-between gap-8">
        <div className="w-full rounded-2xl bg-[#6191db]/10 p-3 md:p-6 shadow-sm lg:flex-1">
          <h2 className="mb-2 mt-2 md:mt-0 md:mb-6 text-3xl font-bold text-slate-900 uppercase">
            Core Values
          </h2>

          <div className="space-y-6">
            {/* Values List */}
            <ol className="flex flex-wrap items-center md:gap-1">
              {coreValuesDummy.values.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-2 px-4 py-2"
                >
                  <span
                    className={`h-4 w-4 rounded-full bg-gradient-to-r ${item.color}`}
                  />
                  <span className="font-medium text-slate-700">
                    {item.title}
                  </span>
                </li>
              ))}

              <li className="px-2 py-1 rounded-sm font-bold bg-gradient-to-r from-[#6191db]/60 to-gray-200 text-black">
                {coreValuesDummy.acronym}
              </li>
            </ol>

            {/* Value Descriptions */}
            <ul className="list-inside list-disc space-y-3">
                {coreValuesDummy.values.map((value) => (
                    <li
                    key={value.id}
                    className="rounded-lg bg-white p-4 text-slate-700"
                    >
                    <span className="font-semibold text-slate-900">
                            {value.subtitle}
                    </span>{" "}
                    {value.description}
                    </li>
                ))}

                <li className="rounded-lg bg-white p-4 text-slate-700">
                    <span className="font-semibold text-slate-900">
                    {coreValuesDummy.deftUp.title}:
                    </span>{" "}
                    {coreValuesDummy.deftUp.description}
                </li>
            </ul>
          </div>
        </div>

        {/* Right Side Content */}
        {/* <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-blue-500 font-bold text-white">
          2
        </div> */}
      </div>
    </section>
  );
}
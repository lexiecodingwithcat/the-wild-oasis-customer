"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Filter() {
  //2.get data from the client side
  const searhParams = useSearchParams();
  const router = useRouter();
  //grasp the prefix of the URL
  const pathname = usePathname();

  //read current value for making current filter active
  const activeFilter = searhParams.get("capacity") ?? "all";

  function handleFilter(filter) {
    //get the date in the URL
    //1.web API to build the URL
    const params = new URLSearchParams(searhParams);
    params.set("capacity", filter);
    // 3.change the URL bar
    //scorll:false will make sure the page won't scoll back to the top
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }
  return (
    <div className="border border-primary-800 flex">
      <Button
        filter="all"
        activeFilter={activeFilter}
        handleFilter={handleFilter}
      >
        All cabins
      </Button>
      <Button
        filter="small"
        activeFilter={activeFilter}
        handleFilter={handleFilter}
      >
        1&mdash;3 cabins
      </Button>
      <Button
        filter="medium"
        activeFilter={activeFilter}
        handleFilter={handleFilter}
      >
        4&mdash;7 cabins
      </Button>
      <Button
        filter="large"
        activeFilter={activeFilter}
        handleFilter={handleFilter}
      >
        8&mdash;12 cabins
      </Button>
    </div>
  );
}

function Button({ filter, handleFilter, activeFilter, children }) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${
        activeFilter === filter ? "bg-primary-700 text-primary-50" : ""
      }`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}

export default Filter;

"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Filter() {
  //2.get data from the client side
  const searhParams = useSearchParams();
  const router = useRouter();
  //grasp the prefix of the URL
  const pathname = usePathname();
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
      <button
        className="px-5 py-2 hover:bg-primary-700"
        onClick={() => handleFilter("all")}
      >
        All cabins
      </button>
      <button
        className="px-5 py-2 hover:bg-primary-700"
        onClick={() => handleFilter("small")}
      >
        1&mdash;3 cabins
      </button>
      <button
        className="px-5 py-2 hover:bg-primary-700"
        onClick={() => handleFilter("medium")}
      >
        4&mdash;7 cabins
      </button>
      <button
        className="px-5 py-2 hover:bg-primary-700"
        onClick={() => handleFilter("large")}
      >
        8&mdash;12 cabins
      </button>
    </div>
  );
}

export default Filter;

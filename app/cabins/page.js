import { Suspense } from "react";
import CabinList from "@/app/_components/CabinList";
import Spinner from "@/app/_components/Spinner";
import Filter from "@/app/_components/Filter";

// since the page is static, the data cache and whole route cache will prevent the updated data at route level
//so we have to manually set up the re-validate data to 0
//this value cant be computed, should be a value, and always be seonds
// export const revalidate = 0;
// export const revalidate = 15;

export const metadata = {
  title: "Cabins",
};

export default async function Page({ searchParams }) {
  const { capacity } = await searchParams;

  const filter = capacity ?? "all"; //if the caspacity is null/ undefined, use all

  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>
      <div className="flex justify-end mb-8">
        <Filter />
      </div>
      {/* use suspence to partially spin the page */}
      {/* 2. put the component into Suspense */}
      {/* 3. pass a react component into the fallback function */}
      {/* we pass a unique key to the Suspence because it will not hide the already rendered content*/}
      <Suspense fallback={<Spinner />} key={filter}>
        {/* 1. wrap the data fetching function into a component  */}
        <CabinList filter={filter} />
      </Suspense>
    </div>
  );
}

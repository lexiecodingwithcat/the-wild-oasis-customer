import { getCabin, getCabins } from "@/app/_lib/data-service";
import Reservation from "@/app/_components/Reservation";
import { Suspense } from "react";
import Spinner from "@/app/_components/Spinner";
import Cabin from "@/app/_components/Cabin";

//this function will get access to the current paramas and able to generate dynamic metadata based on that
export async function generateMetadata({ params }) {
  const { cabinId } = await params;
  const { name } = await getCabin(cabinId);
  // const { name } = await getCabin(params.cabinId);
  return {
    title: `Cabin ${name}`,
  };
}

//this function will tell Next.js which params exist for this dynamic route
//make this page a static route,better for performance
export async function generateStaticParams() {
  const cabins = await getCabins();
  const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));
  // because we set the dynamic route as cabinId:"id", so we need to return the array contains the same format of it
  // console.log(ids);
  return ids;
}

export default async function Page({ params }) {
  const { cabinId } = await params;
  // const settings = await getSettings();
  // const bookedDates = await getBookedDatesByCabinId(cabinId);
  const cabin = await getCabin(cabinId);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />

      <div>
        <h2 className="text-5xl font-semibold text-center text-accent-400 mb-10">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}

// this loader will apply to the cabin routes and all sub routes
import Spinner from "@/app/_components/Spinner";
export default function Loading() {
  return (
    <div className="grid items-center justify-center">
    <Spinner />
    <p className="text-xl text-primary-200">Loading cabin data</p>
    </div>
  )
}

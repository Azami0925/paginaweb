import { AuditionForm } from "@/components/audition-form";
import { AuditionDetails } from "@/components/audition-details";
import { Header } from "@/components/header";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Header />
      <AuditionDetails />
      <AuditionForm />
      {/* Add FAQ or other sections here if needed */}
    </div>
  );
}

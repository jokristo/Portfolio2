import Portfolio from "@/components/Portfolio";
import { cvAvailable } from "@/lib/assets";

export default function Page() {
  return <Portfolio cvAvailable={cvAvailable()} />;
}

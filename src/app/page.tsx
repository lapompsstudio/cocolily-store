import Homepage from "@/components/pages/homepage/Homepage";

export const metadata = {
  title: "Cocolily",
  description:
    "Our mission is to celebrate sweetness and bring joy through every chocolate bite.",
  openGraph: {
    type: "website",
  },
};

export default function Home() {
  return <Homepage />;
}

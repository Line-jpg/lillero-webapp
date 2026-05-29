import Header from "../components/Header";
import Posts from "../components/opslag";
import "../opslag.css";

export default function AboutPage() {
  return (
    <>
      <Header />
      <Posts showTitle={false} />
    </>
  );
}

import About from "../components/About";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <div className="m-auto flex max-w-[1000px] flex-col">
        <About />
        <Footer />
      </div>
    </>
  );
}

export default Home;

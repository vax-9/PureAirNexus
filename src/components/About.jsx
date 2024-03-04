import { cleanAirSide, logoColorNoBackground } from "../assets/image";

function About() {
  return (
    <div className="mt-16">
      <img
        src={logoColorNoBackground}
        className="m-auto flex w-screen max-w-[600px] p-8"
        alt="PureAir Nexus logo"
      />
      <div className="m-5 rounded-lg pb-3 shadow">
        <img src={cleanAirSide} alt="" className="rounded-t-lg " />
        <h3 className="mt-4 text-center text-sm font-semibold">
          &quot;Breathe Safely, Live Sustainably.&quot;
        </h3>
      </div>
      <p className="m-5 py-5 text-justify md:text-center">
        PureAir Nexus is your global hub for monitoring carbon monoxide levels
        emitted by nations across the world.
        <br />
        <br />
        With our intuitive platform, stay connected to the air you breathe and
        actively contribute to a sustainable future.
        <br />
        <br />
        Join us in creating a safer, greener planet for generations to come.
      </p>
    </div>
  );
}

export default About;

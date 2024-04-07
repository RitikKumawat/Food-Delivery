import NavBar from "./NavBar";

function About() {
  return (
    <>
    <NavBar/>
    <div className="max-w-3xl mx-auto p-6 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">About Us</h1>
      <p className="text-lg text-gray-700 mb-4">
        Welcome to our company! We are a passionate team of individuals
        dedicated to providing top-notch products/services and making a positive
        impact in the world. Our journey began with a shared vision to develop
        crazy things that will impact the world, and we have been working
        tirelessly to turn that vision into reality.
      </p>
      <p className="text-lg text-gray-700 mb-4">
        At Anhar Technology, we believe in creativity. Our team is committed to
        delivering excellence, fostering innovation, and creating a positive
        experience for our customers.
      </p>
      <p className="text-lg text-gray-700 mb-4">
        Explore our website to learn more about our products/services, team
        members, and the values that drive us. Thank you for being a part of our
        journey!
      </p>
    </div>
    </>
  );
}

export default About;

const Hero = () => {
  return (
    <section className="w-full h-screen flex flex-col items-center justify-center text-center px-4 pt-20">
      <h2 className="text-4xl md:text-6xl font-bold mb-4 text-purple-600">Automated KYC Verification</h2>
      <p className="text-lg md:text-xl max-w-2xl text-gray-600">
        Fast, secure and reliable Know Your Customer (KYC) system built for modern businesses.
      </p>
      <button className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-xl text-lg shadow-md hover:opacity-90">Start Verification</button>
    </section>
  );
};

export default Hero;

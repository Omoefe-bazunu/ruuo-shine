"use client";

import Team from "@/components/Team";
import Image from "next/image";
import Link from "next/link";

// Define brand colors for easy reference in Tailwind JIT/configuration
const colors = {
  teal: "#4DB5AC",
  sage: "#5C7C6D",
  ochre: "#B7902E",
  offWhite: "#F7F7F7",
};

const missionImage = "/about.png";

export default function AboutUsContent() {
  return (
    // The main content container, excluding the header/footer
    <main className="bg-white">
      {/* Page Title & Breadcrumbs */}
      <div className=" bg-primary font-bricolage text-center py-8">
        <h1 className="text-3xl font-bold text-white mb-2">ABOUT US</h1>
        <nav className="text-white text-sm">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>{" "}
          {" > "}
          <span>About</span>
        </nav>
      </div>

      {/* 2. Mission Statement Section */}
      <section className="pt-8 pb-12 md:pt-8 md:pb-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-xl font-bold text-center font-bricolage text-primary mb-8 tracking-wider uppercase">
            Transforming Spaces. Empowering Lives.
          </h2>

          <div className="flex flex-col md:flex-row items-start md:space-x-12">
            {/* Mission Image/Text Wrapper */}
            <div className="w-full md:w-1/2 mb-8 md:mb-0 relative">
              {/* Image Group - Using a placeholder for the image block */}
              <div className="h-96 w-full flex justify-center items-center bg-gray-100 rounded-lg shadow-xl overflow-hidden">
                <Image
                  src={missionImage}
                  alt="RUUO SHINE team members working"
                  width={800}
                  height={600}
                  className="w-full h-auto object-contain"
                />
              </div>

              <div className="h-44 border-4 border-white rounded-xl -bottom-11 -right-2 md:-right-11 absolute w-44">
                <Image
                  src="/ABOUT4.jpeg"
                  alt="RUUO SHINE team members working"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>

            {/* Mission Statement Text */}
            <div className="w-full md:w-1/2">
              <h3 className="text-3xl font-bold text-primary font-bricolage mb-4">
                ABOUT US
              </h3>
              <p className="text-secondary leading-relaxed">
                Our mission is to meticulously craft and maintain genuinely
                radiant and healthy environments for homes and businesses,
                transforming every space into a foundation of pride, comfort,
                and enhanced productivity. We commit to delivering an expert,
                transparent, and hassle-free service experience, so that our
                clients are empowered to shine in the spaces they love.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The RUUO SHINE Process (Values as Process) - Dark Teal Background */}
      <section className="bg-primary py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Process Step 1 */}
          <div className="flex flex-col md:flex-row mb-10  text-white">
            <h3 className="text-lg font-extrabold flex-shrink-0 mb-4 md:mb-0 md:w-1/4">
              Consult & Customize: <br /> The Expert Assessment
            </h3>
            <div className="md:w-3/4 md:pl-16">
              <p className="leading-relaxed">
                We begin with an expert consultation to understand the unique
                science of your space. We don't offer generic packages; we craft
                a bespoke cleaning plan focused on your specific needs,
                meticulously addressing every detail, surface, and sanctuary
                area.
              </p>
            </div>
          </div>

          <hr className="border-t border-white border-opacity-30 my-6" />

          {/* Process Step 2 */}
          <div className="flex flex-col md:flex-row mb-10  text-white">
            <h3 className="text-lg font-extrabold flex-shrink-0 mb-4 md:mb-0 md:w-1/4">
              Execute with Precision: <br /> The Science of Shine
            </h3>
            <div className="md:w-3/4 md:pl-16">
              <p className="leading-relaxed">
                Our vetted professionals apply the latest techniques and
                eco-friendly technology. This step is defined by our core value
                of Ownership in Every Detail, ensuring a precise, methodical
                execution that goes beyond visible tidiness to deliver genuine
                sanitation and restoration.
              </p>
            </div>
          </div>

          <hr className="border-t border-white border-opacity-30 my-6" />

          {/* Process Step 3 */}
          <div className="flex flex-col md:flex-row text-white">
            <h3 className="text-lg font-extrabold flex-shrink-0 mb-4 md:mb-0 md:w-1/4">
              The Final Shine: <br /> Clarity and Guarantee
            </h3>
            <div className="md:w-3/4 md:pl-16">
              <p className="leading-relaxed">
                The job is complete only when the final result meets our
                rigorous RUUO SHINE Standard, a noticeably brilliant finish. We
                stand by our work with Clarity and Honesty, guaranteeing your
                ultimate satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Our Team Section - Dark Sage Green Background */}
      <section className="bg-gray-50 py-12 md:py-20">
        <Team />
      </section>

      {/* 5. Final Call to Action */}
      <section className="py-12 md:py-20 bg-white">
        <div className="text-center p-6 ">
          <h3 className="text-4xl font-bricolage text-primary font-semibold mb-2">
            Need an Expert Cleaning Service?
          </h3>
          <p className="text-secondary mb-4 text-sm">
            Let us tailor a cleaning solution for you. Contact us for a free
            consultation.
          </p>
          <Link
            href="/consultation"
            className="inline-block bg-cta text-white px-6 py-2 rounded-full hover:bg-primary transition-colors"
          >
            Book a Consultation
          </Link>
        </div>
      </section>
    </main>
  );
}

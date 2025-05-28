const ContactView = () => {
  return (
    <main className="w-full min-h-screen">
      {/* Structured data for local business */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "PT Sumber Artho Bersaudara",
          image: "", // Add your company logo URL here
          address: {
            "@type": "PostalAddress",
            streetAddress: "Cluster Bojong Permai Blok A No. 08",
            addressLocality: "Bojong Rawalumbu",
            addressRegion: "Jawa Barat",
            postalCode: "17116",
            addressCountry: "ID",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: "-6.284569",
            longitude: "106.996868",
          },
          url: "", // Add your website URL here
          telephone: "+622182436541",
          email: "support@sabers.co.id",
          openingHours: "Mo-Fr 09:00-17:00",
        })}
      </script>

      <article className="min-h-screen flex flex-col items-center">
        <div className="w-full max-w-7xl flex flex-col items-center py-10 px-4 lg:px-0 font-space">
          <h1 className="sr-only">Contact PT Sumber Artho Bersaudara</h1>

          <h2 className="lg:tracking-normal tracking-widest text-[16px] lg:text-[24px] text-primary font-medium mb-3.5 lg:opacity-80 lg:font-normal">
            WHERE YOU CAN FIND
          </h2>
          <h3 className="font-bold text-4xl text-secondary text-center lg:text-[64px] lg:opacity-80">
            PT Sumber Artho Bersaudara
          </h3>

          {/* Map Container */}
          <section
            aria-label="Company location on map"
            className="w-full mt-8 overflow-hidden"
          >
            <div className="relative pb-[80%] lg:pb-[56.25%] lg:mx-[9.5rem]">
              <iframe
                title="PT Sumber Artho Bersaudara Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.8414000335674!2d106.99686847070005!3d-6.284569047575479!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698dbb82ce9fef%3A0x406cc094ad8d5395!2sPT%20Sumber%20Artho%20Bersaudara!5e0!3m2!1sen!2sid!4v1745768162029!5m2!1sen!2sid"
                className="absolute top-0 left-0 w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 w-full mt-8 lg:mt-10">
            {/* Headquarter Section */}
            <section
              itemScope
              itemType="https://schema.org/PostalAddress"
              className="flex flex-col lg:ml-[9.5rem]"
            >
              <h4 className="font-bold font-space text-[32px] lg:text-[36px] mb-4">
                Headquarter
              </h4>

              <div className="flex items-start">
                <div className="mt-1 mr-4 flex-shrink-0" aria-hidden="true">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 256 256"
                    className="text-[#FE0000]"
                  >
                    <path
                      fill="currentColor"
                      d="M128 16a88.1 88.1 0 0 0-88 88c0 75.3 80 132.17 83.41 134.55a8 8 0 0 0 9.18 0C136 236.17 216 179.3 216 104a88.1 88.1 0 0 0-88-88m0 56a32 32 0 1 1-32 32a32 32 0 0 1 32-32"
                    />
                  </svg>
                </div>
                <address className="font-epilogue text-[18px] font-normal text-[#808080] not-italic">
                  <span itemProp="streetAddress">
                    Cluster Bojong Permai Blok A No. 08
                  </span>
                  , <span itemProp="addressLocality">Bojong Rawalumbu</span>,{" "}
                  <span itemProp="addressRegion">Kota Bekasi - Jawa Barat</span>{" "}
                  <span itemProp="postalCode">17116</span>
                </address>
              </div>
              <h4 className="mt-8 font-bold font-space text-[32px] lg:text-[36px] mb-4">
                Representative Office
              </h4>

              <div className="flex items-start">
                <div className="mt-1 mr-4 flex-shrink-0" aria-hidden="true">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 256 256"
                    className="text-[#FE0000]"
                  >
                    <path
                      fill="currentColor"
                      d="M128 16a88.1 88.1 0 0 0-88 88c0 75.3 80 132.17 83.41 134.55a8 8 0 0 0 9.18 0C136 236.17 216 179.3 216 104a88.1 88.1 0 0 0-88-88m0 56a32 32 0 1 1-32 32a32 32 0 0 1 32-32"
                    />
                  </svg>
                </div>
                <address className="font-epilogue text-[18px] font-normal text-[#808080] not-italic">
                  <span itemProp="streetAddress">
                    Jl. Klentengsari Raya No 1/A, Pedalangan, Banyumanik,
                    Semarang - Jawa Tengah 50268
                  </span>
                </address>
              </div>
            </section>

            {/* Contact Information Section */}
            <section className="flex flex-col">
              <h4 className="font-bold font-space text-[32px] lg:text-[36px] mb-4">
                Contact Information
              </h4>

              <div className="grid grid-cols-1 gap-4">
                {/* Phone Number */}
                <div className="flex items-center">
                  <div className="mr-4" aria-hidden="true">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      className="text-[#F24822]"
                    >
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M4.063 1.25h3.751a.75.75 0 0 1 .702.486l1.456 3.87a.75.75 0 0 1 .035.401l-.73 3.912c.897 2.108 2.378 3.525 4.833 4.796l3.865-.75a.75.75 0 0 1 .41.036l3.882 1.48a.75.75 0 0 1 .483.7v3.584c0 1.626-1.432 2.945-3.108 2.58c-3.053-.664-8.71-2.353-12.672-6.315c-3.796-3.795-5.068-9.037-5.495-11.87c-.245-1.618 1.052-2.91 2.588-2.91"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <a
                    href="tel:+622182436541"
                    className="font-epilogue text-[18px] font-normal text-[#808080] hover:text-primary transition-colors"
                    itemProp="telephone"
                  >
                    (+62) 21 82436541
                  </a>
                </div>

                {/* Email */}
                <div className="flex items-center">
                  <div className="mr-4" aria-hidden="true">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 32 32"
                      className="text-[#F24822]"
                    >
                      <path
                        fill="currentColor"
                        d="M2.004 9.303A4.5 4.5 0 0 1 6.5 5h19a4.5 4.5 0 0 1 4.496 4.303l-1.476.82L16 16.864L3.48 10.123zM2 11.588V22.5A4.5 4.5 0 0 0 6.5 27h19a4.5 4.5 0 0 0 4.5-4.5V11.588l-.526.293l-13 7a1 1 0 0 1-.948 0L2.514 11.874z"
                      />
                    </svg>
                  </div>
                  <a
                    href="mailto:support@sabers.co.id"
                    className="font-epilogue text-[18px] font-normal text-[#808080] hover:text-primary transition-colors"
                    itemProp="email"
                  >
                    tsupport@sabers.co.id
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </article>
    </main>
  );
};

export default ContactView;

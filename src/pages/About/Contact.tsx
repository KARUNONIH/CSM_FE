const BUSINESS_HOURS = [
  { day: 'Monday - Friday', time: '8 AM - 4 PM', isClosed: false },
  { day: 'Saturday', time: '8 AM - 1 PM', isClosed: false },
  { day: 'Sunday', time: 'Closed', isClosed: true },
];

const SECONDARY_OFFICES = [
  {
    title: 'Branch Office',
    address: 'Kawasan Industri KIIC East Ecospace II No. 2 Karawang 41361 Jawa Barat, Indonesia',
    qrUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=130x130&data=KIIC East Ecospace II No.2 Karawang 41361 Jawa Barat Indonesia',
    mapsUrl: 'https://maps.google.com/?q=KIIC+East+Ecospace+II+No.2+Karawang+41361+Jawa+Barat+Indonesia',
  },
];

const Contact = () => {
  return (
    <main className="w-full ">
      <section className="relative bg-gradient-to-r from-brm-green to-brm-green-2 text-white pt-20">
        <img src="/images/contact-img-1.png" alt="Main Office Building" className="absolute inset-0 w-full h-full object-cover opacity-25 md:opacity-60" />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <a href="https://maps.app.goo.gl/ABBJNmrr3hY8EC657" target="_blank" rel="noopener noreferrer" className="flex flex-row items-center gap-4 text-left group cursor-pointer my-4" title="Buka di Google Maps">
              <img src="/images/location-icon.png" alt="Location Icon" className="h-16 lg:h-24 w-auto object-contain transition-transform duration-300 group-hover:scale-110 shrink-0" />
              <div className="flex flex-row items-center gap-4">
                <div className="flex flex-col gap-2">
                  <h1 className="text-2xl font-bold group-hover:underline underline-offset-4 transition-all">Main Office</h1>
                  <p className="text-base leading-relaxed text-white/90 group-hover:text-white transition-colors">
                    Ruko Dharmawangsa Blok D-8/DC, <br />
                    Grand Taruna Karawang, Jawa Barat, Indonesia
                  </p>
                </div>
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=130x130&data=Ruko Dharmawangsa Blok D-8/DC Grand Taruna Karawang Jawa Barat Indonesia"
                  alt="QR Main Office"
                  className="bg-white p-2 rounded-lg shadow-md w-24 h-24 object-contain shrink-0"
                />
              </div>
            </a>

            <a href={SECONDARY_OFFICES[0].mapsUrl} target="_blank" rel="noopener noreferrer" className="flex flex-row items-center gap-4 text-left group cursor-pointer" title={`Buka ${SECONDARY_OFFICES[0].title} di Google Maps`}>
              <img src="/images/location-icon.png" alt="Location Icon" className="h-16 lg:h-24 w-auto object-contain transition-transform duration-300 group-hover:scale-110 shrink-0" />
              <div className="flex flex-row items-center gap-4">
                <div className="flex flex-col gap-2">
                  <h2 className="text-2xl font-bold group-hover:underline underline-offset-4 transition-all">{SECONDARY_OFFICES[0].title}</h2>
                  <p className="text-base leading-relaxed text-white/90 group-hover:text-white transition-colors">{SECONDARY_OFFICES[0].address}</p>
                </div>
                <img src={SECONDARY_OFFICES[0].qrUrl} alt={`QR ${SECONDARY_OFFICES[0].title}`} className="bg-white p-2 rounded-lg shadow-md w-24 h-24 object-contain shrink-0" />
              </div>
            </a>

          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="bg-[#FBF7F3] py-12 max-w-5xl mx-auto px-6 md:px-12 text-center rounded-2xl shadow-sm">
          <h2 className="text-3xl font-bold mb-10 bg-gradient-to-r from-brm-green to-brm-green-2 bg-clip-text text-transparent inline-block">Business Hours</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {BUSINESS_HOURS.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className={`w-full font-medium text-white rounded-full py-2 px-6 shadow-md mb-4 ${item.isClosed ? 'bg-gradient-to-r from-[#772824] to-[#C92D29]' : 'bg-gradient-to-r from-brm-green to-brm-green-2'}`}>{item.day}</div>
                <p className={`text-lg font-medium underline underline-offset-4 ${item.isClosed ? 'text-brm-maroon-2' : 'text-brm-green'}`}>{item.time}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;

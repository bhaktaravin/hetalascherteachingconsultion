import CalendarBooking from "./Calendar";

export default function Hero(){
    return (
    <>
    <section
  className="relative flex min-h-[65vh] items-center justify-center bg-cover bg-center px-4 py-16 sm:min-h-[68vh] sm:px-6 sm:py-28"
  style={{
    backgroundImage:
      "url('https://plus.unsplash.com/premium_photo-1672987719865-b34bae00f8a4?q=80&w=2021&auto=format&fit=crop')",
  }}
>
  <div className="absolute inset-0 bg-black/60" />

  <div className="relative mx-auto max-w-3xl text-center">
    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/80 sm:mb-4 sm:text-sm sm:tracking-[0.2em]">
      Educational Consulting
    </p>
    <h1 className="font-serif text-3xl font-bold tracking-tight text-white drop-shadow-md sm:text-5xl md:text-6xl">
      Hetal Ascher Consulting
    </h1>

    <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/85 sm:mt-5 sm:text-lg">
      Supporting schools, educators, and multilingual learners
    </p>
  </div>
</section>
  <CalendarBooking />
  </>

    );
}


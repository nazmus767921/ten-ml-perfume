import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"
import { ArrowRight } from "@phosphor-icons/react/dist/ssr"

const FAQS = [
  {
    question: "What is a perfume decant?",
    answer: "A perfume decant is a smaller sized vial or bottle of fragrance that is poured from the original designer bottle. It allows you to sample premium fragrances without committing to the full-size price tag."
  },
  {
    question: "Are your decants authentic?",
    answer: "Yes, absolutely. We guarantee 100% authenticity. All our decants are extracted directly from the original manufacturer bottles using sterile syringes to preserve the fragrance's integrity."
  },
  {
    question: "What sizes are available?",
    answer: "We specialize in our signature 10ml travel sizes, which provide approximately 120-150 sprays. We also offer select fragrances in 2ml sample sizes and 5ml sizes."
  },
  {
    question: "How long does delivery take?",
    answer: "Standard delivery typically takes 2-3 business days nationwide. Orders placed before 2 PM are processed and shipped the same day."
  },
  {
    question: "Can I return a decant if I don't like the scent?",
    answer: "Due to the nature of decanted fragrances and hygiene standards, we do not accept returns if you simply dislike the scent. We recommend trying smaller sizes first. We only accept returns if the item arrives damaged or incorrect."
  }
]

export default function FAQSection() {
  return (
    <section className="border-t border-black py-20 dark:border-white md:py-32">
      <div className="mx-auto flex max-w-7xl flex-col gap-16 px-6 md:px-10 lg:flex-row lg:gap-24">
        
        {/* Left Column: Heading & CTA */}
        <div className="flex w-full flex-col items-start lg:w-1/3 lg:sticky lg:top-32 lg:h-fit">
          <h2 className="text-[clamp(3rem,6vw,5rem)] font-black leading-[0.85] tracking-tighter uppercase">
            Got<br />Questions?
          </h2>
          <p className="mt-6 max-w-sm text-sm font-bold tracking-widest text-black/60 dark:text-white/60 uppercase">
            Everything you need to know about our products and services.
          </p>
          
          <Link 
            href="/contact" 
            className="group mt-12 inline-flex w-fit items-center gap-4 border-2 border-black px-8 py-4 text-sm font-black tracking-widest uppercase transition-all hover:bg-black hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-black"
          >
            Contact Us
            <ArrowRight className="size-5 transition-transform group-hover:translate-x-2" weight="bold" />
          </Link>
        </div>

        {/* Right Column: Accordion */}
        <div className="w-full lg:w-2/3">
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((faq, index) => {
              const num = (index + 1).toString().padStart(2, "0")
              return (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border-b border-black/20 dark:border-white/20 not-last:border-b"
                >
                  <AccordionTrigger className="group py-6 hover:no-underline md:py-8">
                    <div className="flex items-center gap-6 text-left md:gap-10">
                      {/* Decorative Number */}
                      <span className="font-serif text-3xl font-black italic text-black/20 transition-colors group-hover:text-black dark:text-white/20 dark:group-hover:text-white md:text-5xl">
                        {num}
                      </span>
                      <span className="text-lg font-black tracking-widest uppercase md:text-2xl">
                        {faq.question}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-8 pl-16 pr-4 md:pl-[6.5rem]">
                    <p className="text-base font-medium leading-relaxed text-black/70 dark:text-white/70 md:text-lg">
                      {faq.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

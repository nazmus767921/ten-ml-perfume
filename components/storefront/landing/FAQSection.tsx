import SectionHeader from "@/components/storefront/landing/SectionHeader"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"

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
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <SectionHeader label="FAQ" />
        <div className="px-6 md:px-10">
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-sm tracking-wide md:text-base">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                  <p>{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="mt-12 flex justify-center">
            <Link 
              href="/contact" 
              className="group flex items-center gap-2 text-sm font-semibold tracking-wider uppercase transition-colors hover:text-black/70 dark:hover:text-white/70"
            >
              Still have questions? Contact us
              <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Carousel, CarouselItem } from "@/components/ui/carousel";
import { CarouselContent } from "@/components/ui/carousel";
import companies from "../data/companies.json";
import Autoplay from "embla-carousel-autoplay";
import { Card } from "@/components/ui/card";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import faqs from "../data/faq.json";
import { Accordion } from "@/components/ui/accordion";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
const Landingpage = () => {
  return (
    <main className="flex flex-col gap-10 sm:gap-20 py-10 sm:py-20">
      <section className="text-center px-4 max-w-4xl mx-auto">
        <h1 className="gradient text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
          Find Your Dream Job Faster
        </h1>

        <p className="mt-5 text-muted-foreground text-sm sm:text-lg">
          WorkHire connects you with verified employers and real opportunities —
          search jobs, apply instantly, and grow your career.
        </p>
      </section>

      <div className="flex justify-center gap-4 sm:gap-6 flex-wrap">
        <Link to="/jobs">
          <Button variant="blue" size="lg" className="px-6">
            Get Job
          </Button>
        </Link>

        <Link to="/postjobs">
          <Button variant="destructive" size="lg" className="px-6">
            Post Job
          </Button>
        </Link>
      </div>

      <Carousel
        className="w-full max-w-6xl mx-auto py-8"
        plugins={[Autoplay({ delay: 2000 })]}
      >
        <CarouselContent className="flex items-center gap-6">
          {companies.map(({ name, id, path }) => (
            <CarouselItem
              key={id}
              className="basis-1/2 sm:basis-1/4 lg:basis-1/6 flex justify-center"
            >
              <img
                src={path}
                alt={name}
                className="h-8 sm:h-10 object-contain opacity-80 hover:opacity-100 transition"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="w-full flex justify-center h-160 ">
        <img
          src="/girlbg.png"
          alt="banner"
          className="w-full max-w-5xl rounded-2xl"
        />
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
        <Card>
          <CardHeader>
            <CardTitle>For Job Seekers</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Search and apply for jobs, track your applications, and get
              personalized job recommendations.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>For Employers</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Post job listings, manage applications, and find the perfect
              candidates for your team.
            </p>
          </CardContent>
        </Card>
      </section>
      <Accordion
        type="single"
        collapsible
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-0"
      >
        {faqs.map((faq, index) => {
          return (
            <AccordionItem key={index} value={`item-${index + 1}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </main>
  );
};

export default Landingpage;

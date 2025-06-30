import { Avatar, AvatarFallback, AvatarImage } from "../../_components/ui/avatar";

export default function TestimonialSection() {
  return (
    <div className="space-y-6 py-12 bg-muted/60 m-auto px-4">
      <h2 className="text-xl md:text-2xl font-semibold text-center tracking-tight md:w-4/6 mx-auto text-balance">
        &ldquo;Partnering with creators through Passionfroot has been a
        game-changer for Intercom&rsquo;s Startup program. By collaborating with
        top newsletters, we&rsquo;ve reached thousands of founders.&rdquo;
      </h2>
      <div className="flex gap-3 items-center justify-center">
        <Avatar className="size-10">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>OP</AvatarFallback>
        </Avatar>
        <p className="text-muted-foreground/80 text-sm tracking-tight leading-tight font-medium">
          <span className="block text-foreground font-semibold text-base">
            John Roche
          </span>{" "}
          Startups and VC Partnerships at Intercom
        </p>
      </div>
    </div>
  );
} 
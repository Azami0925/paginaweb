"use client";

import { Button } from "@/components/ui/button";
import { Music, Sparkles } from "lucide-react";

export function Header() {
  const scrollToVerification = () => {
    const element = document.getElementById("verificacion-correo");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-secondary/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none flex items-center justify-center gap-2">
              <Sparkles className="h-8 w-8 md:h-10 md:w-10 text-primary" />
              LA NUEVA ERA COMIENZA
              <Music className="h-8 w-8 md:h-10 md:w-10 text-primary" />
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Forma parte de la nueva era de Novae entretenimiento. Demuestra tu talento y únete a nosotros.
            </p>
          </div>
          <div className="space-x-4">
            <Button size="lg" onClick={scrollToVerification}>Aplicar ahora</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

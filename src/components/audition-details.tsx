"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Mic, Guitar, Disc3, UserCheck, Info } from "lucide-react";

export function AuditionDetails() {
    const scrollToVerification = () => {
        const element = document.getElementById("verificacion-correo");
        if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        }
    };

  return (
    <section id="audicion-en-curso" className="container px-4 md:px-6">
       <Card className="w-full max-w-3xl mx-auto shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold flex items-center justify-center gap-2">
            <Disc3 className="h-8 w-8 text-primary" /> Audición en curso
          </CardTitle>
          <CardDescription>Detalles de la audición actual de NOVAE Entretenimiento.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
             <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                {/* Changed <p> to <div> to fix hydration error (div cannot be child of p) */}
                <div>
                    <strong className="font-semibold mr-1">Categorías:</strong>
                    <Badge variant="secondary" className="ml-1">Baile</Badge>
                    <Badge variant="secondary" className="ml-1">Canto</Badge>
                    <Badge variant="secondary" className="ml-1">Rap</Badge>
                 </div>
             </div>
             <div className="flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-primary" />
                <p><strong className="font-semibold">Género:</strong> Todos</p>
            </div>
             <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" />
                <p><strong className="font-semibold">Edad:</strong> 12 a 24 años</p>
             </div>
             <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <p><strong className="font-semibold">Periodo de evaluación:</strong> Mensual</p>
             </div>
             <div className="flex items-center gap-2 col-span-1 md:col-span-2">
                <Info className="h-5 w-5 text-primary" />
                <p><strong className="font-semibold">Número máximo de solicitudes:</strong> 1 por persona</p>
             </div>
           </div>

          <div className="flex justify-center mt-6">
            <Button size="lg" onClick={scrollToVerification}>Aplicar a esta audición</Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

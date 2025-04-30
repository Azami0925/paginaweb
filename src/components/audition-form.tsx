"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Key, User, Calendar, ListMusic, Camera, Link as LinkIcon, Send, Loader2 } from 'lucide-react';
import { sendVerificationCode, verifyCode } from '@/services/email-verification';
import { useToast } from "@/hooks/use-toast";

// Define Zod schemas for each step
const emailSchema = z.object({
  email: z.string().email({ message: "Por favor, introduce un correo electrónico válido." }),
});

const verificationSchema = z.object({
  code: z.string().min(6, { message: "El código debe tener al menos 6 caracteres." }), // Assuming a 6-digit code
});

const auditionSchema = z.object({
  fullName: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  age: z.coerce.number().min(12, { message: "Debes tener al menos 12 años." }).max(24, { message: "Debes tener máximo 24 años." }),
  email: z.string().email(), // Email is carried over, already verified
  category: z.enum(["vocal", "baile", "rap"], { required_error: "Selecciona una categoría." }),
  photo: z.instanceof(File).refine(file => file.size > 0, "Se requiere una foto de perfil.").refine(file => file.type.startsWith("image/"), "El archivo debe ser una imagen."),
  video: z.instanceof(File).optional(),
  link: z.string().url({ message: "Por favor, introduce una URL válida." }).optional(),
}).refine(data => data.video || data.link, {
  message: "Debes proporcionar un video o un enlace.",
  path: ["video"], // Attach the error message to the video field for simplicity
});

type EmailFormValues = z.infer<typeof emailSchema>;
type VerificationFormValues = z.infer<typeof verificationSchema>;
type AuditionFormValues = z.infer<typeof auditionSchema>;

export function AuditionForm() {
  const [step, setStep] = React.useState(1); // 1: Email, 2: Verification, 3: Audition Form
  const [verifiedEmail, setVerifiedEmail] = React.useState<string | null>(null);
  const [isEmailLoading, setIsEmailLoading] = React.useState(false);
  const [isVerificationLoading, setIsVerificationLoading] = React.useState(false);
  const [isSubmissionLoading, setIsSubmissionLoading] = React.useState(false);
  const { toast } = useToast();

  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const verificationForm = useForm<VerificationFormValues>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      code: "",
    },
  });

  const auditionForm = useForm<AuditionFormValues>({
    resolver: zodResolver(auditionSchema),
    defaultValues: {
      fullName: "",
      age: undefined, // Start with undefined for number input
      email: "", // Will be populated after verification
      category: undefined, // Start with undefined for select
      photo: undefined,
      video: undefined,
      link: "",
    },
  });

  // Reset audition form when email changes or verification fails
   React.useEffect(() => {
    if (step !== 3) {
      auditionForm.reset();
    } else if (verifiedEmail) {
        // Populate email in audition form once verified
        auditionForm.setValue("email", verifiedEmail);
    }
  }, [step, verifiedEmail, auditionForm]);

  const handleSendCode = async (data: EmailFormValues) => {
    setIsEmailLoading(true);
    try {
      await sendVerificationCode(data.email);
      setVerifiedEmail(data.email); // Store email temporarily for verification step
      setStep(2);
      toast({
        title: "Código enviado",
        description: `Se ha enviado un código de verificación a ${data.email}.`,
      });
    } catch (error) {
      console.error("Error sending verification code:", error);
      toast({
        title: "Error",
        description: "No se pudo enviar el código de verificación. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
        setIsEmailLoading(false);
    }
  };

  const handleVerifyCode = async (data: VerificationFormValues) => {
      if (!verifiedEmail) return; // Should not happen, but safeguard
    setIsVerificationLoading(true);
    try {
      const isValid = await verifyCode(verifiedEmail, data.code);
      if (isValid) {
        setStep(3); // Proceed to audition form
        auditionForm.setValue("email", verifiedEmail); // Set verified email in audition form
         toast({
          title: "Correo verificado",
          description: "Tu correo electrónico ha sido verificado con éxito.",
        });
      } else {
        verificationForm.setError("code", { type: "manual", message: "Código de verificación inválido." });
        toast({
          title: "Código inválido",
          description: "El código de verificación introducido no es correcto.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error verifying code:", error);
       toast({
        title: "Error",
        description: "No se pudo verificar el código. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
        setIsVerificationLoading(false);
    }
  };

 const handleAuditionSubmit = async (data: AuditionFormValues) => {
    setIsSubmissionLoading(true);
    console.log("Audition Data Submitted:", data);

    // TODO: Replace with actual API call to submit the form data
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

    try {
        // Simulate a successful submission
        toast({
            title: "Audición enviada",
            description: "Tu audición fue enviada correctamente. Espera los resultados.",
        });
        // Optionally reset the form or redirect the user
        auditionForm.reset();
        setStep(1); // Go back to email step or a success message step
        setVerifiedEmail(null);


    } catch (error) {
        console.error("Error submitting audition:", error);
        toast({
            title: "Error al enviar",
            description: "Hubo un problema al enviar tu audición. Por favor, inténtalo de nuevo.",
            variant: "destructive",
        });
    } finally {
        setIsSubmissionLoading(false);
    }
};


  return (
     <section id="verificacion-correo" className="container px-4 md:px-6">
      <Card className="w-full max-w-3xl mx-auto shadow-lg transition-all duration-500 ease-in-out">
        {step === 1 && (
          <>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold flex items-center justify-center gap-2">
                <Mail className="h-8 w-8 text-primary" /> Verificación de correo
              </CardTitle>
              <CardDescription>Escribe tu correo electrónico para recibir un código de verificación.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...emailForm}>
                <form onSubmit={emailForm.handleSubmit(handleSendCode)} className="space-y-6">
                  <FormField
                    control={emailForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Correo electrónico</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="correo@ejemplo.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isEmailLoading}>
                    {isEmailLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Enviar código
                  </Button>
                </form>
              </Form>
            </CardContent>
          </>
        )}

        {step === 2 && (
          <>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold flex items-center justify-center gap-2">
                <Key className="h-8 w-8 text-primary" /> Introduce el código
              </CardTitle>
              <CardDescription>Ingresa el código de verificación enviado a {verifiedEmail}.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...verificationForm}>
                <form onSubmit={verificationForm.handleSubmit(handleVerifyCode)} className="space-y-6">
                  <FormField
                    control={verificationForm.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Código de verificación</FormLabel>
                        <FormControl>
                          <Input type="text" placeholder="Código de 6 dígitos" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button type="button" variant="outline" onClick={() => setStep(1)} className="w-full sm:w-auto">
                      Cambiar correo
                    </Button>
                     <Button type="submit" className="w-full sm:flex-1" disabled={isVerificationLoading}>
                       {isVerificationLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                       Verificar
                    </Button>
                  </div>

                </form>
              </Form>
            </CardContent>
          </>
        )}

        {step === 3 && (
          <>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold flex items-center justify-center gap-2">
                <ListMusic className="h-8 w-8 text-primary" /> Formulario de Audición
              </CardTitle>
              <CardDescription>Completa tus datos y sube tu audición.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...auditionForm}>
                <form onSubmit={auditionForm.handleSubmit(handleAuditionSubmit)} className="space-y-6">
                  {/* Personal Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={auditionForm.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-1"><User className="h-4 w-4" />Nombre completo</FormLabel>
                          <FormControl>
                            <Input placeholder="Tu nombre completo" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={auditionForm.control}
                      name="age"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-1"><Calendar className="h-4 w-4" />Edad</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Tu edad" {...field} />
                          </FormControl>
                           <FormDescription>
                             Debes tener entre 12 y 24 años.
                           </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Email (Readonly) */}
                    <FormField
                      control={auditionForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-1"><Mail className="h-4 w-4" />Correo electrónico</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} readOnly className="bg-muted/50 cursor-not-allowed" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                  {/* Category */}
                  <FormField
                    control={auditionForm.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-1"><ListMusic className="h-4 w-4" />Categoría de audición</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona una categoría" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="vocal">Canto</SelectItem>
                            <SelectItem value="baile">Baile</SelectItem>
                            <SelectItem value="rap">Rap</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Media Uploads */}
                  <FormField
                    control={auditionForm.control}
                    name="photo"
                    render={({ field: { onChange, value, ...rest } }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-1"><Camera className="h-4 w-4" />Foto de perfil (imagen)</FormLabel>
                        <FormControl>
                           <Input
                             type="file"
                             accept="image/*"
                             onChange={(e) => onChange(e.target.files ? e.target.files[0] : null)}
                             {...rest}
                           />
                        </FormControl>
                         <FormDescription>
                            Sube una foto clara de tu rostro.
                         </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                 <div className="space-y-2">
                    <FormLabel className="flex items-center gap-1"><LinkIcon className="h-4 w-4" />Audición (video o enlace)</FormLabel>
                     <FormField
                        control={auditionForm.control}
                        name="video"
                        render={({ field: { onChange, value, ...rest } }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="file"
                                accept="video/*"
                                onChange={(e) => onChange(e.target.files ? e.target.files[0] : null)}
                                {...rest}
                              />
                            </FormControl>
                             <FormDescription>
                                Sube un archivo de video de tu audición.
                             </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    <div className="relative flex items-center my-2">
                        <div className="flex-grow border-t border-muted"></div>
                        <span className="flex-shrink mx-4 text-muted-foreground text-xs">o</span>
                        <div className="flex-grow border-t border-muted"></div>
                    </div>
                    <FormField
                        control={auditionForm.control}
                        name="link"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input type="url" placeholder="Link de YouTube, Drive, etc." {...field} />
                            </FormControl>
                            <FormDescription>
                                Pega un enlace a tu video de audición.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                 </div>


                  <Button type="submit" className="w-full" disabled={isSubmissionLoading}>
                    {isSubmissionLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    <Send className="mr-2 h-4 w-4" /> Enviar Audición
                  </Button>
                </form>
              </Form>
            </CardContent>
          </>
        )}
      </Card>
    </section>
  );
}

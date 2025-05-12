// Para Next.js con App Router (app/api/mail/route.js)
import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs/promises'; // Usar la versión asíncrona
import { NextResponse, NextRequest } from 'next/server';
import validator from 'validator'; // Librería para validar emails

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();

        if (!email || !validator.isEmail(email)) {
            return NextResponse.json({ error: 'El correo electrónico es obligatorio y debe ser válido' }, { status: 400 });
        }

        const htmlTemplatePath = path.join(process.cwd(), 'public', 'correo.html');
        const htmlContent = await fs.readFile(htmlTemplatePath, 'utf-8');

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            },
            replyTo: 'barlovento.team@gmail.com',
            headers: {
                'X-Mailer': 'Nodemailer',
            }
        });

        const dynamicText = `Estimado comerciante,
        Queremos presentarte Barlovento, una plataforma para ayudar a los comercios locales a tener mayor visibilidad digital...
        Este correo fue enviado a ${email}. Si no deseas recibir más correos, haz clic aquí: https://barlovento.com/baja?email=${email}`;

        const mailOptions = {
            from: '"Equipo Barlovento" <barlovento.team@gmail.com>',
            to: email,
            subject: '¡Activa tu tienda local en línea con Barlovento! Disfruta de 14 días de prueba',
            text: dynamicText,
            html: htmlContent,
        };

        // Enviar el correo
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Error al enviar el correo:', error);

        let errorMessage = 'Error desconocido';
        if (error instanceof Error && 'code' in error) {
            if (typeof (error as { code?: unknown }).code === 'string') {
                errorMessage = `Código de error: ${(error as { code: string }).code}`;
            }
        }

        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}


import emailjs from '@emailjs/browser';
import axiosConfig from "../utils/axiosConfig.ts";

emailjs.init('0CSAbJ96NsnpBDP02');

export interface EmailData {
    customerEmail: string;
    movieTitle: string;
    date: string;
    time: string;
    seats: string[];
    totalPrice: number;
    bookingCode: string;
    customerName?: string;
    phoneNumber?: string;
}

export const sendTicketEmail = async (emailData: EmailData) => {
    try {
        const templateParams = {
            to_email: emailData.customerEmail,
            to_name: emailData.customerName || 'Quý khách',
            movie_title: emailData.movieTitle,
            date: emailData.date,
            time: emailData.time,
            seats: emailData.seats.join(', '),
            total_price: emailData.totalPrice.toLocaleString('vi-VN'),
            booking_code: emailData.bookingCode,
            seat_count: emailData.seats.length,
            customer_email: emailData.customerEmail,
            customer_phone: emailData.phoneNumber || 'Chưa cung cấp'
        };

        await emailjs.send(
            'service_1j93jlg',
            'template_q77362d',
            templateParams
        );

        await saveBookingToDB(emailData);
        //
    } catch (error) {
        await saveBookingToDB(emailData);
        //
    }
};

export const sendOtpEmail = async (toEmail: string, otpCode: string) => {
    try {
        const templateParams = {
            to_email: toEmail,
            otp_code: otpCode,
        };

        await emailjs.send(
            'service_1j93jlg',
            'template_b8mhtt7',
            templateParams
        );

        return { success: true };
    } catch (error) {
        return { success: false, error };
    }
};

const saveBookingToDB = async (bookingData: EmailData) => {
    try {
        await axiosConfig.post('/bookings', {
            ...bookingData,
            createdAt: new Date().toISOString(),
            status: 'confirmed',
            emailSent: true,
        });
    } catch (error) {
        //
    }
};

export const generateBookingCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `BOOK-${code}-${Date.now().toString().slice(-4)}`;
};
// lib/firestore.ts
import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";

export interface Appointment {
  id?: string;
  fullName: string;
  phone: string;
  age: string;
  gender: string;
  service: string;
  doctor: string;
  visitType: string;
  date: string;
  time: string;
  notes?: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt?: Timestamp;
}

const COLLECTION = "appointments";

/** Save a new appointment to Firestore */
export async function addAppointment(
  data: Omit<Appointment, "id" | "createdAt" | "status">
): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...data,
    status: "pending",
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

/** Fetch all appointments (for admin view) */
export async function getAppointments(): Promise<Appointment[]> {
  const q = query(collection(db, COLLECTION), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Appointment, "id">),
  }));
}

/** Build WhatsApp message URL for a booking */
export function buildWhatsAppUrl(data: Omit<Appointment, "id" | "createdAt" | "status">): string {
  const phone = "919673709322"; // Clinic WhatsApp number
  const message = encodeURIComponent(
    `🏥 *New Appointment Request*\n\n` +
    `*Patient:* ${data.fullName}\n` +
    `*Phone:* +91 ${data.phone}\n` +
    `*Age:* ${data.age} | *Gender:* ${data.gender}\n` +
    `*Service:* ${data.service}\n` +
    `*Doctor:* ${data.doctor}\n` +
    `*Type:* ${data.visitType}\n` +
    `*Date:* ${data.date}\n` +
    `*Time:* ${data.time}` +
    (data.notes ? `\n*Notes:* ${data.notes}` : "")
  );
  return `https://wa.me/${phone}?text=${message}`;
}

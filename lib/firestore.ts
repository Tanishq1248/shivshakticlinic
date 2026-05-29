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
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  where,
  QueryConstraint,
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

/** Subscribe to real-time appointment updates */
export function subscribeToAppointments(
  callback: (appointments: Appointment[]) => void,
  filter?: "pending" | "confirmed" | "cancelled" | "all"
): () => void {
  const constraints: QueryConstraint[] = [orderBy("createdAt", "desc")];
  if (filter && filter !== "all") {
    constraints.unshift(where("status", "==", filter));
  }
  const q = query(collection(db, COLLECTION), ...constraints);
  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map((d) => ({
      id: d.id,
      ...(d.data() as Omit<Appointment, "id">),
    }));
    callback(data);
  });
}

/** Update appointment status */
export async function updateAppointmentStatus(
  id: string,
  status: "pending" | "confirmed" | "cancelled"
): Promise<void> {
  await updateDoc(doc(db, COLLECTION, id), { status });
}

/* ═══════════════════════════════════════════
   REFERRALS
═══════════════════════════════════════════ */

export type ReferralStatus = "pending" | "report-received" | "completed";
export type ReferralType =
  | "MRI Scan"
  | "Blood Test"
  | "ECG"
  | "Ultrasound"
  | "X-Ray"
  | "CT Scan"
  | "Other";

export interface Referral {
  id?: string;
  refNo: string;          // e.g. REF-9921-A
  patientName: string;
  referredTo: string;     // e.g. City Diagnostic Center
  type: ReferralType | string;
  status: ReferralStatus;
  date: string;           // ISO YYYY-MM-DD
  notes?: string;
  createdAt?: Timestamp;
}

const REF_COLLECTION = "referrals";

/** Generate a reference number */
export function generateRefNo(): string {
  const num = Math.floor(1000 + Math.random() * 9000);
  const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  return `REF-${num}-${letter}`;
}

/** Add a new referral */
export async function addReferral(
  data: Omit<Referral, "id" | "createdAt">
): Promise<string> {
  const docRef = await addDoc(collection(db, REF_COLLECTION), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

/** Subscribe to real-time referral updates */
export function subscribeToReferrals(
  callback: (referrals: Referral[]) => void
): () => void {
  const q = query(collection(db, REF_COLLECTION), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map((d) => ({
      id: d.id,
      ...(d.data() as Omit<Referral, "id">),
    }));
    callback(data);
  });
}

/** Update referral status */
export async function updateReferralStatus(
  id: string,
  status: ReferralStatus
): Promise<void> {
  await updateDoc(doc(db, REF_COLLECTION, id), { status });
}

/** Delete a referral */
export async function deleteReferral(id: string): Promise<void> {
  await deleteDoc(doc(db, REF_COLLECTION, id));
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

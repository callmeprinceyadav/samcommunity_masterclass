import Registration, { IRegistration } from '@/models/Registration'

// Generate unique ID: SAM-TEOF-XXXX
export async function generateUniqueId(): Promise<string> {
  // Get the count of existing registrations
  const count = await Registration.countDocuments()
  const nextNumber = count + 1
  
  // Format as SAM-TEOF-0001, SAM-TEOF-0002, etc.
  const uniqueId = `SAM-TEOF-${String(nextNumber).padStart(4, '0')}`
  
  // Check if this ID already exists (shouldn't happen, but safety check)
  const existing = await Registration.findOne({ uniqueId })
  
  if (existing) {
    // If somehow exists, use timestamp-based fallback
    return `SAM-TEOF-${Date.now().toString().slice(-4)}`
  }
  
  return uniqueId
}

export async function findRegistrationByEmail(email: string): Promise<IRegistration | null> {
  return await Registration.findOne({ email: email.toLowerCase() })
}

export interface RegistrationData {
  fullName: string
  email: string
  whatsapp: string
  alternatePhone?: string
  currentRole: string
  skillLevel: string
  domainInterest: string[]
  previousAttendance: string
  previousTopics?: string
  expectations: string
  referralSource: string
  consent: boolean
}

export async function createRegistration(data: RegistrationData): Promise<IRegistration> {
  // Generate unique ID
  const uniqueId = await generateUniqueId()
  
  // Create new registration
  const registration = new Registration({
    uniqueId,
    fullName: data.fullName.trim(),
    email: data.email.toLowerCase().trim(),
    whatsapp: data.whatsapp.trim(),
    alternatePhone: data.alternatePhone?.trim(),
    currentRole: data.currentRole,
    skillLevel: data.skillLevel,
    domainInterest: data.domainInterest,
    previousAttendance: data.previousAttendance,
    previousTopics: data.previousTopics?.trim(),
    expectations: data.expectations.trim(),
    referralSource: data.referralSource,
    consent: data.consent,
  })

  await registration.save()
  
  return registration
}



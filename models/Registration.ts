import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IRegistration extends Document {
  uniqueId: string
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
  registeredAt: Date
  createdAt: Date
  updatedAt: Date
}

const RegistrationSchema: Schema = new Schema({
  uniqueId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    index: true,
  },
  whatsapp: {
    type: String,
    required: [true, 'WhatsApp number is required'],
    trim: true,
    index: true,
  },
  alternatePhone: {
    type: String,
    trim: true,
  },
  currentRole: {
    type: String,
    required: [true, 'Current role is required'],
    enum: ['student', 'job-seeker', 'working-professional', 'freelancer', 'other'],
  },
  skillLevel: {
    type: String,
    required: [true, 'Skill level is required'],
    enum: ['beginner', 'intermediate', 'advanced'],
  },
  domainInterest: {
    type: [String],
    required: [true, 'At least one domain interest is required'],
  },
  previousAttendance: {
    type: String,
    required: [true, 'Previous attendance information is required'],
    enum: ['yes', 'no'],
  },
  previousTopics: {
    type: String,
    trim: true,
  },
  expectations: {
    type: String,
    required: [true, 'Expectations are required'],
    maxlength: [500, 'Expectations cannot exceed 500 characters'],
  },
  referralSource: {
    type: String,
    required: [true, 'Referral source is required'],
    enum: ['social-media', 'friend', 'email', 'website', 'community', 'other'],
  },
  consent: {
    type: Boolean,
    required: [true, 'Consent is required'],
    default: false,
  },
  registeredAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
}, {
  timestamps: true,
})

// Create indexes for better query performance
RegistrationSchema.index({ email: 1 })
RegistrationSchema.index({ uniqueId: 1 })
RegistrationSchema.index({ whatsapp: 1 })
RegistrationSchema.index({ registeredAt: -1 })

const Registration: Model<IRegistration> = 
  mongoose.models.Registration || mongoose.model<IRegistration>('Registration', RegistrationSchema)

export default Registration



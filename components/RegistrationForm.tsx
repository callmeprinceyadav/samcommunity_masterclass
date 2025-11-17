'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

export default function RegistrationForm() {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    countryCode: '+91',
    whatsapp: '',
    alternateCountryCode: '+91',
    alternatePhone: '',
    currentRole: '',
    skillLevel: '',
    domainInterest: [] as string[],
    previousAttendance: '',
    previousTopics: '',
    expectations: '',
    referralSource: '',
    consent: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim() || formData.fullName.length < 2) {
      newErrors.fullName = 'Full name is required (minimum 2 characters)'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = 'WhatsApp number is required'
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.whatsapp.replace(/\s/g, ''))) {
      newErrors.whatsapp = 'Please enter a valid 10-digit phone number'
    }

    if (formData.alternatePhone && !/^\+?[\d\s-]{10,}$/.test(formData.alternatePhone.replace(/\s/g, ''))) {
      newErrors.alternatePhone = 'Please enter a valid 10-digit phone number'
    }

    if (!formData.currentRole) {
      newErrors.currentRole = 'Please select your current role'
    }

    if (!formData.skillLevel) {
      newErrors.skillLevel = 'Please select your skill level'
    }

    if (formData.domainInterest.length === 0) {
      newErrors.domainInterest = 'Please select at least one domain of interest'
    }

    if (!formData.previousAttendance) {
      newErrors.previousAttendance = 'Please answer this question'
    }

    if (!formData.expectations.trim()) {
      newErrors.expectations = 'Please share your expectations from this session'
    }

    if (!formData.referralSource) {
      newErrors.referralSource = 'Please select where you heard about this event'
    }

    if (!formData.consent) {
      newErrors.consent = 'You must agree to receive updates'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Send data to API
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          whatsapp: `${formData.countryCode}${formData.whatsapp}`,
          alternatePhone: formData.alternatePhone ? `${formData.alternateCountryCode}${formData.alternatePhone}` : '',
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed')
      }

      // Store form data and unique ID in localStorage
      localStorage.setItem('registrationData', JSON.stringify(formData))
      if (data.uniqueId) {
        localStorage.setItem('registrationUniqueId', data.uniqueId)
        console.log('Unique ID received:', data.uniqueId) // Debug log
      }

      // Redirect to thank you page with unique ID
      if (data.uniqueId) {
        router.push(`/thank-you?uniqueId=${encodeURIComponent(data.uniqueId)}`)
      } else {
        router.push('/thank-you')
      }
    } catch (error) {
      console.error('Registration error:', error)
      alert('Registration failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCheckboxChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      domainInterest: prev.domainInterest.includes(value)
        ? prev.domainInterest.filter(item => item !== value)
        : [...prev.domainInterest, value]
    }))
  }

  return (
    <section 
      id="registration"
      ref={sectionRef}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-dark to-darkSecondary relative"
    >
      {/* Loading Overlay */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
          <div className="bg-darkSecondary rounded-lg p-8 border border-primary/30 text-center space-y-4">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-secondary mx-auto"></div>
            <h3 className="text-2xl font-bold text-white">Securing Your Seat...</h3>
            <p className="text-gray-300">Please wait while we process your registration</p>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Secure Your <span className="gradient-text">Seat</span>
          </h2>
          <p className="text-xl text-secondary mb-2">Limited Slots Available</p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
        </div>

        <div className={`bg-darkSecondary/50 backdrop-blur-sm rounded-lg p-8 md:p-12 border border-primary/20 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-white border-b border-primary/30 pb-2">
                Basic Information
              </h3>

              <div>
                <label className="block text-white mb-2 font-medium">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Enter your full name"
                  className="form-input"
                />
                {errors.fullName && <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-white mb-2 font-medium">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your.email@example.com"
                  className="form-input"
                />
                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-white mb-2 font-medium">
                  WhatsApp Mobile Number <span className="text-red-400">*</span>
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <select
                    value={formData.countryCode}
                    onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                    className="form-input w-full sm:w-36 sm:flex-shrink-0 text-sm"
                  >
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+61">🇦🇺 +61</option>
                    <option value="+971">🇦🇪 +971</option>
                    <option value="+65">🇸🇬 +65</option>
                    <option value="+60">🇲🇾 +60</option>
                    <option value="+66">🇹🇭 +66</option>
                    <option value="+62">🇮🇩 +62</option>
                    <option value="+86">🇨🇳 +86</option>
                    <option value="+81">🇯🇵 +81</option>
                    <option value="+82">🇰🇷 +82</option>
                    <option value="+49">🇩🇪 +49</option>
                    <option value="+33">🇫🇷 +33</option>
                    <option value="+39">🇮🇹 +39</option>
                    <option value="+34">🇪🇸 +34</option>
                    <option value="+31">🇳🇱 +31</option>
                    <option value="+32">🇧🇪 +32</option>
                    <option value="+41">🇨🇭 +41</option>
                    <option value="+46">🇸🇪 +46</option>
                    <option value="+47">🇳🇴 +47</option>
                    <option value="+45">🇩🇰 +45</option>
                    <option value="+358">🇫🇮 +358</option>
                    <option value="+351">🇵🇹 +351</option>
                    <option value="+353">🇮🇪 +353</option>
                    <option value="+48">🇵🇱 +48</option>
                    <option value="+420">🇨🇿 +420</option>
                    <option value="+36">🇭🇺 +36</option>
                    <option value="+40">🇷🇴 +40</option>
                    <option value="+7">🇷🇺 +7</option>
                    <option value="+90">🇹🇷 +90</option>
                    <option value="+20">🇪🇬 +20</option>
                    <option value="+27">🇿🇦 +27</option>
                    <option value="+234">🇳🇬 +234</option>
                    <option value="+254">🇰🇪 +254</option>
                    <option value="+55">🇧🇷 +55</option>
                    <option value="+52">🇲🇽 +52</option>
                    <option value="+54">🇦🇷 +54</option>
                    <option value="+56">🇨🇱 +56</option>
                    <option value="+57">🇨🇴 +57</option>
                    <option value="+51">🇵🇪 +51</option>
                    <option value="+64">🇳🇿 +64</option>
                    <option value="+880">🇧🇩 +880</option>
                    <option value="+92">🇵🇰 +92</option>
                    <option value="+94">🇱🇰 +94</option>
                    <option value="+977">🇳🇵 +977</option>
                    <option value="+95">🇲🇲 +95</option>
                    <option value="+84">🇻🇳 +84</option>
                    <option value="+63">🇵🇭 +63</option>
                    <option value="+212">🇲🇦 +212</option>
                    <option value="+213">🇩🇿 +213</option>
                    <option value="+216">🇹🇳 +216</option>
                    <option value="+961">🇱🇧 +961</option>
                    <option value="+962">🇯🇴 +962</option>
                    <option value="+964">🇮🇶 +964</option>
                    <option value="+966">🇸🇦 +966</option>
                    <option value="+968">🇴🇲 +968</option>
                    <option value="+974">🇶🇦 +974</option>
                  </select>
                  <input
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    placeholder="9876543210"
                    className="form-input w-full sm:flex-1 min-w-0"
                  />
                </div>
                <p className="text-gray-400 text-xs mt-1">Full number: {formData.countryCode} {formData.whatsapp}</p>
                {errors.whatsapp && <p className="text-red-400 text-sm mt-1">{errors.whatsapp}</p>}
              </div>

              <div>
                <label className="block text-white mb-2 font-medium">
                  Alternate Phone Number <span className="text-gray-400">(Optional)</span>
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <select
                    value={formData.alternateCountryCode}
                    onChange={(e) => setFormData({ ...formData, alternateCountryCode: e.target.value })}
                    className="form-input w-full sm:w-36 sm:flex-shrink-0 text-sm"
                  >
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+61">🇦🇺 +61</option>
                    <option value="+971">🇦🇪 +971</option>
                    <option value="+65">🇸🇬 +65</option>
                    <option value="+60">🇲🇾 +60</option>
                    <option value="+66">🇹🇭 +66</option>
                    <option value="+62">🇮🇩 +62</option>
                    <option value="+86">🇨🇳 +86</option>
                    <option value="+81">🇯🇵 +81</option>
                    <option value="+82">🇰🇷 +82</option>
                    <option value="+49">🇩🇪 +49</option>
                    <option value="+33">🇫🇷 +33</option>
                    <option value="+39">🇮🇹 +39</option>
                    <option value="+34">🇪🇸 +34</option>
                    <option value="+31">🇳🇱 +31</option>
                    <option value="+32">🇧🇪 +32</option>
                    <option value="+41">🇨🇭 +41</option>
                    <option value="+46">🇸🇪 +46</option>
                    <option value="+47">🇳🇴 +47</option>
                    <option value="+45">🇩🇰 +45</option>
                    <option value="+358">🇫🇮 +358</option>
                    <option value="+351">🇵🇹 +351</option>
                    <option value="+353">🇮🇪 +353</option>
                    <option value="+48">🇵🇱 +48</option>
                    <option value="+420">🇨🇿 +420</option>
                    <option value="+36">🇭🇺 +36</option>
                    <option value="+40">🇷🇴 +40</option>
                    <option value="+7">🇷🇺 +7</option>
                    <option value="+90">🇹🇷 +90</option>
                    <option value="+20">🇪🇬 +20</option>
                    <option value="+27">🇿🇦 +27</option>
                    <option value="+234">🇳🇬 +234</option>
                    <option value="+254">🇰🇪 +254</option>
                    <option value="+55">🇧🇷 +55</option>
                    <option value="+52">🇲🇽 +52</option>
                    <option value="+54">🇦🇷 +54</option>
                    <option value="+56">🇨🇱 +56</option>
                    <option value="+57">🇨🇴 +57</option>
                    <option value="+51">🇵🇪 +51</option>
                    <option value="+64">🇳🇿 +64</option>
                    <option value="+880">🇧🇩 +880</option>
                    <option value="+92">🇵🇰 +92</option>
                    <option value="+94">🇱🇰 +94</option>
                    <option value="+977">🇳🇵 +977</option>
                    <option value="+95">🇲🇲 +95</option>
                    <option value="+84">🇻🇳 +84</option>
                    <option value="+63">🇵🇭 +63</option>
                    <option value="+212">🇲🇦 +212</option>
                    <option value="+213">🇩🇿 +213</option>
                    <option value="+216">🇹🇳 +216</option>
                    <option value="+961">🇱🇧 +961</option>
                    <option value="+962">🇯🇴 +962</option>
                    <option value="+964">🇮🇶 +964</option>
                    <option value="+966">🇸🇦 +966</option>
                    <option value="+968">🇴🇲 +968</option>
                    <option value="+974">🇶🇦 +974</option>
                  </select>
                  <input
                    type="tel"
                    value={formData.alternatePhone}
                    onChange={(e) => setFormData({ ...formData, alternatePhone: e.target.value })}
                    placeholder="Alternate contact number"
                    className="form-input w-full sm:flex-1 min-w-0"
                  />
                </div>
                {errors.alternatePhone && <p className="text-red-400 text-sm mt-1">{errors.alternatePhone}</p>}
              </div>
            </div>

            {/* Professional Details */}
            <div className="space-y-6 pt-6 border-t border-primary/20">
              <h3 className="text-2xl font-semibold text-white border-b border-primary/30 pb-2">
                Professional Details
              </h3>

              <div>
                <label className="block text-white mb-2 font-medium">
                  Current Role <span className="text-red-400">*</span>
                </label>
                <select
                  value={formData.currentRole}
                  onChange={(e) => setFormData({ ...formData, currentRole: e.target.value })}
                  className="form-input"
                >
                  <option value="">Select your current role</option>
                  <option value="student">Student</option>
                  <option value="job-seeker">Job Seeker</option>
                  <option value="working-professional">Working Professional</option>
                  <option value="freelancer">Freelancer</option>
                  <option value="other">Other</option>
                </select>
                {errors.currentRole && <p className="text-red-400 text-sm mt-1">{errors.currentRole}</p>}
              </div>

              <div>
                <label className="block text-white mb-2 font-medium">
                  Skill Level <span className="text-red-400">*</span>
                </label>
                <div className="flex flex-wrap gap-4">
                  {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                    <label key={level} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="skillLevel"
                        value={level.toLowerCase()}
                        checked={formData.skillLevel === level.toLowerCase()}
                        onChange={(e) => setFormData({ ...formData, skillLevel: e.target.value })}
                        className="mr-2 w-4 h-4 text-primary"
                      />
                      <span className="text-white">{level}</span>
                    </label>
                  ))}
                </div>
                {errors.skillLevel && <p className="text-red-400 text-sm mt-1">{errors.skillLevel}</p>}
              </div>

              <div>
                <label className="block text-white mb-2 font-medium">
                  Domain Interest <span className="text-red-400">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'Threat Intelligence',
                    'Malware Analysis',
                    'OSINT',
                    'Red Teaming',
                    'SOC',
                    'Cybersecurity Basics',
                    'Others'
                  ].map((domain) => (
                    <label key={domain} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.domainInterest.includes(domain)}
                        onChange={() => handleCheckboxChange(domain)}
                        className="mr-2 w-4 h-4 text-primary"
                      />
                      <span className="text-white">{domain}</span>
                    </label>
                  ))}
                </div>
                {errors.domainInterest && <p className="text-red-400 text-sm mt-1">{errors.domainInterest}</p>}
              </div>
            </div>

            {/* Experience Section */}
            <div className="space-y-6 pt-6 border-t border-primary/20">
              <h3 className="text-2xl font-semibold text-white border-b border-primary/30 pb-2">
                Experience
              </h3>

              <div>
                <label className="block text-white mb-2 font-medium">
                  Have you ever attended any cybersecurity event before? <span className="text-red-400">*</span>
                </label>
                <div className="flex flex-wrap gap-4">
                  {['Yes', 'No'].map((option) => (
                    <label key={option} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="previousAttendance"
                        value={option.toLowerCase()}
                        checked={formData.previousAttendance === option.toLowerCase()}
                        onChange={(e) => setFormData({ ...formData, previousAttendance: e.target.value })}
                        className="mr-2 w-4 h-4 text-primary"
                      />
                      <span className="text-white">{option}</span>
                    </label>
                  ))}
                </div>
                {errors.previousAttendance && <p className="text-red-400 text-sm mt-1">{errors.previousAttendance}</p>}
              </div>

              {formData.previousAttendance === 'yes' && (
                <div>
                  <label className="block text-white mb-2 font-medium">
                    If yes, which topics?
                  </label>
                  <input
                    type="text"
                    value={formData.previousTopics}
                    onChange={(e) => setFormData({ ...formData, previousTopics: e.target.value })}
                    placeholder="Mention the topics you've learned about"
                    className="form-input"
                  />
                </div>
              )}
            </div>

            {/* Expectations */}
            <div className="space-y-6 pt-6 border-t border-primary/20">
              <h3 className="text-2xl font-semibold text-white border-b border-primary/30 pb-2">
                Expectations
              </h3>

              <div>
                <label className="block text-white mb-2 font-medium">
                  What do you expect from this session? <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={formData.expectations}
                  onChange={(e) => setFormData({ ...formData, expectations: e.target.value })}
                  placeholder="Share your expectations and what you hope to learn..."
                  rows={4}
                  maxLength={500}
                  className="form-input resize-none"
                />
                <p className="text-gray-400 text-sm mt-1">
                  {formData.expectations.length}/500 characters
                </p>
                {errors.expectations && <p className="text-red-400 text-sm mt-1">{errors.expectations}</p>}
              </div>

              <div>
                <label className="block text-white mb-2 font-medium">
                  Where did you hear about this event? <span className="text-red-400">*</span>
                </label>
                <select
                  value={formData.referralSource}
                  onChange={(e) => setFormData({ ...formData, referralSource: e.target.value })}
                  className="form-input"
                >
                  <option value="">Select an option</option>
                  <option value="social-media">Social Media</option>
                  <option value="friend">Friend</option>
                  <option value="email">Email</option>
                  <option value="website">Website</option>
                  <option value="community">Community</option>
                  <option value="other">Other</option>
                </select>
                {errors.referralSource && <p className="text-red-400 text-sm mt-1">{errors.referralSource}</p>}
              </div>
            </div>

            {/* Consent */}
            <div className="pt-6 border-t border-primary/20">
              <label className="flex items-start cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.consent}
                  onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                  className="mt-1 mr-3 w-5 h-5 text-primary"
                />
                <span className="text-white">
                  I agree to receive session updates via WhatsApp & email. <span className="text-red-400">*</span>
                </span>
              </label>
              {errors.consent && <p className="text-red-400 text-sm mt-1">{errors.consent}</p>}
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'SECURING YOUR SEAT...' : 'SECURE MY SEAT'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}


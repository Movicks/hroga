'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchCurrentUser, updateCurrentUser, clearError, User } from '../../redux/features/auth/authSlice';
import Image from 'next/image';
import { X, Save, ArrowLeft, Camera } from 'lucide-react';

export default function ProfileSettingPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user: authUser, loading, error } = useAppSelector((state) => state.auth);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<User>>({
    firstName: '',
    middleName: '',
    lastName: '',
    maidenName: '',
    dateOfBirth: '',
    gender: '',
    email: '',
    phoneNumber: '',
    whatsappNumber: '',
    country: '',
    stateCity: '',
    homeAddress: '',
    yearOfGraduation: '',
    entryYear: '',
    house: '',
    classArm: '',
    formTeacher: '',
    positionsHeld: '',
    clubsSocieties: '',
    favoriteMemory: '',
    classmates: '',
    currentOccupation: '',
    jobTitle: '',
    organisation: '',
    industry: '',
    highestQualification: '',
    institutionAttended: '',
    maritalStatus: '',
    spouseName: '',
    numberOfChildren: '',
    numberOfGrandchildren: '',
    yourStory: '',
    currentAddress: {
      country: '',
      state: '',
      city: '',
      addressLine: '',
    },
    permanentAddress: {
      country: '',
      state: '',
      city: '',
      addressLine: '',
    },
    howHeard: '',
    referralName: '',
    involvement: {
      attendReunion: false,
      joinCommittee: false,
      contributeFundraising: false,
      mentorStudents: false,
      shareStory: false,
      serveExec: false,
    },
    notifications: {
      emailNewsletter: false,
      whatsAppGroup: false,
      smsAlerts: false,
    },
  });

  // Initialize form with user data
  useEffect(() => {
    if (authUser) {
      setFormData({
        ...authUser,
      });
    }
  }, [authUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearError());
    const result = await dispatch(updateCurrentUser(formData));
    if (updateCurrentUser.fulfilled.match(result)) {
      alert('Profile updated successfully!');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  // If user is null, we probably shouldn't be here, but let's guard against it
  if (!authUser) {
    return (
      <section className="space-y-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back</span>
        </button>
        <div className="py-12 text-center text-slate-500">
          Loading profile...
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft size={20} />
        <span className="font-medium">Back</span>
      </button>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex justify-between items-center">
          <span>{error}</span>
          <button onClick={() => dispatch(clearError())}>
            <X size={18} />
          </button>
        </div>
      )}

      <div className="bg-[#E3EFFC] rounded-lg p-6 md:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
          <div className="flex items-center gap-6">
            <div className="h-24 w-24 rounded-full bg-[#6393f6]/10 border-2 border-[#6393f6] p-1 flex items-center justify-center text-[#6393f6] text-3xl font-bold overflow-hidden relative group">
              {authUser.image || previewUrl ? (
                <Image
                  src={previewUrl || authUser.image}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              ) : (
                <span>{formData.firstName?.[0] || 'A'}{formData.lastName?.[0] || 'U'}</span>
              )}
              <label className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <Camera className="text-white" size={24} />
                <input
                  type="file"
                  className="hidden"
                  accept="image/jpeg,image/png"
                  onChange={handleFileChange}
                />
              </label>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1E3A8A]">
                {formData.firstName} {formData.lastName}
              </h2>
              <div className="flex flex-wrap items-center gap-3 mt-2">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    authUser.role === 'admin'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {authUser.role}
                </span>
                <span
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                >
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="bg-[#F2F7FC] rounded-lg p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg md:text-xl font-semibold text-[#6393f6]">Personal Information</h3>
            </div>

            {/* Full name */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-[#4B5563]">Full name</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm mb-2">First name</label>
                  <input
                    type="text"
                    value={formData.firstName || ''}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                    placeholder="David"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Middle name</label>
                  <input
                    type="text"
                    value={formData.middleName || ''}
                    onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
                    className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                    placeholder="Akan"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Last name</label>
                  <input
                    type="text"
                    value={formData.lastName || ''}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                    placeholder="Akan"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2">
                    Maiden name <span className="text-gray-500">(Name at graduation)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.maidenName || ''}
                    onChange={(e) => setFormData({ ...formData, maidenName: e.target.value })}
                    className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                    placeholder="name your classmates knew you by"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Year of Graduation</label>
                  <input
                    type="text"
                    value={formData.yearOfGraduation || ''}
                    onChange={(e) => setFormData({ ...formData, yearOfGraduation: e.target.value })}
                    className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                    placeholder="e.g. 2005"
                  />
                </div>
              </div>
            </section>

            <hr className="border-[#E5E7EB]" />

            {/* Basic Details */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-[#4B5563]">Basic Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2">Date of birth</label>
                  <input
                    type="date"
                    value={formData.dateOfBirth || ''}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Gender</label>
                  <select
                    value={formData.gender || ''}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                  >
                    <option value="">Select</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                  </select>
                </div>
              </div>
            </section>

            <hr className="border-[#E5E7EB]" />

            {/* Contact Details */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-[#4B5563]">Contact Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2">Email address</label>
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                    placeholder="you@domain.com"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Phone number</label>
                  <input
                    type="tel"
                    value={formData.phoneNumber || ''}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                    placeholder="+234 801 224 546"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">
                    WhatsApp number <span className="text-gray-500">(If different)</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.whatsappNumber || ''}
                    onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                    className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                    placeholder="+234 801 224 546"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Country of residence</label>
                  <select
                    value={formData.country || ''}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                  >
                    <option value="">Select country</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Ghana">Ghana</option>
                    <option value="UK">United Kingdom</option>
                    <option value="USA">United States</option>
                    <option value="Canada">Canada</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-2">State / city</label>
                  <input
                    type="text"
                    value={formData.stateCity || ''}
                    onChange={(e) => setFormData({ ...formData, stateCity: e.target.value })}
                    className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                    placeholder="e.g Lagos, Abuja, London"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm mb-2">Home address</label>
                  <input
                    type="text"
                    value={formData.homeAddress || ''}
                    onChange={(e) => setFormData({ ...formData, homeAddress: e.target.value })}
                    className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                    placeholder="for postal correspondence"
                  />
                </div>
              </div>
            </section>
          </div>

          {/* School Details */}
          <div className="bg-[#F2F7FC] rounded-lg p-6 space-y-6">
            <h3 className="text-lg md:text-xl font-semibold text-[#6393f6]">School Details</h3>
            <div className="bg-white rounded-lg p-4 border border-[#E5E7EB]">
              <h4 className="text-md font-semibold text-[#4B5563] mb-4">Your Class</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2">Entry year</label>
                  <input
                    type="text"
                    value={formData.entryYear || ''}
                    onChange={(e) => setFormData({ ...formData, entryYear: e.target.value })}
                    className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                    placeholder="e.g 1999"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">House / dormitory</label>
                  <select
                    value={formData.house || ''}
                    onChange={(e) => setFormData({ ...formData, house: e.target.value })}
                    className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                  >
                    <option value="">Select house</option>
                    <option value="St. Theresa">St. Theresa</option>
                    <option value="St. Joseph">St. Joseph</option>
                    <option value="St. Mary">St. Mary</option>
                    <option value="St. Anne">St. Anne</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-2">Class / arm</label>
                  <input
                    type="text"
                    value={formData.classArm || ''}
                    onChange={(e) => setFormData({ ...formData, classArm: e.target.value })}
                    className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                    placeholder="e.g ss3A, Form 4B"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Form teacher <span className="text-gray-500">(If remembered)</span></label>
                  <input
                    type="text"
                    value={formData.formTeacher || ''}
                    onChange={(e) => setFormData({ ...formData, formTeacher: e.target.value })}
                    className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                    placeholder="e.g. Ms. Johnson"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm mb-2">Positions held</label>
                  <input
                    type="text"
                    value={formData.positionsHeld || ''}
                    onChange={(e) => setFormData({ ...formData, positionsHeld: e.target.value })}
                    className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                    placeholder="e.g Head girl, Prefect, Class captain"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm mb-2">Clubs & societies</label>
                  <input
                    type="text"
                    value={formData.clubsSocieties || ''}
                    onChange={(e) => setFormData({ ...formData, clubsSocieties: e.target.value })}
                    className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                    placeholder="e.g Drama club, Red Cross, Press club"
                  />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-[#E5E7EB]">
              <label className="block text-sm mb-2">Favorite school memory</label>
              <textarea
                value={formData.favoriteMemory || ''}
                onChange={(e) => setFormData({ ...formData, favoriteMemory: e.target.value })}
                className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                rows={3}
                placeholder="Share a memory that has stayed with you from your Holy Rosary days"
              />
            </div>
            <div className="bg-white rounded-lg p-4 border border-[#E5E7EB]">
              <label className="block text-sm mb-2">Classmates you remember</label>
              <textarea
                value={formData.classmates || ''}
                onChange={(e) => setFormData({ ...formData, classmates: e.target.value })}
                className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                rows={3}
                placeholder="e.g Ngozi Eze, — helps us link you to the right class group"
              />
            </div>
          </div>

          {/* Life After School */}
          <div className="bg-[#F2F7FC] rounded-lg p-6 space-y-6">
            <h3 className="text-lg md:text-xl font-semibold text-[#6393f6]">Life After School</h3>
            <div className="bg-white rounded-lg p-4 border border-[#E5E7EB]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2">Current occupation</label>
                  <input
                    type="text"
                    value={formData.currentOccupation || ''}
                    onChange={(e) => setFormData({ ...formData, currentOccupation: e.target.value })}
                    className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Job title</label>
                  <input
                    type="text"
                    value={formData.jobTitle || ''}
                    onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                    className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Organisation</label>
                  <input
                    type="text"
                    value={formData.organisation || ''}
                    onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
                    className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Industry</label>
                  <input
                    type="text"
                    value={formData.industry || ''}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Highest qualification</label>
                  <input
                    type="text"
                    value={formData.highestQualification || ''}
                    onChange={(e) => setFormData({ ...formData, highestQualification: e.target.value })}
                    className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Institution attended</label>
                  <input
                    type="text"
                    value={formData.institutionAttended || ''}
                    onChange={(e) => setFormData({ ...formData, institutionAttended: e.target.value })}
                    className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Marital status</label>
                  <select
                    value={formData.maritalStatus || ''}
                    onChange={(e) => setFormData({ ...formData, maritalStatus: e.target.value })}
                    className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                  >
                    <option value="">Select</option>
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                    <option value="divorced">Divorced</option>
                    <option value="widowed">Widowed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-2">Spouse name</label>
                  <input
                    type="text"
                    value={formData.spouseName || ''}
                    onChange={(e) => setFormData({ ...formData, spouseName: e.target.value })}
                    className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Number of children</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.numberOfChildren || ''}
                    onChange={(e) => setFormData({ ...formData, numberOfChildren: e.target.value })}
                    className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Number of grandchildren</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.numberOfGrandchildren || ''}
                    onChange={(e) => setFormData({ ...formData, numberOfGrandchildren: e.target.value })}
                    className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                  />
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-[#E5E7EB]">
                <label className="block text-sm mb-2">Your story</label>
                <textarea
                  value={formData.yourStory || ''}
                  onChange={(e) => setFormData({ ...formData, yourStory: e.target.value })}
                  className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Addresses */}
          <div className="bg-[#F2F7FC] rounded-lg p-6 space-y-6">
            <h3 className="text-lg md:text-xl font-semibold text-[#6393f6]">Addresses</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 border border-[#E5E7EB]">
                <p className="text-sm font-semibold text-[#4B5563] mb-3">Current Address</p>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Address line</label>
                    <input
                      type="text"
                      value={formData.currentAddress?.addressLine || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          currentAddress: {
                            country: formData.currentAddress?.country || '',
                            state: formData.currentAddress?.state || '',
                            city: formData.currentAddress?.city || '',
                            addressLine: e.target.value,
                          },
                        })
                      }
                      className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">City</label>
                      <input
                        type="text"
                        value={formData.currentAddress?.city || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            currentAddress: {
                              country: formData.currentAddress?.country || '',
                              state: formData.currentAddress?.state || '',
                              city: e.target.value,
                              addressLine: formData.currentAddress?.addressLine || '',
                            },
                          })
                        }
                        className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">State</label>
                      <input
                        type="text"
                        value={formData.currentAddress?.state || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            currentAddress: {
                              country: formData.currentAddress?.country || '',
                              state: e.target.value,
                              city: formData.currentAddress?.city || '',
                              addressLine: formData.currentAddress?.addressLine || '',
                            },
                          })
                        }
                        className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Country</label>
                    <input
                      type="text"
                      value={formData.currentAddress?.country || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          currentAddress: {
                            country: e.target.value,
                            state: formData.currentAddress?.state || '',
                            city: formData.currentAddress?.city || '',
                            addressLine: formData.currentAddress?.addressLine || '',
                          },
                        })
                      }
                      className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 border border-[#E5E7EB]">
                <p className="text-sm font-semibold text-[#4B5563] mb-3">Permanent Address</p>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Address line</label>
                    <input
                      type="text"
                      value={formData.permanentAddress?.addressLine || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          permanentAddress: {
                            country: formData.permanentAddress?.country || '',
                            state: formData.permanentAddress?.state || '',
                            city: formData.permanentAddress?.city || '',
                            addressLine: e.target.value,
                          },
                        })
                      }
                      className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">City</label>
                      <input
                        type="text"
                        value={formData.permanentAddress?.city || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            permanentAddress: {
                              country: formData.permanentAddress?.country || '',
                              state: formData.permanentAddress?.state || '',
                              city: e.target.value,
                              addressLine: formData.permanentAddress?.addressLine || '',
                            },
                          })
                        }
                        className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">State</label>
                      <input
                        type="text"
                        value={formData.permanentAddress?.state || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            permanentAddress: {
                              country: formData.permanentAddress?.country || '',
                              state: e.target.value,
                              city: formData.permanentAddress?.city || '',
                              addressLine: formData.permanentAddress?.addressLine || '',
                            },
                          })
                        }
                        className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Country</label>
                    <input
                      type="text"
                      value={formData.permanentAddress?.country || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          permanentAddress: {
                            country: e.target.value,
                            state: formData.permanentAddress?.state || '',
                            city: formData.permanentAddress?.city || '',
                            addressLine: formData.permanentAddress?.addressLine || '',
                          },
                        })
                      }
                      className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-[#6393f6] text-white rounded-full hover:bg-[#6393f6]/90 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              <Save size={18} />
              {loading ? 'Saving...' : 'Save changes'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

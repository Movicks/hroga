'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  updateCurrentUser,
  clearError,
  User,
} from '../../redux/features/auth/authSlice';
import { ArrowLeft, X, Camera } from 'lucide-react';
import Image from 'next/image';

interface EditableUserProfileProps {
  onBack?: () => void;
}

export default function EditableUserProfile({ onBack }: EditableUserProfileProps) {
  const dispatch = useAppDispatch();
  const { user: authUser, loading, error } = useAppSelector(
    (state) => state.auth
  );

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
        involvement: {
          attendReunion: authUser.involvement?.attendReunion ?? false,
          joinCommittee: authUser.involvement?.joinCommittee ?? false,
          contributeFundraising: authUser.involvement?.contributeFundraising ?? false,
          mentorStudents: authUser.involvement?.mentorStudents ?? false,
          shareStory: authUser.involvement?.shareStory ?? false,
          serveExec: authUser.involvement?.serveExec ?? false,
        },
        notifications: {
          emailNewsletter: authUser.notifications?.emailNewsletter ?? false,
          whatsAppGroup: authUser.notifications?.whatsAppGroup ?? false,
          smsAlerts: authUser.notifications?.smsAlerts ?? false,
        },
        currentAddress: {
          country: authUser.currentAddress?.country ?? '',
          state: authUser.currentAddress?.state ?? '',
          city: authUser.currentAddress?.city ?? '',
          addressLine: authUser.currentAddress?.addressLine ?? '',
        },
        permanentAddress: {
          country: authUser.permanentAddress?.country ?? '',
          state: authUser.permanentAddress?.state ?? '',
          city: authUser.permanentAddress?.city ?? '',
          addressLine: authUser.permanentAddress?.addressLine ?? '',
        },
      });
    }
  }, [authUser]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (authUser) {
      await dispatch(
        updateCurrentUser({
          ...formData,
          id: authUser.id,
        })
      );
    }
  };

  // If user is null, show loading
  if (!authUser) {
    return (
      <section className="space-y-6">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back</span>
          </button>
        )}
        <div className="py-12 text-center text-slate-500">Loading profile...</div>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      {/* Back Button */}
      {onBack && (
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back</span>
        </button>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex justify-between items-center">
          <span>{error}</span>
          <button onClick={() => dispatch(clearError())}>
            <X size={18} />
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="bg-[#E3EFFC] rounded-lg p-6 md:p-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
            <div className="flex items-center gap-6">
              <div className="h-24 w-24 rounded-full bg-[#6393f6]/10 border-3 border-[#6393f6] p-1 flex items-center justify-center text-[#6393f6] text-3xl font-bold overflow-hidden relative group">
                {previewUrl ? (
                  <Image
                    src={previewUrl}
                    alt="Profile"
                    fill
                    className="object-cover"
                  />
                ) : authUser.image ? (
                  <Image
                    src={authUser.image}
                    alt="Profile"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <span>
                    {formData.firstName?.[0] || 'A'}
                    {formData.lastName?.[0] || 'U'}
                  </span>
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
                  {formData.firstName}{' '}
                  {formData.middleName ? `${formData.middleName} ` : ''}
                  {formData.lastName}
                  {formData.maidenName ? ` (${formData.maidenName})` : ''}
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
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Active
                  </span>
                </div>
              </div>
            </div>
            <div className="flex-shrink-0">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2 bg-[#6393f6] text-white rounded-full hover:bg-[#6393f6]/90 transition-colors shadow-sm disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {/* Personal Information */}
            <div className="bg-[#F2F7FC] rounded-lg p-6 space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg md:text-xl font-semibold text-[#6393f6]">
                  Personal Information
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 border border-[#E5E7EB]">
                  <label className="text-xs text-gray-500 mb-1 block">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={formData.firstName || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    className="w-full bg-white px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                  />
                </div>
                <div className="bg-white rounded-lg p-4 border border-[#E5E7EB]">
                  <label className="text-xs text-gray-500 mb-1 block">
                    Middle Name
                  </label>
                  <input
                    type="text"
                    value={formData.middleName || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, middleName: e.target.value })
                    }
                    className="w-full bg-white px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                  />
                </div>
                <div className="bg-white rounded-lg p-4 border border-[#E5E7EB]">
                  <label className="text-xs text-gray-500 mb-1 block">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={formData.lastName || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    className="w-full bg-white px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                  />
                </div>
                <div className="bg-white rounded-lg p-4 border border-[#E5E7EB]">
                  <label className="text-xs text-gray-500 mb-1 block">
                    Maiden Name
                  </label>
                  <input
                    type="text"
                    value={formData.maidenName || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, maidenName: e.target.value })
                    }
                    className="w-full bg-white px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                  />
                </div>
                <div className="bg-white rounded-lg p-4 border border-[#E5E7EB]">
                  <label className="text-xs text-gray-500 mb-1 block">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={formData.dateOfBirth || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, dateOfBirth: e.target.value })
                    }
                    className="w-full bg-white px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                  />
                </div>
                <div className="bg-white rounded-lg p-4 border border-[#E5E7EB]">
                  <label className="text-xs text-gray-500 mb-1 block">
                    Gender
                  </label>
                  <select
                    value={formData.gender || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, gender: e.target.value })
                    }
                    className="w-full bg-white px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="bg-white rounded-lg p-4 border border-[#E5E7EB]">
                  <label className="text-xs text-gray-500 mb-1 block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-white px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                  />
                </div>
                <div className="bg-white rounded-lg p-4 border border-[#E5E7EB]">
                  <label className="text-xs text-gray-500 mb-1 block">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phoneNumber || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, phoneNumber: e.target.value })
                    }
                    className="w-full bg-white px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                  />
                </div>
                <div className="bg-white rounded-lg p-4 border border-[#E5E7EB]">
                  <label className="text-xs text-gray-500 mb-1 block">
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    value={formData.whatsappNumber || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        whatsappNumber: e.target.value,
                      })
                    }
                    className="w-full bg-white px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                  />
                </div>
                <div className="bg-white rounded-lg p-4 border border-[#E5E7EB]">
                  <label className="text-xs text-gray-500 mb-1 block">
                    Country
                  </label>
                  <input
                    type="text"
                    value={formData.country || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, country: e.target.value })
                    }
                    className="w-full bg-white px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                  />
                </div>
                <div className="bg-white rounded-lg p-4 border border-[#E5E7EB]">
                  <label className="text-xs text-gray-500 mb-1 block">
                    State/City
                  </label>
                  <input
                    type="text"
                    value={formData.stateCity || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, stateCity: e.target.value })
                    }
                    className="w-full bg-white px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                  />
                </div>
                <div className="bg-white rounded-lg p-4 border border-[#E5E7EB] lg:col-span-2">
                  <label className="text-xs text-gray-500 mb-1 block">
                    Home Address
                  </label>
                  <input
                    type="text"
                    value={formData.homeAddress || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, homeAddress: e.target.value })
                    }
                    className="w-full bg-white px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                  />
                </div>
                <div className="bg-white rounded-lg p-4 border border-[#E5E7EB]">
                  <label className="text-xs text-gray-500 mb-1 block">
                    Year of Graduation
                  </label>
                  <input
                    type="text"
                    value={formData.yearOfGraduation || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        yearOfGraduation: e.target.value,
                      })
                    }
                    className="w-full bg-white px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                  />
                </div>
              </div>
            </div>

            {/* School Details */}
            <div className="bg-[#F2F7FC] rounded-lg p-6 space-y-6">
              <h3 className="text-lg md:text-xl font-semibold text-[#6393f6]">
                School Details
              </h3>
              <div className="bg-white rounded-lg p-4 border border-[#E5E7EB]">
                <h4 className="text-md font-semibold text-[#4B5563] mb-4">
                  Your Class
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">
                      Entry Year
                    </label>
                    <input
                      type="text"
                      value={formData.entryYear || ''}
                      onChange={(e) =>
                        setFormData({ ...formData, entryYear: e.target.value })
                      }
                      className="w-full bg-white px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">
                      House / Dormitory
                    </label>
                    <input
                      type="text"
                      value={formData.house || ''}
                      onChange={(e) =>
                        setFormData({ ...formData, house: e.target.value })
                      }
                      className="w-full bg-white px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">
                      Class / Arm
                    </label>
                    <input
                      type="text"
                      value={formData.classArm || ''}
                      onChange={(e) =>
                        setFormData({ ...formData, classArm: e.target.value })
                      }
                      className="w-full bg-white px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">
                      Form Teacher
                    </label>
                    <input
                      type="text"
                      value={formData.formTeacher || ''}
                      onChange={(e) =>
                        setFormData({ ...formData, formTeacher: e.target.value })
                      }
                      className="w-full bg-white px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-xs text-gray-500 mb-1 block">
                      Positions Held
                    </label>
                    <input
                      type="text"
                      value={formData.positionsHeld || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          positionsHeld: e.target.value,
                        })
                      }
                      className="w-full bg-white px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-xs text-gray-500 mb-1 block">
                      Clubs & Societies
                    </label>
                    <input
                      type="text"
                      value={formData.clubsSocieties || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          clubsSocieties: e.target.value,
                        })
                      }
                      className="w-full bg-white px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-[#E5E7EB]">
                <label className="text-xs text-gray-500 mb-1 block">
                  Favorite School Memory
                </label>
                <textarea
                  value={formData.favoriteMemory || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      favoriteMemory: e.target.value,
                    })
                  }
                  rows={3}
                  className="w-full bg-white px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                />
              </div>
              <div className="bg-white rounded-lg p-4 border border-[#E5E7EB]">
                <label className="text-xs text-gray-500 mb-1 block">
                  Classmates You Remember
                </label>
                <textarea
                  value={formData.classmates || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, classmates: e.target.value })
                  }
                  rows={3}
                  className="w-full bg-white px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                />
              </div>
            </div>

            {/* Life After School */}
            <div className="bg-[#F2F7FC] rounded-lg p-6 space-y-6">
              <h3 className="text-lg md:text-xl font-semibold text-[#6393f6]">
                Life After School
              </h3>
              <div className="bg-white rounded-lg p-4 border border-[#E5E7EB]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">
                      Current Occupation
                    </label>
                    <input
                      type="text"
                      value={formData.currentOccupation || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          currentOccupation: e.target.value,
                        })
                      }
                      className="w-full bg-white px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">
                      Job Title
                    </label>
                    <input
                      type="text"
                      value={formData.jobTitle || ''}
                      onChange={(e) =>
                        setFormData({ ...formData, jobTitle: e.target.value })
                      }
                      className="w-full bg-white px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">
                      Organisation
                    </label>
                    <input
                      type="text"
                      value={formData.organisation || ''}
                      onChange={(e) =>
                        setFormData({ ...formData, organisation: e.target.value })
                      }
                      className="w-full bg-white px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">
                      Industry
                    </label>
                    <input
                      type="text"
                      value={formData.industry || ''}
                      onChange={(e) =>
                        setFormData({ ...formData, industry: e.target.value })
                      }
                      className="w-full bg-white px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">
                      Highest Qualification
                    </label>
                    <input
                      type="text"
                      value={formData.highestQualification || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          highestQualification: e.target.value,
                        })
                      }
                      className="w-full bg-white px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">
                      Institution Attended
                    </label>
                    <input
                      type="text"
                      value={formData.institutionAttended || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          institutionAttended: e.target.value,
                        })
                      }
                      className="w-full bg-white px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">
                      Marital Status
                    </label>
                    <select
                      value={formData.maritalStatus || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          maritalStatus: e.target.value,
                        })
                      }
                      className="w-full bg-white px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                    >
                      <option value="">Select</option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Divorced">Divorced</option>
                      <option value="Widowed">Widowed</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">
                      Spouse Name
                    </label>
                    <input
                      type="text"
                      value={formData.spouseName || ''}
                      onChange={(e) =>
                        setFormData({ ...formData, spouseName: e.target.value })
                      }
                      className="w-full bg-white px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">
                      Number of Children
                    </label>
                    <input
                      type="text"
                      value={formData.numberOfChildren || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          numberOfChildren: e.target.value,
                        })
                      }
                      className="w-full bg-white px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">
                      Number of Grandchildren
                    </label>
                    <input
                      type="text"
                      value={formData.numberOfGrandchildren || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          numberOfGrandchildren: e.target.value,
                        })
                      }
                      className="w-full bg-white px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                    />
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-[#E5E7EB]">
                  <label className="text-xs text-gray-500 mb-1 block">
                    Your Story
                  </label>
                  <textarea
                    value={formData.yourStory || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, yourStory: e.target.value })
                    }
                    rows={5}
                    className="w-full bg-white px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                  />
                </div>
              </div>
            </div>

            {/* Involvement & Notifications */}
            <div className="bg-[#F2F7FC] rounded-lg p-6 space-y-6">
              <h3 className="text-lg md:text-xl font-semibold text-[#6393f6]">
                Involvement & Notifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 border border-[#E5E7EB]">
                  <p className="text-xs text-gray-500 mb-2">Get Involved</p>
                  <div className="space-y-2">
                    {[
                      {
                        key: 'attendReunion',
                        label: 'Attend Reunion',
                      },
                      {
                        key: 'joinCommittee',
                        label: 'Join Committee',
                      },
                      {
                        key: 'contributeFundraising',
                        label: 'Contribute Fundraising',
                      },
                      {
                        key: 'mentorStudents',
                        label: 'Mentor Students',
                      },
                      {
                        key: 'shareStory',
                        label: 'Share Story',
                      },
                      {
                        key: 'serveExec',
                        label: 'Serve Exec',
                      },
                    ].map(({ key, label }) => (
                      <label key={key} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={
                            (formData.involvement as any)?.[key] ?? false
                          }
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              involvement: {
                                ...formData.involvement,
                                [key]: e.target.checked,
                              },
                            })
                          }
                          className="w-4 h-4 text-[#6393f6] rounded border-gray-300 focus:ring-[#6393f6]"
                        />
                        <span className="text-sm text-[#4B5563]">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-[#E5E7EB]">
                  <p className="text-xs text-gray-500 mb-2">Notifications</p>
                  <div className="space-y-2">
                    {[
                      {
                        key: 'emailNewsletter',
                        label: 'Email Newsletter',
                      },
                      {
                        key: 'whatsAppGroup',
                        label: 'WhatsApp Group',
                      },
                      {
                        key: 'smsAlerts',
                        label: 'SMS Alerts',
                      },
                    ].map(({ key, label }) => (
                      <label key={key} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={
                            (formData.notifications as any)?.[key] ?? false
                          }
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              notifications: {
                                ...formData.notifications,
                                [key]: e.target.checked,
                              },
                            })
                          }
                          className="w-4 h-4 text-[#6393f6] rounded border-gray-300 focus:ring-[#6393f6]"
                        />
                        <span className="text-sm text-[#4B5563]">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-[#E5E7EB]">
                <label className="text-xs text-gray-500 mb-1 block">
                  How Did You Hear About Us?
                </label>
                <input
                  type="text"
                  value={formData.howHeard || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, howHeard: e.target.value })
                  }
                  className="w-full bg-white px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                />
              </div>
              <div className="bg-white rounded-lg p-4 border border-[#E5E7EB]">
                <label className="text-xs text-gray-500 mb-1 block">
                  Referral Name
                </label>
                <input
                  type="text"
                  value={formData.referralName || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, referralName: e.target.value })
                  }
                  className="w-full bg-white px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                />
              </div>
            </div>

            {/* Addresses */}
            <div className="bg-[#F2F7FC] rounded-lg p-6 space-y-6">
              <h3 className="text-lg md:text-xl font-semibold text-[#6393f6]">
                Addresses
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 border border-[#E5E7EB]">
                  <p className="text-xs text-gray-500 mb-3">Current Address</p>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">
                        Address Line
                      </label>
                      <input
                        type="text"
                        value={formData.currentAddress?.addressLine || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            currentAddress: {
                              country: formData.currentAddress?.country ?? '',
                              state: formData.currentAddress?.state ?? '',
                              city: formData.currentAddress?.city ?? '',
                              addressLine: e.target.value,
                            },
                          })
                        }
                        className="w-full bg-white px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">
                        City
                      </label>
                      <input
                        type="text"
                        value={formData.currentAddress?.city || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            currentAddress: {
                              country: formData.currentAddress?.country ?? '',
                              state: formData.currentAddress?.state ?? '',
                              city: e.target.value,
                              addressLine:
                                formData.currentAddress?.addressLine ?? '',
                            },
                          })
                        }
                        className="w-full bg-white px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">
                        State
                      </label>
                      <input
                        type="text"
                        value={formData.currentAddress?.state || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            currentAddress: {
                              country: formData.currentAddress?.country ?? '',
                              state: e.target.value,
                              city: formData.currentAddress?.city ?? '',
                              addressLine:
                                formData.currentAddress?.addressLine ?? '',
                            },
                          })
                        }
                        className="w-full bg-white px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">
                        Country
                      </label>
                      <input
                        type="text"
                        value={formData.currentAddress?.country || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            currentAddress: {
                              country: e.target.value,
                              state: formData.currentAddress?.state ?? '',
                              city: formData.currentAddress?.city ?? '',
                              addressLine:
                                formData.currentAddress?.addressLine ?? '',
                            },
                          })
                        }
                        className="w-full bg-white px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border border-[#E5E7EB]">
                  <p className="text-xs text-gray-500 mb-3">
                    Permanent Address
                  </p>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">
                        Address Line
                      </label>
                      <input
                        type="text"
                        value={formData.permanentAddress?.addressLine || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            permanentAddress: {
                              country: formData.permanentAddress?.country ?? '',
                              state: formData.permanentAddress?.state ?? '',
                              city: formData.permanentAddress?.city ?? '',
                              addressLine: e.target.value,
                            },
                          })
                        }
                        className="w-full bg-white px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">
                        City
                      </label>
                      <input
                        type="text"
                        value={formData.permanentAddress?.city || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            permanentAddress: {
                              country: formData.permanentAddress?.country ?? '',
                              state: formData.permanentAddress?.state ?? '',
                              city: e.target.value,
                              addressLine:
                                formData.permanentAddress?.addressLine ?? '',
                            },
                          })
                        }
                        className="w-full bg-white px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">
                        State
                      </label>
                      <input
                        type="text"
                        value={formData.permanentAddress?.state || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            permanentAddress: {
                              country: formData.permanentAddress?.country ?? '',
                              state: e.target.value,
                              city: formData.permanentAddress?.city ?? '',
                              addressLine:
                                formData.permanentAddress?.addressLine ?? '',
                            },
                          })
                        }
                        className="w-full bg-white px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">
                        Country
                      </label>
                      <input
                        type="text"
                        value={formData.permanentAddress?.country || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            permanentAddress: {
                              country: e.target.value,
                              state: formData.permanentAddress?.state ?? '',
                              city: formData.permanentAddress?.city ?? '',
                              addressLine:
                                formData.permanentAddress?.addressLine ?? '',
                            },
                          })
                        }
                        className="w-full bg-white px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}

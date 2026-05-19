import React, { useContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets_frontend/assets';

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } =
    useContext(AppContext);

  const [edit, setEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateProfile = async () => {
    try {
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('phone', userData.phone);
      formData.append('address', JSON.stringify(userData.address));
      formData.append('gender', userData.gender);
      formData.append('dob', userData.dob);
      if (image) formData.append('image', image);

      const { data } = await axios.post(
        backendUrl + '/api/user/update-profile',
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  if (!userData) {
    return <p className="py-10 text-slate-400">Loading profile...</p>;
  }

  const inputCls =
    'w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100';
  const labelCls = 'font-medium text-slate-600';

  return (
    <div className="my-8 max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
      {/* Profile Image + Name */}
      <div className="mb-6 flex items-center gap-6">
        {edit ? (
          <label htmlFor="image" className="cursor-pointer">
            <img
              src={
                image
                  ? URL.createObjectURL(image)
                  : userData.image || assets.profile_pic
              }
              alt="Profile"
              className="h-24 w-24 rounded-full border-2 border-blue-200 object-cover opacity-80"
            />
            <input
              type="file"
              id="image"
              accept="image/*"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
        ) : (
          <img
            src={userData.image || assets.profile_pic}
            alt="Profile"
            className="h-24 w-24 rounded-full border-2 border-blue-200 object-cover"
          />
        )}

        <div>
          {edit ? (
            <input
              type="text"
              value={userData.name}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="border-b border-slate-300 text-2xl font-bold text-slate-800 outline-none focus:border-blue-500"
            />
          ) : (
            <h1 className="text-2xl font-bold text-slate-800">
              {userData.name}
            </h1>
          )}
          <p className="text-sm text-slate-400">Patient</p>
        </div>
      </div>

      <hr className="mb-6 border-slate-200" />

      {/* Contact Information */}
      <section className="mb-6">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
          Contact Information
        </h2>

        <div className="mb-3 grid grid-cols-3 items-center gap-4">
          <p className={labelCls}>Email id:</p>
          <p className="col-span-2 text-blue-600">{userData.email}</p>
        </div>

        <div className="mb-3 grid grid-cols-3 items-center gap-4">
          <p className={labelCls}>Phone:</p>
          {edit ? (
            <input
              type="text"
              value={userData.phone}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, phone: e.target.value }))
              }
              className={`col-span-2 ${inputCls}`}
            />
          ) : (
            <p className="col-span-2 text-blue-600">{userData.phone}</p>
          )}
        </div>

        <div className="grid grid-cols-3 items-center gap-4">
          <p className={labelCls}>Address:</p>
          <div className="col-span-2 space-y-2">
            {edit ? (
              <>
                <input
                  type="text"
                  value={userData.address?.line1 || ''}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                  className={inputCls}
                />
                <input
                  type="text"
                  value={userData.address?.line2 || ''}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                  className={inputCls}
                />
              </>
            ) : (
              <div className="text-slate-500">
                <p>{userData.address?.line1}</p>
                <p>{userData.address?.line2}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Basic Information */}
      <section>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
          Basic Information
        </h2>

        <div className="mb-3 grid grid-cols-3 items-center gap-4">
          <p className={labelCls}>Gender:</p>
          <div className="col-span-2">
            {edit ? (
              <select
                value={userData.gender}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
                className={inputCls}
              >
                <option value="Not Selected">Not Selected</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              <p className="text-slate-500">{userData.gender}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 items-center gap-4">
          <p className={labelCls}>Birthday:</p>
          <div className="col-span-2">
            {edit ? (
              <input
                type="date"
                value={
                  userData.dob && userData.dob !== 'Not Selected'
                    ? userData.dob
                    : ''
                }
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, dob: e.target.value }))
                }
                className={inputCls}
              />
            ) : (
              <p className="text-slate-500">{userData.dob}</p>
            )}
          </div>
        </div>
      </section>

      {/* Edit / Save Button */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={() => (edit ? updateProfile() : setEdit(true))}
          className="rounded-full bg-blue-600 px-7 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          {edit ? 'Save Changes' : 'Edit Profile'}
        </button>
      </div>
    </div>
  );
};

export default MyProfile;

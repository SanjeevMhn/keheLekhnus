'use client'

import { useDispatch, useSelector } from "react-redux"
import { TAuthState, setUserData } from "../lib/auth/authSlice"
import BreadCrumb, { TBreadCrumb } from "../(components)/breadcrumb";
import { ChangeEvent, FormEvent, useState } from "react";
import { showNotification } from "../lib/notifications/notificationSlice";
import api from "../service/interceptor/interceptor";

export default function Page() {
  const authUser: TAuthState = useSelector((state: any) => state.auth);
  const crumbs: Array<TBreadCrumb> = [
    {
      name: 'home',
      link: '/'
    },
    {
      name: 'profile',
      link: '/profile'
    }
  ]
  const [uploadedImg, setUploadedImg] = useState<string | null>(null)
  const handleImgUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImg(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  type ProfileUpdate = {
    user_name?: string,
    user_email?: string,
    user_contact?: string,
    user_address?: string
  }

  const [userProfileUpdate, setUserprofileUpdate] = useState<ProfileUpdate>({});

  const handleProfileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== null || !e.target.value) {
      let update = {
        [e.target.name]: e.target.value
      }
      setUserprofileUpdate({ ...userProfileUpdate, ...update })
    }
  }

  const dispatch = useDispatch<any>();
  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (Object.keys(userProfileUpdate).length == 0) {
      dispatch(showNotification({
        message: 'No updates found!',
        type: 'error'
      }))

      return;
    }

    try {
      const update = await api.patch(`${process.env.NEXT_PUBLIC_API_URL}/user/${authUser.user_info?.user_id}`, userProfileUpdate);
      if (update.status == 200) {
        dispatch(showNotification({
          message: "User data updated successfully",
          type: "success"
        }))
        const checkUserReq = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`);
        const checkUserRes = checkUserReq.data;
        dispatch(setUserData({
          user_id: checkUserRes.user[0].user_id,
          user_name: checkUserRes.user[0].user_name,
          user_email: checkUserRes.user[0].user_email,
          user_img: checkUserRes.user[0].user_img,
          authProvider: checkUserRes.user[0].authProvider,
          user_contact: checkUserRes.user[0].user_contact,
          user_address: checkUserRes.user[0].user_address,
          is_admin: checkUserRes.user[0].user_role == 'admin' ? true : false,
        }))
      }
    } catch (err: any) {
      console.error(err);
    }
  }
  return (
    <div className="main-wrapper">
      <div className="grid-container">
        <div className="header">
          <h2 className="page-title">
            Profile
          </h2>
          <BreadCrumb crumbs={crumbs} />
        </div>
        <div className="entry-form-container row">
          <div className="product-img-container !h-[330px] !max-w-[350px]">
            {
              authUser.user_info?.user_img !== null ? (
                <div className="img-container">
                  <img src={authUser.user_info?.user_img} alt="" />
                </div>
              ) : uploadedImg !== null ? (
                <div className="img-container">
                  <img src={uploadedImg} alt="" />
                </div>
              ) : (
                <label htmlFor="upload_img" className="upload-img-msg">
                  Upload Profile Image
                  <input type="file" name="upload_img" id="upload_img" className="upload_img" onChange={handleImgUpload} />
                </label>
              )
            }

          </div>
          <form className="form entry-form form-layout no-shadow !h-auto" onSubmit={handleFormSubmit}>
            <div className="form-body !h-auto">
              <div className="form-row two-col">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input type="text" name="user_name" id="name" className="form-control" defaultValue={authUser.user_info?.user_name || ''} onChange={handleProfileChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" name="user_email" id="email" className="form-control" defaultValue={authUser.user_info?.user_email || ''} onChange={handleProfileChange} />
                </div>
              </div>
              <div className="form-row two-col">
                <div className="form-group">
                  <label htmlFor="contact" className="form-label">Contact</label>
                  <input type="text" name="user_contact" id="contact" className="form-control" defaultValue={authUser.user_info?.user_contact || ''} placeholder="Contact" onChange={handleProfileChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="address" className="form-label">Address</label>
                  <input type="text" name="user_address" id="address" className="form-control" defaultValue={authUser.user_info?.user_address || ''} placeholder="Address" onChange={handleProfileChange} />
                </div>
              </div>
              <div className="form-row two-col">
                {/* <div className="form-group">
                  <label htmlFor="address2" className="form-label">Address 2</label>
                  <input type="text" name="address2" id="address2" className="form-control" placeholder="Address 2" />
                </div> */}
                <div className="form-group">
                  <label htmlFor="auth-provider" className="form-label">Auth Provider</label>
                  <input type="text" name="auth-provider" id="auth-provideer" className="form-control" defaultValue={authUser.user_info?.authProvider || ''} readOnly />
                </div>
              </div>
              <div className="form-actions">
                <div className="form-group">
                  <button type="submit" className="btn btn-primary">Submit</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

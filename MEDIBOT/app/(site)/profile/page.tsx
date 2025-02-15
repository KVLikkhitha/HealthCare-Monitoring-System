 

// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { auth, db ,storage} from "@/components/Auth/firebaseConfig";
// import { onAuthStateChanged, signOut, User } from "firebase/auth";
// import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
// import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

// const ProfilePage = () => {
//   const [user, setUser] = useState<User | null>(null);
//   const [userData, setUserData] = useState<any>(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     bloodGroup: "",
//     allergies: "",
//     medicalHistory: "",
//   });

// const [reports, setReports] = useState<{ name: string; url: string; uploadedAt: string }[]>([]);
//   const [file, setFile] = useState<File | null>(null);

//   const router = useRouter();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//       if (currentUser) {
//         setUser(currentUser);

//         const docRef = doc(db, "users", currentUser.uid);
//         const docSnap = await getDoc(docRef);

//         if (docSnap.exists()) {
//           setUserData(docSnap.data());
//           setReports(docSnap.data().medicalReports || []);
//         } else {
//           setUserData(null);
//         }
//       } else {
//         setUser(null);
//         router.push("/signin");
//       }
//     });

//     return () => unsubscribe();
//   }, [router]);

//   const handleLogout = async () => {
//     await signOut(auth);
//     router.push("/signin");
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleProfileSave = async () => {
//     if (user) {
//       const docRef = doc(db, "users", user.uid);

//       if (userData) {
//         await updateDoc(docRef, formData);
//       } else {
//         await setDoc(docRef, { ...formData, medicalReports: [] });
//       }

//       setUserData({ ...formData, medicalReports: reports });
//       setIsEditing(false);
//     }
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setFile(e.target.files[0]);
//     }
//   };

//     const handleFileUpload = async () => {
//         if (user && file) {
//         const fileRef = ref(storage, `medicalReports/${user.uid}/${file.name}`);
//         await uploadBytes(fileRef, file);

//         const fileURL = await getDownloadURL(fileRef);

//         const docRef = doc(db, "users", user.uid);
//         const newReport = { name: file.name, url: fileURL, uploadedAt: new Date().toISOString() };

//         await updateDoc(docRef, {
//             medicalReports: arrayUnion(newReport),
//         });

//         setReports((prev) => [...prev, newReport]);
//         setFile(null);
//         }
//     };
// const handleDeleteReport = async (reportName: string) => {
//   if (user) {
//     const fileRef = ref(storage, `medicalReports/${user.uid}/${reportName}`);
//     await deleteObject(fileRef); // Delete the file from storage

//     const docRef = doc(db, "users", user.uid);
//     const updatedReports = reports.filter((report) => report.name !== reportName);

//     await updateDoc(docRef, {
//       medicalReports: updatedReports,
//     });

//     setReports(updatedReports);
//   }
// };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
//       <h1 className="text-2xl font-semibold mb-4">Profile Page</h1>

//       {userData && !isEditing ? (
//         <div>
//           <h2 className="text-lg font-bold">Personal Information</h2>
//           <p>Name: {userData.name}</p>
//           <p>Email: {user?.email}</p>
//           <p>Phone: {userData.phone || "Not Provided"}</p>

//           <h2 className="text-lg font-bold mt-4">Medical Information</h2>
//           <p>Blood Group: {userData.bloodGroup || "Not Provided"}</p>
//           <p>Allergies: {userData.allergies || "None"}</p>
//           <p>Medical History: {userData.medicalHistory || "None"}</p>

       

// <div>
//   <h2 className="text-lg font-bold mt-4">Medical Reports</h2>
//   {reports.map((report) => (
//     <div key={report.name} className="flex items-center justify-between mt-2">
//       <div>
//         <p>{report.name}</p>
//         <a
//           href={report.url}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="text-blue-500"
//         >
//           View Report
//         </a>
//       </div>
//       <button
//         onClick={() => handleDeleteReport(report.name)}
//         className="px-4 py-2 bg-red-500 text-white rounded-md"
//       >
//         Delete
//       </button>
//     </div>
//   ))}
// </div>
//           <input type="file" onChange={handleFileChange} className="mt-4" />
//           <button
//             className="mt-2 px-6 py-3 bg-blue-500 text-white rounded-md"
//             onClick={handleFileUpload}
//           >
//             Upload Report
//           </button>


//           <button
//             className="mt-4 px-6 py-3 bg-green-500 text-white rounded-md"
//             onClick={() => setIsEditing(true)}
//           >
//             Edit Profile
//           </button>
//           <button
//             className="mt-4 ml-4 px-6 py-3 bg-red-500 text-white rounded-md"
//             onClick={handleLogout}
//           >
//             Logout
//           </button>
//         </div>
//       ) : (
//         <div>
//           <h2 className="text-lg font-bold">{userData ? "Edit Profile" : "Create Profile"}</h2>
//           <div className="mt-4">
//             <input
//               type="text"
//               name="name"
//               placeholder="Name"
//               value={formData.name}
//               onChange={handleInputChange}
//               className="mb-4 w-full px-4 py-2 border rounded"
//             />
//             <input
//               type="text"
//               name="phone"
//               placeholder="Phone"
//               value={formData.phone}
//               onChange={handleInputChange}
//               className="mb-4 w-full px-4 py-2 border rounded"
//             />
//             <input
//               type="text"
//               name="bloodGroup"
//               placeholder="Blood Group"
//               value={formData.bloodGroup}
//               onChange={handleInputChange}
//               className="mb-4 w-full px-4 py-2 border rounded"
//             />
//             <input
//               type="text"
//               name="allergies"
//               placeholder="Allergies"
//               value={formData.allergies}
//               onChange={handleInputChange}
//               className="mb-4 w-full px-4 py-2 border rounded"
//             />
//             <input
//               type="text"
//               name="medicalHistory"
//               placeholder="Medical History"
//               value={formData.medicalHistory}
//               onChange={handleInputChange}
//               className="mb-4 w-full px-4 py-2 border rounded"
//             />
//             <button
//               className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-md"
//               onClick={handleProfileSave}
//             >
//               Save
//             </button>
//             <button
//               className="mt-4 ml-4 px-6 py-3 bg-gray-500 text-white rounded-md"
//               onClick={() => setIsEditing(false)}
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfilePage;


"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
// import { auth, db, storage } from "@/lib/firebase";
import { auth, db ,storage} from "@/components/Auth/firebaseConfig";

import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { 
  User as UserIcon, 
  FileText, 
  Upload, 
  Trash2, 
  LogOut, 
  Edit3, 
  Save, 
  X,
  Moon,
  Sun
} from 'lucide-react';

const ProfilePage = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    height: "",
    weight: "",
    bloodGroup: "",
    allergies: "",
    currentMedications: "",
    chronicConditions: "",
    surgicalHistory: "",
    familyHistory: "",
    lifestyle: "",
    emergencyContact: "",
    insuranceInfo: "",
    medicalHistory: "",
    preferredPharmacy: "",
    primaryCarePhysician: "",
    vaccinationHistory: "",
  });

  const [reports, setReports] = useState<{ name: string; url: string; uploadedAt: string }[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserData(data);
          // setFormData(data);
          setReports(data.medicalReports || []);
        }
      } else {
        router.push("/signin");
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/auth/signin");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSave = async () => {
    if (user) {
      const docRef = doc(db, "users", user.uid);
      if (userData) {
        await updateDoc(docRef, formData);
      } else {
        await setDoc(docRef, { ...formData, medicalReports: [] });
      }
      setUserData({ ...formData, medicalReports: reports });
      setIsEditing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file.type !== "application/pdf") {
        setFileError("Please upload PDF files only");
        return;
      }
      setFile(file);
      setFileError("");
    }
  };

  const handleFileUpload = async () => {
    if (user && file) {
      const fileRef = ref(storage, `medicalReports/${user.uid}/${file.name}`);
      await uploadBytes(fileRef, file);
      const fileURL = await getDownloadURL(fileRef);
      const docRef = doc(db, "users", user.uid);
      const newReport = { 
        name: file.name, 
        url: fileURL, 
        uploadedAt: new Date().toISOString() 
      };
      await updateDoc(docRef, {
        medicalReports: arrayUnion(newReport),
      });
      setReports((prev) => [...prev, newReport]);
      setFile(null);
    }
  };

  const handleDeleteReport = async (reportName: string) => {
    if (user) {
      const fileRef = ref(storage, `medicalReports/${user.uid}/${reportName}`);
      await deleteObject(fileRef);
      const docRef = doc(db, "users", user.uid);
      const updatedReports = reports.filter((report) => report.name !== reportName);
      await updateDoc(docRef, {
        medicalReports: updatedReports,
      });
      setReports(updatedReports);
    }
  };

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString();
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8   pt-30">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="px-8 py-6 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-900 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center">
                <UserIcon size={32} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  {userData?.name || "Medical Profile"}
                </h1>
                <p className="text-blue-100">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>

          {/* Main Content */}
          <div className="p-8">
            {userData && !isEditing ? (
              <div className="space-y-8">
                {/* Personal Information Section */}
                <section className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Personal Information
                    </h2>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors"
                    >
                      <Edit3 size={20} />
                      <span>Edit Profile</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.entries(userData).map(([key, value]) => {
                      if (key !== 'medicalReports' && value) {
                        return (
                          <div key={key} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                            <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </p>
                            <p className="text-gray-900 dark:text-white font-medium mt-1">
                              {value as string}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                </section>

                {/* Medical Reports Section */}
                <section className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Medical Reports
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {reports.map((report) => (
                      <div
                        key={report.name}
                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <FileText className="text-blue-600 dark:text-blue-400" />
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {report.name}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Uploaded on {formatDate(report.uploadedAt)}
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <a
                            href={report.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-full transition-colors"
                          >
                            <FileText size={20} />
                          </a>
                          <button
                            onClick={() => handleDeleteReport(report.name)}
                            className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 rounded-full transition-colors"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Upload Section */}
                  <div className="mt-4 p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <input
                        type="file"
                        onChange={handleFileChange}
                        accept=".pdf"
                        className="flex-1 text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 dark:file:bg-blue-900 file:text-blue-600 dark:file:text-blue-300 hover:file:bg-blue-100 dark:hover:file:bg-blue-800"
                      />
                      <button
                        onClick={handleFileUpload}
                        disabled={!file}
                        className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-600 dark:bg-blue-700 text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Upload size={20} />
                        <span>Upload</span>
                      </button>
                    </div>
                    {fileError && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-400">{fileError}</p>
                    )}
                  </div>
                </section>
              </div>
            ) : (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {userData ? "Edit Profile" : "Create Profile"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(formData).map(([key, value]) => {
                    if (key !== 'medicalReports') {
                      return (
                        <div key={key} className="space-y-1">
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </label>
                          {key === 'gender' ? (
                            <select
                              name={key}
                              value={value as string}
                              onChange={handleInputChange}
                              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            >
                              <option value="">Select Gender</option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="other">Other</option>
                            </select>
                          ) : key === 'medicalHistory' || 
                             key === 'familyHistory' || 
                             key === 'lifestyle' ? (
                            <textarea
                              name={key}
                              value={value as string}
                              onChange={handleInputChange}
                              rows={3}
                              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                          ) : (
                            <input
                              type={key === 'dateOfBirth' ? 'date' : 'text'}
                              name={key}
                              value={value as string}
                              onChange={handleInputChange}
                              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                          )}
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <X size={20} />
                    <span>Cancel</span>
                  </button>
                  <button
                    onClick={handleProfileSave}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-600 dark:bg-blue-700 text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                  >
                    <Save size={20} />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
import { useState, useEffect } from "react";

const Personal = ({ resumeData, formData, onChange, uploadResume }) => {
  const [resumeName, setResumeName] = useState("");

  useEffect(() => {
    if (formData.resume) {
      setResumeName(formData.resume.split("/").at(-1));
    }
  }, [formData.resume]);

  const onResumeChange = (e) => {
    resumeData.append("file", e.target.files[0]);
    uploadResume();
  };
  return (
    <div className="bg-profile p-5">
      <label className="uppercase font-semibold text-lg">Personal Info</label>
      <div className="card card-50">
        <div className="flex items-center justify-between">
          <label className="mr-2 font-medium">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={onChange}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <label className="mr-2 font-medium">Email</label>
          <input
            className="bg-gray-200"
            type="email"
            value={formData.email}
            placeholder="Email"
            readOnly
          />
        </div>
        <div className="flex items-center justify-between">
          <label className="mr-2 font-medium">Mobile</label>
          <input
            country={"canada"}
            type="text"
            name="phone"
            value={formData.phone}
            onChange={onChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <label className="mr-2 font-medium">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={onChange}
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="mr-2 font-medium">Resume</label>
          <input type="file" name="resume" onChange={onResumeChange} />
        </div>

        {resumeName && (
          <div className="flex items-center justify-between">
            <label className="mr-2 font-medium">Current Resume</label>
            <a href={formData.resume} target="_blank" rel="noreferrer">
              {resumeName.slice(13)}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Personal;

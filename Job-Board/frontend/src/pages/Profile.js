import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Profile = () => {
  const resumeRef = useRef(null);
  const data = new FormData();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    resume: "",
    qualification: {
      school: "",
      startDate: "",
      endDate: "",
      course: "",
    },
    experience: {
      company: "",
      startDate: "",
      endDate: "",
      position: "",
    },
  });

  const handleFormChange = (e) => {
    let targetName = e.target.name.split(" ");
    if (targetName.length === 1) {
      if (targetName[0] === "resume") {
        data.append("resume_file", resumeRef.current.files[0]);
        setFormData({
          ...formData,
          [e.target.name]: e.target.files[0].name,
        });
      } else {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      }
    } else {
      formData[targetName[0]] = {
        ...formData[targetName[0]],
        [targetName[1]]: e.target.value,
      };
      setFormData({ ...formData });
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/profile", {
        headers: {
          authorization: `token ${Cookies.get("token")}`,
        },
      })
      .then((res) => {
        const user = res.data.user;
        setFormData({
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          resume: user.resume,
          qualification: {
            school: (user.qualification && user.qualification.school) || "",
            startDate:
              user.qualification && user.qualification.startDate
                ? new Date(user.qualification.startDate)
                    .toISOString()
                    .split("T")[0]
                : "",
            endDate:
              user.qualification && user.qualification.endDate
                ? new Date(user.qualification.startDate)
                    .toISOString()
                    .split("T")[0]
                : "",
            course: (user.qualification && user.qualification.course) || "",
          },
          experience: {
            company: (user.experience && user.experience.company) || "",
            startDate:
              user.experience && user.experience.startDate
                ? new Date(user.experience.startDate)
                    .toISOString()
                    .split("T")[0]
                : "",
            endDate:
              user.experience && user.experience.endDate
                ? new Date(user.experience.startDate)
                    .toISOString()
                    .split("T")[0]
                : "",
            position: (user.experience && user.experience.position) || "",
          },
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const resumeUpload = () => {
    axios
      .post("http://localhost:5000/api/profile/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `token ${Cookies.get("token")}`,
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    // Update Form fields
    axios
      .put("http://localhost:5000/api/profile", formData, {
        headers: {
          authorization: `token ${Cookies.get("token")}`,
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.error(err));

    // Upload resume
    if (resumeRef.current && resumeRef.current.files) {
      data.append("resume_file", resumeRef.current.files[0]);
      resumeUpload();
    }
  };

  return (
    <>
      <div className="flex flex-wrap justify-center mt-5">
        <div>
          <img
            className="max-w-full h-auto rounded-full"
            src=""
            alt="Card cap"
            style={{ width: "200px", height: "200px", margin: "5px" }}
          />
          <input type="file" id="profile_pic" style={{ display: "none" }} />
        </div>
      </div>
      <div className="flex justify-center bg">
        <form
          style={{ textAlign: "center" }}
          encType="multipart/form-data"
          onSubmit={onSubmitHandler}
        >
          <div className="bg-cyan-50 p-5">
            <label className="uppercase font-semibold text-lg">
              Personal Info
            </label>
            <div className="card" style={{ width: "50rem" }}>
              <div className="flex items-center justify-between">
                <label className="mr-2 font-medium">Name</label>

                <input
                  className="w-11/12 border rounded shadow p-2"
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) => handleFormChange(e)}
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="mr-2 font-medium">Email</label>

                <input
                  className="w-11/12 border rounded shadow p-2 mt-2 bg-gray-200"
                  type="email"
                  value={formData.email}
                  placeholder="Email"
                  readOnly
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="mr-2 font-medium">Mobile</label>
                <input
                  className="w-11/12 border rounded shadow p-2 mt-2"
                  country={"canada"}
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => handleFormChange(e)}
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="mr-2 font-medium">Resume</label>
                <input
                  ref={resumeRef}
                  type="file"
                  className="w-full border rounded shadow p-2 mt-2"
                  name="resume"
                  onChange={(e) => handleFormChange(e)}
                />
              </div>
            </div>
          </div>

          {/* Qualifications Start here */}
          <div className="bg-cyan-50 mt-10 p-5">
            <label className="uppercase font-semibold text-lg">
              Qualification
            </label>
            <div className="flex items-center justify-between">
              <label className="mr-2 font-medium">School</label>
              <input
                className="w-full border rounded shadow p-2"
                type="text"
                name="qualification school"
                onChange={(e) => handleFormChange(e)}
                value={formData.qualification.school}
                placeholder="School"
              />
            </div>
            <div className="my-3 flex items-center justify-between">
              <label className="mr-2 font-medium">Duration</label>
              <div className="flex jusitfy-between w-11/12">
                <input
                  className="w-11/12 mr-2 border rounded shadow p-2"
                  type="date"
                  name="qualification startDate"
                  onChange={(e) => handleFormChange(e)}
                  value={formData.qualification.startDate}
                  placeholder="date"
                />
                <input
                  className="w-11/12 border rounded shadow p-2"
                  type="date"
                  value={formData.qualification.endDate}
                  onChange={(e) => handleFormChange(e)}
                  name="qualification endDate"
                  placeholder="date"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="mr-2 font-medium">Course</label>
              <input
                className="w-full border rounded shadow p-2"
                type="text"
                value={formData.qualification.course}
                name="qualification course"
                onChange={(e) => handleFormChange(e)}
                placeholder="Course"
              />
            </div>

            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              style={{ margin: "20px", width: "100px" }}
            >
              Add
            </button>
          </div>
          <div className="bg-cyan-50 mt-10 p-5">
            <label className="uppercase font-semibold text-lg">
              Experience
            </label>
            <div className="flex items-center justify-between">
              <label className="mr-2 font-medium">Company</label>
              <input
                className="w-full border rounded shadow p-2"
                type="text"
                name="experience company"
                onChange={(e) => handleFormChange(e)}
                value={formData.experience.company}
                placeholder="Company"
              />
            </div>
            <div className="my-3 flex items-center justify-between">
              <label className="mr-3 font-medium">Duration</label>
              <div className="flex jusitfy-between w-11/12">
                <input
                  className="w-11/12 mr-2 border rounded shadow p-2"
                  type="date"
                  name="experience startDate"
                  onChange={(e) => handleFormChange(e)}
                  value={formData.experience.startDate}
                  placeholder="date"
                />
                <input
                  className="w-11/12 border rounded shadow p-2"
                  type="date"
                  name="experience endDate"
                  onChange={(e) => handleFormChange(e)}
                  value={formData.experience.endDate}
                  placeholder="date"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="mr-2 font-medium">Position</label>
              <input
                className="w-11/12 border rounded shadow p-2"
                type="text"
                name="experience position"
                onChange={(e) => handleFormChange(e)}
                value={formData.experience.position}
                placeholder="Position"
              />
            </div>
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              style={{ margin: "20px", width: "100px" }}
            >
              Add
            </button>
          </div>
          <button
            type="submit"
            className="my-5  text-blue-600 font-semibold hover:text-white
             py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Profile;

import { useState, useEffect } from "react";
import formattedInputDate from "../../config/dateFormatter";

const Qualification = ({ index, formData, setFormData, qualification }) => {
  const [qual, setQual] = useState({
    school: "",
    startDate: "",
    endDate: "",
    course: "",
  });

  useEffect(() => {
    setQual((prev) => qualification);
  }, [qualification]);

  const onChange = (e) => {
    setQual((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });

    const updatedQualification = [
      ...formData.qualifications.slice(0, index),
      { ...qual, [e.target.name]: e.target.value },
      ...formData.qualifications.slice(
        index + 1,
        formData.qualifications.length
      ),
    ];
    setFormData((prev) => {
      return { ...prev, qualifications: updatedQualification };
    });
  };

  return (
    <div className="bg-cyan-50 px-5 pb-5">
      <div className="card card-50">
        <div className="flex items-center justify-between">
          <label className="mr-2 font-medium">School</label>
          <input
            type="text"
            name="school"
            onChange={onChange}
            value={qual.school}
            placeholder="School"
          />
        </div>
        <div className="my-3 flex items-center justify-between">
          <label className="mr-2 font-medium">Duration</label>
          <div className="flex jusitfy-between w-11/12">
            <input
              type="date"
              name="startDate"
              onChange={onChange}
              value={qual.startDate ? formattedInputDate(qual.startDate) : ""}
              placeholder="date"
            />
            <input
              type="date"
              value={qual.endDate ? formattedInputDate(qual.endDate) : ""}
              onChange={onChange}
              name="endDate"
              placeholder="date"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="mr-2 font-medium">Course</label>
          <input
            type="text"
            value={qual.course}
            name="course"
            onChange={onChange}
            placeholder="Course"
          />
        </div>
      </div>
    </div>
  );
};

export default Qualification;

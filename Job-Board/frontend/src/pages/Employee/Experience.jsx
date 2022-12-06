import { useEffect } from "react";
import { useState } from "react";
import formattedInputDate from "../../config/dateFormatter";

const Experience = ({ experience, setFormData, formData, index }) => {
  const [exp, setExp] = useState({
    company: "",
    startDate: "",
    endDate: "",
    position: "",
  });

  useEffect(() => {
    setExp((prev) => experience);
  }, [experience]);

  const onChange = (e) => {
    setExp((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });

    const updatedExperience = [
      ...formData.experiences.slice(0, index),
      { ...exp, [e.target.name]: e.target.value },
      ...formData.experiences.slice(index + 1, formData.experiences.length),
    ];
    setFormData((prev) => {
      return { ...prev, experiences: updatedExperience };
    });
  };

  return (
    <div className="px-5 pb-5">
      <div className="card card-50">
        <div className="flex items-center justify-between">
          <label className="mr-2 font-medium">Company</label>
          <input
            type="text"
            name="company"
            onChange={onChange}
            value={exp.company}
            placeholder="Company"
          />
        </div>
        <div className="my-3 flex items-center justify-between">
          <label className="mr-3 font-medium">Duration</label>
          <div className="flex jusitfy-between w-11/12">
            <input
              type="date"
              name="startDate"
              onChange={onChange}
              value={exp.startDate ? formattedInputDate(exp.startDate) : ""}
              placeholder="date"
            />
            <input
              type="date"
              name="endDate"
              onChange={onChange}
              value={exp.endDate ? formattedInputDate(exp.endDate) : ""}
              placeholder="date"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="mr-2 font-medium">Position</label>
          <input
            type="text"
            name="position"
            onChange={onChange}
            value={exp.position}
            placeholder="Position"
          />
        </div>
      </div>
    </div>
  );
};

export default Experience;

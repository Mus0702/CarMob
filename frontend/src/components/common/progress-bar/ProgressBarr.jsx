import React from "react";
import { ProgressBar } from "react-bootstrap";
const ProgressBarr = (step) => {
  const totalSteps = 6;
  console.log("step dans progress bar ", step);
  const progressPercentage = ((step.step - 1) / totalSteps) * 100;
  const roundedPercentage = Number(progressPercentage.toFixed(0));

  return (
    <div className="progress-bar">
      <ProgressBar
        now={progressPercentage}
        label={`${roundedPercentage}% completed`}
        variant="success"
      />
    </div>
    // <div
    //   className=" container progress"
    //   role="progressbar"
    //   aria-label="Route Progress"
    //   aria-valuenow={progressPercentage}
    //   aria-valuemin="0"
    //   aria-valuemax="100"
    // >
    //   <div
    //     className="progress-bar bg-success"
    //     style={{ width: `${progressPercentage}%` }}
    //   ></div>
    // </div>
  );
};
export default ProgressBarr;

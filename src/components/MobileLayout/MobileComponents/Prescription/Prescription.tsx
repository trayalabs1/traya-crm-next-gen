import React, { useState } from "react";

import { Button } from "@components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@components/ui/dialog";
import { MobileContent } from "cms";

interface PrescriptionData {
  isPrescriptionLocked: boolean;
  latestOrderId: string;
  showNew: boolean;
  event: string;
  howToUseText?: string;
  title: string;
  cta: string;
  image_url: string;
}

interface PrescriptionProps {
  contents: MobileContent | MobileContent[];
  title: string;
}

const Prescription: React.FC<PrescriptionProps> = ({ contents, title }) => {
  contents = Array.isArray(contents) ? contents : [];

  const prescriptionData: PrescriptionData = Array.isArray(
    contents[0].content_data,
  )
    ? contents[0].content_data[0]
    : {};
  const [show] = useState(!prescriptionData.isPrescriptionLocked);

  const handlePrescriptionClick = () => {
    console.log("Prescription clicked");
  };

  return (
    <div className="bg-white p-4 mb-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        {prescriptionData.howToUseText && (
          <span
            className={`px-4 py-1 rounded-full text-white text-sm ${
              prescriptionData.howToUseText === "Expired"
                ? "bg-yellow-500"
                : "bg-green-600"
            }`}
          >
            {prescriptionData.howToUseText}
          </span>
        )}
      </div>

      {show ? (
        <button onClick={handlePrescriptionClick} className="w-full">
          <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg p-4 flex justify-between items-center">
            <div>
              <p className="text-gray-600 mb-2">{prescriptionData.title}</p>
              <p className="text-blue-800 font-bold underline">
                {prescriptionData.cta}
              </p>
            </div>
            <img
              src={prescriptionData.image_url}
              alt="Prescription"
              className="w-28 h-24 object-contain"
            />
          </div>
        </button>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <button className="w-full">
              <img
                src={prescriptionData.image_url}
                alt="Locked Prescription"
                className="w-full h-26 object-cover rounded-lg"
              />
            </button>
          </DialogTrigger>
          <DialogContent>
            <div className="text-center">
              <h3 className="text-lg font-bold mb-2">
                Begin your doctor-prescribed hair regime now!
              </h3>
              <p className="text-gray-600 mb-4">
                Your prescription is currently being reviewed by a doctor. Keep
                an eye out - it'll be unlocked shortly
              </p>
              <Button onClick={() => console.log("Got it clicked")}>
                Got it!
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default React.memo(Prescription);

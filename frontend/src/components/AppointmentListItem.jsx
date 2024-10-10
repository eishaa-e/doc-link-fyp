import React from 'react';
import CommonService from "../services/CommonService";

const AppointmentListItem = ({appointment}) => {

    return (
        <div className="flex items-center my-5 bg-white p-4 rounded-xl">
            <div className="w-1/4 text-sm">
                <p className="font-semibold">
                    {CommonService.formatDate(appointment.date)}
                </p>
                <p className="text-gray-500">
                    {appointment.time_slot.startTime}
                </p>
            </div>
            <div className="flex-1 flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-4"></div>
                <div className="flex-1 bg-fuchsia-100 p-4 rounded-lg">
                    <p className="font-semibold">Doctor</p>
                    <p className="">{appointment.doctor_id.name}</p>
                </div>
                <div className="text-right ml-4">
                    <p className="text-gray-500">Specialization</p>
                    <p className="font-semibold">
                        {appointment.doctor_id.specialization}
                    </p>
                </div>
            </div>
            <button className="text-blue-500 hover:underline ml-4">
                Button
            </button>
        </div>
    );
};

export default AppointmentListItem;
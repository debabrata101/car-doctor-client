import { useEffect, useState } from "react";
import ServiceCard from "./serviceCard";


const Service = () => {
    const [service , setService] = useState([])

    useEffect(() => {
        fetch('service.json')
        .then(res => res.json())
        .then(data => setService(data))

    }, [])
    return (
        <div className="mt-4">
            <div className="text-center">
                <h3 className="text-3xl font-bold text-orange-600">Our Services</h3>
                <h2 className="text-5xl">Our Service Area</h2>
                <p>the majority have suffered alteration in some form, by injected humour, or randomised words which do not look even slightly believable. </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {
                service.map(service => <ServiceCard
                key={service._id}
                service ={service}
                ></ServiceCard>)
               }
            </div>
        </div>
    );
};

export default Service;

import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

const BookService = () => {
    const service = useLoaderData()
    const { title, _id, price, img } = service
    const { user } = useContext(AuthContext);

    const handleBookService = event => {
        event.preventDefault()
        const form = event.target;
        const name = form.name.value;
        const date = form.date.value;
        const email = user?.email;
        const booking = {
            customerName: name,
            email,
            date,
            img,
            service: title,
            service_id: _id,
            price: price
        }
        console.log(booking)

        fetch('https://car-doctor-server-beta-olive.vercel.app/bookings',{
            method: 'POST',
            headers:{
               'content-type' : 'application/json'

            },
            body:JSON.stringify(booking)

        })
        .then(res => res.json())
        .then(data => {console.log(data)
        
            if(data.insertedId){
                alert('service add successfully...')
            }
        })

    }
    return (
        <div>
            <h2  className="text-center text-3xl font-bold">Booking : {title}</h2>
            <form onSubmit={handleBookService}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" name="name" placeholder="name"
                            defaultValue={user?.displayname} className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Date</span>
                        </label>
                        <input type="date" name="date" className="input input-bordered" />

                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="text" name="email" defaultValue={user?.email} placeholder="email" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Deu Amount</span>
                        </label>
                        <input type="text" defaultValue={'$' + price} className="input input-bordered" />

                    </div>
                </div>
                <div className="form-control mt-6">

                    <input className="btn btn-primary btn-block" type="submit" value="order confirm" />
                </div>
            </form>
        </div>
    );
};

export default BookService;
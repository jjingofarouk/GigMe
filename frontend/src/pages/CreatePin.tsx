import { useState } from 'react';
   import { useNavigate } from 'react-router-dom';
   import { createFreelancer } from '../services/api';

   const CreatePin: React.FC = () => {
     const navigate = useNavigate();
     const [formData, setFormData] = useState({
       name: '',
       blurb: '',
       bestThings: ['', '', ''],
       location: '',
       contact: '',
       latitude: 0,
       longitude: 0,
     });
     const [error, setError] = useState('');

     const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
       if (index !== undefined) {
         const newBestThings = [...formData.bestThings];
         newBestThings[index] = e.target.value;
         setFormData({ ...formData, bestThings: newBestThings });
       } else {
         setFormData({ ...formData, [e.target.name]: e.target.value });
       }
     };

     const handleSubmit = async (e: React.FormEvent) => {
       e.preventDefault();
       try {
         await createFreelancer({
           ...formData,
           latitude: Number(formData.latitude),
           longitude: Number(formData.longitude),
         });
         navigate('/');
       } catch (err: any) {
         setError(err.response?.data?.error || 'Failed to create freelancer');
       }
     };

     return (
       <div className="container mx-auto p-4">
         <h1 className="text-2xl font-bold mb-4">Create Freelancer Pin</h1>
         {error && <p className="text-red-500">{error}</p>}
         <form onSubmit={handleSubmit} className="space-y-4">
           <div>
             <label>Name</label>
             <input
               type="text"
               name="name"
               value={formData.name}
               onChange={handleChange}
               className="border p-2 w-full"
               required
             />
           </div>
           <div>
             <label>Blurb</label>
             <input
               type="text"
               name="blurb"
               value={formData.blurb}
               onChange={handleChange}
               className="border p-2 w-full"
               required
             />
           </div>
           <div>
             <label>Best Things (3)</label>
             {formData.bestThings.map((thing, index) => (
               <input
                 key={index}
                 type="text"
                 value={thing}
                 onChange={(e) => handleChange(e, index)}
                 className="border p-2 w-full mt-2"
                 required
               />
             ))}
           </div>
           <div>
             <label>Location</label>
             <input
               type="text"
               name="location"
               value={formData.location}
               onChange={handleChange}
               className="border p-2 w-full"
               required
             />
           </div>
           <div>
             <label>Contact</label>
             <input
               type="text"
               name="contact"
               value={formData.contact}
               onChange={handleChange}
               className="border p-2 w-full"
               required
             />
           </div>
           <div>
             <label>Latitude</label>
             <input
               type="number"
               name="latitude"
               value={formData.latitude}
               onChange={handleChange}
               className="border p-2 w-full"
               required
             />
           </div>
           <div>
             <label>Longitude</label>
             <input
               type="number"
               name="longitude"
               value={formData.longitude}
               onChange={handleChange}
               className="border p-2 w-full"
               required
             />
           </div>
           <button type="submit" className="bg-blue-500 text-white p-2 rounded">
             Create Pin
           </button>
         </form>
       </div>
     );
   };

   export default CreatePin;
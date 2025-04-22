import Map from '../components/Map';

   const Home: React.FC = () => {
     return (
       <div className="container mx-auto p-4">
         <h1 className="text-2xl font-bold mb-4">GigMap</h1>
         <Map />
       </div>
     );
   };

   export default Home;
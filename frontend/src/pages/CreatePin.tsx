import PinForm from '../components/PinForm';

const CreatePin: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 tracking-tight">
        Create a Freelancer Pin
      </h1>
      <div className="w-full max-w-2xl">
        <PinForm />
      </div>
    </div>
  );
};

export default CreatePin;
import PinForm from '../components/PinForm';

const CreatePin: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center p-4">Create a Freelancer Pin</h1>
      <PinForm />
    </div>
  );
};

export default CreatePin;